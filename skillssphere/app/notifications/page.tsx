export default function NotificationsPage() {
  const notifs = [
    { type: 'connection', message: 'Student B wil verbinden', time: '5 min geleden', unread: true },
    { type: 'badge', message: 'Je hebt een nieuwe badge verdient!', time: '1 uur geleden', unread: true },
    { type: 'challenge', message: 'Student C daagt je uit!', time: '3 uur geleden', unread: false },
    { type: 'quiz', message: 'Je PHP-quiz is gevalideerd', time: '1 dag geleden', unread: false },
  ]

  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      <h1 className="text-2xl font-bold text-zinc-900">Notificaties</h1>

      <div className="mt-6 space-y-2">
        {notifs.map((n, i) => (
          <div key={i} className={`rounded-lg border bg-white px-4 py-3 flex items-center justify-between ${n.unread ? 'border-indigo-200 bg-indigo-50' : 'border-zinc-200'}`}>
            <div className="flex items-center gap-3">
              <div className={`h-2 w-2 rounded-full ${n.unread ? 'bg-indigo-600' : 'bg-transparent'}`} />
              <p className="text-sm text-zinc-700">{n.message}</p>
            </div>
            <span className="text-xs text-zinc-400">{n.time}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
