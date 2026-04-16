import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Check, X, Minus } from 'lucide-react'
import { getCompetitor, getAllCompetitorSlugs } from '@/lib/competitors'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllCompetitorSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const comp = getCompetitor(slug)
  if (!comp) return {}
  return {
    title: `FeatureVote vs ${comp.name} — Best ${comp.name} Alternative 2026`,
    description: `Compare FeatureVote and ${comp.name}. Simple, flat-priced feature voting for SaaS teams. See why teams switch from ${comp.name}.`,
    openGraph: {
      title: `FeatureVote vs ${comp.name}`,
      description: `The best ${comp.name} alternative for small SaaS teams.`,
    },
  }
}

function FeatureIcon({ value }: { value: boolean | string }) {
  if (value === true) return <Check className="h-4 w-4 text-success" />
  if (value === false) return <X className="h-4 w-4 text-muted" />
  return <span className="text-xs font-medium">{value}</span>
}

export default async function ComparePage({ params }: Props) {
  const { slug } = await params
  const comp = getCompetitor(slug)
  if (!comp) notFound()

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-heading font-bold mb-4">
        FeatureVote vs {comp.name}
      </h1>
      <p className="text-lg text-muted mb-8">
        {comp.tagline} Here&apos;s how FeatureVote compares as a simpler, cheaper alternative.
      </p>

      <div className="border border-border rounded-lg overflow-hidden mb-12">
        <div className="grid grid-cols-3 bg-accent text-sm font-medium">
          <div className="p-3">Feature</div>
          <div className="p-3 text-center">{comp.name}</div>
          <div className="p-3 text-center text-primary font-bold">FeatureVote</div>
        </div>
        {comp.features.map((f, i) => (
          <div key={f.name} className={`grid grid-cols-3 text-sm ${i % 2 === 0 ? '' : 'bg-accent/50'}`}>
            <div className="p-3">{f.name}</div>
            <div className="p-3 flex justify-center"><FeatureIcon value={f.competitor} /></div>
            <div className="p-3 flex justify-center"><FeatureIcon value={f.fv} /></div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 mb-12">
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-heading font-bold text-lg mb-3">{comp.name} weaknesses</h3>
            <ul className="space-y-2">
              {comp.weaknesses.map((w) => (
                <li key={w} className="flex gap-2 text-sm text-muted">
                  <Minus className="h-4 w-4 mt-0.5 shrink-0 text-destructive" />
                  {w}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card className="border-primary">
          <CardContent className="pt-6">
            <h3 className="font-heading font-bold text-lg mb-3 text-primary">Why FeatureVote</h3>
            <ul className="space-y-2">
              {comp.fvAdvantages.map((a) => (
                <li key={a} className="flex gap-2 text-sm">
                  <Check className="h-4 w-4 mt-0.5 shrink-0 text-success" />
                  {a}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="text-center mb-12">
        <h2 className="text-2xl font-heading font-bold mb-2">Pricing</h2>
        <p className="text-muted mb-1"><strong>{comp.name}:</strong> {comp.pricing}</p>
        <p className="text-muted"><strong>FeatureVote:</strong> Free (1 board) / Pro $19/mo (unlimited)</p>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-heading font-bold mb-4">
          Ready to try a simpler {comp.name} alternative?
        </h2>
        <Link href="/signup">
          <Button size="lg">Get Started Free</Button>
        </Link>
      </div>
    </div>
  )
}
