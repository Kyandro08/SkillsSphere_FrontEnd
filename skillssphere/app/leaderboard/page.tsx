export default function LeaderboardPage() {
  const rankings = [
    { rank: 1, name: "Student A", points: 2450 },
    { rank: 2, name: "Student B", points: 2100 },
    { rank: 3, name: "Student C", points: 1890 },
    { rank: 4, name: "Student D", points: 1620 },
    { rank: 5, name: "Student E", points: 1340 },
  ]

  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      <h1 className="text-2xl font-bold text-zinc-900">Leaderboard</h1>
      <p className="mt-1 text-zinc-500">Wie heeft de meeste punten?</p>

      <div className="mt-8 space-y-2">
        {rankings.map((s) => (
          <div key={s.rank} className="flex items-center justify-between rounded-lg border border-zinc-200 bg-white px-4 py-3">
            <div className="flex items-center gap-4">
              <span className={`w-8 text-center text-lg font-bold ${s.rank <= 3 ? 'text-indigo-600' : 'text-zinc-400'}`}>
                {s.rank}
              </span>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-zinc-200" />
                <span className="text-sm font-medium text-zinc-900">{s.name}</span>
              </div>
            </div>
            <span className="text-sm font-semibold text-zinc-700">{s.points} pts</span>
          </div>
        ))}
      </div>
    </div>
  )
}
