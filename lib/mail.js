import nodemailer from 'nodemailer'
import { readFile } from 'node:fs/promises'
import path from 'node:path'

// Shared SMTP transport built from the existing SMTP_* env vars
// (cPanel mailbox at info@alphabitssolutions.com). Reused for any
// transactional mail we send from the site.
let cachedTransport = null
function getTransport() {
  if (cachedTransport) return cachedTransport
  const port = Number(process.env.SMTP_PORT) || 587
  cachedTransport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465, // 465 = implicit TLS; 587 = STARTTLS
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
  return cachedTransport
}

const PLAYBOOK_PDF_PATH = path.join(
  process.cwd(),
  'public',
  'assets',
  'susea-ocean-freight-automation-playbook.pdf'
)

// What's-inside bullets, mirrored from the landing page's lead-magnet section.
const PLAYBOOK_HIGHLIGHTS = [
  'Follow-up cadences that recover 32% of quiet quotes',
  'RFQ intake templates for WhatsApp &amp; email',
  'GRI / BAF surcharge alerting logic',
]

// Builds the branded, email-client-safe HTML (table layout + inline styles).
function buildPlaybookHtml() {
  const bullets = PLAYBOOK_HIGHLIGHTS.map(
    (t) => `
      <tr>
        <td valign="top" style="padding:6px 12px 6px 0;font-size:15px;line-height:22px;color:#16A34A;font-weight:700;">&#10003;</td>
        <td valign="top" style="padding:6px 0;font-size:15px;line-height:22px;color:#334155;">${t}</td>
      </tr>`
  ).join('')

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <title>Your Ocean Freight Automation Playbook</title>
</head>
<body style="margin:0;padding:0;background-color:#EEF4FD;">
  <!-- Preheader (hidden preview text) -->
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:#EEF4FD;font-size:1px;line-height:1px;">
    12 workflows our beta forwarders turned on in week one — your 24-page PDF is attached.
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#EEF4FD;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 30px rgba(14,23,38,0.10);font-family:-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">

          <!-- Accent bar -->
          <tr><td style="height:5px;line-height:5px;font-size:0;background:linear-gradient(90deg,#2F6BD8 0%,#F5A000 55%,#F5B301 100%);">&nbsp;</td></tr>

          <!-- Header / wordmark -->
          <tr>
            <td style="padding:28px 40px 8px 40px;">
              <span style="font-size:22px;font-weight:700;letter-spacing:-0.02em;color:#0E1726;">Susea</span>
              <span style="display:block;margin-top:6px;font-family:'SFMono-Regular',Consolas,monospace;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#94A3B8;">Playbook 01 · Free guide</span>
            </td>
          </tr>

          <!-- Headline + intro -->
          <tr>
            <td style="padding:12px 40px 0 40px;">
              <h1 style="margin:0 0 14px;font-size:26px;line-height:1.25;letter-spacing:-0.02em;color:#0E1726;">Your playbook is attached 📘</h1>
              <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#334155;">
                Thanks for grabbing <strong>The Ocean Freight Automation Playbook</strong> — the 12 workflows our beta forwarders turned on in week one, with the trigger logic, the edge cases, and the "don't do this" list from watching six forwarders roll them out.
              </p>
            </td>
          </tr>

          <!-- Cover card (echoes the on-page PDF mockup) -->
          <tr>
            <td style="padding:8px 40px 4px 40px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:linear-gradient(135deg,#0E1726 0%,#1a2540 100%);border-radius:12px;">
                <tr>
                  <td style="padding:28px 28px;">
                    <span style="font-family:'SFMono-Regular',Consolas,monospace;font-size:10px;letter-spacing:0.16em;text-transform:uppercase;color:rgba(255,255,255,0.5);">Susea · playbook 01</span>
                    <div style="margin-top:12px;font-size:20px;font-weight:600;line-height:1.25;letter-spacing:-0.02em;color:#ffffff;">The Ocean Freight Automation Playbook</div>
                    <div style="margin-top:10px;font-size:13px;line-height:1.5;color:rgba(255,255,255,0.6);">12 workflows for the forwarders who ship before their competitors reply.</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- What's inside -->
          <tr>
            <td style="padding:22px 40px 4px 40px;">
              <div style="font-family:'SFMono-Regular',Consolas,monospace;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#F5A000;margin-bottom:10px;">What's inside</div>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${bullets}</table>
            </td>
          </tr>

          <!-- Attachment callout -->
          <tr>
            <td style="padding:20px 40px 4px 40px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#F1F6FE;border:1px solid #D6E4FB;border-radius:10px;">
                <tr>
                  <td style="padding:14px 16px;font-size:14px;line-height:1.5;color:#334155;">
                    📎 <strong style="color:#0E1726;">The 24-page PDF is attached to this email.</strong> No sales sequence — just the playbook.
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Soft CTA -->
          <tr>
            <td align="left" style="padding:24px 40px 4px 40px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="border-radius:10px;background-color:#0E1726;">
                    <a href="https://susea.ai" target="_blank" style="display:inline-block;padding:13px 24px;font-size:14px;font-weight:600;color:#ffffff;text-decoration:none;border-radius:10px;">See Susea on your own numbers →</a>
                  </td>
                </tr>
              </table>
              <p style="margin:14px 0 0;font-size:13px;line-height:1.5;color:#64748B;">Curious how these run automatically? Book a 20-minute look with a founder — no slides, your lanes.</p>
            </td>
          </tr>

          <!-- Sign-off -->
          <tr>
            <td style="padding:24px 40px 8px 40px;">
              <p style="margin:0 0 2px;font-size:15px;line-height:1.6;color:#334155;">Ship before your competitors reply,</p>
              <p style="margin:0;font-size:15px;line-height:1.6;color:#0E1726;font-weight:600;">The Susea team</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 40px 32px 40px;border-top:1px solid #EEF2F7;">
              <p style="margin:16px 0 0;font-size:12px;line-height:1.6;color:#94A3B8;">
                You received this because you requested the playbook at <a href="https://susea.ai" style="color:#2F6BD8;text-decoration:none;">susea.ai</a>.
                One email. No sequence — nothing further to unsubscribe from.
              </p>
              <p style="margin:8px 0 0;font-size:12px;line-height:1.6;color:#CBD5E1;">© 2026 Susea · Ocean freight, automated.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

// Sends the Ocean Freight Automation Playbook PDF as an attachment.
export async function sendPlaybookEmail(toEmail) {
  const pdf = await readFile(PLAYBOOK_PDF_PATH)
  const from = `"Susea" <${process.env.EMAIL_FROM}>`

  const text = [
    'Your playbook is attached.',
    '',
    'Thanks for grabbing The Ocean Freight Automation Playbook — the 12 workflows our beta forwarders turned on in week one, with the trigger logic, edge cases, and the "don\'t do this" list.',
    '',
    "What's inside:",
    '  - Follow-up cadences that recover 32% of quiet quotes',
    '  - RFQ intake templates for WhatsApp & email',
    '  - GRI / BAF surcharge alerting logic',
    '',
    'The 24-page PDF is attached to this email. No sales sequence — just the playbook.',
    '',
    'See Susea on your own numbers: https://susea.ai',
    '',
    'Ship before your competitors reply,',
    'The Susea team · susea.ai',
  ].join('\n')

  await getTransport().sendMail({
    from,
    to: toEmail,
    subject: 'Your Ocean Freight Automation Playbook 📘',
    html: buildPlaybookHtml(),
    text,
    attachments: [
      {
        filename: 'Ocean-Freight-Automation-Playbook.pdf',
        content: pdf,
        contentType: 'application/pdf',
      },
    ],
  })
}
