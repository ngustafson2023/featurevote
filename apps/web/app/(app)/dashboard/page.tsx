'use client'

import { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export default function DashboardPage() {
  const [profile, setProfile] = useState<{ plan: string } | null>(null)

  useEffect(() => {
    fetch('/api/profile').then((r) => r.json()).then(setProfile)
  }, [])

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-heading font-bold">Dashboard</h1>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted font-normal">Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold capitalize">{profile?.plan || '...'}</p>
          </CardContent>
        </Card>
        {/* Add app-specific KPI cards here */}
      </div>

      {/* Add app-specific content here */}
    </div>
  )
}
