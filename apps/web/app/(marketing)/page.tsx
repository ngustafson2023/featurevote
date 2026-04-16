import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function LandingPage() {
  return (
    <>
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <h1 className="text-5xl sm:text-6xl font-heading font-bold tracking-tight mb-6">
          Stop guessing what to build next
        </h1>
        <p className="text-xl text-muted max-w-2xl mx-auto mb-8">
          Let your users vote on features. See what matters most. Ship what your customers actually want. The simple, flat-priced alternative to Canny.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/signup">
            <Button size="lg">Get Started Free</Button>
          </Link>
          <Link href="/pricing">
            <Button variant="outline" size="lg">See Pricing</Button>
          </Link>
        </div>
      </section>

      {/* How it Works */}
      <section className="max-w-6xl mx-auto px-6 py-16 border-t border-border">
        <h2 className="text-3xl font-heading font-bold text-center mb-12">How it works</h2>
        <div className="grid gap-8 sm:grid-cols-3">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-primary font-bold">1</span>
            </div>
            <h3 className="font-heading font-bold mb-2">Create a Board</h3>
            <p className="text-sm text-muted">Set up a public feature board for your product in 30 seconds. Share the link with your users.</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-primary font-bold">2</span>
            </div>
            <h3 className="font-heading font-bold mb-2">Collect Votes</h3>
            <p className="text-sm text-muted">Users suggest features and upvote what matters. The best ideas rise to the top automatically.</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-primary font-bold">3</span>
            </div>
            <h3 className="font-heading font-bold mb-2">Ship & Update</h3>
            <p className="text-sm text-muted">Mark features as planned, in progress, or done. Keep your users in the loop with a changelog.</p>
          </div>
        </div>
      </section>

      {/* Why not Canny */}
      <section className="max-w-4xl mx-auto px-6 py-16 border-t border-border">
        <h2 className="text-3xl font-heading font-bold text-center mb-8">Why not Canny?</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <CardContent className="pt-6">
              <p className="font-heading font-bold text-red-500 mb-2">Canny</p>
              <ul className="space-y-2 text-sm text-muted">
                <li>Per-user pricing that punishes growth</li>
                <li>Starts at $79/mo for basic features</li>
                <li>Complex setup with tons of configuration</li>
                <li>Enterprise features you don&apos;t need</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="border-primary">
            <CardContent className="pt-6">
              <p className="font-heading font-bold text-primary mb-2">FeatureVote</p>
              <ul className="space-y-2 text-sm text-muted">
                <li>Flat pricing — unlimited users, always</li>
                <li>$19/mo for everything</li>
                <li>Set up in 30 seconds, not 30 minutes</li>
                <li>Just what you need, nothing you don&apos;t</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <h2 className="text-3xl font-heading font-bold mb-4">Ready to hear from your users?</h2>
        <p className="text-muted mb-8">Free plan includes 1 board and unlimited voters. No credit card required.</p>
        <Link href="/signup">
          <Button size="lg">Start Free</Button>
        </Link>
      </section>
    </>
  )
}
