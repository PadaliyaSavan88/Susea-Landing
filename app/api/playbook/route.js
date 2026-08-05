import { NextResponse } from 'next/server'
import { insertPlaybookLead } from '@/lib/db'
import { sendPlaybookEmail } from '@/lib/mail'

// nodemailer + fs require the Node.js runtime (not edge).
export const runtime = 'nodejs'

export async function POST(req) {
  try {
    const body = await req.json()
    const { email, source, website } = body

    // Honeypot: real users never fill this hidden field. Silently accept + drop bots.
    if (website) {
      return NextResponse.json({ ok: true })
    }

    if (!email) {
      return NextResponse.json({ error: 'Email is required.' }, { status: 400 })
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
    }

    await insertPlaybookLead({ email, source: source || 'unknown' })
    await sendPlaybookEmail(email)

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Playbook POST error:', err)
    return NextResponse.json(
      { error: "Something went wrong sending the guide. Please try again." },
      { status: 500 }
    )
  }
}
