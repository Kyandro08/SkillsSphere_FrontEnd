import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const protectedRoutes = ['/dashboard', '/profile', '/network', '/leaderboard', '/notifications', '/quiz', '/admin']

export function middleware(request: NextRequest) {
  const session = request.cookies.get('ss_session')?.value

  if (!session) {
    const path = request.nextUrl.pathname
    if (protectedRoutes.some(route => path.startsWith(route))) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard', '/dashboard/:path*', '/profile', '/profile/:path*', '/network', '/network/:path*', '/leaderboard', '/leaderboard/:path*', '/notifications', '/notifications/:path*', '/quiz', '/quiz/:path*', '/admin', '/admin/:path*'],
}
