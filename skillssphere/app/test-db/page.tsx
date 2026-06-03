import { supabase } from '@/lib/supabase'

export default async function TestDbPage() {
  const { data, error } = await supabase.storage.listBuckets()

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-green-600">Verbinding gelukt!</h1>
      {error ? (
        <p className="mt-4 text-red-600">{error.message}</p>
      ) : (
        <p className="mt-2 text-gray-600">Buckets: {JSON.stringify(data)}</p>
      )}
    </div>
  )
}
