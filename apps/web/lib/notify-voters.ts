import { Resend } from 'resend'
import { render } from '@react-email/render'
import FeatureStatusUpdate from '@/lib/emails/feature-status-update'

const FROM = 'FeatureVote <alerts@bootstrapquant.com>'

function getResend() {
  return new Resend(process.env.RESEND_API_KEY)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function notifyVoters(
  supabase: { from: (table: string) => any },
  postId: string,
  postTitle: string,
  newStatus: string,
  boardName: string,
  boardSlug: string,
  excludeUserId?: string
) {
  const { data: voters } = await supabase
    .from('votes')
    .select('profiles(email)')
    .eq('post_id', postId)

  if (!voters?.length) return

  const emails: string[] = voters
    .map((v: Record<string, unknown>) => (v.profiles as { email: string } | null)?.email)
    .filter((e: string | null | undefined): e is string => !!e && e !== excludeUserId)

  if (!emails.length) return

  const html = await render(FeatureStatusUpdate({ postTitle, newStatus, boardName, boardSlug }))

  for (let i = 0; i < emails.length; i += 50) {
    const batch = emails.slice(i, i + 50)
    try {
      await Promise.all(batch.map(email =>
        getResend().emails.send({
          from: FROM,
          to: email,
          subject: `[${statusLabel(newStatus)}] "${postTitle}" on ${boardName}`,
          html,
        })
      ))
    } catch (e) {
      console.error('Failed to send voter notifications:', e)
    }
  }
}

function statusLabel(status: string): string {
  const labels: Record<string, string> = {
    open: 'Open',
    planned: 'Planned',
    in_progress: 'In Progress',
    completed: 'Done',
    closed: 'Closed',
  }
  return labels[status] || status
}
