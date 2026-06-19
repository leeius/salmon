const SECRET = 'replace-with-a-long-random-secret';
const SHEET_NAME = 'Salmon Innovations Messages';
const BRAND_IMAGE_URL = '';

const HEADER_ROW = 7;
const FIRST_DATA_ROW = HEADER_ROW + 1;
const HEADERS = [
  '📅 Date Submitted',
  '👤 Full Name',
  '✉️ Email Address',
  '📞 Phone Number',
  '📋 Project Details',
  '⚑ Status',
];

function doPost(e) {
  try {
    const data = JSON.parse(e?.postData?.contents || '{}');

    if (!data.secret || data.secret !== SECRET) {
      return json({ ok: false, message: 'Unauthorized' });
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
    }

    setupSheet(sheet);

    sheet.appendRow([
      new Date(),
      data.name || '',
      data.email || '',
      data.phone || '',
      data.message || '',
      'New',
    ]);

    styleDataRows(sheet);

    return json({ ok: true, message: 'Message saved.' });
  } catch (error) {
    return json({
      ok: false,
      message: error.message || 'Something went wrong.',
    });
  }
}

function doGet() {
  return json({
    ok: true,
    message: 'Salmon Innovations contact endpoint is running.',
  });
}

function setupSheet(sheet) {
  const existingRows = getExistingRows(sheet);

  sheet.getDataRange().breakApart();
  sheet.clear();
  sheet.setName(SHEET_NAME);
  sheet.setHiddenGridlines(true);
  sheet.setFrozenRows(HEADER_ROW);

  buildBanner(sheet);
  buildHeader(sheet);
  setColumnLayout(sheet);

  if (existingRows.length) {
    sheet.getRange(FIRST_DATA_ROW, 1, existingRows.length, HEADERS.length).setValues(existingRows);
  }

  styleDataRows(sheet);
}

function buildBanner(sheet) {
  sheet.setRowHeights(1, 5, 34);
  sheet.setRowHeight(6, 22);
  sheet.getRange('A1:F5').merge();
  sheet.getRange('A1:F5')
    .setBackground('#071f46')
    .setFontColor('#ffffff')
    .setFontWeight('bold')
    .setFontSize(24)
    .setHorizontalAlignment('left')
    .setVerticalAlignment('middle')
    .setValue('   SALMON\n   INNOVATIONS INC.\n   Innovation That Rises Above');

  sheet.getRange('A6:F6').merge().setBackground('#ffffff');

  if (BRAND_IMAGE_URL) {
    try {
      const image = sheet.insertImage(BRAND_IMAGE_URL, 1, 1);
      image.setWidth(230).setHeight(128);
    } catch (error) {
      console.warn('Unable to insert brand image: ' + error.message);
    }
  }
}

function buildHeader(sheet) {
  sheet.getRange(HEADER_ROW, 1, 1, HEADERS.length).setValues([HEADERS]);
  sheet.getRange(HEADER_ROW, 1, 1, HEADERS.length)
    .setBackground('#ff8a00')
    .setFontColor('#ffffff')
    .setFontWeight('bold')
    .setFontSize(12)
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle');
  sheet.setRowHeight(HEADER_ROW, 44);
}

function setColumnLayout(sheet) {
  const widths = [170, 220, 250, 230, 360, 150];
  widths.forEach((width, index) => sheet.setColumnWidth(index + 1, width));
  sheet.getRange('A:A').setNumberFormat('m/d/yyyy h:mm:ss');
}

function styleDataRows(sheet) {
  const lastRow = Math.max(sheet.getLastRow(), FIRST_DATA_ROW);
  const dataRows = Math.max(lastRow - HEADER_ROW, 1);
  const dataRange = sheet.getRange(FIRST_DATA_ROW, 1, dataRows, HEADERS.length);

  dataRange
    .setBackground('#ffffff')
    .setFontColor('#071f46')
    .setFontSize(10)
    .setVerticalAlignment('middle')
    .setWrap(true);

  sheet.getRange(FIRST_DATA_ROW, 3, dataRows, 1).setFontColor('#1a73e8');
  sheet.getRange(FIRST_DATA_ROW, 6, dataRows, 1).setHorizontalAlignment('center');

  for (let row = FIRST_DATA_ROW; row <= lastRow; row += 1) {
    if ((row - FIRST_DATA_ROW) % 2 === 1) {
      sheet.getRange(row, 1, 1, HEADERS.length).setBackground('#fff8f3');
    }
  }
}

function getExistingRows(sheet) {
  const lastRow = sheet.getLastRow();

  if (lastRow < 1) {
    return [];
  }

  const values = sheet.getRange(1, 1, lastRow, Math.min(sheet.getLastColumn(), HEADERS.length)).getValues();
  const hasDesignedBanner = String(values[0]?.[0] || '').toLowerCase().includes('salmon');
  const rows = [];

  values.forEach((row, index) => {
    const normalized = row.map(String).join('|').toLowerCase();
    const isHeader = normalized.includes('date submitted') && normalized.includes('project details');
    const hasData = row.some((cell) => String(cell).trim() !== '');

    if (!hasData || isHeader || (hasDesignedBanner && index < HEADER_ROW)) {
      return;
    }

    rows.push([
      row[0] || '',
      row[1] || '',
      row[2] || '',
      row[3] || '',
      row[4] || '',
      row[5] || 'New',
    ]);
  });

  return rows;
}

function json(value) {
  return ContentService
    .createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON);
}
