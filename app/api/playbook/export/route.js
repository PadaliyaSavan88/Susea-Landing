import { getAllPlaybookLeads } from '@/lib/db'

// Turn a raw Postgres timestamp into a simple, readable value.
// e.g. "2026-08-05T07:08:31.253Z" -> "05 Aug 2026, 12:38 PM" (IST)
function formatDate(value) {
  if (!value) return ''
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return String(value)
  return d.toLocaleString('en-GB', {
    timeZone: 'Asia/Kolkata',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })
}

export async function GET() {
  const rows = await getAllPlaybookLeads()

  const headers = ['ID', 'Email', 'Source', 'Downloaded on']
  const csvRows = [
    headers.join(','),
    ...rows.map(r =>
      [
        JSON.stringify(r.id ?? ''),
        JSON.stringify(r.email ?? ''),
        JSON.stringify(r.source ?? ''),
        JSON.stringify(formatDate(r.created_at)),
      ].join(',')
    ),
  ]

  // Prepend a UTF-8 BOM and use CRLF line endings so the file opens cleanly
  // in Excel (double-click) as well as LibreOffice Calc.
  const csv = '﻿' + csvRows.join('\r\n')

  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="playbook-leads-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  })
}
