import Link from 'next/link'
import './admin.css'
import { DashboardIcon, UsersIcon, SkillsIcon, LevelsIcon, QuestionsIcon } from './icons'

export const dynamic = 'force-dynamic'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-wrap">
      <aside className="admin-sidebar">
        <div className="admin-logo">
          SkillSphere
          <span>Admin Panel</span>
        </div>

        <div className="admin-nav-label">Beheer</div>
        <nav className="admin-nav">
          <AdminLink href="/admin" icon={<DashboardIcon />}>Dashboard</AdminLink>
          <AdminLink href="/admin/users" icon={<UsersIcon />}>Gebruikers</AdminLink>
          <AdminLink href="/admin/skills" icon={<SkillsIcon />}>Skills</AdminLink>
          <AdminLink href="/admin/levels" icon={<LevelsIcon />}>Levels</AdminLink>
          <AdminLink href="/admin/questions" icon={<QuestionsIcon />}>Vragen</AdminLink>
        </nav>

        <div className="admin-sidebar-footer">
          <Link href="/">Terug naar app</Link>
        </div>
      </aside>

      <main className="admin-main">{children}</main>
    </div>
  )
}

function AdminLink({ href, icon, children }: { href: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <Link href={href} className="admin-nav-item">
      <span className="admin-nav-icon">{icon}</span>
      {children}
    </Link>
  )
}


