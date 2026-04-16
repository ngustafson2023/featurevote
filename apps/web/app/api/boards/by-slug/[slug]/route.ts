import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: board } = await supabase
    .from('boards')
    .select('*')
    .eq('slug', slug)
    .eq('is_public', true)
    .single()

  if (!board) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  // Get posts with user's vote status
  const { data: { user } } = await supabase.auth.getUser()

  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .eq('board_id', board.id)
    .order('vote_count', { ascending: false })

  let votedPostIds: string[] = []
  if (user) {
    const { data: votes } = await supabase
      .from('votes')
      .select('post_id')
      .eq('user_id', user.id)
    votedPostIds = (votes || []).map((v: { post_id: string }) => v.post_id)
  }

  const postsWithVotes = (posts || []).map((p: Record<string, unknown>) => ({
    ...p,
    voted: votedPostIds.includes(p.id as string),
  }))

  return NextResponse.json({ board, posts: postsWithVotes })
}
