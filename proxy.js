import { NextResponse } from 'next/server'

export function proxy(request) {
  const { pathname } = request.nextUrl
  if (!pathname.startsWith('/admin') && pathname !== '/api/waitlist/export') {
    return NextResponse.next()
  }

  const auth = request.headers.get('authorization') ?? ''
  if (auth.startsWith('Basic ')) {
    const decoded = atob(auth.slice(6))
    const colon = decoded.indexOf(':')
    const user = decoded.slice(0, colon)
    const pass = decoded.slice(colon + 1)
    if (
      user === (process.env.ADMIN_USER ?? 'admin') &&
      pass === (process.env.ADMIN_PASSWORD ?? 'susea2026')
    ) {
      return NextResponse.next()
    }
  }

  return new NextResponse('Unauthorized', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Susea Admin"' },
  })
}

export const config = {
  matcher: ['/admin/:path*', '/api/waitlist/export'],
}
