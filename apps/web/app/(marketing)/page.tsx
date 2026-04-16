import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function LandingPage() {
  return (
    <>
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <h1 className="text-5xl sm:text-6xl font-heading font-bold tracking-tight mb-6">
          __APP_HEADLINE__
        </h1>
        <p className="text-xl text-muted max-w-2xl mx-auto mb-8">
          __APP_SUBHEADLINE__
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
          {/* Replace with app-specific steps */}
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-amber-500 font-bold">1</span>
            </div>
            <h3 className="font-heading font-bold mb-2">Step One</h3>
            <p className="text-sm text-muted">Description of the first step.</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-amber-500 font-bold">2</span>
            </div>
            <h3 className="font-heading font-bold mb-2">Step Two</h3>
            <p className="text-sm text-muted">Description of the second step.</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-amber-500 font-bold">3</span>
            </div>
            <h3 className="font-heading font-bold mb-2">Step Three</h3>
            <p className="text-sm text-muted">Description of the third step.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <h2 className="text-3xl font-heading font-bold mb-4">Ready to get started?</h2>
        <p className="text-muted mb-8">Start for free. Upgrade when you need more.</p>
        <Link href="/signup">
          <Button size="lg">Start Free</Button>
        </Link>
      </section>
    </>
  )
}
