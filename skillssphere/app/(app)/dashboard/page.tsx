import { supabase } from '@/lib/supabase'
import styles from '@/app/app.module.css'

export default async function DashboardPage() {
  const { data: users } = await supabase
    .from('tb_users')
    .select('user_id, username, about_me, last_modified')
    .order('last_modified', { ascending: false })
    .limit(10)

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Dashboard</h1>
      <p className={styles.subtitle}>Welkom bij SkillSphere! Dit is jouw activiteitenfeed.</p>

      <div className={styles.feed}>
        {users?.length === 0 && (
          <div className={styles.emptyState}>Nog geen activiteiten.</div>
        )}
        {users?.map((user) => (
          <div key={user.user_id} className={styles.feedCard}>
            <div className={styles.feedHeader}>
              <div className={styles.feedAvatar} />
              <div>
                <p className={styles.feedName}>{user.username}</p>
                <p className={styles.feedTime}>
                  {new Date(user.last_modified).toLocaleDateString('nl-NL')}
                </p>
              </div>
            </div>
            <p className={styles.feedBody}>{user.about_me || 'Geen beschrijving'}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
