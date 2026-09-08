import { useState } from 'react'
import { CATEGORIES, VIBES, PLANS } from '../lib/onboarding'
import { HOME_URL } from '../lib/config'
import { Icon } from './primitives'
import { ACCENT, DEEP, INK, MUTED, FlowShell, Heading, PrimaryButton, GhostButton } from './flow'

/**
 * The sign-up flow reached from every CTA on the landing page.
 *
 * Four steps — categories, reading vibe, email, plan — rebuilt from the app's
 * own onboarding so the two feel like one product. Colours are sampled from
 * the app's screens rather than guessed: #379777 for the accented word,
 * #276b54 for the buttons, #f4f9f7 and #fdf6d5 for the two background washes.
 *
 * Nothing here is submitted anywhere. The email field accepts typing because a
 * flow you cannot fill in is not a flow, but the value stays in component
 * state and is never sent — there is no backend on this project to send it to.
 * The plan step hands off to /checkout, and "Continue Without Plan" goes
 * straight to the app.
 */

/* ---------- Step 1 ---------- */
function Categories({ picked, toggle }) {
  return (
    <ul className="flex flex-wrap gap-3">
      {CATEGORIES.map((c) => {
        const on = picked.has(c.id)
        return (
          <li key={c.id}>
            <button
              type="button"
              onClick={() => toggle(c.id)}
              aria-pressed={on}
              className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-[14.5px] font-medium transition-all duration-200"
              style={{
                backgroundColor: on ? DEEP : 'transparent',
                color: on ? '#fff' : DEEP,
                border: `1.5px solid ${on ? DEEP : 'rgba(39,107,84,0.45)'}`,
              }}
            >
              <Icon name={c.icon} className="text-[19px]" />
              {c.label}
            </button>
          </li>
        )
      })}
    </ul>
  )
}

/* ---------- Step 2 ---------- */
function Vibes({ picked, toggle }) {
  return (
    <ul
      className="flex flex-col rounded-[22px] px-5 py-1"
      style={{ backgroundColor: '#fff', boxShadow: '0 10px 30px rgba(16,21,18,0.05)' }}
    >
      {VIBES.map((v, i) => {
        const on = picked.has(v)
        return (
          <li key={v} style={i ? { borderTop: '1px solid #e6efeb' } : undefined}>
            <button
              type="button"
              onClick={() => toggle(v)}
              aria-pressed={on}
              className="flex w-full items-center gap-4 py-4 text-left"
            >
              <span
                className="grid h-7 w-7 shrink-0 place-items-center rounded-lg transition-all duration-200"
                style={{
                  backgroundColor: on ? ACCENT : '#fff',
                  border: `1.5px solid ${on ? ACCENT : 'rgba(39,107,84,0.35)'}`,
                  color: '#fff',
                }}
              >
                {on && <Icon name="check" className="text-[17px]" />}
              </span>
              <span className="text-[15.5px]" style={{ color: INK }}>
                {v}
              </span>
            </button>
          </li>
        )
      })}
    </ul>
  )
}

/* ---------- Step 3 ---------- */
function EmailStep({ email, setEmail }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[13px] font-bold" style={{ color: DEEP }}>
        Email address
      </span>
      <input
        type="email"
        inputMode="email"
        autoComplete="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full rounded-2xl px-4 py-4 text-[16px] outline-none"
        style={{ backgroundColor: '#fff', border: '1.5px solid rgba(39,107,84,0.3)', color: '#101512' }}
      />
      <span className="text-[13px]" style={{ color: MUTED }}>
        We use it to keep your library and your plan on every device you read on.
      </span>
    </label>
  )
}

/* ---------- Step 4 ---------- */
function PlanCard({ plan, selected, expanded, onSelect, onToggle }) {
  return (
    <div
      onClick={onSelect}
      className="relative cursor-pointer rounded-[20px] p-4 transition-all duration-200"
      style={{
        backgroundColor: '#fff',
        border: `1.5px solid ${selected ? DEEP : 'transparent'}`,
        boxShadow: selected ? '0 10px 30px rgba(16,21,18,0.08)' : '0 6px 20px rgba(16,21,18,0.05)',
      }}
    >
      {plan.badge && (
        <span
          className="absolute -top-4 right-4 rounded-full px-4 py-2 text-[13px] font-semibold"
          style={{ backgroundColor: '#e9a80f', color: '#1b1b1d' }}
        >
          {plan.badge}
        </span>
      )}

      <div className="flex items-start justify-between gap-4">
        <span className="min-w-0">
          <span className="block text-[21px] font-extrabold" style={{ color: DEEP }}>
            {plan.name}
          </span>
          <span className="mt-1 block text-[14px]" style={{ color: MUTED }}>
            {plan.tagline}
          </span>
        </span>
        <span className="shrink-0 text-right">
          <span className="flex items-baseline justify-end gap-1">
            <span className="text-[30px] font-extrabold leading-none" style={{ color: INK }}>
              {plan.price}
            </span>
            <span className="text-[13px] font-semibold" style={{ color: MUTED }}>
              {plan.currency}
            </span>
          </span>
          {plan.then && (
            <span className="mt-1 block text-[13.5px]" style={{ color: MUTED }}>
              {plan.then}
            </span>
          )}
        </span>
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          onToggle()
        }}
        aria-expanded={expanded}
        className="mt-2 ml-auto flex items-center gap-1 text-[14px] font-bold"
        style={{ color: DEEP }}
      >
        {expanded ? 'See less' : 'See benefits'}
        <Icon name={expanded ? 'expand_less' : 'expand_more'} className="text-[18px]" />
      </button>

      {expanded && (
        <ul className="mt-3 flex flex-col gap-2.5 pt-3" style={{ borderTop: '1px solid #e6efeb' }}>
          {plan.benefits.map((b) => (
            <li key={b} className="flex items-start gap-3">
              <Icon
                name="check_circle"
                className="mt-px shrink-0 text-[20px]"
                style={{ color: DEEP, fontVariationSettings: "'FILL' 1" }}
              />
              <span className="text-[14.5px]" style={{ color: INK }}>
                {b}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

/* ---------- The flow ---------- */
const STEPS = ['categories', 'vibes', 'email', 'plans']

export default function Start() {
  const [step, setStep] = useState(0)
  const [cats, setCats] = useState(() => new Set())
  const [vibes, setVibes] = useState(() => new Set())
  const [email, setEmail] = useState('')
  const [plan, setPlan] = useState('premium')
  const [open, setOpen] = useState('premium')

  const toggleIn = (set, update) => (value) => {
    const next = new Set(set)
    if (next.has(value)) next.delete(value)
    else next.add(value)
    update(next)
  }

  const name = STEPS[step]
  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1))
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())

  const HEADS = {
    categories: {
      line1: 'What do You',
      line2: 'Love to',
      accent: 'Read?',
      sub: 'Your picks help us recommend the best BookSnaps for your reading style 📖✨',
    },
    vibes: {
      line1: 'Set Your',
      line2: 'Reading',
      accent: 'Vibe',
      sub: 'Customize your experience to match the way you love discovering books 🪄',
    },
    email: {
      line1: 'Save Your',
      line2: 'Reading',
      accent: 'Profile',
      sub: 'Enter your email so your picks — and your plan — follow you to every device.',
    },
    plans: {
      line1: 'Explore the Full',
      line2: 'Reading',
      accent: 'Experience',
      sub: 'Access summaries, audio content, and interactive tools designed to help you learn more effectively.',
    },
  }

  return (
    <FlowShell>
      {/* Skip goes to the plan step, which is what the reader came for. */}
      <div className="flex justify-end">
        {name === 'plans' ? (
          <span className="h-6" />
        ) : (
          <button
            type="button"
            onClick={() => setStep(STEPS.length - 1)}
            className="text-[16px] font-medium underline underline-offset-4"
            style={{ color: INK }}
          >
            Skip
          </button>
        )}
      </div>

      <div className="mt-6">
        <Heading {...HEADS[name]} />
      </div>

      <div className="mt-5 flex-1">
        {name === 'categories' && <Categories picked={cats} toggle={toggleIn(cats, setCats)} />}
        {name === 'vibes' && <Vibes picked={vibes} toggle={toggleIn(vibes, setVibes)} />}
        {name === 'email' && <EmailStep email={email} setEmail={setEmail} />}
        {name === 'plans' && (
          <div className="flex flex-col gap-4 pt-3">
            {PLANS.map((p) => (
              <PlanCard
                key={p.id}
                plan={p}
                selected={plan === p.id}
                expanded={open === p.id}
                onSelect={() => setPlan(p.id)}
                onToggle={() => setOpen((o) => (o === p.id ? null : p.id))}
              />
            ))}
          </div>
        )}
      </div>

      <div className="mt-5 flex flex-col gap-3">
        {name === 'plans' ? (
          <>
            <PrimaryButton href={`/checkout?plan=${plan}`} data-cta="start-plan">
              {plan === 'premium' ? 'Start Free Trial' : 'Continue with Pro'}
            </PrimaryButton>
            <GhostButton href={HOME_URL} data-cta="start-no-plan">
              Continue Without Plan
            </GhostButton>
            <p className="text-center text-[14px]" style={{ color: MUTED }}>
              Cancel Anytime before next renewal
            </p>
          </>
        ) : (
          <PrimaryButton onClick={next} disabled={name === 'email' && !emailOk}>
            Continue
          </PrimaryButton>
        )}
      </div>
    </FlowShell>
  )
}
