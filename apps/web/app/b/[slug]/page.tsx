'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ArrowUpCircle, ChevronUp } from 'lucide-react'
import Link from 'next/link'

interface Post {
  id: string
  title: string
  description: string | null
  status: string
  vote_count: number
  created_at: string
  voted?: boolean
}

interface Board {
  id: string
  name: string
  slug: string
  description: string | null
}

const STATUS_LABELS: Record<string, string> = {
  open: 'Open',
  planned: 'Planned',
  in_progress: 'In Progress',
  completed: 'Done',
  closed: 'Closed',
}

const STATUS_COLORS: Record<string, 'default' | 'secondary' | 'success' | 'destructive'> = {
  open: 'secondary',
  planned: 'default',
  in_progress: 'default',
  completed: 'success',
  closed: 'destructive',
}

export default function PublicBoardPage() {
  const { slug } = useParams<{ slug: string }>()
  const [board, setBoard] = useState<Board | null>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const [newTitle, setNewTitle] = useState('')
  const [loading, setLoading] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => {
      setUserId(data.user?.id || null)
    })

    fetch(`/api/boards/by-slug/${slug}`).then(async (r) => {
      if (!r.ok) { setNotFound(true); return }
      const data = await r.json()
      setBoard(data.board)
      setPosts(data.posts || [])
    })
  }, [slug])

  async function handleVote(postId: string) {
    if (!userId) {
      window.location.href = `/login?next=/b/${slug}`
      return
    }
    const post = posts.find((p) => p.id === postId)
    if (!post) return

    const method = post.voted ? 'DELETE' : 'POST'
    const res = await fetch(`/api/posts/${postId}/vote`, { method })
    if (res.ok) {
      setPosts(
        posts.map((p) =>
          p.id === postId
            ? { ...p, voted: !p.voted, vote_count: p.vote_count + (p.voted ? -1 : 1) }
            : p
        )
      )
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!userId) {
      window.location.href = `/login?next=/b/${slug}`
      return
    }
    if (!newTitle.trim() || !board) return
    setLoading(true)
    const res = await fetch(`/api/boards/${board.id}/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTitle }),
    })
    if (res.ok) {
      const { post } = await res.json()
      setPosts([{ ...post, voted: false }, ...posts])
      setNewTitle('')
    }
    setLoading(false)
  }

  if (notFound) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted">Board not found.</p>
      </div>
    )
  }

  if (!board) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-3xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-heading font-bold">{board.name}</h1>
          {board.description && <p className="text-muted mt-1">{board.description}</p>}
          <p className="text-xs text-muted mt-2">
            Powered by{' '}
            <Link href="/" className="text-primary hover:underline">
              FeatureVote
            </Link>
          </p>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-6 space-y-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            placeholder="Suggest a feature..."
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" disabled={loading || !newTitle.trim()}>
            Submit
          </Button>
        </form>

        <div className="space-y-2">
          {posts
            .sort((a, b) => b.vote_count - a.vote_count)
            .map((post) => (
              <Card key={post.id}>
                <CardContent className="pt-4 pb-4 flex items-center gap-4">
                  <button
                    onClick={() => handleVote(post.id)}
                    className={`flex flex-col items-center min-w-[48px] rounded-lg py-1 transition-colors ${
                      post.voted
                        ? 'text-primary bg-primary/10'
                        : 'text-muted hover:text-primary hover:bg-primary/5'
                    }`}
                  >
                    <ChevronUp className="h-5 w-5" />
                    <span className="text-sm font-bold">{post.vote_count}</span>
                  </button>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">{post.title}</p>
                  </div>
                  {post.status !== 'open' && (
                    <Badge variant={STATUS_COLORS[post.status]}>
                      {STATUS_LABELS[post.status]}
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          {posts.length === 0 && (
            <p className="text-center text-muted py-8">
              No feature requests yet. Be the first to suggest one!
            </p>
          )}
        </div>
      </main>
    </div>
  )
}
