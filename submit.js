const { google } = require("googleapis");

// This API route receives form data and appends it to your Google Sheet
// Required environment variables in Vercel:
//   GOOGLE_SERVICE_ACCOUNT_EMAIL  — from your service account JSON
//   GOOGLE_PRIVATE_KEY            — from your service account JSON (with \n replaced)
//   GOOGLE_SHEET_ID               — the ID from your Google Sheet URL

export default async function handler(req, res) {
  // Allow CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { type, name, phone, studentClass, course, email, message } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ error: "Name and phone are required." });
  }

  try {
    // Authenticate with Google
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    const sheetId = process.env.GOOGLE_SHEET_ID;

    const now = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "short",
      timeStyle: "short",
    });

    if (type === "enrollment") {
      // Append to "Enrollments" sheet
      await sheets.spreadsheets.values.append({
        spreadsheetId: sheetId,
        range: "Enrollments!A:F",
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [[now, name, phone, studentClass || "-", course || "-", "New"]],
        },
      });
    } else if (type === "contact") {
      // Append to "Contact" sheet
      await sheets.spreadsheets.values.append({
        spreadsheetId: sheetId,
        range: "Contact!A:E",
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [[now, name, phone, email || "-", message || "-"]],
        },
      });
    }

    return res.status(200).json({ success: true, message: "Submitted successfully!" });
  } catch (err) {
    console.error("Google Sheets error:", err.message);
    return res.status(500).json({ error: "Failed to save. Please try again." });
  }
}
