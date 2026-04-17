import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

let _resend: Resend | null = null
function getResend() {
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY)
  return _resend
}

const WELCOME_HTML = `<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<style>body{margin:0;padding:0;background:#09090b;}@media only screen and (max-width:600px){.card{padding:28px 20px !important;}}</style>
</head>
<body style="margin:0;padding:0;background:#09090b;" bgcolor="#09090b">
<table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#09090b" style="background:#09090b;">
<tr><td align="center" style="padding:40px 16px;">
<table width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;width:100%;">

<!-- Logo -->
<tr><td style="padding-bottom:24px;">
  <span style="font-size:22px;font-weight:700;color:#ffffff;letter-spacing:-0.5px;">FeatureVote&thinsp;<span style="color:#4f46e5">·</span></span>
</td></tr>

<!-- Card -->
<tr><td bgcolor="#18181b" style="background:#18181b;border:1px solid #27272a;border-radius:12px;padding:40px;" class="card">
  
  <h1 style="font-size:26px;font-weight:700;color:#ffffff;margin:0 0 8px;letter-spacing:-0.5px;">Welcome to FeatureVote.</h1>
  <p style="font-size:16px;color:#a1a1aa;margin:0 0 28px;line-height:1.6;">Stop guessing what to build next. Let your users tell you.</p>
  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    
<tr><td style="padding-bottom:20px;">
  <table cellpadding="0" cellspacing="0" border="0"><tr>
    <td style="vertical-align:top;width:40px;">
      <div style="width:36px;height:36px;min-width:36px;min-height:36px;background:#4f46e5;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;color:#ffffff;text-align:center;line-height:36px;">1</div>
    </td>
    <td style="padding-left:16px;vertical-align:top;">
      <p style="font-size:15px;font-weight:600;color:#ffffff;margin:0 0 4px;">Create a board</p>
      <p style="font-size:14px;color:#71717a;margin:0;line-height:1.5;">Name it after your product. Takes 30 seconds.</p>
    </td>
  </tr></table>
</td></tr>
<tr><td style="padding-bottom:20px;">
  <table cellpadding="0" cellspacing="0" border="0"><tr>
    <td style="vertical-align:top;width:40px;">
      <div style="width:36px;height:36px;min-width:36px;min-height:36px;background:#4f46e5;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;color:#ffffff;text-align:center;line-height:36px;">2</div>
    </td>
    <td style="padding-left:16px;vertical-align:top;">
      <p style="font-size:15px;font-weight:600;color:#ffffff;margin:0 0 4px;">Share the link</p>
      <p style="font-size:14px;color:#71717a;margin:0;line-height:1.5;">Drop it in your app, docs, or Discord. Users vote — no account required.</p>
    </td>
  </tr></table>
</td></tr>
<tr><td style="padding-bottom:20px;">
  <table cellpadding="0" cellspacing="0" border="0"><tr>
    <td style="vertical-align:top;width:40px;">
      <div style="width:36px;height:36px;min-width:36px;min-height:36px;background:#4f46e5;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;color:#ffffff;text-align:center;line-height:36px;">3</div>
    </td>
    <td style="padding-left:16px;vertical-align:top;">
      <p style="font-size:15px;font-weight:600;color:#ffffff;margin:0 0 4px;">See what rises to the top</p>
      <p style="font-size:14px;color:#71717a;margin:0;line-height:1.5;">Best ideas surface automatically. No more spreadsheets.</p>
    </td>
  </tr></table>
</td></tr>
<tr><td style="padding-bottom:20px;">
  <table cellpadding="0" cellspacing="0" border="0"><tr>
    <td style="vertical-align:top;width:40px;">
      <div style="width:36px;height:36px;min-width:36px;min-height:36px;background:#4f46e5;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;color:#ffffff;text-align:center;line-height:36px;">4</div>
    </td>
    <td style="padding-left:16px;vertical-align:top;">
      <p style="font-size:15px;font-weight:600;color:#ffffff;margin:0 0 4px;">Ship it and mark it done</p>
      <p style="font-size:14px;color:#71717a;margin:0;line-height:1.5;">Voters get notified automatically when their request ships.</p>
    </td>
  </tr></table>
</td></tr>
  </table>
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
    <tr><td bgcolor="#0c0c0c" style="background:#0c0c0c;border:1px solid #27272a;border-radius:8px;padding:14px 16px;">
      <p style="font-size:13px;color:#71717a;margin:0;">💡 <strong style="color:#a1a1aa;">No friction for voters:</strong> Your users don't need an account to vote. Just a link. This gets you 3–5× more responses.</p>
    </td></tr>
  </table>
  <a href="https://featurevote.bootstrapquant.com/dashboard/new" style="display:inline-block;background:#4f46e5;color:#ffffff;padding:13px 28px;border-radius:8px;font-weight:700;font-size:14px;text-decoration:none;">Create Your First Board →</a>

</td></tr>

<!-- Footer -->
<tr><td style="padding-top:20px;text-align:center;">
  <p style="font-size:12px;color:#52525b;margin:0;">FeatureVote · <a href="mailto:support@bootstrapquant.com" style="color:#52525b;text-decoration:none;">support@bootstrapquant.com</a></p>
</td></tr>

</table>
</td></tr>
</table>
</body></html>`

export async function POST(request: NextRequest) {
  const { email } = await request.json()
  if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 })
  try {
    await getResend().emails.send({
      from: 'FeatureVote <alerts@bootstrapquant.com>',
      to: email,
      subject: 'Welcome to FeatureVote — create your first board',
      html: WELCOME_HTML,
    })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Welcome email failed:', err)
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
