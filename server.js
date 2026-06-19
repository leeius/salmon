import { createServer } from 'node:http';
import { createReadStream, existsSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import contactHandler from './api/contact.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const distDir = join(__dirname, 'dist');
const port = Number(process.env.PORT || 3000);

const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
};

function readBody(request) {
  return new Promise((resolve, reject) => {
    let body = '';
    request.on('data', (chunk) => {
      body += chunk;
    });
    request.on('end', () => resolve(body));
    request.on('error', reject);
  });
}

function createApiResponse(response) {
  let statusCode = 200;

  return {
    setHeader: (name, value) => response.setHeader(name, value),
    status: (code) => {
      statusCode = code;
      return {
        end: () => {
          response.statusCode = statusCode;
          response.end();
        },
        json: (body) => {
          response.statusCode = statusCode;
          response.setHeader('Content-Type', 'application/json; charset=utf-8');
          response.end(JSON.stringify(body));
        },
      };
    },
  };
}

function sendStatic(request, response) {
  const url = new URL(request.url || '/', `http://${request.headers.host || 'localhost'}`);
  const requestedPath = normalize(decodeURIComponent(url.pathname)).replace(/^(\.\.[/\\])+/, '');
  const candidate = requestedPath === '/' ? join(distDir, 'index.html') : join(distDir, requestedPath);
  const filePath = existsSync(candidate) ? candidate : join(distDir, 'index.html');

  response.setHeader('Content-Type', mimeTypes[extname(filePath)] || 'application/octet-stream');
  createReadStream(filePath).pipe(response);
}

createServer(async (request, response) => {
  if (request.url?.startsWith('/api/contact')) {
    request.body = await readBody(request);
    await contactHandler(request, createApiResponse(response));
    return;
  }

  sendStatic(request, response);
}).listen(port, () => {
  console.log(`Salmon Innovations app running on port ${port}`);
});
