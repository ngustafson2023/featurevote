'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PlusCircle, ExternalLink, MessageSquare } from 'lucide-react'

interface Board {
  id: string
  name: string
  slug: string
  description: string | null
  is_public: boolean
  created_at: string
  post_count?: number
}

export default function DashboardPage() {
  const [boards, setBoards] = useState<Board[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/boards')
      .then((r) => r.json())
      .then((data) => {
        setBoards(data.boards || [])
        setLoading(false)
      })
  }, [])

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-heading font-bold">Your Boards</h1>
        <Link href="/dashboard/new">
          <Button>
            <PlusCircle className="h-4 w-4 mr-2" />
            New Board
          </Button>
        </Link>
      </div>

      {loading ? (
        <p className="text-muted">Loading...</p>
      ) : boards.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center space-y-4">
            <p className="text-muted">No boards yet. Create your first feature board.</p>
            <Link href="/dashboard/new">
              <Button>Create Board</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {boards.map((board) => (
            <Link key={board.id} href={`/dashboard/${board.id}`}>
              <Card className="hover:border-amber-500/50 transition-colors cursor-pointer">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{board.name}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge variant={board.is_public ? 'default' : 'secondary'}>
                        {board.is_public ? 'Public' : 'Private'}
                      </Badge>
                    </div>
                  </div>
                  {board.description && (
                    <CardDescription>{board.description}</CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-sm text-muted">
                    <span className="flex items-center gap-1">
                      <MessageSquare className="h-3.5 w-3.5" />
                      {board.post_count || 0} requests
                    </span>
                    <span className="flex items-center gap-1">
                      <ExternalLink className="h-3.5 w-3.5" />
                      /b/{board.slug}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
