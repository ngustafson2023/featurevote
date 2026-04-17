'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'

export default function NewBoardPage() {
  const router = useRouter()
  const [gateLoading, setGateLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch('/api/profile').then((r) => r.json()),
      fetch('/api/boards').then((r) => r.json()),
    ]).then(([profile, boardsData]) => {
      const plan = profile.plan || 'free'
      const count = boardsData.boards?.length || 0
      if (plan !== 'pro' && count >= 1) {
        router.replace('/billing?reason=boards')
      } else {
        setGateLoading(false)
      }
    })
  }, [router])

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [isPublic, setIsPublic] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/boards', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, slug, description, is_public: isPublic }),
    })

    if (!res.ok) {
      const data = await res.json()
      setError(data.error || 'Failed to create board')
      setLoading(false)
      return
    }

    const { board } = await res.json()
    router.push(`/dashboard/${board.id}`)
  }

  if (gateLoading) {
    return <div className="max-w-lg mx-auto"><p className="text-muted">Loading...</p></div>
  }

  return (
    <div className="max-w-lg mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Create a Board</CardTitle>
          <CardDescription>
            A board collects feature requests from your users.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Board Name</Label>
              <Input
                id="name"
                placeholder="My Product"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              {slug && (
                <p className="text-xs text-muted">
                  Public URL: featurevote.bootstrapquant.com/b/{slug}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description (optional)</Label>
              <Textarea
                id="description"
                placeholder="What kind of feedback are you collecting?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Public Board</Label>
                <p className="text-xs text-muted">Anyone with the link can view and vote</p>
              </div>
              <Switch checked={isPublic} onCheckedChange={setIsPublic} />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <Button type="submit" disabled={loading || !name} className="w-full">
              {loading ? 'Creating...' : 'Create Board'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
