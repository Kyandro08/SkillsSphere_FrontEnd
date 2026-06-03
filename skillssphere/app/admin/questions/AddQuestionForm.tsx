'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function AddQuestionForm() {
  const [skills, setSkills] = useState<any[]>([])
  const [skillId, setSkillId] = useState('')
  const [questionText, setQuestionText] = useState('')
  const [difficulty, setDifficulty] = useState(1)
  const [options, setOptions] = useState(['', '', '', ''])
  const [correctIdx, setCorrectIdx] = useState<number | null>(null)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    supabase.from('tb_skills').select('skill_id, skill_name, category').order('skill_name').then(({ data }) => {
      if (data) setSkills(data)
    })
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setMessage('')
    setError('')

    if (!skillId || !questionText || options.some(o => !o.trim()) || correctIdx === null) {
      setError('Vul alle velden in en selecteer het juiste antwoord.')
      return
    }

    const points = difficulty * 10
    const ts = new Date().toISOString()

    const { data: question, error: qErr } = await supabase
      .from('tb_questions')
      .insert({ skill_id: Number(skillId), question_text: questionText, difficulty, points, status: 1, last_modified: ts })
      .select('question_id')
      .single()

    if (qErr) { setError(qErr.message); return }

    const answerRows = options.map((text, i) => ({
      question_id: question.question_id,
      option_text: text,
      is_correct: i === correctIdx,
      last_modified: ts,
    }))

    const { error: aErr } = await supabase.from('tb_answer_options').insert(answerRows)

    if (aErr) { setError(aErr.message); return }

    setMessage(`Vraag toegevoegd (${points} punten)!`)
    setQuestionText('')
    setOptions(['', '', '', ''])
    setCorrectIdx(null)
    setDifficulty(1)
    router.refresh()
  }

  return (
    <div className="admin-section">
      <div className="admin-section-title">Vraag toevoegen</div>

      {message && <div className="admin-alert admin-alert-success">{message}</div>}
      {error && <div className="admin-alert admin-alert-error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="admin-row">
          <div className="admin-field">
            <label>Skill *</label>
            <select value={skillId} onChange={(e) => setSkillId(e.target.value)} required>
              <option value="">Selecteer skill</option>
              {skills.map((s) => (
                <option key={s.skill_id} value={s.skill_id}>{s.skill_name} ({s.category || 'geen categorie'})</option>
              ))}
            </select>
          </div>
          <div className="admin-field">
            <label>Moeilijkheid *</label>
            <select value={difficulty} onChange={(e) => setDifficulty(Number(e.target.value))}>
              {[1,2,3,4,5].map(d => (
                <option key={d} value={d}>{d} {d === 1 ? '(makkelijk)' : d === 5 ? '(moeilijk)' : ''}</option>
              ))}
            </select>
          </div>
          <div className="admin-field">
            <label>Punten</label>
            <input type="text" value={`${difficulty * 10} pts`} disabled />
          </div>
        </div>

        <div className="admin-field">
          <label>Vraag *</label>
          <textarea value={questionText} onChange={(e) => setQuestionText(e.target.value)} required rows={3} />
        </div>

        <div className="admin-section-title" style={{ marginTop: 24 }}>Antwoordopties</div>
        {options.map((opt, i) => (
          <div key={i} className="admin-field" style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <input
              type="radio"
              name="correct"
              checked={correctIdx === i}
              onChange={() => setCorrectIdx(i)}
              style={{ accentColor: '#b44dff', width: 18, height: 18, flexShrink: 0, cursor: 'pointer' }}
            />
            <input
              type="text"
              value={opt}
              onChange={(e) => setOptions(prev => { const next = [...prev]; next[i] = e.target.value; return next })}
              placeholder={`Optie ${i + 1}${i === 0 ? ' (juiste antwoord)' : ''}`}
              required
              style={{ flex: 1, background: 'rgba(255,255,255,0.06)', border: correctIdx === i ? '1px solid var(--accent)' : '1px solid var(--border)', borderRadius: 12, padding: '11px 14px', color: '#fff', fontFamily: 'DM Sans, sans-serif', fontSize: '0.93rem' }}
            />
            {correctIdx === i && <span style={{ color: '#76b900', fontSize: '0.78rem', flexShrink: 0 }}>✓ juist</span>}
          </div>
        ))}

        <button type="submit" className="admin-btn-primary" style={{ marginTop: 24 }}>Vraag toevoegen →</button>
      </form>
    </div>
  )
}
