import { useEffect, useState } from 'react'
import { USAGE } from '../lib/config'
import { useInView, usePrefersReducedMotion } from '../lib/hooks'
import { Icon } from './primitives'

/**
 * The Ask AI screen, played rather than photographed.
 *
 * It was a still capture of the app's limit screen. This runs the same
 * exchange as a sequence — the question types itself into the composer, sends,
 * the assistant thinks and answers, a second question goes in, and the app's
 * own "Free limit reached" banner drops in on top. Every line of copy is the
 * one in that capture; only the timing is added.
 *
 * The loop starts when the frame is scrolled into view and never runs off
 * screen. Under `prefers-reduced-motion` it renders the finished state
 * directly, which is exactly what the screenshot showed.
 */

const BOOK = 'The Magic Of Mindful Self-Awareness'
const Q1 = 'What are the main ideas of this book?'
const A1 =
  'Great question about "The Power of Illusion"! The book explains how mindful self-awareness helps you understand your thoughts and emotions, stay present, break automatic reactions, and live with more clarity and inner peace.'
const Q2 = 'Can you summarize the key takeaways?'

/** Phase order, with how long each holds before the next one begins. */
const PHASES = [
  { name: 'idle', ms: 700 },
  { name: 'typeQ1', typing: Q1 },
  { name: 'sentQ1', ms: 450 },
  { name: 'thinking1', ms: 1000 },
  { name: 'answer', ms: 3200 },
  { name: 'typeQ2', typing: Q2 },
  { name: 'sentQ2', ms: 450 },
  { name: 'thinking2', ms: 1300 },
  { name: 'limit', ms: 4200 },
]
const CHAR_MS = 32
const LAST = PHASES.length - 1

function Bubble({ from, children, delay = 0 }) {
  const user = from === 'user'
  return (
    <div className={`chat-pop flex ${user ? 'justify-end' : 'justify-start'}`} style={{ animationDelay: `${delay}ms` }}>
      <p
        className={`max-w-[86%] px-3 py-2 text-[10.5px] leading-snug ${
          user ? 'rounded-2xl rounded-br-md' : 'rounded-2xl rounded-tl-md'
        }`}
        style={
          user
            ? { backgroundColor: '#276b54', color: '#fff' }
            : { backgroundColor: '#fff', color: '#1b1b1d' }
        }
      >
        {children}
      </p>
    </div>
  )
}

export default function AskAiChat() {
  const [ref, inView] = useInView(0.4)
  const reduced = usePrefersReducedMotion()
  const [phase, setPhase] = useState(0)
  // Tagged with the phase it belongs to, so a phase change clears the composer
  // by itself — no reset write on every effect run.
  const [typing, setTyping] = useState({ phase: -1, text: '' })

  // One timer per phase: typing phases tick per character, the rest just hold.
  useEffect(() => {
    if (!inView || reduced) return
    const step = PHASES[phase]
    const advance = () => setPhase((p) => (p >= LAST ? 0 : p + 1))

    if (step.typing) {
      let i = 0
      const id = setInterval(() => {
        i += 1
        setTyping({ phase, text: step.typing.slice(0, i) })
        if (i >= step.typing.length) {
          clearInterval(id)
          setTimeout(advance, 420)
        }
      }, CHAR_MS)
      return () => clearInterval(id)
    }

    const id = setTimeout(advance, step.ms)
    return () => clearTimeout(id)
  }, [phase, inView, reduced])

  // Until the loop is actually running — off screen, reduced motion, or an
  // IntersectionObserver that never fires — the mock shows the end of the
  // sequence, which is exactly what the old still capture showed. It is never
  // blank, whatever happens to the animation.
  const running = inView && !reduced
  const at = running ? phase : LAST
  const typed = typing.phase === at ? typing.text : ''
  const name = PHASES[at].name
  const seen = (n) => PHASES.findIndex((p) => p.name === n) <= at

  const showQ1 = seen('sentQ1')
  const showThinking1 = name === 'thinking1'
  const showAnswer = seen('answer')
  const showQ2 = seen('sentQ2')
  const showThinking2 = name === 'thinking2'
  const blocked = name === 'limit'

  return (
    <div ref={ref} className="flex h-full flex-col" style={{ backgroundColor: '#e8edec' }}>
      {/* Header — the book, and the counter this whole page is about. */}
      <div className="flex items-center gap-2 rounded-b-2xl bg-white px-3 py-2.5">
        <Icon name="arrow_back" className="shrink-0 text-[15px]" style={{ color: '#101512' }} />
        <img src="/app/cover-thumb.png" alt="" className="h-[34px] w-[21px] shrink-0 rounded-[3px] object-cover" />
        <span className="min-w-0 flex-1 leading-tight">
          <span className="line-clamp-2 text-[10.5px] font-bold" style={{ color: '#101512' }}>
            {BOOK}
          </span>
          <span className="mt-0.5 block text-[9.5px] font-semibold" style={{ color: '#d3392f' }}>
            {USAGE.askUsed}/{USAGE.askTotal} questions used
          </span>
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 overflow-hidden px-3 py-3">
        {showQ1 && <Bubble from="user">{Q1}</Bubble>}
        {showThinking1 && <Thinking />}
        {showAnswer && <Bubble from="ai">{A1}</Bubble>}
        {showQ2 && <Bubble from="user">{Q2}</Bubble>}
        {showThinking2 && <Thinking />}
      </div>

      {/* The app's own banner, dropping in once the tenth question is spent. */}
      {blocked && (
        <div
          className="chat-pop mx-3 mb-2 flex items-center gap-2 rounded-xl bg-white px-3 py-2"
          style={{ border: '1px solid #e9a80f' }}
        >
          <span className="min-w-0 flex-1">
            <span className="block text-[10.5px] font-extrabold" style={{ color: '#101512' }}>
              Free limit reached
            </span>
            <span className="block text-[9.5px]" style={{ color: '#3d4744' }}>
              Upgrade to keep asking about this book.
            </span>
          </span>
          <span
            className="shrink-0 rounded-md px-2 py-1 text-[9.5px] font-bold"
            style={{ backgroundColor: '#e9a80f', color: '#1b1b1d' }}
          >
            Upgrade
          </span>
        </div>
      )}

      {/* Composer — where the typing happens. */}
      <div className="flex items-center gap-2 bg-white px-3 py-2.5">
        <span
          className="flex min-h-[26px] flex-1 items-center rounded-full px-3 text-[10.5px]"
          style={{ backgroundColor: '#eef1f0', color: typed ? '#101512' : '#9aa5a1' }}
        >
          <span className="truncate">{typed || 'Type your question...'}</span>
          {typed && <span className="caret-mini" />}
        </span>
        <span
          className="grid h-[26px] w-[26px] shrink-0 place-items-center rounded-full"
          style={{ backgroundColor: blocked ? '#9aa5a1' : '#e9a80f', color: '#fff' }}
        >
          <Icon name="send" className="text-[14px]" />
        </span>
      </div>
    </div>
  )
}

function Thinking() {
  return (
    <div className="chat-pop flex justify-start">
      <span
        className="inline-flex items-center gap-1.5 rounded-2xl rounded-tl-md px-3 py-2 text-[10.5px]"
        style={{ backgroundColor: '#fff', color: '#1b1b1d' }}
      >
        <Icon name="auto_awesome" className="text-[12px]" style={{ color: '#276b54' }} />
        AI is processing
        <span className="dots" />
      </span>
    </div>
  )
}
