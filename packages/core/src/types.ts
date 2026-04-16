export type Plan = 'free' | 'pro'

export interface Profile {
  id: string
  email: string
  plan: Plan
  stripe_customer_id: string | null
  created_at: string
  updated_at: string
}

// Add app-specific types below this line
