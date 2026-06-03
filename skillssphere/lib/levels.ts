import { supabase } from './supabase'

export type Level = {
  level_id: number
  level_name: string
  min_points: number
  description?: string
}

export async function fetchLevels(): Promise<Level[]> {
  const { data } = await supabase
    .from('tb_levels')
    .select('level_id, level_name, min_points, description')
    .eq('status', 1)
    .order('min_points', { ascending: true })
  return data || []
}

export function determineLevel(levels: Level[], points: number): Level {
  let result = levels[0] || { level_id: 4, level_name: 'Beginner', min_points: 0 }
  for (const l of levels) {
    if (points >= l.min_points) result = l
  }
  return result
}

export function getLevelProgress(levels: Level[], points: number): { percent: number; label: string } {
  const current = determineLevel(levels, points)
  const idx = levels.findIndex(l => l.level_id === current.level_id)
  const next = levels[idx + 1]

  if (!next) return { percent: 100, label: 'Max level' }

  const range = next.min_points - current.min_points
  const progress = points - current.min_points
  const percent = range > 0 ? Math.min(100, (progress / range) * 100) : 100
  const label = `${points} / ${next.min_points}`

  return { percent, label }
}
