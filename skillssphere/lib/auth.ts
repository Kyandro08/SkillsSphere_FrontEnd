const SECRET = process.env.SESSION_SECRET || ''
const MAX_AGE = 86400

export type SessionData = {
  user_id: number
  username: string
  email: string
  is_admin: boolean
  exp: number
}

function toBase64url(input: ArrayBuffer | Uint8Array | string): string {
  if (typeof input === 'string') return btoa(input).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
  const bytes = input instanceof Uint8Array ? input : new Uint8Array(input)
  let binary = ''
  for (const b of bytes) binary += String.fromCharCode(b)
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function fromBase64url(str: string): Uint8Array {
  let b64 = str.replace(/-/g, '+').replace(/_/g, '/')
  while (b64.length % 4) b64 += '='
  const binary = atob(b64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
  return bytes
}

async function hmacSign(data: string): Promise<string> {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(SECRET), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data))
  return toBase64url(sig)
}

export async function signSession(data: Omit<SessionData, 'exp'>): Promise<string> {
  const payload = { ...data, exp: Date.now() + MAX_AGE * 1000 }
  const body = toBase64url(JSON.stringify(payload))
  const sig = await hmacSign(body)
  return `${body}.${sig}`
}

export async function verifySession(token: string): Promise<SessionData | null> {
  const [body, sig] = token.split('.')
  if (!body || !sig) return null
  const expected = await hmacSign(body)
  if (sig !== expected) return null
  try {
    const payload = JSON.parse(new TextDecoder().decode(fromBase64url(body)))
    if (payload.exp < Date.now()) return null
    return payload
  } catch {
    return null
  }
}

export function hashPassword(pw: string): string {
  const { createHash } = require('crypto')
  return createHash('sha256').update(pw).digest('hex')
}

export function setSessionCookie(token: string): string {
  return `ss_session=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${MAX_AGE}`
}

export function clearSessionCookie(): string {
  return 'ss_session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0'
}

export const COOKIE_NAME = 'ss_session'
