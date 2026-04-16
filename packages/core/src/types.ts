export type Plan = 'free' | 'pro'
export type PostStatus = 'open' | 'planned' | 'in_progress' | 'completed' | 'closed'

export interface Profile {
  id: string
  email: string
  plan: Plan
  stripe_customer_id: string | null
  created_at: string
  updated_at: string
}

export interface Board {
  id: string
  owner_id: string
  name: string
  slug: string
  description: string | null
  is_public: boolean
  created_at: string
}

export interface Post {
  id: string
  board_id: string
  author_id: string | null
  author_email: string | null
  title: string
  description: string | null
  status: PostStatus
  vote_count: number
  created_at: string
}

export interface Vote {
  id: string
  post_id: string
  user_id: string
  created_at: string
}

export interface ChangelogEntry {
  id: string
  board_id: string
  title: string
  content: string | null
  published_at: string
}
