export default function NetworkPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      <h1 className="text-2xl font-bold text-zinc-900">Netwerk</h1>
      <p className="mt-1 text-zinc-500">Zoek medestudenten en leg verbindingen.</p>

      <div className="mt-6">
        <input
          type="text"
          placeholder="Zoek op naam of skill..."
          className="w-full rounded-lg border border-zinc-300 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none"
        />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="rounded-lg border border-zinc-200 bg-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-zinc-200" />
              <div>
                <p className="text-sm font-medium text-zinc-900">Student {i}</p>
                <p className="text-xs text-zinc-500">Frontend • Jaar 2</p>
              </div>
            </div>
            <button className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-indigo-700 transition-colors">
              + Verbinden
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
