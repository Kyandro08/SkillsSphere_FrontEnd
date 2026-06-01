import { supabase } from '@/lib/supabase'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function HomePage() {
  try {
    const { data: { session } } = await supabase.auth.getSession()
    if (session) redirect('/dashboard')
  } catch {
    // Supabase Auth nog niet ingesteld — toon landingspagina
  }

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="text-4xl font-bold text-zinc-900">SkillSphere Network</h1>
      <p className="mt-4 max-w-md text-zinc-500">
        Registreer, valideer en vergelijk jouw vaardigheden met medestudenten.
      </p>
      <div className="mt-8 flex gap-4">
        <Link href="/login" className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-medium text-white hover:bg-indigo-700">
          Inloggen
        </Link>
        <Link href="/register" className="rounded-lg border border-zinc-300 px-6 py-3 text-sm font-medium text-zinc-700 hover:bg-zinc-50">
          Registreren
        </Link>
      </div>
    </div>
  )
}
