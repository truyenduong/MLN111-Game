import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, BookOpen, Check, ChevronRight, CircleHelp, Clock3, Layers3, RotateCcw, Sparkles, Target, X, Zap } from 'lucide-react'
import { knowledgeChapters } from './data/knowledge'
import { questions, stages, type Question } from './data/questions'

type Screen = 'home' | 'game' | 'result' | 'knowledge' | 'detail'
type AnswerRecord = { questionId: number; selectedAnswer: string; correctAnswer: string; isCorrect: boolean }
type SavedGame = { index: number; score: number; records: AnswerRecord[]; startedAt: number }

const STORAGE_KEY = 'matrix_knowledge_game'
const readSaved = (): SavedGame | null => {
  try { return JSON.parse(localStorage.getItem(`${STORAGE_KEY}:progress`) || 'null') } catch { return null }
}
const formatTime = (seconds: number) => `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`

function Header({ screen, onNavigate }: { screen: Screen; onNavigate: (screen: Screen) => void }) {
  return <header className="topbar">
    <button className="brand" onClick={() => onNavigate('home')} aria-label="Về trang chủ"><span className="brand-mark">✦</span><span>THE MATRIX<br /><b>OF KNOWLEDGE</b></span></button>
    <nav className="nav-links" aria-label="Điều hướng chính">
      <button className={screen === 'home' ? 'active' : ''} onClick={() => onNavigate('home')}>HOME</button>
      <button className={screen === 'knowledge' || screen === 'detail' ? 'active' : ''} onClick={() => onNavigate('knowledge')}>KNOWLEDGE</button>
      <button className={screen === 'result' ? 'active' : ''} onClick={() => onNavigate('result')}>RESULT</button>
    </nav>
    <div className="status-dot"><span /> LOCAL MODE</div>
  </header>
}

function Stat({ label, value, icon }: { label: string; value: string | number; icon: React.ReactNode }) {
  return <div className="stat"><span className="stat-icon">{icon}</span><span><small>{label}</small><strong>{value}</strong></span></div>
}

function Home({ onStart, onKnowledge, hasSaved }: { onStart: (resume?: boolean) => void; onKnowledge: () => void; hasSaved: boolean }) {
  return <main className="home-shell page-enter">
    <section className="hero-grid">
      <div className="hero-copy">
        <div className="eyebrow"><span className="pulse" /> COGNITIVE EXPLORATION / 001</div>
        <h1>THE MATRIX<br /><em>OF KNOWLEDGE</em></h1>
        <p className="hero-title">HÀNH TRÌNH GIẢI MÃ NHẬN THỨC</p>
        <p className="hero-subtitle">5 chặng · 25 thử thách · 1 hành trình khám phá nhận thức</p>
        <div className="hero-actions"><button className="primary-button" onClick={() => onStart(false)}><Zap size={17} /> BẮT ĐẦU HÀNH TRÌNH</button>{hasSaved && <button className="secondary-button" onClick={() => onStart(true)}><RotateCcw size={16} /> TIẾP TỤC</button>}<button className="text-button" onClick={onKnowledge}><BookOpen size={17} /> ÔN TẬP KIẾN THỨC <ArrowRight size={16} /></button></div>
      </div>
      <div className="matrix-orbit" aria-label="Vòng tròn nhận thức">
        <div className="orbit-ring ring-one" /><div className="orbit-ring ring-two" /><div className="orbit-node node-top">THỰC<br />TIỄN</div><div className="orbit-node node-right">LÝ<br />TÍNH</div><div className="orbit-node node-bottom">CHÂN<br />LÝ</div><div className="orbit-node node-left">CẢM<br />TÍNH</div><div className="orbit-core"><span>∞</span><small>REASON<br />ENGINE</small></div>
      </div>
    </section>
    <section className="home-lower"><div className="section-label">THE PATH / 05 STAGES</div><div className="stage-list">{stages.map((stage, index) => <div className="stage-row" key={stage}><span className="stage-number">0{index + 1}</span><span>{stage}</span><span className="stage-arrow">↗</span></div>)}</div><div className="home-stats"><Stat label="QUESTIONS" value="25" icon={<CircleHelp size={18} />} /><Stat label="STAGES" value="05" icon={<Layers3 size={18} />} /><Stat label="KNOWLEDGE MATRIX" value="∞" icon={<Sparkles size={18} />} /></div></section>
  </main>
}

function ScoreBoard({ score, records, elapsed }: { score: number; records: AnswerRecord[]; elapsed: number }) {
  return <div className="scoreboard"><Stat label="ĐIỂM" value={score} icon={<Sparkles size={17} />} /><Stat label="CÂU ĐÚNG" value={records.filter(r => r.isCorrect).length} icon={<Check size={17} />} /><Stat label="CÂU SAI" value={records.filter(r => !r.isCorrect).length} icon={<X size={17} />} /><Stat label="THỜI GIAN" value={formatTime(elapsed)} icon={<Clock3 size={17} />} /></div>
}

function Game({ onFinish }: { onFinish: (score: number, records: AnswerRecord[], elapsed: number) => void }) {
  const saved = readSaved()
  const [index, setIndex] = useState(saved?.index ?? 0)
  const [score, setScore] = useState(saved?.score ?? 0)
  const [records, setRecords] = useState<AnswerRecord[]>(saved?.records ?? [])
  const [selected, setSelected] = useState<string | null>(null)
  const [stageCleared, setStageCleared] = useState(false)
  const [startedAt] = useState(saved?.startedAt ?? Date.now())
  const [elapsed, setElapsed] = useState(0)
  const question = questions[index]
  const answered = selected !== null
  const isCorrect = selected === question?.correctAnswer
  const currentStage = question?.stage ?? 1
  const stageRecords = records.filter(record => questions.find(q => q.id === record.questionId)?.stage === currentStage)

  useEffect(() => { const timer = window.setInterval(() => setElapsed(Math.floor((Date.now() - startedAt) / 1000)), 1000); return () => window.clearInterval(timer) }, [startedAt])
  useEffect(() => { const progress: SavedGame = { index, score, records, startedAt }; localStorage.setItem(`${STORAGE_KEY}:progress`, JSON.stringify(progress)) }, [index, score, records, startedAt])
  if (!question) return null

  const choose = (key: string) => { if (!answered) setSelected(key) }
  const next = () => {
    if (!answered) return
    const record = { questionId: question.id, selectedAnswer: selected, correctAnswer: question.correctAnswer, isCorrect }
    const nextRecords = [...records.filter(item => item.questionId !== question.id), record]
    const nextScore = score + (isCorrect ? 10 : 0)
    setRecords(nextRecords); setScore(nextScore); setSelected(null)
    if ((question.id % 5 === 0) && question.id !== 25) {
      const completedStages = JSON.parse(localStorage.getItem(`${STORAGE_KEY}:completed-stages`) || '[]') as number[]
      if (!completedStages.includes(currentStage)) localStorage.setItem(`${STORAGE_KEY}:completed-stages`, JSON.stringify([...completedStages, currentStage]))
      setStageCleared(true)
    }
    else if (question.id === 25) { localStorage.removeItem(`${STORAGE_KEY}:progress`); onFinish(nextScore, nextRecords, Math.floor((Date.now() - startedAt) / 1000)) }
    else setIndex(index + 1)
  }
  const continueStage = () => { setStageCleared(false); setIndex(index + 1) }
  if (stageCleared) return <main className="game-shell page-enter"><div className="stage-clear"><div className="clear-symbol"><Check size={32} /></div><div className="eyebrow">STAGE CLEARED / 0{currentStage}</div><h2>CHẶNG {currentStage} ĐÃ<br /><em>HOÀN THÀNH</em></h2><p>Bạn đã vượt qua {stages[currentStage - 1].toLowerCase()}.</p><div className="clear-score">05 <span>/ 05 câu</span></div><button className="primary-button" onClick={continueStage}>TIẾP TỤC <ArrowRight size={17} /></button></div></main>
  return <main className="game-shell page-enter"><div className="game-heading"><div><div className="eyebrow">THE MATRIX OF KNOWLEDGE / CHẶNG 0{currentStage}</div><h2>{stages[currentStage - 1]}</h2></div><div className="question-count">CÂU <b>{String(question.id).padStart(2, '0')}</b> / 25</div></div><div className="progress-track"><span style={{ width: `${(question.id / 25) * 100}%` }} /></div><ScoreBoard score={score} records={records} elapsed={elapsed} /><div className={`question-panel ${answered ? (isCorrect ? 'correct' : 'incorrect') : ''}`}><div className="question-meta"><span>{question.id === 25 ? '🔥 FINAL BOSS' : `NODE 0${question.id}`}</span><span>{question.stageTitle}</span></div><h3>{question.question}</h3><div className="answers">{question.options.map(option => <button key={option.key} className={`answer-option ${selected === option.key ? 'selected' : ''} ${answered && option.key === question.correctAnswer ? 'right' : ''} ${answered && selected === option.key && !isCorrect ? 'wrong' : ''}`} onClick={() => choose(option.key)} disabled={answered}><span className="answer-key">{option.key}</span><span>{option.text}</span>{answered && option.key === question.correctAnswer && <Check size={18} />}{answered && selected === option.key && !isCorrect && <X size={18} />}</button>)}</div>{answered && <div className="explanation"><div className="result-line"><strong>{isCorrect ? '✓ CHÍNH XÁC!' : '✕ CHƯA CHÍNH XÁC'}</strong>{isCorrect && <span>+10 điểm</span>}</div><p className="correct-answer">ĐÁP ÁN ĐÚNG: {question.correctAnswer}</p><p>{question.explanation}</p><div className="knowledge-chips"><b>🧠 KIẾN THỨC CẦN NHỚ</b>{question.keyKnowledge.map(item => <span key={item}>{item}</span>)}</div><button className="primary-button next-button" onClick={next}>{question.id === 25 ? 'HOÀN TẤT HÀNH TRÌNH' : 'CÂU TIẾP THEO'} <ArrowRight size={17} /></button></div>}</div></main>
}

function Result({ score, records, elapsed, onReplay, onKnowledge }: { score: number; records: AnswerRecord[]; elapsed: number; onReplay: () => void; onKnowledge: () => void }) {
  const correct = records.filter(r => r.isCorrect).length
  const missedTopics = [...new Set(records.filter(r => !r.isCorrect).map(record => questions.find(q => q.id === record.questionId)?.stageTitle).filter(Boolean))]
  return <main className="result-shell page-enter"><div className="result-hero"><div className="eyebrow"><span className="pulse" /> MISSION COMPLETE / 025</div><h1>HÀNH TRÌNH<br /><em>HOÀN TẤT</em></h1><p>Nhận thức không kết thúc ở câu trả lời. Nó quay trở lại thực tiễn để mở ra vấn đề mới.</p><div className="result-actions"><button className="primary-button" onClick={onReplay}><RotateCcw size={17} /> CHƠI LẠI</button><button className="secondary-button" onClick={onKnowledge}><BookOpen size={17} /> ÔN TẬP KIẾN THỨC</button></div></div><div className="result-score"><div className="score-orb"><strong>{score}</strong><span>/ 250</span></div><div><div className="accuracy">{Math.round((correct / 25) * 100)}% <small>CHÍNH XÁC</small></div><p><Check size={15} /> Câu đúng: {correct} <br /><X size={15} /> Câu sai: {25 - correct} <br /><Clock3 size={15} /> Thời gian: {formatTime(elapsed)}</p></div></div><section className="result-section"><div className="section-label">ANALYSIS / STAGE PERFORMANCE</div><div className="stage-results">{stages.map((stage, i) => { const stageCorrect = records.filter(r => r.isCorrect && questions.find(q => q.id === r.questionId)?.stage === i + 1).length; return <div className="stage-result" key={stage}><div><b>0{i + 1}</b><span>{stage}</span></div><strong>{stageCorrect} <small>/ 5</small></strong><div className="mini-track"><span style={{ width: `${stageCorrect * 20}%` }} /></div></div> })}</div></section><section className="result-section review-section"><div className="section-label">KNOWLEDGE SIGNAL / REVIEW</div>{missedTopics.length ? <><h2>Kiến thức cần ôn lại</h2><p>Bạn sai nhiều ở những chặng sau:</p><div className="missed-list">{missedTopics.map((topic, i) => <span key={topic}>{i + 1} <b>{topic}</b></span>)}</div></> : <><h2>Tất cả tín hiệu đều sáng.</h2><p>Bạn đã trả lời chính xác toàn bộ 25 thử thách.</p></>}</section><KnowledgeMap /></main>
}

function KnowledgeMap() { return <section className="knowledge-map"><div className="section-label">THE KNOWLEDGE LOOP</div><h2>VÒNG TRÒN NHẬN THỨC</h2><div className="loop-flow">{['THỰC TIỄN', 'CẢM TÍNH', 'LÝ TÍNH', 'CHÂN LÝ', 'THỰC TIỄN', 'VẤN ĐỀ MỚI'].map((item, i) => <span key={`${item}-${i}`}><b>{item}</b>{i < 5 && <i>↓</i>}</span>)}</div><p>Nhận thức bắt đầu từ thực tiễn, phát triển qua cảm tính và lý tính, được kiểm nghiệm trong thực tiễn rồi tiếp tục phát triển khi thực tiễn đặt ra những vấn đề mới.</p></section> }

function Knowledge({ onDetail }: { onDetail: (id: number) => void }) { return <main className="knowledge-shell page-enter"><div className="knowledge-intro"><div className="eyebrow">ARCHIVE / 005 CHAPTERS</div><h1>ÔN TẬP<br /><em>KIẾN THỨC</em></h1><p>Mở từng căn phòng để lắp lại bản đồ nhận thức trước khi bước vào mê cung.</p></div><div className="chapter-grid">{knowledgeChapters.map(chapter => <button className="chapter-card" key={chapter.id} onClick={() => onDetail(chapter.id)}><span className="chapter-icon">{chapter.icon}</span><div><span className="section-label">CHAPTER {chapter.icon}</span><h2>{chapter.title}</h2><p>{chapter.concept}</p></div><ChevronRight /></button>)}</div><KnowledgeMap /></main> }

function Detail({ id, onBack }: { id: number; onBack: () => void }) { const chapter = knowledgeChapters.find(item => item.id === id) || knowledgeChapters[0]; return <main className="detail-shell page-enter"><button className="back-button" onClick={onBack}><ArrowLeft size={16} /> TẤT CẢ CHƯƠNG</button><div className="detail-header"><span className="chapter-icon">{chapter.icon}</span><div><div className="eyebrow">KNOWLEDGE DETAIL / CHAPTER {chapter.icon}</div><h1>{chapter.title}</h1></div></div><div className="detail-grid"><article><span className="section-label">01 / KHÁI NIỆM</span><h2>Điểm xuất phát</h2><p className="lead">{chapter.concept}</p><span className="section-label">02 / NỘI DUNG CHÍNH</span>{chapter.points.map(point => <p className="detail-point" key={point}><Check size={16} /> {point}</p>)}</article><aside><span className="section-label">03 / CẤU TRÚC</span><div className="forms">{chapter.forms.map((form, i) => <div key={form}><b>0{i + 1}</b>{form}{i < chapter.forms.length - 1 && <i>↓</i>}</div>)}</div><span className="section-label">04 / VÍ DỤ THỰC TẾ</span><p className="example-box">{chapter.example}</p></aside></div><div className="detail-bottom"><div><span className="section-label">05 / ĐIỀU CẦN NHỚ</span><p>{chapter.remember}</p></div><div><span className="section-label">06 / LỖI DỄ NHẦM</span><p>{chapter.pitfalls}</p></div></div></main> }

export default function App() {
  const [screen, setScreen] = useState<Screen>('home')
  const [detailId, setDetailId] = useState(1)
  const [result, setResult] = useState({ score: 0, records: [] as AnswerRecord[], elapsed: 0 })
  const saved = useMemo(() => readSaved(), [screen])
  const start = (resume = false) => { if (!resume) localStorage.removeItem(`${STORAGE_KEY}:progress`); setScreen('game') }
  const finish = (score: number, records: AnswerRecord[], elapsed: number) => { setResult({ score, records, elapsed }); localStorage.setItem(`${STORAGE_KEY}:last`, JSON.stringify({ score, accuracy: Math.round(records.filter(r => r.isCorrect).length / 25 * 100) })); setScreen('result') }
  return <><Header screen={screen} onNavigate={setScreen} />{screen === 'home' && <Home onStart={start} onKnowledge={() => setScreen('knowledge')} hasSaved={Boolean(saved)} />}{screen === 'game' && <Game onFinish={finish} />}{screen === 'result' && <Result {...result} onReplay={() => start(false)} onKnowledge={() => setScreen('knowledge')} />}{screen === 'knowledge' && <Knowledge onDetail={(id) => { setDetailId(id); setScreen('detail') }} />}{screen === 'detail' && <Detail id={detailId} onBack={() => setScreen('knowledge')} />}</>
}
