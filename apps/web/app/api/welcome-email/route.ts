import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { render } from '@react-email/render'
import WelcomeEmail from '@/lib/emails/welcome'

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
    const html = await render(WelcomeEmail())

    await getResend().emails.send({
      from: 'FeatureVote <alerts@bootstrapquant.com>',
      to: email,
      subject: 'Welcome to FeatureVote — create your first board',
      html,
    })
  } catch (err) {
    console.error('Welcome email failed:', err)
  }

  return NextResponse.json({ ok: true })
}
