import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import AddQuestionForm from './AddQuestionForm'

export default async function AdminQuestionsPage() {
  const { data: questions } = await supabase
    .from('tb_questions')
    .select('*, tb_skills(skill_name), tb_answer_options(*)')
    .order('question_id', { ascending: false })

  return (
    <>
      <Link href="/admin" className="admin-back">← Terug naar dashboard</Link>

      <div className="admin-page-header">
        <h1>Vragen</h1>
        <p>Beheer vragen en antwoordopties per skill</p>
      </div>

      <AddQuestionForm />

      <div className="admin-section">
        <div className="admin-section-title">Alle vragen</div>

        {(!questions || questions.length === 0) ? (
          <div className="admin-empty">Geen vragen gevonden.</div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Skill</th>
                  <th>Vraag</th>
                  <th>Niveau</th>
                  <th>Antwoorden</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {questions.map((q: any) => (
                  <tr key={q.question_id}>
                    <td>{q.question_id}</td>
                    <td>{q.tb_skills?.skill_name || '-'}</td>
                    <td>{q.question_text}</td>
                    <td>{q.difficulty} ({q.points} pts)</td>
                    <td>
                      {(q.tb_answer_options || []).map((o: any) => (
                        <div key={o.option_id} style={{ color: o.is_correct ? '#76b900' : 'rgba(255,255,255,0.5)', fontSize: '0.82rem' }}>
                          {o.is_correct ? '✓ ' : '○ '}{o.option_text}
                        </div>
                      ))}
                    </td>
                    <td>
                      <span className={`admin-badge ${q.status === 1 ? 'admin-badge-active' : 'admin-badge-inactive'}`}>
                        {q.status === 1 ? 'Actief' : 'Inactief'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  )
}
