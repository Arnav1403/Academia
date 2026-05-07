# 🎓 Academia Website — Deployment Guide
## Deploy to Vercel + Connect Google Sheets (Free)

---

## 📁 Project Structure

```
academia-vercel/
├── public/
│   └── index.html        ← Your website
├── api/
│   └── submit.js         ← Form backend (saves to Google Sheets)
├── package.json
├── vercel.json
└── SETUP_GUIDE.md
```

---

## STEP 1 — Copy Your Logo

Place your logo file inside the `public/` folder and name it **`logo.png`**
(The website references it as `logo.png`)

---

## STEP 2 — Set Up Google Sheets

### 2a. Create the Google Sheet
1. Go to https://sheets.google.com and create a new spreadsheet
2. Name it: **Academia Enquiries**
3. Create two sheets (tabs at the bottom):
   - Sheet 1: rename to **`Enrollments`**
   - Sheet 2: rename to **`Contact`**

4. In **Enrollments** sheet, add these headers in Row 1:
   `Date/Time | Student Name | Phone | Class | Course | Status`

5. In **Contact** sheet, add headers in Row 1:
   `Date/Time | Name | Phone | Email | Message`

6. **Copy the Sheet ID** from the URL:
   `https://docs.google.com/spreadsheets/d/` **`THIS_LONG_ID_HERE`** `/edit`

---

### 2b. Create a Google Service Account

1. Go to https://console.cloud.google.com
2. Create a new project (name it "Academia Website")
3. Go to **APIs & Services → Enable APIs**
4. Search for **Google Sheets API** → Enable it
5. Go to **APIs & Services → Credentials**
6. Click **Create Credentials → Service Account**
7. Name it `academia-sheets` → Click Create
8. Click on the created service account → **Keys tab → Add Key → JSON**
9. A JSON file will download — **keep this safe!**

### 2c. Share the Sheet with the Service Account
1. Open your Google Sheet
2. Click **Share**
3. Paste the service account email (looks like `academia-sheets@your-project.iam.gserviceaccount.com`)
4. Set permission to **Editor** → Share

---

## STEP 3 — Deploy to Vercel

### 3a. Install Vercel CLI (one time)
```bash
npm install -g vercel
```

### 3b. Deploy
```bash
cd academia-vercel
vercel
```
- Follow prompts: Yes to all defaults
- It will give you a URL like `academia-xxxx.vercel.app`

### 3c. Add Environment Variables
Go to your Vercel dashboard → Your project → **Settings → Environment Variables**

Add these 3 variables:

| Variable Name | Value |
|---|---|
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | The `client_email` from your downloaded JSON file |
| `GOOGLE_PRIVATE_KEY` | The `private_key` from the JSON file (copy the entire value including `-----BEGIN...-----END-----`) |
| `GOOGLE_SHEET_ID` | The Sheet ID you copied in Step 2a |

### 3d. Redeploy after adding env vars
```bash
vercel --prod
```

---

## STEP 4 — Add Teacher Photos (whenever ready)

1. Create a folder: `public/faculty/`
2. Add photos: `rajesh.jpg`, `sunita.jpg`, `arun.jpg`, `kavita.jpg`
3. In `index.html`, find the faculty section and replace each:
```html
<!-- FROM this: -->
<div class="faculty-photo">👨‍🏫</div>

<!-- TO this: -->
<div class="faculty-photo">
  <img src="faculty/rajesh.jpg" alt="Dr. Rajesh Kumar">
</div>
```
4. Run `vercel --prod` again to update the live site

---

## STEP 5 — Update Contact Details

Open `public/index.html` and search for:
- `Rajpur Road, Dehradun` → replace with your actual address
- `+91 98765 43210` → replace with your real phone number
- `info@academia-ddn.in` → replace with your real email

---

## ✅ What Happens When Someone Fills a Form

| Action | What Happens |
|---|---|
| Student fills Enroll form | Data saved to "Enrollments" sheet with timestamp |
| Visitor fills Contact form | Data saved to "Contact" sheet with timestamp |
| Error occurs | User sees a friendly error with your phone number |

---

## 🔧 Quick Edits Reference

| What to change | Where in index.html |
|---|---|
| Hero tagline | Search `WHERE TOPPERS` |
| Stats numbers | Search `data-target` |
| Course descriptions | Search `course-card` |
| Topper names/scores | Search `topper-card` |
| Faculty details | Search `faculty-card` |
| Testimonials | Search `testi-card` |
| Address/Phone/Email | Search `Rajpur Road` |
| Footer year | Search `© 2025` |

---

## 📞 Need Help?
If you face any issue, share the error message and we can fix it together.
