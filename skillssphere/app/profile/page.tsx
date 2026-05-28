export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      <div className="rounded-lg border border-zinc-200 bg-white p-6">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center text-2xl font-bold text-indigo-600">
            J
          </div>
          <div>
            <h1 className="text-xl font-bold text-zinc-900">Jouw Naam</h1>
            <p className="text-sm text-zinc-500">SD Student • Jaar 2</p>
            <p className="mt-1 text-sm text-zinc-400">Totaal punten: 0</p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold text-zinc-900">Mijn Skills</h2>
        <div className="mt-3 rounded-lg border border-zinc-200 bg-white p-6 text-center text-sm text-zinc-400">
          Nog geen skills toegevoegd. Wacht op de backend tabellen om skills te kunnen registreren.
        </div>
      </div>
    </div>
  )
}
