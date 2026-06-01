import styles from '@/app/app.module.css'

const notifs = [
  { type: 'connection', message: 'Student B wil verbinden', time: '5 min geleden', unread: true },
  { type: 'badge', message: 'Je hebt een nieuwe badge verdient!', time: '1 uur geleden', unread: true },
  { type: 'challenge', message: 'Student C daagt je uit!', time: '3 uur geleden', unread: false },
  { type: 'quiz', message: 'Je PHP-quiz is gevalideerd', time: '1 dag geleden', unread: false },
]

export default function NotificationsPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Notificaties</h1>

      <div className={styles.notifList}>
        {notifs.map((n, i) => (
          <div key={i} className={`${styles.notifRow} ${n.unread ? styles.notifRowUnread : ''}`}>
            <div className={styles.notifLeft}>
              <div className={`${styles.notifDot} ${n.unread ? styles.notifDotUnread : styles.notifDotRead}`} />
              <p className={styles.notifMsg}>{n.message}</p>
            </div>
            <span className={styles.notifTime}>{n.time}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
