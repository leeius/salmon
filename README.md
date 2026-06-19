# Salmon Innovations

Landing page and contact site for Salmon Innovations Inc. built with React, TypeScript, Vite, and Vercel-compatible serverless contact handling.

Repository: https://github.com/salmon-innovations/salmon-innovations-dash-web-app.git

## Features

- Responsive landing page for desktop, laptop, tablet, and mobile
- Sections for hero, company overview, services, work, careers, contact, and footer
- Mobile navigation drawer
- Contact form endpoint at `/api/contact`
- Google Sheets submission support through Google Apps Script
- Docker runtime that serves the built app and keeps `/api/contact` available

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router
- Framer Motion
- React Icons
- Axios

## Local Development

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Environment Variables

Copy `.env.example` to `.env.local` for local Docker/server usage, or add these in Vercel Project Settings.

Recommended Google Apps Script setup:

```env
GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/your-deployment-id/exec
CONTACT_FORM_SECRET=replace-with-a-long-random-secret
GOOGLE_SHEET_NAME=Contact Submissions
```

Optional fallback if service account keys are allowed:

```env
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=your_google_sheet_id
```

## Docker

Build the image:

```bash
docker build -t salmon-innovations .
```

Run the container:

```bash
docker run --env-file .env.local -p 3000:3000 salmon-innovations
```

Open:

```txt
http://localhost:3000
```

## Deployment

### Vercel

1. Import the repository in Vercel.
2. Add the environment variables from `.env.example`.
3. Deploy from the `main` branch.

### Docker Host

1. Build the Docker image.
2. Provide the same environment variables.
3. Expose port `3000`.

## Contact Form Notes

The contact form posts to `/api/contact`. In Vercel, this runs as a serverless function. In Docker, `server.js` serves the React app and forwards `/api/contact` to the same handler.
