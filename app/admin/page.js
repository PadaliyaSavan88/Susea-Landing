import { getAllSignups } from '@/lib/db'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const rows = await getAllSignups()

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Susea Waitlist — Admin</title>
        <style>{`
          *{box-sizing:border-box;margin:0;padding:0}
          body{font-family:system-ui,-apple-system,sans-serif;background:#F7F9FC;color:#0E1726;font-size:14px}
          .top{background:#fff;border-bottom:1px solid #E3E9F2;padding:0 32px;height:60px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:10}
          .logo{font-weight:700;font-size:16px;letter-spacing:-.02em;display:flex;align-items:center;gap:8px}
          .badge{background:#EEF4FD;color:#1E5BC6;border:1px solid #DCE8FB;border-radius:6px;font-size:11px;font-weight:700;padding:2px 8px;font-family:monospace}
          .wrap{padding:32px;max-width:1200px;margin:0 auto}
          h1{font-size:22px;font-weight:700;letter-spacing:-.02em;margin-bottom:6px}
          .sub{color:#6B7C96;font-size:13px;margin-bottom:24px}
          .actions{display:flex;gap:10px;margin-bottom:20px}
          a.btn{display:inline-flex;align-items:center;gap:6px;height:36px;padding:0 16px;border-radius:9px;font-size:13px;font-weight:600;text-decoration:none;background:#2F6BD8;color:#fff;transition:.15s}
          a.btn:hover{background:#1E5BC6}
          table{width:100%;border-collapse:collapse;background:#fff;border:1px solid #E3E9F2;border-radius:12px;overflow:hidden}
          th{background:#EEF3FA;font-size:11px;letter-spacing:.07em;text-transform:uppercase;font-weight:700;color:#6B7C96;padding:10px 14px;text-align:left;border-bottom:1px solid #E3E9F2}
          td{padding:12px 14px;border-bottom:1px solid #EDF1F7;font-size:13px;color:#41506A;vertical-align:middle}
          tr:last-child td{border-bottom:0}
          tr:hover td{background:#F7F9FC}
          .mono{font-family:monospace;font-size:12px}
          .empty{text-align:center;padding:60px;color:#9AA8BE;font-size:15px}
          .count{font-family:monospace;font-weight:700;font-size:20px;color:#0E1726}
        `}</style>
      </head>
      <body>
        <div className="top">
          <div className="logo">Susea <span className="badge">ADMIN</span></div>
          <span style={{ fontSize: 13, color: '#6B7C96' }}>Waitlist · {rows.length} signup{rows.length !== 1 ? 's' : ''}</span>
        </div>
        <div className="wrap">
          <h1>Waitlist signups</h1>
          <p className="sub">All early access applications, newest first.</p>
          <div className="actions">
            <a className="btn" href="/api/waitlist/export">Download CSV</a>
          </div>
          {rows.length === 0 ? (
            <div className="empty">No signups yet.</div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Email</th>
                  <th>Company</th>
                  <th>Type</th>
                  <th>Size</th>
                  <th>TEU / mo</th>
                  <th>Signed up</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={r.id}>
                    <td className="mono">{rows.length - i}</td>
                    <td>{r.email}</td>
                    <td style={{ fontWeight: 600, color: '#0E1726' }}>{r.company}</td>
                    <td>{r.business_type}</td>
                    <td>{r.company_size}</td>
                    <td className="mono">{r.teu_volume}</td>
                    <td className="mono">{new Date(r.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </body>
    </html>
  )
}
