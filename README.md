# SwiftBridge — waitlist landing page

Animated waitlist landing page for **SwiftBridge**, a tool that converts SwiftUI
files into Flutter files (iOS → Android app porting).

Built with Next.js (App Router) + TypeScript, Tailwind CSS, and Framer Motion.
A `.swift` file packet crosses an SVG cable-stayed bridge, passes through the
glass waitlist card, and arrives on the Android shore as a `.dart` file.
All heavy motion is disabled for users with `prefers-reduced-motion`.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Waitlist configuration (required)

Signups are forwarded **server-side** from `/api/waitlist` to a Google Apps
Script Web App, so the endpoint URL is never exposed to the browser and there
are no CORS issues.

1. Create a Google Sheet, then open **Extensions → Apps Script** and paste:

   ```js
   function doPost(e) {
     const { email } = JSON.parse(e.postData.contents);
     SpreadsheetApp.getActiveSpreadsheet()
       .getActiveSheet()
       .appendRow([email, new Date()]);
     return ContentService.createTextOutput(
       JSON.stringify({ ok: true })
     ).setMimeType(ContentService.MimeType.JSON);
   }
   ```

2. **Deploy → New deployment → Web app**, execute as *Me*, access:
   *Anyone*. Copy the deployment URL.

3. Put it in `.env.local` (already gitignored):

   ```
   SHEET_ENDPOINT="https://script.google.com/macros/s/…/exec"
   ```

## Deploying on Vercel

The project deploys with zero config — just remember to set the
**`SHEET_ENDPOINT` environment variable** in your Vercel project settings
(Settings → Environment Variables) before or after the first deploy.
