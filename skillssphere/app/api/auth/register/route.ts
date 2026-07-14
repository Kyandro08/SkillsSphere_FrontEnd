import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { hashPassword, signSession, setSessionCookie } from '@/lib/auth'

export async function POST(req: Request) {
  try {
    const { username, email, password, bio } = await req.json()

    if (!username || !email || !password) {
      return NextResponse.json({ error: 'Vul alle verplichte velden in.' }, { status: 400 })
    }

    if (typeof username !== 'string' || username.length < 2 || username.length > 30) {
      return NextResponse.json({ error: 'Gebruikersnaam moet 2-30 tekens bevatten.' }, { status: 400 })
    }

    if (typeof password !== 'string' || password.length < 8) {
      return NextResponse.json({ error: 'Wachtwoord moet minimaal 8 tekens bevatten.' }, { status: 400 })
    }

    const hashed = hashPassword(password)

    const { data: inserted, error: insertError } = await supabase
      .from('tb_users')
      .insert({
        username,
        email,
        password: hashed,
        about_me: typeof bio === 'string' ? bio.slice(0, 255) : '',
        status: 1,
        last_modified: new Date().toISOString(),
      })
      .select('user_id, username, email')
      .single()

    if (insertError) {
      return NextResponse.json({ error: 'Registreren is mislukt.' }, { status: 500 })
    }

    const token = await signSession({
      user_id: inserted.user_id,
      username: inserted.username,
      email: inserted.email,
      is_admin: false,
    })

    const res = NextResponse.json({
      user: { user_id: inserted.user_id, username: inserted.username, email: inserted.email },
    })

    res.headers.set('Set-Cookie', setSessionCookie(token))
    return res
  } catch {
    return NextResponse.json({ error: 'Er is iets misgegaan.' }, { status: 500 })
  }
}
