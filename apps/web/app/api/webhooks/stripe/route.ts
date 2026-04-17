import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import { createServiceClient } from '@/lib/supabase/server'
import { Resend } from 'resend'
import { render } from '@react-email/render'
import ProUpgradeEmail from '@/lib/emails/pro-upgrade'
import Stripe from 'stripe'

function getResend() {
  return new Resend(process.env.RESEND_API_KEY)
}

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = getStripe().webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Invalid signature'
    return NextResponse.json({ error: message }, { status: 400 })
  }

  const supabase = await createServiceClient()

  switch (event.type) {
    case 'customer.subscription.created':
    case 'customer.subscription.updated': {
      const subscription = event.data.object as Stripe.Subscription
      const customerId = subscription.customer as string
      const status = subscription.status
      const plan = status === 'active' ? 'pro' : 'free'

      await supabase
        .from('profiles')
        .update({ plan, updated_at: new Date().toISOString() })
        .eq('stripe_customer_id', customerId)

      if (plan === 'pro') {
        const { data: profile } = await supabase
          .from('profiles')
          .select('email, pro_email_sent')
          .eq('stripe_customer_id', customerId)
          .single()

        if (profile?.email && !profile.pro_email_sent) {
          await supabase
            .from('profiles')
            .update({ pro_email_sent: true })
            .eq('stripe_customer_id', customerId)

          try {
            const html = await render(ProUpgradeEmail())
            await getResend().emails.send({
              from: 'FeatureVote <alerts@bootstrapquant.com>',
              to: profile.email,
              subject: "You're now on FeatureVote Pro 🎉",
              html,
            })
          } catch (e) {
            console.error('Pro upgrade email failed:', e)
          }
        }
      }
      break
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription
      const customerId = subscription.customer as string

      await supabase
        .from('profiles')
        .update({ plan: 'free', updated_at: new Date().toISOString() })
        .eq('stripe_customer_id', customerId)
      break
    }

    case 'invoice.paid': {
      // Successful payment — could trigger email, update analytics, etc.
      break
    }

    case 'invoice.payment_failed': {
      // Failed payment — could notify user
      const invoice = event.data.object as Stripe.Invoice
      console.error(`Payment failed for customer ${invoice.customer}`)
      break
    }
  }

  return NextResponse.json({ received: true })
}
