import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default async function AdminSkillsPage() {
  const { data: skills, error } = await supabase
    .from('tb_skills')
    .select('*')
    .order('skill_id', { ascending: false })

  return (
    <>
      <Link href="/admin" className="admin-back">← Terug naar dashboard</Link>

      <div className="admin-page-header">
        <h1>Skills</h1>
        <p>Alle beschikbare vaardigheden</p>
      </div>

      <div className="admin-section">
        {error && <div className="admin-alert admin-alert-error">{error.message}</div>}

        {(!skills || skills.length === 0) ? (
          <div className="admin-empty">Geen skills gevonden.</div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Skill</th>
                  <th>Categorie</th>
                  <th>Beschrijving</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {skills.map((s: any) => (
                  <tr key={s.skill_id}>
                    <td>{s.skill_id}</td>
                    <td>{s.skill_name}</td>
                    <td>{s.category || '-'}</td>
                    <td>{s.description || '-'}</td>
                    <td>
                      <span className={`admin-badge ${s.status === 1 ? 'admin-badge-active' : 'admin-badge-inactive'}`}>
                        {s.status === 1 ? 'Actief' : 'Inactief'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  )
}
