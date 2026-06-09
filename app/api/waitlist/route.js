import { NextResponse } from 'next/server'
import { insertSignup } from '@/lib/db'

export async function POST(req) {
  try {
    const body = await req.json()
    const { email, company, businessType, companySize, teuVolume } = body

    if (!email || !company || !businessType || !companySize || !teuVolume) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
    }

    await insertSignup({ email, company, businessType, companySize, teuVolume })
    return NextResponse.json({ ok: true })
  } catch (err) {
    if (err.message?.includes('unique constraint') || err.message?.includes('duplicate key')) {
      return NextResponse.json({ error: 'This email is already on the waitlist.' }, { status: 409 })
    }
    console.error('Waitlist POST error:', err)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
