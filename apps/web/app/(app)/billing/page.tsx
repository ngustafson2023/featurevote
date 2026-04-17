'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check } from 'lucide-react'

const FREE_FEATURES = [
  '1 board',
  'Unlimited voters',
  'Public voting page',
  'Status updates',
]

const PRO_FEATURES = [
  'Unlimited boards',
  'Unlimited voters',
  'Custom branding',
  'Changelog',
  'Priority support',
  'Export data',
]

export default function BillingPage() {
  const searchParams = useSearchParams()
  const reason = searchParams.get('reason')
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
      {reason === 'boards' && (
        <div className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          You have reached the free plan limit of 1 board. Upgrade to Pro for unlimited boards.
        </div>
      )}

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

        <Card className="border-primary">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Pro
              <Badge>Recommended</Badge>
            </CardTitle>
            <p className="text-2xl font-heading font-bold">$19<span className="text-base font-normal text-muted">/mo</span></p>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2">
              {PRO_FEATURES.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-primary" />
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
