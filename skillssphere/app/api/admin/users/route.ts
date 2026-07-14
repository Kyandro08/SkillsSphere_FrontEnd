import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { supabase } from '@/lib/supabase'
import { verifySession, hashPassword, COOKIE_NAME } from '@/lib/auth'

export async function POST(req: Request) {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  const session = token ? await verifySession(token) : null

  if (!session || !session.is_admin) {
    return NextResponse.json({ error: 'Geen toegang.' }, { status: 403 })
  }

  try {
    const { username, email, password, about_me, status } = await req.json()

    if (!username || !email || !password) {
      return NextResponse.json({ error: 'Vul alle verplichte velden in.' }, { status: 400 })
    }

    const hashed = hashPassword(password)

    const { error } = await supabase.from('tb_users').insert({
      username,
      email,
      password: hashed,
      about_me: about_me || '',
      status: status ?? 1,
      last_modified: new Date().toISOString(),
    })

    if (error) {
      return NextResponse.json({ error: 'Gebruiker toevoegen mislukt.' }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Er is iets misgegaan.' }, { status: 500 })
  }
}
