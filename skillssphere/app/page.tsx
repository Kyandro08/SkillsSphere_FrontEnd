export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      <h1 className="text-2xl font-bold text-zinc-900">Dashboard</h1>
      <p className="mt-1 text-zinc-500">Welkom bij SkillSphere! Dit is jouw activiteitenfeed.</p>

      <div className="mt-8 space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-lg border border-zinc-200 bg-white p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-zinc-200" />
              <div>
                <p className="text-sm font-medium text-zinc-900">Activiteit #{i}</p>
                <p className="text-xs text-zinc-500">2 uur geleden</p>
              </div>
            </div>
            <p className="mt-2 text-sm text-zinc-600">Nieuwe skill toegevoegd of verbinding gelegd.</p>
          </div>
        ))}
      </div>
    </div>
  )
}
