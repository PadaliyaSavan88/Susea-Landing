import { getAllSignups } from '@/lib/db'

export async function GET() {
  const rows = await getAllSignups()

  const headers = ['id', 'email', 'company', 'business_type', 'company_size', 'teu_volume', 'created_at']
  const csvRows = [
    headers.join(','),
    ...rows.map(r => headers.map(h => JSON.stringify(r[h] ?? '')).join(',')),
  ]

  return new Response(csvRows.join('\n'), {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename="waitlist-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  })
}
