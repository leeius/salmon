# Salmon Innovations

Responsive landing page and contact site for Salmon Innovations Inc. built with React, TypeScript, and Vite.

Repository: https://github.com/salmon-innovations/salmon-innovations-dash-web-app.git

## Features

- Responsive landing page for desktop, laptop, tablet, and mobile
- Sections for hero, company overview, services, work, careers, contact, and footer
- Mobile navigation drawer
- Configurable contact form endpoint for static hosting
- Google Sheets submission support through Apps Script or a backend API
- Docker runtime for environments that need a Node server
- AWS S3 deployment script

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router
- Framer Motion
- React Icons

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

Copy `.env.example` to `.env.local` for local development.

```env
VITE_CONTACT_ENDPOINT=/api/contact
GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/your-deployment-id/exec
CONTACT_FORM_SECRET=replace-with-a-long-random-secret
GOOGLE_SHEET_NAME=Salmon Innovations Messages

AWS_S3_BUCKET=your-s3-bucket-name
AWS_REGION=ap-southeast-1
AWS_CLOUDFRONT_DISTRIBUTION_ID=
```

For AWS S3 static hosting, S3 cannot run `/api/contact`. Set `VITE_CONTACT_ENDPOINT` to an external endpoint, such as:

- AWS API Gateway + Lambda
- A hosted Node API
- A Google Apps Script web app if you accept a direct browser-to-script flow

## AWS S3 Deployment

Prerequisites:

- AWS CLI installed
- AWS credentials configured locally
- An S3 bucket configured for static website hosting, or an S3 bucket behind CloudFront

Deploy:

```bash
npm run deploy:s3
```

The deploy script:

- Runs `npm run build`
- Syncs `dist` to `s3://$AWS_S3_BUCKET`
- Uploads `index.html` with `no-cache`
- Optionally invalidates CloudFront when `AWS_CLOUDFRONT_DISTRIBUTION_ID` is set

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

## Contact Form

The frontend posts to `VITE_CONTACT_ENDPOINT`.

Default local/Docker endpoint:

```env
VITE_CONTACT_ENDPOINT=/api/contact
```

For S3, use an external endpoint because S3 only serves static files.
