import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import AddLevelForm from './AddLevelForm'

export default async function AdminLevelsPage() {
  const { data: levels, error } = await supabase
    .from('tb_levels')
    .select('*')
    .order('level_id', { ascending: true })

  return (
    <>
      <Link href="/admin" className="admin-back">← Terug naar dashboard</Link>

      <div className="admin-page-header">
        <h1>Niveaus</h1>
        <p>Alle vaardigheidsniveaus</p>
      </div>

      <AddLevelForm />

      <div className="admin-section">
        {error && <div className="admin-alert admin-alert-error">{error.message}</div>}

        {(!levels || levels.length === 0) ? (
          <div className="admin-empty">Geen niveaus gevonden.</div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                  <tr>
                    <th>ID</th>
                    <th>Niveau</th>
                    <th>Min. punten</th>
                    <th>Beschrijving</th>
                    <th>Status</th>
                  </tr>
              </thead>
              <tbody>
                {levels.map((l: any) => (
                  <tr key={l.level_id}>
                    <td>{l.level_id}</td>
                    <td>{l.level_name}</td>
                    <td>{l.min_points ?? '-'}</td>
                    <td>{l.description || '-'}</td>
                    <td>
                      <span className={`admin-badge ${l.status === 1 ? 'admin-badge-active' : 'admin-badge-inactive'}`}>
                        {l.status === 1 ? 'Actief' : 'Inactief'}
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
