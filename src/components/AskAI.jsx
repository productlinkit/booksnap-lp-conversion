import { ASK_AI_BENEFITS } from '../lib/content'
import { USAGE, CTA } from '../lib/config'
import { Blob, CtaButton, Icon, Phone, SectionLabel } from './primitives'

/**
 * Ask AI is the reason Premium is not just "more summaries" — it is what turns
 * a snap into a tutor.
 *
 * The visual is the production limit screen (`public/app/screen-limit.png`),
 * and it does the whole job on its own: a real question, a real answer, a
 * second question mid-flight, the counter in red at "10/10 questions used",
 * and the app's own "Free limit reached" banner underneath. It shows Ask AI
 * working *and* the wall, which is exactly the argument this section makes.
 *
 * Because the screenshot states the counter itself, the chip that used to
 * repeat it is gone. What is left beside the frame is the one thing the
 * screenshot cannot show — the same screen without a counter on it.
 */

/** The Premium counterpoint to the counter inside the screenshot. */
function PremiumChip() {
  return (
    <span
      className="animate-float-4 absolute -right-5 top-[62%] z-20 hidden items-center gap-2.5 rounded-2xl px-3.5 py-2.5 sm:flex md:-right-9"
      style={{
        backgroundColor: 'var(--color-tertiary-fixed)',
        border: '1px solid rgba(255,255,255,0.6)',
        boxShadow: '0 10px 34px rgba(0,54,37,0.14)',
      }}
    >
      <span
        className="grid h-8 w-8 shrink-0 place-items-center rounded-full"
        style={{ backgroundColor: 'rgba(255,255,255,0.6)', color: 'var(--color-tertiary-container)' }}
      >
        <Icon name="all_inclusive" className="text-[17px]" />
      </span>
      <span className="leading-tight">
        <span
          className="block text-[10px] font-bold uppercase tracking-[0.07em]"
          style={{ color: 'var(--color-tertiary-ink)' }}
        >
          On Premium
        </span>
        <span className="block text-[13px] font-extrabold" style={{ color: 'var(--color-tertiary-container)' }}>
          No counter at all
        </span>
      </span>
    </span>
  )
}

function AskAiVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[420px] px-6 sm:px-10 lg:px-12">
      <Blob
        className="left-0 top-8 h-56 w-56"
        color="var(--color-secondary-container)"
        opacity={0.55}
        data-parallax="0.13"
      />
      <Blob
        className="bottom-4 right-0 h-52 w-52"
        color="var(--color-tertiary-fixed)"
        opacity={0.45}
        data-parallax="0.19"
      />

      <div className="relative z-10">
        <Phone
          className="animate-float-main"
          src="/app/screen-limit.png"
          alt="Ask AI in BookSnap after the tenth question: the counter reads 10 of 10 used and the free limit banner has appeared"
        />
        <PremiumChip />
      </div>

      {/* The banner inside the screenshot is a picture, and it already states
          the limit. This is the pressable one, so it states the resolution
          instead of repeating it — and it is green, not a second gold block
          150px under the first. */}
      <div
        className="relative z-20 mt-4 flex flex-col gap-3 rounded-[22px] p-4 sm:flex-row sm:items-center sm:justify-between"
        style={{
          backgroundColor: 'var(--color-primary)',
          boxShadow: '0 18px 44px rgba(0,54,37,0.20)',
        }}
      >
        <p className="text-[13.5px] font-bold" style={{ color: '#fff' }}>
          On Premium, that banner never appears.
        </p>
        <CtaButton location="ask-ai-inline" size="sm" className="shrink-0">
          Unlock Ask AI
        </CtaButton>
      </div>
    </div>
  )
}

export default function AskAI() {
  return (
    <section id="ask-ai" className="relative scroll-mt-28 overflow-hidden py-14 sm:py-20 lg:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-4 sm:px-8 md:px-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-16">
        <div className="fade-left flex flex-col items-start">
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

        <div className="fade-right stagger-2 w-full">
          <div data-parallax="-0.04">
            <AskAiVisual />
          </div>
        </div>
      </div>
    </section>
  )
}
