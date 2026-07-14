'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { fetchLevels } from '@/lib/levels'
import styles from '@/app/app.module.css'

type Question = {
  question_id: number
  question_text: string
  difficulty: number
  points: number
  tb_answer_options: { option_id: number; option_text: string; is_correct: boolean }[]
}

const TIERS = [
  { key: 0, label: 'Beginner', diffs: [1], desc: '5 vragen - moeilijkheid 1' },
  { key: 1, label: 'Intermediate', diffs: [2, 3], desc: '10 vragen - moeilijkheid 2-3' },
  { key: 2, label: 'Expert', diffs: [4, 5], desc: '10 vragen - moeilijkheid 4-5' },
]

export default function QuizPage() {
  const [user, setUser] = useState<any>(null)
  const [skills, setSkills] = useState<any[]>([])
  const [selectedSkill, setSelectedSkill] = useState<any>(null)
  const [tierCompleted, setTierCompleted] = useState(0)
  const [currentTier, setCurrentTier] = useState(0)
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentIdx, setCurrentIdx] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)
  const [correct, setCorrect] = useState(false)
  const [points, setPoints] = useState(0)
  const [tierPoints, setTierPoints] = useState(0)
  const [finished, setFinished] = useState(false)
  const [allDone, setAllDone] = useState(false)
  const [totalPoints, setTotalPoints] = useState(0)
  const [loading, setLoading] = useState(true)
  const [tierTransition, setTierTransition] = useState(false)
  const [levels, setLevels] = useState<any[]>([])

  useEffect(() => {
    fetch('/api/auth/me').then(r => r.ok ? r.json() : null).then(d => {
      if (!d?.user) return
      setUser(d.user)
      Promise.all([
        supabase.from('tb_skills').select('*').eq('status', 1),
        fetchLevels(),
      ]).then(([{ data }, lvls]) => {
        if (data) setSkills(data)
        setLevels(lvls)
        setLoading(false)
      })
    }).catch(() => setLoading(false))
  }, [])

  async function startQuiz(skill: any) {
    setSelectedSkill(skill)
    setPoints(0)
    setTotalPoints(0)
    setAllDone(false)

    const { data: us } = await supabase.from('tb_user_skills')
      .select('tier_completed')
      .eq('user_id', user.user_id)
      .eq('skill_id', skill.skill_id)
      .maybeSingle()

    const tc = us?.tier_completed ?? 0
    setTierCompleted(tc)
    setCurrentTier(tc)
    setTierTransition(false)
    setFinished(false)
    await loadTier(tc, skill)
  }

  async function loadTier(tier: number, skill?: any) {
    const s = skill || selectedSkill
    if (tier >= TIERS.length) {
      setAllDone(true)
      setQuestions([])
      return
    }
    const t = TIERS[tier]
    setCurrentTier(tier)
    setCurrentIdx(0)
    setTierPoints(0)
    setSelectedOption(null)
    setAnswered(false)
    setFinished(false)
    setTierTransition(false)

    const { data: qs } = await supabase
      .from('tb_questions')
      .select('*, tb_answer_options(*)')
      .eq('skill_id', s.skill_id)
      .in('difficulty', t.diffs)
      .order('difficulty')

    if (qs && qs.length > 0) {
      const shuffledQs = [...qs].sort(() => Math.random() - 0.5)
      const withShuffledOptions = shuffledQs.map(q => ({
        ...q,
        tb_answer_options: [...q.tb_answer_options].sort(() => Math.random() - 0.5)
      }))
      setQuestions(withShuffledOptions)
    } else {
      setQuestions([])
    }
  }

  function handleAnswer(optionId: number) {
    if (answered) return
    setSelectedOption(optionId)
    const q = questions[currentIdx]
    const isCorrect = q.tb_answer_options.find(o => o.option_id === optionId)?.is_correct
    setCorrect(!!isCorrect)
    if (isCorrect) {
      setPoints(prev => prev + q.points)
      setTierPoints(prev => prev + q.points)
    }
    setAnswered(true)
  }

  async function nextQuestion() {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1)
      setSelectedOption(null)
      setAnswered(false)
    } else {
      await saveTierProgress()
      setTierTransition(true)
    }
  }

  function calcLevelId(total: number): number {
    let lid = levels[0]?.level_id || 4
    for (const l of levels) {
      if (total >= l.min_points) lid = l.level_id
    }
    return lid
  }

  async function saveTierProgress() {
    if (!user || !selectedSkill) return 0

    const ts = new Date().toISOString()
    const { data: existing } = await supabase
      .from('tb_user_skills')
      .select('*')
      .eq('user_id', user.user_id)
      .eq('skill_id', selectedSkill.skill_id)
      .maybeSingle()

    const nextTc = Math.max(tierCompleted, currentTier + 1)
    let newPoints: number

    if (existing) {
      newPoints = existing.points_earned + tierPoints
      const levelId = calcLevelId(newPoints)
      await supabase.from('tb_user_skills').update({
        points_earned: newPoints, level_id: levelId,
        tier_completed: nextTc, last_modified: ts,
      }).eq('user_id', user.user_id).eq('skill_id', selectedSkill.skill_id)
    } else {
      newPoints = tierPoints
      const levelId = calcLevelId(tierPoints)
      await supabase.from('tb_user_skills').insert({
        user_id: user.user_id, skill_id: selectedSkill.skill_id,
        points_earned: tierPoints, level_id: levelId,
        tier_completed: nextTc, status: 1, last_modified: ts,
      })
    }

    setTierCompleted(nextTc)
    setTotalPoints(newPoints)
    return newPoints
  }

  async function advanceTier() {
    const nextTier = currentTier + 1
    setTierTransition(false)

    if (nextTier >= TIERS.length) {
      setAllDone(true)
      setQuestions([])
    } else {
      await loadTier(nextTier)
    }
  }

  if (loading) return <div className={styles.page}><p style={{ color: 'rgba(255,255,255,0.4)' }}>Laden...</p></div>

  if (!selectedSkill) {
    return (
      <div className={styles.page}>
        <h1 className={styles.title}>Skills testen</h1>
        <p className={styles.subtitle}>Kies een vaardigheid om te oefenen.</p>
        <div className={styles.skillGrid}>
          {skills.map(s => (
            <div key={s.skill_id} className={styles.skillCard} onClick={() => startQuiz(s)}>
              <div className={styles.skillCardIcon}>
                {s.logo ? (
                  <img src={s.logo} alt={s.skill_name} className={styles.skillIconImg} />
                ) : (
                  <span className={styles.skillIconFallback}>{s.skill_name[0]?.toUpperCase() || '?'}</span>
                )}
              </div>
              <div className={styles.skillCardName}>{s.skill_name}</div>
              <div className={styles.skillCardCat}>{s.category || ''}</div>
            </div>
          ))}
          {skills.length === 0 && <div className={styles.emptyState}>Nog geen skills beschikbaar.</div>}
        </div>
      </div>
    )
  }

  if (allDone) {
    return (
      <div className={styles.page}>
        <div className={styles.quizWrap}>
          <div className={styles.scorecard}>
            <div className={styles.scoreBig}>{totalPoints}</div>
            <div className={styles.scoreLabel}>totale punten</div>
            <div className={styles.scoreSkillName}>{selectedSkill.skill_name}</div>
            <div className={styles.tierBadgeAll}>Alle niveaus voltooid</div>
            <button onClick={() => startQuiz(selectedSkill)} className={styles.scoreBackBtn}>Opnieuw beginnen</button>
            <button onClick={() => { setSelectedSkill(null); setQuestions([]) }} className={styles.scoreBackBtn} style={{ marginTop: 8 }}>Terug naar overzicht</button>
          </div>
        </div>
      </div>
    )
  }

  if (tierTransition) {
    const tier = TIERS[currentTier]
    const nextTier = TIERS[currentTier + 1]
    return (
      <div className={styles.page}>
        <div className={styles.quizWrap}>
          <div className={styles.tierCompleteCard}>
            <div className={styles.tierCompleteIcon}>{'v'}</div>
            <h2 className={styles.tierCompleteTitle}>{tier.label} voltooid</h2>
            <p className={styles.tierCompletePoints}>+{tierPoints} punten verdiend</p>
            {nextTier ? (
              <>
                <p className={styles.tierCompleteDesc}>
                  Je hebt {tier.label} afgerond. Klaar voor de volgende stap?
                </p>
                <button onClick={advanceTier} className={styles.quizNextBtn}>
                  Start {nextTier.label}
                </button>
              </>
            ) : (
              <button onClick={advanceTier} className={styles.quizNextBtn}>
                Resultaten bekijken
              </button>
            )}
            <button onClick={() => { setSelectedSkill(null); setQuestions([]); setAllDone(false) }}
              className={styles.scoreBackBtn} style={{ marginTop: 12 }}>
              Terug naar overzicht
            </button>
          </div>
        </div>
      </div>
    )
  }

  const q = questions[currentIdx]
  if (!q) {
    return (
      <div className={styles.page}>
        <div className={styles.quizWrap}>
          <h1 className={styles.title}>{selectedSkill.skill_name}</h1>
          <div className={styles.emptyState}>Nog geen vragen voor dit niveau.</div>
          <button onClick={() => setSelectedSkill(null)} className={styles.scoreBackBtn} style={{ marginTop: 16 }}>Terug</button>
        </div>
      </div>
    )
  }

  const progress = ((currentIdx) / questions.length) * 100
  const tier = TIERS[currentTier]

  return (
    <div className={styles.page}>
      <div className={styles.quizWrap}>
        <div style={{ textAlign: 'center' }}><span className={styles.tierBadge}>{tier.label}</span></div>

        <div className={styles.quizProgress}>
          <div className={styles.quizProgressFill} style={{ width: `${progress}%` }} />
        </div>

        <div className={styles.quizMeta}>
          <div className={styles.quizSkill}>{selectedSkill.skill_name}</div>
          <div className={styles.quizCounter}>Vraag {currentIdx + 1} van {questions.length}</div>
        </div>

        <div className={styles.quizCard}>
          <div className={styles.quizDifficulty}>Moeilijkheid {q.difficulty}/5 &bull; {q.points} punten</div>
          <h2 className={styles.quizQuestion}>{q.question_text}</h2>
        </div>

        <div className={styles.quizOptions}>
          {q.tb_answer_options.map(o => {
            let className = styles.quizOption
            if (answered) {
              if (o.is_correct) className += ` ${styles.quizOptionCorrect}`
              else if (o.option_id === selectedOption) className += ` ${styles.quizOptionWrong}`
            }
            return (
              <button key={o.option_id} onClick={() => handleAnswer(o.option_id)}
                disabled={answered} className={className}>
                {answered && o.is_correct && <span className={styles.quizOptIcon}>{'ˇ'}</span>}
                {answered && o.option_id === selectedOption && !o.is_correct && <span className={styles.quizOptIcon}>{'x'}</span>}
                {o.option_text}
              </button>
            )
          })}
        </div>

        {answered && (
          <div className={styles.quizFeedback}>
            <div className={styles.quizFeedbackIcon}>
              <span className={correct ? styles.quizIconCorrect : styles.quizIconWrong}>
                {correct ? 'Goed!' : 'Fout'}
              </span>
            </div>
            <p className={`${styles.quizFeedbackText} ${correct ? styles.quizFeedbackCorrect : styles.quizFeedbackWrong}`}>
              {correct ? `+${q.points} punten` : 'Het juiste antwoord is anders.'}
            </p>
            <button onClick={nextQuestion} className={styles.quizNextBtn}>
              {currentIdx < questions.length - 1 ? 'Volgende vraag' : 'Niveau afronden'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
