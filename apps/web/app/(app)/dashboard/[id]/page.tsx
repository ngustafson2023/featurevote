'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ExternalLink, ArrowUpCircle } from 'lucide-react'
import Link from 'next/link'

interface Post {
  id: string
  title: string
  description: string | null
  status: string
  vote_count: number
  author_email: string | null
  created_at: string
}

interface Board {
  id: string
  name: string
  slug: string
  description: string | null
}

const STATUS_COLORS: Record<string, 'default' | 'secondary' | 'success' | 'destructive'> = {
  open: 'secondary',
  planned: 'default',
  in_progress: 'default',
  completed: 'success',
  closed: 'destructive',
}

export default function BoardDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [board, setBoard] = useState<Board | null>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const [newTitle, setNewTitle] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch(`/api/boards/${id}`).then((r) => r.json()).then((data) => {
      setBoard(data.board)
      setPosts(data.posts || [])
    })
  }, [id])

  async function handleAddPost(e: React.FormEvent) {
    e.preventDefault()
    if (!newTitle.trim()) return
    setLoading(true)
    const res = await fetch(`/api/boards/${id}/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTitle }),
    })
    if (res.ok) {
      const { post } = await res.json()
      setPosts([post, ...posts])
      setNewTitle('')
    }
    setLoading(false)
  }

  async function handleStatusChange(postId: string, status: string) {
    await fetch(`/api/posts/${postId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    setPosts(posts.map((p) => (p.id === postId ? { ...p, status } : p)))
  }

  if (!board) return <p className="text-muted">Loading...</p>

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold">{board.name}</h1>
          {board.description && <p className="text-muted mt-1">{board.description}</p>}
        </div>
        <Link
          href={`/b/${board.slug}`}
          target="_blank"
          className="flex items-center gap-1 text-sm text-muted hover:text-foreground"
        >
          <ExternalLink className="h-4 w-4" />
          Public page
        </Link>
      </div>

      <form onSubmit={handleAddPost} className="flex gap-2">
        <Input
          placeholder="Add a feature request..."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" disabled={loading || !newTitle.trim()}>
          Add
        </Button>
      </form>

      <div className="space-y-2">
        {posts
          .sort((a, b) => b.vote_count - a.vote_count)
          .map((post) => (
            <Card key={post.id}>
              <CardContent className="pt-4 pb-4 flex items-center gap-4">
                <div className="flex flex-col items-center min-w-[48px]">
                  <ArrowUpCircle className="h-5 w-5 text-amber-500" />
                  <span className="text-sm font-bold">{post.vote_count}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium">{post.title}</p>
                  <p className="text-xs text-muted mt-0.5">
                    {post.author_email || 'Anonymous'} &middot;{' '}
                    {new Date(post.created_at).toLocaleDateString()}
                  </p>
                </div>
                <select
                  value={post.status}
                  onChange={(e) => handleStatusChange(post.id, e.target.value)}
                  className="text-xs border rounded px-2 py-1 bg-background"
                >
                  <option value="open">Open</option>
                  <option value="planned">Planned</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="closed">Closed</option>
                </select>
              </CardContent>
            </Card>
          ))}
        {posts.length === 0 && (
          <p className="text-center text-muted py-8">No feature requests yet.</p>
        )}
      </div>
    </div>
  )
}
