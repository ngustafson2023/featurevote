import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

let _r: Resend | null = null
const r = () => { if (!_r) _r = new Resend(process.env.RESEND_API_KEY); return _r! }

const HTML = `<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="dark">
<meta name="supported-color-schemes" content="dark">
<style>
:root { color-scheme: dark; }
body, .outer { background-color: #09090b !important; }
.card { background-color: #18181b !important; }
</style>
</head>
<body style="margin:0;padding:0;background:#09090b;" bgcolor="#09090b">
<table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#09090b" style="background:#09090b;" class="outer">
<tr><td align="center" style="padding:40px 16px;">
<table width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;width:100%;">

<tr><td style="padding-bottom:20px;">
  <span style="font-size:20px;font-weight:700;color:#ffffff;font-family:-apple-system,sans-serif;">FeatureVote<span style="color:#4f46e5;">&thinsp;·</span></span>
</td></tr>

<tr>
  <td bgcolor="#18181b" style="background:#18181b;border-radius:12px;padding:36px;" class="card">
    
  <h1 style="font-size:26px;font-weight:700;color:#ffffff;margin:0 0 8px;font-family:-apple-system,sans-serif;letter-spacing:-0.5px;">Welcome to FeatureVote.</h1>
  <p style="font-size:16px;color:#a1a1aa;margin:0 0 28px;line-height:1.6;font-family:-apple-system,sans-serif;">Stop guessing what to build next. Let your users tell you.</p>
  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    
  <tr>
    <td width="36" valign="top" style="padding-bottom:20px;">
      <table cellpadding="0" cellspacing="0" border="0"><tr><td width="36" height="36" align="center" valign="middle" bgcolor="#4f46e5" style="background:#4f46e5;width:36px;height:36px;border-radius:18px;font-size:14px;font-weight:700;color:#ffffff;font-family:-apple-system,sans-serif;text-align:center;">1</td></tr></table>
    </td>
    <td style="padding-left:16px;padding-bottom:20px;vertical-align:top;">
      <p style="font-size:15px;font-weight:600;color:#ffffff;margin:0 0 4px;font-family:-apple-system,sans-serif;">Create a board</p>
      <p style="font-size:14px;color:#71717a;margin:0;line-height:1.5;font-family:-apple-system,sans-serif;">Name it after your product. Takes 30 seconds.</p>
    </td>
  </tr>
  <tr>
    <td width="36" valign="top" style="padding-bottom:20px;">
      <table cellpadding="0" cellspacing="0" border="0"><tr><td width="36" height="36" align="center" valign="middle" bgcolor="#4f46e5" style="background:#4f46e5;width:36px;height:36px;border-radius:18px;font-size:14px;font-weight:700;color:#ffffff;font-family:-apple-system,sans-serif;text-align:center;">2</td></tr></table>
    </td>
    <td style="padding-left:16px;padding-bottom:20px;vertical-align:top;">
      <p style="font-size:15px;font-weight:600;color:#ffffff;margin:0 0 4px;font-family:-apple-system,sans-serif;">Share the link</p>
      <p style="font-size:14px;color:#71717a;margin:0;line-height:1.5;font-family:-apple-system,sans-serif;">Drop it in your app, docs, or Discord. Users vote — no account required.</p>
    </td>
  </tr>
  <tr>
    <td width="36" valign="top" style="padding-bottom:20px;">
      <table cellpadding="0" cellspacing="0" border="0"><tr><td width="36" height="36" align="center" valign="middle" bgcolor="#4f46e5" style="background:#4f46e5;width:36px;height:36px;border-radius:18px;font-size:14px;font-weight:700;color:#ffffff;font-family:-apple-system,sans-serif;text-align:center;">3</td></tr></table>
    </td>
    <td style="padding-left:16px;padding-bottom:20px;vertical-align:top;">
      <p style="font-size:15px;font-weight:600;color:#ffffff;margin:0 0 4px;font-family:-apple-system,sans-serif;">See what rises to the top</p>
      <p style="font-size:14px;color:#71717a;margin:0;line-height:1.5;font-family:-apple-system,sans-serif;">Best ideas surface automatically. No more spreadsheets.</p>
    </td>
  </tr>
  <tr>
    <td width="36" valign="top" style="padding-bottom:20px;">
      <table cellpadding="0" cellspacing="0" border="0"><tr><td width="36" height="36" align="center" valign="middle" bgcolor="#4f46e5" style="background:#4f46e5;width:36px;height:36px;border-radius:18px;font-size:14px;font-weight:700;color:#ffffff;font-family:-apple-system,sans-serif;text-align:center;">4</td></tr></table>
    </td>
    <td style="padding-left:16px;padding-bottom:20px;vertical-align:top;">
      <p style="font-size:15px;font-weight:600;color:#ffffff;margin:0 0 4px;font-family:-apple-system,sans-serif;">Ship it and mark it done</p>
      <p style="font-size:14px;color:#71717a;margin:0;line-height:1.5;font-family:-apple-system,sans-serif;">Voters get notified automatically when their request ships.</p>
    </td>
  </tr>
  </table>
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
    <tr><td bgcolor="#111111" style="background:#111111;border-radius:8px;padding:14px 16px;">
      <p style="font-size:13px;color:#71717a;margin:0;font-family:-apple-system,sans-serif;">💡 <strong style="color:#a1a1aa;">No friction for voters:</strong> Your users don't need an account. Just a link. Gets you 3–5× more responses.</p>
    </td></tr>
  </table>
  <table cellpadding="0" cellspacing="0" border="0"><tr><td bgcolor="#4f46e5" style="background:#4f46e5;border-radius:8px;"><a href="https://featurevote.bootstrapquant.com/dashboard/new" style="display:block;padding:13px 28px;font-size:14px;font-weight:700;color:#ffffff;text-decoration:none;font-family:-apple-system,sans-serif;">Create Your First Board →</a></td></tr></table>

  </td>
</tr>

<tr><td style="padding-top:20px;text-align:center;">
  <p style="font-size:12px;color:#52525b;margin:0;font-family:-apple-system,sans-serif;">FeatureVote · <a href="mailto:support@bootstrapquant.com" style="color:#52525b;text-decoration:none;">support@bootstrapquant.com</a></p>
</td></tr>

</table>
</td></tr>
</table>
</body></html>`

export async function POST(request: NextRequest) {
  const { email } = await request.json()
  if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 })
  try {
    await r().emails.send({ from: 'FeatureVote <alerts@bootstrapquant.com>', to: email, subject: 'Welcome to FeatureVote — create your first board', html: HTML })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Welcome email failed:', err)
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
