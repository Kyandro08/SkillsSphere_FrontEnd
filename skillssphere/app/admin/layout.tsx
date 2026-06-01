import Link from 'next/link'
import './admin.css'

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
          <AdminLink href="/admin" icon="🏠">Dashboard</AdminLink>
          <AdminLink href="/admin/users" icon="👥">Gebruikers</AdminLink>
          <AdminLink href="/admin/skills" icon="🎯">Skills</AdminLink>
          <AdminLink href="/admin/levels" icon="📊">Levels</AdminLink>
        </nav>

        <div className="admin-sidebar-footer">
          <Link href="/dashboard">← Terug naar app</Link>
        </div>
      </aside>

      <main className="admin-main">{children}</main>
    </div>
  )
}

function AdminLink({ href, icon, children }: { href: string; icon: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="admin-nav-item">
      <span className="admin-nav-icon">{icon}</span>
      {children}
    </Link>
  )
}
