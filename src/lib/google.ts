import { google } from "googleapis";
import nodemailer from "nodemailer";

// export async function fetchSheetData() {
//   const auth = new google.auth.JWT({
//     email: process.env.GOOGLE_CLIENT_EMAIL,
//     key: (process.env.GOOGLE_PRIVATE_KEY || "").replace(/\\n/g, "\n").replace(/^"|"$/g, ""),
//     scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
//   });
//   const sheets = google.sheets({ version: "v4", auth });
//   const res = await sheets.spreadsheets.values.get({
//     spreadsheetId: process.env.GOOGLE_SHEETS_ID!,
//     range: "Sheet1!A2:N",
//   });
//   return res.data.values || [];
// }

export async function fetchSheetData() {
  const sheets = google.sheets({
    version: "v4",
    auth: process.env.GOOGLE_API_KEY, // Public API key
  });

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEETS_ID!, // Must be a public sheet
    range: "Sheet1!A2:N",
  });

  return res.data.values || [];
}

export async function sendEmail({
  to,
  subject,
  text,
}: {
  to: string;
  subject: string;
  text: string;
}) {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      type: "OAuth2",
      user: process.env.GMAIL_SENDER_EMAIL,
      clientId: process.env.GMAIL_CLIENT_ID,
      clientSecret: process.env.GMAIL_CLIENT_SECRET,
      refreshToken: process.env.GMAIL_REFRESH_TOKEN,
    },
  });

  await transporter.sendMail({
    from: `"Aaron" <info@whitebarninvestments.com>`,
    to,
    subject,
    text,
  });
}
