import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data: boards } = await supabase
    .from('boards')
    .select('*, posts(count)')
    .eq('owner_id', user.id)
    .order('created_at', { ascending: false })

  const formatted = (boards || []).map((b: Record<string, unknown>) => ({
    ...b,
    post_count: (b.posts as { count: number }[])?.[0]?.count || 0,
    posts: undefined,
  }))

  return NextResponse.json({ boards: formatted })
}

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('plan')
    .eq('id', user.id)
    .single()
  const plan = profile?.plan || 'free'

  if (plan !== 'pro') {
    const { count } = await supabase
      .from('boards')
      .select('*', { count: 'exact', head: true })
      .eq('owner_id', user.id)
    if ((count || 0) >= 1) {
      return NextResponse.json(
        { error: 'Free plan is limited to 1 board. Upgrade to Pro for unlimited boards.', code: 'LIMIT_BOARDS' },
        { status: 403 }
      )
    }
  }

  const { name, slug, description, is_public } = await request.json()

  if (!name || !slug) {
    return NextResponse.json({ error: 'Name and slug required' }, { status: 400 })
  }

  const { data: board, error } = await supabase
    .from('boards')
    .insert({
      owner_id: user.id,
      name,
      slug,
      description: description || null,
      is_public: is_public ?? true,
    })
    .select()
    .single()

  if (error) {
    if (error.code === '23505') {
      return NextResponse.json({ error: 'Slug already taken' }, { status: 409 })
    }
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ board })
}
