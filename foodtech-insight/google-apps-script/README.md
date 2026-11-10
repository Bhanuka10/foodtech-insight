# Supporter form → Google Sheets

The "Become a Supporter" form on the website posts each submission to a Google
Apps Script web app, which appends a row to the Google Sheet:

https://docs.google.com/spreadsheets/d/1ujNkAXAt5nkv6Q6wMsGlE0CmsATdHVj4jgZP7tbSxCg/edit

Each row stores: Submission ID, Submitted At, Support Category, Full Name,
Email, Contact Number, Country, Organization, Position, Website / Social Media,
Support Preferences, Purpose / Motivation, Community Involvement.

## One-time setup (about 5 minutes)

1. Open the sheet above with the Google account that owns it.
2. Go to **Extensions → Apps Script**. Delete any code in the editor.
3. Paste the full contents of `Code.gs` from this folder and press **Save**.
4. In the function dropdown pick `setup` and press **Run**. Approve the
   permission prompts (Advanced → Go to project). This creates the
   `Supporters` tab with bold, frozen headers.
5. Press **Deploy → New deployment**.
   - Type: **Web app**
   - Description: `supporter form`
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Press **Deploy** and copy the **Web app URL** (ends in `/exec`).
6. Open `src/data/support.js` in the website project and paste the URL into
   the `endpoint` field:

   ```js
   endpoint: 'https://script.google.com/macros/s/XXXXXXXX/exec',
   ```

   (Alternatively set `VITE_SUPPORT_ENDPOINT` in `.env.local` or in your
   hosting provider's environment settings.)
7. Commit and push, then submit the form once on the live site to confirm a
   new row appears in the `Supporters` tab of the sheet.

## Updating the script later

After editing `Code.gs`, press **Deploy → Manage deployments → Edit (pencil)
→ Version: New version → Deploy**. The URL stays the same.

## Behaviour

- Submissions are validated on the server (name, valid email, category).
- A retry of the same Submission ID is ignored, so network hiccups never
  create duplicate rows.
- The same email + category within 24 hours is rejected as a duplicate and
  the website shows a friendly message.
- Values starting with `=`, `+`, `-` or `@` are prefixed with `'` so they
  cannot run as spreadsheet formulas.
- You can test the deployment in a browser: opening the `/exec` URL shows
  `{"status":"ok", ...}`.
