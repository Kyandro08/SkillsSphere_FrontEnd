import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import AddUserForm from './AddUserForm'

export default async function AdminUsersPage() {
  const { data: users, error } = await supabase
    .from('tb_users')
    .select('*')
    .order('user_id', { ascending: false })

  return (
    <>
      <Link href="/admin" className="admin-back">← Terug naar dashboard</Link>

      <div className="admin-page-header">
        <h1>Gebruikers</h1>
        <p>Alle geregistreerde gebruikers</p>
      </div>

      <AddUserForm />

      <div className="admin-section">
        {error && <div className="admin-alert admin-alert-error">{error.message}</div>}

        {(!users || users.length === 0) ? (
          <div className="admin-empty">Geen gebruikers gevonden.</div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Gebruikersnaam</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Laatst gewijzigd</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u: any) => (
                  <tr key={u.user_id}>
                    <td>{u.user_id}</td>
                    <td>{u.username}</td>
                    <td>{u.email}</td>
                    <td>
                      <span className={`admin-badge ${u.status === 1 ? 'admin-badge-active' : 'admin-badge-inactive'}`}>
                        {u.status === 1 ? 'Actief' : 'Inactief'}
                      </span>
                    </td>
                    <td>{new Date(u.last_modified).toLocaleDateString('nl-NL')}</td>
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
