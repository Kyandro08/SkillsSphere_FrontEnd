import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { UsersIcon, SkillsIcon, LevelsIcon, QuestionsIcon } from './icons'

export default async function AdminDashboard() {
  const { count: userCount } = await supabase.from('tb_users').select('*', { count: 'exact', head: true })
  const { count: skillCount } = await supabase.from('tb_skills').select('*', { count: 'exact', head: true })
  const { count: levelCount } = await supabase.from('tb_levels').select('*', { count: 'exact', head: true })
  const { count: friendCount } = await supabase.from('tb_friends').select('*', { count: 'exact', head: true })

  return (
    <>
      <Link href="/" className="admin-back">← Terug naar app</Link>

      <div className="admin-page-header">
        <h1>Dashboard</h1>
        <p>Beheer gebruikers, skills en niveaus</p>
      </div>

      <div className="admin-section-title">Overzicht</div>
      <div className="admin-stats">
        <div className="admin-stat-card">
          <div className="admin-stat-value">{userCount ?? 0}</div>
          <div className="admin-stat-label">Gebruikers</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-value">{skillCount ?? 0}</div>
          <div className="admin-stat-label">Skills</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-value">{levelCount ?? 0}</div>
          <div className="admin-stat-label">Niveaus</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-value">{friendCount ?? 0}</div>
          <div className="admin-stat-label">Verbindingen</div>
        </div>
      </div>

      <div className="admin-section-title">Beheer</div>
      <div className="admin-cards">
        <Link href="/admin/users" className="admin-card">
          <div className="admin-card-icon admin-card-iconText"><UsersIcon /></div>
          <div className="admin-card-title">Gebruikers</div>
          <div className="admin-card-desc">Bekijk en beheer alle gebruikersaccounts.</div>
          <div className="admin-card-action">Beheren</div>
        </Link>
        <Link href="/admin/skills" className="admin-card">
          <div className="admin-card-icon admin-card-iconText"><SkillsIcon /></div>
          <div className="admin-card-title">Skills</div>
          <div className="admin-card-desc">Voeg skills toe en beheer categorieen.</div>
          <div className="admin-card-action">Beheren</div>
        </Link>
        <Link href="/admin/levels" className="admin-card">
          <div className="admin-card-icon admin-card-iconText"><LevelsIcon /></div>
          <div className="admin-card-title">Niveaus</div>
          <div className="admin-card-desc">Beheer de verschillende niveaus.</div>
          <div className="admin-card-action">Beheren</div>
        </Link>
        <Link href="/admin/questions" className="admin-card">
          <div className="admin-card-icon admin-card-iconText"><QuestionsIcon /></div>
          <div className="admin-card-title">Vragen</div>
          <div className="admin-card-desc">Voeg vragen en antwoorden toe per skill.</div>
          <div className="admin-card-action">Beheren</div>
        </Link>
      </div>
    </>
  )
}
