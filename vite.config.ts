import dotenv from 'dotenv';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

dotenv.config({ path: '.env.local', quiet: true });
dotenv.config({ quiet: true });

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'local-api-contact',
      configureServer(server) {
        server.middlewares.use('/api/contact', async (request, response) => {
          const { default: contactHandler } = await import('./api/contact.js');
          let body = '';

          request.on('data', (chunk) => {
            body += chunk;
          });

          request.on('end', async () => {
            const apiRequest = Object.assign(request, { body });
            let statusCode = 200;
            const apiResponse = {
              setHeader: (name: string, value: string) => response.setHeader(name, value),
              status: (code: number) => {
                statusCode = code;
                return {
                  end: () => {
                    response.statusCode = statusCode;
                    response.end();
                  },
                  json: (payload: unknown) => {
                    response.statusCode = statusCode;
                    response.setHeader('Content-Type', 'application/json; charset=utf-8');
                    response.end(JSON.stringify(payload));
                  },
                };
              },
            };

            await contactHandler(apiRequest, apiResponse);
          });
        });
      },
    },
  ],
});
