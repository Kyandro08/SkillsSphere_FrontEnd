import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { hashPassword, signSession, setSessionCookie } from '@/lib/auth'

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Vul alle velden in.' }, { status: 400 })
    }

    const hashed = hashPassword(password)

    const { data: users, error } = await supabase
      .from('tb_users')
      .select('user_id, username, email')
      .eq('email', email)
      .eq('password', hashed)
      .eq('status', 1)
      .limit(1)

    if (error || !users || users.length === 0) {
      return NextResponse.json({ error: 'Ongeldig emailadres of wachtwoord.' }, { status: 401 })
    }

    const u = users[0]
    const token = await signSession({
      user_id: u.user_id,
      username: u.username,
      email: u.email,
      is_admin: u.username === 'admin',
    })

    const res = NextResponse.json({
      user: { user_id: u.user_id, username: u.username, email: u.email },
      redirect: u.username === 'admin' ? '/admin' : '/dashboard',
    })

    res.headers.set('Set-Cookie', setSessionCookie(token))
    return res
  } catch {
    return NextResponse.json({ error: 'Er is iets misgegaan.' }, { status: 500 })
  }
}
