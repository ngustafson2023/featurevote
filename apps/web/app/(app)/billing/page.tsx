'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check } from 'lucide-react'

const FREE_FEATURES = [
  'Basic features',
  'Up to 100 items',
  'Email support',
]

const PRO_FEATURES = [
  'Everything in Free',
  'Unlimited items',
  'Priority support',
  'Advanced analytics',
  'API access',
]

export default function BillingPage() {
  const [loading, setLoading] = useState(false)

  async function handlePortal() {
    setLoading(true)
    const res = await fetch('/api/stripe/portal', { method: 'POST' })
    if (res.ok) {
      const { url } = await res.json()
      window.location.href = url
    }
    setLoading(false)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-heading font-bold">Billing</h1>

      <div className="grid gap-6 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Free
              <Badge variant="secondary">Current</Badge>
            </CardTitle>
            <p className="text-2xl font-heading font-bold">$0<span className="text-base font-normal text-muted">/mo</span></p>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {FREE_FEATURES.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-muted" />
                  {feature}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-amber-500">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Pro
              <Badge>Recommended</Badge>
            </CardTitle>
            <p className="text-2xl font-heading font-bold">$__PRO_PRICE__<span className="text-base font-normal text-muted">/mo</span></p>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2">
              {PRO_FEATURES.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-amber-500" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button className="w-full" onClick={handlePortal} disabled={loading}>
              {loading ? 'Loading...' : 'Upgrade to Pro'}
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Button variant="outline" onClick={handlePortal} disabled={loading}>
            Manage Billing
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
