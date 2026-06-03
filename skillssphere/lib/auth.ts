export async function hashPassword(pw: string): Promise<string> {
  const enc = new TextEncoder().encode(pw)
  const buf = await crypto.subtle.digest('SHA-256', enc)
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')
}

export function setSession(userData: { user_id: number; username: string; email: string }) {
  const json = JSON.stringify(userData)
  localStorage.setItem('ss_user', json)
  document.cookie = `ss_session=${json}; path=/; max-age=86400`
}
