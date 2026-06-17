import { createSign } from 'node:crypto';

const SHEET_NAME = process.env.GOOGLE_SHEET_NAME || 'Contact Submissions';
const HEADERS = ['Date Submitted', 'Full Name', 'Email Address', 'Phone Number', 'Project Details', 'Status'];
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

function json(response, statusCode, body) {
  response.status(statusCode).json(body);
}

function base64Url(input) {
  return Buffer.from(input)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function normalizePrivateKey(key) {
  return key.replace(/\\n/g, '\n');
}

function createJwt() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;

  if (!email || !privateKey) {
    throw new Error('Google service account credentials are not configured.');
  }

  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'RS256', typ: 'JWT' };
  const claim = {
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
    iss: email,
    scope: SCOPES.join(' '),
  };
  const unsignedToken = `${base64Url(JSON.stringify(header))}.${base64Url(JSON.stringify(claim))}`;
  const signer = createSign('RSA-SHA256');
  signer.update(unsignedToken);
  signer.end();
  const signature = signer.sign(normalizePrivateKey(privateKey), 'base64url');

  return `${unsignedToken}.${signature}`;
}

async function getAccessToken() {
  const response = await fetch('https://oauth2.googleapis.com/token', {
    body: new URLSearchParams({
      assertion: createJwt(),
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
    }),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    method: 'POST',
  });
  const data = await response.json();

  if (!response.ok || !data.access_token) {
    throw new Error(data.error_description || 'Unable to authenticate with Google Sheets.');
  }

  return data.access_token;
}

async function sheetsFetch(path, token, options = {}) {
  const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.error?.message || 'Google Sheets request failed.');
  }

  return data;
}

function sheetRange(range) {
  return `'${SHEET_NAME.replace(/'/g, "''")}'!${range}`;
}

async function ensureSheet(token, spreadsheetId) {
  const spreadsheet = await sheetsFetch(
    `${spreadsheetId}?fields=sheets(properties(sheetId,title),bandedRanges(bandedRangeId))`,
    token,
  );
  let sheet = spreadsheet.sheets?.find((item) => item.properties?.title === SHEET_NAME);

  if (!sheet) {
    const created = await sheetsFetch(`${spreadsheetId}:batchUpdate`, token, {
      body: JSON.stringify({
        requests: [{ addSheet: { properties: { title: SHEET_NAME } } }],
      }),
      method: 'POST',
    });
    sheet = created.replies?.[0]?.addSheet;
  }

  const sheetId = sheet?.properties?.sheetId;
  if (typeof sheetId !== 'number') {
    throw new Error('Unable to prepare the Google Sheet.');
  }

  await sheetsFetch(`${spreadsheetId}/values/${encodeURIComponent(sheetRange('A1:F1'))}?valueInputOption=RAW`, token, {
    body: JSON.stringify({ values: [HEADERS] }),
    method: 'PUT',
  });

  const requests = [
    {
      updateSheetProperties: {
        fields: 'gridProperties.frozenRowCount',
        properties: { gridProperties: { frozenRowCount: 1 }, sheetId },
      },
    },
    {
      repeatCell: {
        cell: {
          userEnteredFormat: {
            backgroundColor: { blue: 0.274, green: 0.121, red: 0.027 },
            horizontalAlignment: 'CENTER',
            textFormat: { bold: true, foregroundColor: { blue: 1, green: 1, red: 1 } },
          },
        },
        fields: 'userEnteredFormat(backgroundColor,horizontalAlignment,textFormat)',
        range: { endColumnIndex: HEADERS.length, endRowIndex: 1, sheetId, startColumnIndex: 0, startRowIndex: 0 },
      },
    },
    {
      autoResizeDimensions: {
        dimensions: { dimension: 'COLUMNS', endIndex: HEADERS.length, sheetId, startIndex: 0 },
      },
    },
  ];

  if (!sheet.bandedRanges?.length) {
    requests.push({
      addBanding: {
        bandedRange: {
          columnProperties: {
            firstBandColor: { blue: 1, green: 1, red: 1 },
            secondBandColor: { blue: 0.98, green: 0.965, red: 0.95 },
          },
          range: { endColumnIndex: HEADERS.length, sheetId, startColumnIndex: 0, startRowIndex: 0 },
        },
      },
    });
  }

  await sheetsFetch(`${spreadsheetId}:batchUpdate`, token, {
    body: JSON.stringify({ requests }),
    method: 'POST',
  });
}

function parseBody(body) {
  if (typeof body !== 'string') {
    return body;
  }

  try {
    return JSON.parse(body);
  } catch {
    return null;
  }
}

function validatePayload(body) {
  const name = String(body?.name || '').trim();
  const email = String(body?.email || '').trim();
  const phone = String(body?.phone || '').trim();
  const message = String(body?.message || '').trim();

  if (!name || !email || !message) {
    return { error: 'Full name, email address, and project details are required.' };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: 'Please enter a valid email address.' };
  }

  return { data: { email, message, name, phone } };
}

export default async function handler(request, response) {
  if (request.method === 'OPTIONS') {
    response.setHeader('Allow', 'POST, OPTIONS');
    return response.status(204).end();
  }

  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return json(response, 405, { message: 'Method not allowed.' });
  }

  try {
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    if (!spreadsheetId) {
      throw new Error('Google Sheet ID is not configured.');
    }

    const validation = validatePayload(parseBody(request.body));
    if (validation.error) {
      return json(response, 400, { message: validation.error });
    }

    const token = await getAccessToken();
    await ensureSheet(token, spreadsheetId);
    await sheetsFetch(
      `${spreadsheetId}/values/${encodeURIComponent(sheetRange('A:F'))}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
      token,
      {
        body: JSON.stringify({
          values: [[new Date().toISOString(), validation.data.name, validation.data.email, validation.data.phone, validation.data.message, 'New']],
        }),
        method: 'POST',
      },
    );

    return json(response, 200, { message: 'Message saved.' });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to save your message.';
    return json(response, 500, { message });
  }
}
