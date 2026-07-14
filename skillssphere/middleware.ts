import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifySession } from '@/lib/auth'

const protectedRoutes = ['/dashboard', '/profile', '/network', '/leaderboard', '/notifications', '/quiz']
const adminRoutes = ['/admin']

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('ss_session')?.value
  const session = token ? await verifySession(token) : null
  const { pathname } = request.nextUrl

  if (!session) {
    const needsAuth = [...protectedRoutes, ...adminRoutes].some(r => pathname.startsWith(r))
    if (needsAuth) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    return NextResponse.next()
  }

  for (const route of adminRoutes) {
    if (pathname.startsWith(route) && !session.is_admin) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*', '/network/:path*', '/leaderboard/:path*', '/notifications/:path*', '/quiz/:path*', '/admin/:path*'],
}
