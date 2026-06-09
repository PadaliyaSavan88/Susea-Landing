import { sql } from '@vercel/postgres'

export async function ensureTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS waitlist (
      id SERIAL PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      company TEXT NOT NULL,
      business_type TEXT NOT NULL,
      company_size TEXT NOT NULL,
      teu_volume TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `
}

export async function insertSignup({ email, company, businessType, companySize, teuVolume }) {
  await ensureTable()
  const result = await sql`
    INSERT INTO waitlist (email, company, business_type, company_size, teu_volume)
    VALUES (${email}, ${company}, ${businessType}, ${companySize}, ${teuVolume})
    RETURNING id
  `
  return result.rows[0]
}

export async function getAllSignups() {
  await ensureTable()
  const result = await sql`SELECT * FROM waitlist ORDER BY created_at DESC`
  return result.rows
}
