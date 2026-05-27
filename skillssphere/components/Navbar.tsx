import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between border-b border-zinc-200 bg-white px-6 py-3">
      <div className="flex items-center gap-8">
        <Link href="/" className="text-xl font-bold text-indigo-600">
          SkillSphere
        </Link>
        <div className="flex items-center gap-6 text-sm font-medium text-zinc-600">
          <Link href="/" className="hover:text-indigo-600 transition-colors">Dashboard</Link>
          <Link href="/network" className="hover:text-indigo-600 transition-colors">Netwerk</Link>
          <Link href="/leaderboard" className="hover:text-indigo-600 transition-colors">Leaderboard</Link>
          <Link href="/notifications" className="hover:text-indigo-600 transition-colors">Notificaties</Link>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Link href="/profile" className="flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-indigo-600 transition-colors">
          <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold text-sm">
            J
          </div>
          Profiel
        </Link>
      </div>
    </nav>
  )
}
