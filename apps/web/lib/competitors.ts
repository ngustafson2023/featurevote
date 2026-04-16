export interface Competitor {
  slug: string
  name: string
  tagline: string
  pricing: string
  weaknesses: string[]
  fvAdvantages: string[]
  features: { name: string; competitor: boolean | string; fv: boolean | string }[]
}

export const competitors: Record<string, Competitor> = {
  canny: {
    slug: 'canny',
    name: 'Canny',
    tagline: 'Canny is a feature request management platform for product teams.',
    pricing: 'From $79/mo (Starter), per-user pricing on higher tiers',
    weaknesses: [
      'Per-user pricing punishes growth — costs spike as your team scales',
      'Starts at $79/mo for basic features',
      'Complex setup with lots of configuration options',
      'Enterprise-focused features most small teams don\'t need',
      'Minimum 30-minute setup process',
    ],
    fvAdvantages: [
      'Flat $19/mo — unlimited users, always',
      'Set up a board in 30 seconds',
      'Clean, simple interface — just voting, statuses, and changelog',
      'Built for indie makers and small SaaS teams',
      'No enterprise bloat — just what you need',
    ],
    features: [
      { name: 'Feature voting boards', competitor: true, fv: true },
      { name: 'Public roadmap', competitor: true, fv: true },
      { name: 'Changelog', competitor: true, fv: true },
      { name: 'Status updates', competitor: true, fv: true },
      { name: 'Flat pricing', competitor: false, fv: '$19/mo' },
      { name: 'Per-user pricing', competitor: 'From $79/mo', fv: false },
      { name: 'Unlimited users', competitor: 'Paid add-on', fv: true },
      { name: '30-second setup', competitor: false, fv: true },
      { name: 'Jira/Linear integration', competitor: true, fv: false },
      { name: 'Custom domain', competitor: 'Enterprise only', fv: false },
    ],
  },
  uservoice: {
    slug: 'uservoice',
    name: 'UserVoice',
    tagline: 'UserVoice is an enterprise product feedback platform with advanced analytics.',
    pricing: 'From $699/mo — enterprise-only pricing',
    weaknesses: [
      'Starts at $699/mo — built for enterprise, priced for enterprise',
      'Massively over-featured for small teams',
      'Requires sales call to get started',
      'Complex admin interface with steep learning curve',
      'No self-serve signup — sales-led only',
    ],
    fvAdvantages: [
      '$19/mo — 36x cheaper',
      'Self-serve signup, no sales calls',
      'Set up in 30 seconds, start collecting feedback immediately',
      'Simple interface anyone on the team can use',
      'Built for indie makers, not enterprise procurement',
    ],
    features: [
      { name: 'Feature voting', competitor: true, fv: true },
      { name: 'Self-serve signup', competitor: false, fv: true },
      { name: 'Price', competitor: 'From $699/mo', fv: '$19/mo' },
      { name: 'Setup time', competitor: 'Days (with sales)', fv: '30 seconds' },
      { name: 'Advanced analytics', competitor: true, fv: false },
      { name: 'NPS surveys', competitor: true, fv: false },
      { name: 'Status updates', competitor: true, fv: true },
      { name: 'Changelog', competitor: true, fv: true },
    ],
  },
  productboard: {
    slug: 'productboard',
    name: 'Productboard',
    tagline: 'Productboard is a product management platform for prioritizing features.',
    pricing: 'From $20/user/mo — per-seat pricing',
    weaknesses: [
      'Per-seat pricing — costs grow with every team member',
      'Full product management suite — overkill if you just need voting',
      'Complex prioritization frameworks (RICE, ICE) most small teams skip',
      'Designed for product managers, not founders',
      'No public-facing voting board — internal tool only',
    ],
    fvAdvantages: [
      'Flat $19/mo total, not per-seat',
      'Public-facing voting board your users can see and use',
      'Zero learning curve — create board, share link, done',
      'Built for founders who ship, not PMs who prioritize',
      'Your users tell you what to build, not a framework',
    ],
    features: [
      { name: 'Public voting board', competitor: false, fv: true },
      { name: 'User-facing feedback portal', competitor: 'Limited', fv: true },
      { name: 'Price', competitor: 'From $20/user/mo', fv: '$19/mo flat' },
      { name: 'Prioritization frameworks', competitor: 'RICE, ICE, etc.', fv: 'Vote count' },
      { name: 'Changelog', competitor: true, fv: true },
      { name: 'Roadmap view', competitor: true, fv: true },
      { name: 'Jira integration', competitor: true, fv: false },
      { name: '30-second setup', competitor: false, fv: true },
    ],
  },
}

export function getCompetitor(slug: string): Competitor | undefined {
  return competitors[slug]
}

export function getAllCompetitorSlugs(): string[] {
  return Object.keys(competitors)
}
