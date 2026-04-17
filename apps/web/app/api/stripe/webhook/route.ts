import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  if (!sig) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  const stripe = getStripe()
  let event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    if (session.customer) {
      await supabaseAdmin
        .from('profiles')
        .update({ plan: 'pro' })
        .eq('stripe_customer_id', session.customer as string)
    }
  }

  if (event.type === 'customer.subscription.deleted') {
    const subscription = event.data.object
    if (subscription.customer) {
      await supabaseAdmin
        .from('profiles')
        .update({ plan: 'free' })
        .eq('stripe_customer_id', subscription.customer as string)
    }
  }

  return NextResponse.json({ received: true })
}
