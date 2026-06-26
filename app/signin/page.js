import Nav from '@/components/landing/Nav'
import Waitlist from '@/components/landing/Waitlist'
import Footer from '@/components/landing/Footer'

export const metadata = {
  title: 'Join the Waitlist — Susea',
  description: 'Susea is in private beta. Join the waitlist to get early access to the AI pricing OS for freight forwarders.',
  alternates: { canonical: 'https://susea.ai/signin' },
}

export default function SignInPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="blog-hero">
          <div className="container" style={{ textAlign: 'center' }}>
            <span className="eyebrow"><span className="dot"></span> Private beta · Invite only</span>
            <h1 className="h-display" style={{ marginTop: 20, marginBottom: 16 }}>
              Susea is currently in private beta.
            </h1>
            <p className="lead" style={{ margin: '0 auto', textAlign: 'center' }}>
              We&apos;re onboarding freight forwarders in cohorts. Join the waitlist and we&apos;ll reach out within 48 hours.
            </p>
          </div>
        </section>
        <Waitlist />
      </main>
      <Footer />
    </>
  )
}
