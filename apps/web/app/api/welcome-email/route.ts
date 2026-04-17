import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

let _resend: Resend | null = null
function getResend() {
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY)
  return _resend
}

const FROM = 'FeatureVote <alerts@bootstrapquant.com>'

export async function POST(request: NextRequest) {
  const { email } = await request.json()
  if (!email) {
    return NextResponse.json({ error: 'Email required' }, { status: 400 })
  }

  try {
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set')
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 })
    }
    console.log('Sending welcome email to:', email, 'key prefix:', process.env.RESEND_API_KEY?.slice(0, 10))
    await getResend().emails.send({
      from: FROM,
      to: email,
      subject: 'Welcome to FeatureVote — create your first board',
      html: `
<!DOCTYPE html>
<html>
<body style="font-family:system-ui,sans-serif;background:#fafafa;margin:0;padding:0;">
<div style="max-width:560px;margin:0 auto;padding:40px 20px;">
  <h1 style="font-size:24px;font-weight:700;color:#18181b;margin-bottom:16px;">Welcome to FeatureVote!</h1>
  <p style="font-size:16px;line-height:24px;color:#3f3f46;margin-bottom:16px;">
    You're ready to start collecting feature requests from your users. Here's how it works:
  </p>
  <ol style="font-size:16px;line-height:28px;color:#3f3f46;margin-bottom:24px;padding-left:20px;">
    <li>Create a board for your product</li>
    <li>Share the link with your users</li>
    <li>Watch votes come in — the best ideas rise to the top</li>
    <li>Ship what matters, mark it done</li>
  </ol>
  <p style="font-size:16px;line-height:24px;color:#3f3f46;margin-bottom:24px;">
    <strong>No account required for your users to vote.</strong> Just share the link — zero friction.
  </p>
  <div style="text-align:center;margin:32px 0;">
    <a href="https://featurevote.bootstrapquant.com/dashboard/new"
       style="background:#4f46e5;color:#fff;padding:12px 24px;border-radius:8px;font-weight:600;font-size:14px;text-decoration:none;display:inline-block;">
      Create Your First Board →
    </a>
  </div>
  <hr style="border:none;border-top:1px solid #e4e4e7;margin:24px 0;" />
  <p style="font-size:12px;color:#a1a1aa;">FeatureVote · support@bootstrapquant.com</p>
</div>
</body>
</html>`,
    })
    console.log('Welcome email sent successfully')
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Welcome email failed:', err)
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
