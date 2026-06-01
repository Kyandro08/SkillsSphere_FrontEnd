import { supabase } from '@/lib/supabase'
import styles from '@/app/app.module.css'

export default async function NotificationsPage() {
  const { data: requests } = await supabase
    .from('tb_friends')
    .select('friend_id, status, last_modified')
    .order('last_modified', { ascending: false })
    .limit(10)

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Notificaties</h1>

      <div className={styles.notifList}>
        {(!requests || requests.length === 0) && (
          <div className={styles.emptyState}>Geen notificaties.</div>
        )}
        {requests?.map((r) => (
          <div key={r.friend_id} className={styles.notifRow}>
            <div className={styles.notifLeft}>
              <div className={`${styles.notifDot} ${styles.notifDotUnread}`} />
              <p className={styles.notifMsg}>Vriendschapsverzoek status: {r.status}</p>
            </div>
            <span className={styles.notifTime}>
              {new Date(r.last_modified).toLocaleDateString('nl-NL')}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
