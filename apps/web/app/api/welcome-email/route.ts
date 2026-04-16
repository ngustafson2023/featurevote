import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

let _resend: Resend | null = null
function getResend() {
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY)
  return _resend
}

export async function POST(request: NextRequest) {
  const { email } = await request.json()

  if (!email) {
    return NextResponse.json({ error: 'Email required' }, { status: 400 })
  }

  try {
    await getResend().emails.send({
      from: 'FeatureVote <onboarding@resend.dev>',
      to: email,
      subject: 'Welcome to FeatureVote — start collecting feature requests',
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 20px;">
          <h1 style="font-size: 24px; font-weight: 700; color: #0f172a; margin-bottom: 16px;">Welcome to FeatureVote!</h1>
          <p style="font-size: 16px; line-height: 24px; color: #475569; margin-bottom: 8px;">
            You're 30 seconds away from knowing exactly what your users want.
          </p>
          <p style="font-size: 16px; line-height: 24px; color: #475569; margin-bottom: 24px;">
            Here's how to get started:
          </p>
          <ol style="font-size: 16px; line-height: 28px; color: #475569; margin-bottom: 24px; padding-left: 20px;">
            <li>Create a feature board for your product</li>
            <li>Share the public link with your users</li>
            <li>Watch votes come in — the best ideas rise to the top</li>
            <li>Update statuses as you ship features</li>
          </ol>
          <div style="text-align: center; margin: 32px 0;">
            <a href="https://featurevote.bootstrapquant.com/dashboard/new"
               style="background-color: #6366f1; color: white; padding: 12px 24px; border-radius: 8px; font-weight: 600; font-size: 14px; text-decoration: none; display: inline-block;">
              Create Your First Board
            </a>
          </div>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
          <p style="font-size: 12px; color: #94a3b8;">
            FeatureVote — Feature voting your users will actually use.<br/>
            support@bootstrapquant.com
          </p>
        </div>
      `,
    })
  } catch (err) {
    console.error('Welcome email failed:', err)
  }

  return NextResponse.json({ ok: true })
}
