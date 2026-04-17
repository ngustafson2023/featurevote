import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

interface ChangelogEntry {
  id: string
  title: string
  content: string | null
  published_at: string
  board_id: string
  boards: { name: string } | null
}

export default async function ChangelogPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: entries } = await supabase
    .from('changelog')
    .select('*, boards(name)')
    .order('published_at', { ascending: false })

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-heading font-bold">Changelog</h1>

      {!entries || entries.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-muted">No changelog entries yet.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {(entries as ChangelogEntry[]).map((entry) => (
            <Card key={entry.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{entry.title}</CardTitle>
                  <span className="text-xs text-muted">
                    {new Date(entry.published_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </div>
                {entry.boards && (
                  <p className="text-xs text-muted">{entry.boards.name}</p>
                )}
              </CardHeader>
              {entry.content && (
                <CardContent>
                  <p className="text-sm whitespace-pre-wrap">{entry.content}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
