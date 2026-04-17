import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createClient as createServiceClient } from '@supabase/supabase-js'
import { notifyVoters } from '@/lib/notify-voters'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { status } = await request.json()
  const validStatuses = ['open', 'planned', 'in_progress', 'completed', 'closed']

  if (!validStatuses.includes(status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
  }

  // Fetch current post to check if status actually changes
  const { data: post } = await supabase
    .from('posts')
    .select('status, title, board_id')
    .eq('id', id)
    .single()

  if (!post || post.status === status) {
    if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    return NextResponse.json({ ok: true })
  }

  const { error } = await supabase
    .from('posts')
    .update({ status })
    .eq('id', id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Notify voters (skip for 'open' status — it's the default, not meaningful)
  if (status !== 'open') {
    const { data: board } = await supabase
      .from('boards')
      .select('name, slug')
      .eq('id', post.board_id)
      .single()

    if (board) {
      const serviceClient = createServiceClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      )
      notifyVoters(serviceClient, id, post.title, status, board.name, board.slug, user.id)
        .catch(e => console.error('Voter notification error:', e))
    }
  }

  return NextResponse.json({ ok: true })
}
