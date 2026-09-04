import { ASK_AI_BENEFITS, ASK_AI_BLOCKED } from '../lib/content'
import { USAGE, CTA } from '../lib/config'
import { Blob, CtaButton, Icon, Phone, SectionLabel } from './primitives'

/**
 * Ask AI is the reason Premium is not just "more summaries" — it is what turns
 * a snap into a tutor.
 *
 * The visual is the production Ask AI screen itself (`public/app/screen-askai.png`,
 * captured from booksnap.ai), which already shows the question counter running
 * down inside the product. The chips floating over it carry the argument the
 * screenshot cannot: the counter is about to run out, and Premium removes it.
 */

/** A stat chip floating over the frame. `tone="gold"` states the payoff. */
function Chip({ className, icon, label, value, tone }) {
  const gold = tone === 'gold'
  return (
    <span
      className={`absolute z-20 hidden items-center gap-2.5 rounded-2xl px-3.5 py-2.5 sm:flex ${
        gold ? '' : 'glass-card'
      } ${className}`}
      style={
        gold
          ? {
              backgroundColor: 'var(--color-tertiary-fixed)',
              border: '1px solid rgba(255,255,255,0.6)',
              boxShadow: '0 10px 34px rgba(0,54,37,0.14)',
            }
          : undefined
      }
    >
      <span
        className="grid h-8 w-8 shrink-0 place-items-center rounded-full"
        style={{
          backgroundColor: gold ? 'rgba(255,255,255,0.6)' : 'var(--color-error-container)',
          color: gold ? 'var(--color-tertiary-container)' : 'var(--color-primary)',
        }}
      >
        <Icon name={icon} className="text-[17px]" />
      </span>
      <span className="leading-tight">
        <span
          className="block text-[10px] font-bold uppercase tracking-[0.07em]"
          style={{ color: gold ? 'var(--color-tertiary-ink)' : 'var(--color-on-surface-variant)' }}
        >
          {label}
        </span>
        <span
          className="block text-[13px] font-extrabold"
          style={{ color: gold ? 'var(--color-tertiary-container)' : 'var(--color-primary)' }}
        >
          {value}
        </span>
      </span>
    </span>
  )
}

function AskAiVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[420px] px-6 sm:px-10 lg:px-12">
      <Blob className="left-0 top-8 h-56 w-56" color="var(--color-secondary-container)" opacity={0.55} />
      <Blob className="bottom-4 right-0 h-52 w-52" color="var(--color-tertiary-fixed)" opacity={0.45} />

      {/* Chips are anchored to the frame, not to the whole block — percentages
          measured against the block would drop them behind the card below. */}
      <div className="relative z-10">
        <Phone
          className="animate-float-main"
          src="/app/screen-askai.png"
          alt="The Ask AI screen in BookSnap, showing the monthly question counter"
        />

        {/* The two numbers the section argues about, lifted out of the screen. */}
        <Chip
          className="animate-float-2 -left-6 top-[16%] md:-left-10"
          icon="lock"
          label="Free plan"
          value={`${USAGE.askUsed}/${USAGE.askTotal} questions used`}
        />
        <Chip
          className="animate-float-4 -right-5 bottom-[14%] md:-right-9"
          icon="all_inclusive"
          label="Premium"
          value="Ask without counting"
          tone="gold"
        />
      </div>

      {/* The wall: the next question, typed and refused. Rendered as the
          reader's own outgoing bubble rather than a text field — the screenshot
          above already shows the real composer, and a second one read as a bug. */}
      <div
        className="relative z-20 mt-4 rounded-[22px] p-3.5"
        style={{
          backgroundColor: 'var(--color-surface-lowest)',
          border: '1px solid rgba(0,54,37,0.08)',
          boxShadow: '0 18px 44px rgba(0,54,37,0.14)',
        }}
      >
        <p
          className="mb-2 text-[10.5px] font-bold uppercase tracking-[0.08em]"
          style={{ color: 'var(--color-on-surface-variant)' }}
        >
          Your next question
        </p>
        <div className="flex justify-end">
          <span
            className="inline-flex max-w-full items-center gap-2 rounded-[18px] rounded-br-md px-3.5 py-2.5"
            style={{ backgroundColor: 'var(--color-surface-container)' }}
          >
            <span className="min-w-0 text-[13px]" style={{ color: 'var(--color-on-surface-variant)' }}>
              {ASK_AI_BLOCKED}
              <span className="caret" />
            </span>
            <Icon name="lock" className="shrink-0 text-[16px]" style={{ color: 'var(--color-tertiary-ink)' }} />
          </span>
        </div>

        <div
          className="mt-3 flex flex-col gap-2.5 rounded-2xl p-3 sm:flex-row sm:items-center sm:justify-between"
          style={{ backgroundColor: 'var(--color-tertiary-fixed)' }}
        >
          <p className="text-[12.5px] font-bold" style={{ color: 'var(--color-tertiary-container)' }}>
            {USAGE.askUsed} of {USAGE.askTotal} free questions used {USAGE.periodLabel}.
          </p>
          <CtaButton location="ask-ai-inline" size="sm" variant="dark" className="shrink-0">
            Unlock Ask AI
          </CtaButton>
        </div>
      </div>
    </div>
  )
}

export default function AskAI() {
  return (
    <section id="ask-ai" className="relative scroll-mt-28 overflow-hidden py-14 sm:py-20 lg:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-4 sm:px-8 md:px-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-16">
        <div className="fade-up flex flex-col items-start">
          <SectionLabel tone="var(--color-primary-fixed)">Ask AI</SectionLabel>

          <h2 className="rsp-section-h2 mt-4 font-extrabold" style={{ color: 'var(--color-primary)' }}>
            Premium is where BookSnap stops being a summary app.
          </h2>

          <p className="rsp-section-p mt-4 max-w-xl" style={{ color: 'var(--color-on-surface-variant)' }}>
            A summary tells you what the book said. Ask AI lets you argue with it, test it against
            your own work, and keep going until the idea is actually yours. On Free that
            conversation stops after {USAGE.askTotal} questions a month. On Premium it doesn&rsquo;t stop.
          </p>

          <ul className="mt-8 flex w-full flex-col gap-4">
            {ASK_AI_BENEFITS.map((benefit, i) => (
              <li
                key={benefit.title}
                className={`lift-card fade-up flex items-start gap-3.5 rounded-[22px] p-4 stagger-${i + 1}`}
                style={{
                  backgroundColor: 'var(--color-surface-lowest)',
                  border: '1px solid rgba(0,54,37,0.06)',
                  boxShadow: '0 10px 30px rgba(0,54,37,0.06)',
                }}
              >
                <span
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl"
                  style={{ backgroundColor: 'var(--color-secondary-container)', color: 'var(--color-primary)' }}
                >
                  <Icon name={benefit.icon} className="text-[21px]" />
                </span>
                <div className="min-w-0">
                  <h3 className="rsp-card-h3 font-bold" style={{ color: 'var(--color-primary)' }}>
                    {benefit.title}
                  </h3>
                  <p className="mt-1 text-[14px] leading-relaxed" style={{ color: 'var(--color-on-surface-variant)' }}>
                    {benefit.desc}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <CtaButton location="ask-ai" size="lg" className="cta-sheen mt-8 w-full sm:w-auto">
            <Icon name="lock_open" className="text-[19px]" />
            {CTA.hero}
          </CtaButton>
        </div>

        <div className="fade-up stagger-2 w-full">
          <AskAiVisual />
        </div>
      </div>
    </section>
  )
}
