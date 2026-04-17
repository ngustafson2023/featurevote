import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

let _resend: Resend | null = null
function getResend() {
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY)
  return _resend
}

const WELCOME_HTML = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#09090b;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#09090b;">
<tr><td align="center" style="padding:40px 20px;">
<table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

<!-- Logo bar -->
<tr><td style="padding-bottom:32px;">
  <span style="font-size:20px;font-weight:700;color:#ffffff;letter-spacing:-0.5px;">●&nbsp;<span style="color:#4f46e5">·</span></span>
  <span style="font-size:20px;font-weight:700;color:#ffffff;">FeatureVote</span>
</td></tr>

<!-- Card -->
<tr><td style="background:#18181b;border:1px solid #27272a;border-radius:12px;padding:40px;">
  
    <h1 style="font-size:26px;font-weight:700;color:#ffffff;margin:0 0 8px;">Welcome to FeatureVote.</h1>
    <p style="font-size:16px;color:#a1a1aa;margin:0 0 28px;line-height:1.6;">Stop guessing what to build next. Let your users tell you.</p>

    <table width="100%" cellpadding="0" cellspacing="0">
      <tr><td style="padding-bottom:16px;">
        <table cellpadding="0" cellspacing="0"><tr>
          <td style="width:36px;height:36px;background:#4f46e5;border-radius:50%;text-align:center;vertical-align:middle;">
            <span style="font-size:14px;font-weight:700;color:#ffffff;">1</span>
          </td>
          <td style="padding-left:16px;">
            <p style="font-size:15px;font-weight:600;color:#ffffff;margin:0;">Create a board</p>
            <p style="font-size:14px;color:#71717a;margin:4px 0 0;">Name it after your product. Takes 30 seconds.</p>
          </td>
        </tr></table>
      </td></tr>
      <tr><td style="padding-bottom:16px;">
        <table cellpadding="0" cellspacing="0"><tr>
          <td style="width:36px;height:36px;background:#4f46e5;border-radius:50%;text-align:center;vertical-align:middle;">
            <span style="font-size:14px;font-weight:700;color:#ffffff;">2</span>
          </td>
          <td style="padding-left:16px;">
            <p style="font-size:15px;font-weight:600;color:#ffffff;margin:0;">Share the link</p>
            <p style="font-size:14px;color:#71717a;margin:4px 0 0;">Drop it in your app, docs, or Discord. Users vote — no account required.</p>
          </td>
        </tr></table>
      </td></tr>
      <tr><td style="padding-bottom:16px;">
        <table cellpadding="0" cellspacing="0"><tr>
          <td style="width:36px;height:36px;background:#4f46e5;border-radius:50%;text-align:center;vertical-align:middle;">
            <span style="font-size:14px;font-weight:700;color:#ffffff;">3</span>
          </td>
          <td style="padding-left:16px;">
            <p style="font-size:15px;font-weight:600;color:#ffffff;margin:0;">See what rises to the top</p>
            <p style="font-size:14px;color:#71717a;margin:4px 0 0;">Best ideas surface automatically. No more spreadsheets.</p>
          </td>
        </tr></table>
      </td></tr>
      <tr><td style="padding-bottom:28px;">
        <table cellpadding="0" cellspacing="0"><tr>
          <td style="width:36px;height:36px;background:#4f46e5;border-radius:50%;text-align:center;vertical-align:middle;">
            <span style="font-size:14px;font-weight:700;color:#ffffff;">4</span>
          </td>
          <td style="padding-left:16px;">
            <p style="font-size:15px;font-weight:600;color:#ffffff;margin:0;">Ship it and mark it done</p>
            <p style="font-size:14px;color:#71717a;margin:4px 0 0;">Voters get notified automatically when their request ships.</p>
          </td>
        </tr></table>
      </td></tr>
    </table>

    <div style="background:#0c0c0c;border:1px solid #27272a;border-radius:8px;padding:16px;margin-bottom:28px;">
      <p style="font-size:13px;color:#71717a;margin:0;">💡 <strong style="color:#a1a1aa;">No friction for voters:</strong> Your users don't need an account to vote. Just a link. This gets you 3–5× more responses.</p>
    </div>

    <a href="https://featurevote.bootstrapquant.com/dashboard/new" style="display:inline-block;background:#4f46e5;color:#ffffff;padding:13px 28px;border-radius:8px;font-weight:700;font-size:14px;text-decoration:none;letter-spacing:0.1px;">Create Your First Board →</a>
  
</td></tr>

<!-- Footer -->
<tr><td style="padding-top:24px;text-align:center;">
  <p style="font-size:12px;color:#52525b;margin:0;">FeatureVote · <a href="mailto:support@bootstrapquant.com" style="color:#52525b;">support@bootstrapquant.com</a></p>
</td></tr>

</table>
</td></tr>
</table>
</body>
</html>`

export async function POST(request: NextRequest) {
  const { email } = await request.json()
  if (!email) {
    return NextResponse.json({ error: 'Email required' }, { status: 400 })
  }
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
