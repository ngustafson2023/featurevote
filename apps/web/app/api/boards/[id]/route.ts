import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = await createClient()

  const { data: board } = await supabase
    .from('boards')
    .select('*')
    .eq('id', id)
    .single()

  if (!board) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .eq('board_id', id)
    .order('vote_count', { ascending: false })

  return NextResponse.json({ board, posts: posts || [] })
}
