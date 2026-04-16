import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check } from 'lucide-react'

export default function PricingPage() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-24">
      <h1 className="text-4xl font-heading font-bold text-center mb-4">Simple pricing</h1>
      <p className="text-center text-muted mb-12">Start free. Upgrade when you need more.</p>

      <div className="grid gap-8 sm:grid-cols-2 max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Free</CardTitle>
            <p className="text-3xl font-heading font-bold">$0<span className="text-base font-normal text-muted">/mo</span></p>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm"><Check className="h-4 w-4 text-muted" />Basic features</li>
              <li className="flex items-center gap-2 text-sm"><Check className="h-4 w-4 text-muted" />Up to 100 items</li>
              <li className="flex items-center gap-2 text-sm"><Check className="h-4 w-4 text-muted" />Email support</li>
            </ul>
            <Link href="/signup"><Button variant="outline" className="w-full">Get Started</Button></Link>
          </CardContent>
        </Card>

        <Card className="border-amber-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Pro <Badge>Popular</Badge>
            </CardTitle>
            <p className="text-3xl font-heading font-bold">$__PRO_PRICE__<span className="text-base font-normal text-muted">/mo</span></p>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm"><Check className="h-4 w-4 text-amber-500" />Everything in Free</li>
              <li className="flex items-center gap-2 text-sm"><Check className="h-4 w-4 text-amber-500" />Unlimited items</li>
              <li className="flex items-center gap-2 text-sm"><Check className="h-4 w-4 text-amber-500" />Priority support</li>
              <li className="flex items-center gap-2 text-sm"><Check className="h-4 w-4 text-amber-500" />Advanced analytics</li>
              <li className="flex items-center gap-2 text-sm"><Check className="h-4 w-4 text-amber-500" />API access</li>
            </ul>
            <Link href="/signup"><Button className="w-full">Start Free Trial</Button></Link>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
