import { ASK_AI_BENEFITS, ASK_AI_THREAD, ASK_AI_BLOCKED } from '../lib/content'
import { ASK_AI_BOOK } from '../lib/covers'
import { USAGE, CTA } from '../lib/config'
import { CtaButton, Icon, SectionLabel } from './primitives'

/**
 * Ask AI is the reason Premium is not just "more summaries" — it is what turns
 * a snap into a tutor. The mock is scoped to a real book from the catalogue and
 * cites its chapters, because that scoping is exactly what separates Ask AI
 * from a general chat assistant, and a generic bubble UI would say the opposite.
 */

function Bubble({ line }) {
  const isUser = line.from === 'user'

  if (isUser) {
    return (
      <li className="chat-line flex justify-end">
        <p
          className="max-w-[86%] rounded-[20px] rounded-br-md px-4 py-2.5 text-[14px] leading-relaxed"
          style={{ backgroundColor: 'var(--color-primary)', color: '#fff' }}
        >
          {line.text}
        </p>
      </li>
    )
  }

  return (
    <li className="chat-line flex items-start gap-2.5">
      <span
        className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full"
        style={{ backgroundColor: 'var(--color-secondary-container)', color: 'var(--color-primary)' }}
      >
        <Icon name="auto_awesome" className="text-[15px]" />
      </span>
      <div
        className="min-w-0 max-w-[88%] rounded-[20px] rounded-tl-md px-4 py-3"
        style={{ backgroundColor: 'var(--color-surface-container)' }}
      >
        <p className="text-[14px] leading-relaxed" style={{ color: 'var(--color-on-surface)' }}>
          {line.text}
        </p>
        {line.source && (
          <span
            className="mt-2.5 inline-flex max-w-full items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold"
            style={{ backgroundColor: 'var(--color-surface-lowest)', color: 'var(--color-primary-container)' }}
          >
            <Icon name="bookmark" className="shrink-0 text-[13px]" />
            <span className="truncate">{line.source}</span>
          </span>
        )}
      </div>
    </li>
  )
}

function AskAiMock() {
  return (
    <div
      className="overflow-hidden rounded-[28px]"
      style={{
        backgroundColor: 'var(--color-surface-lowest)',
        border: '1px solid rgba(0,54,37,0.09)',
        boxShadow: '0 20px 56px rgba(0,54,37,0.12)',
      }}
    >
      {/* Book context header — Ask AI always answers inside one book. */}
      <div
        className="flex items-center gap-3 px-4 py-3.5 sm:px-5"
        style={{ borderBottom: '1px solid rgba(0,54,37,0.08)' }}
      >
        <img
          src={ASK_AI_BOOK.cover}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-11 w-[30px] shrink-0 rounded-md object-cover"
          style={{ backgroundColor: 'var(--color-surface-container)' }}
        />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[14px] font-bold" style={{ color: 'var(--color-primary)' }}>
            {ASK_AI_BOOK.title}
          </p>
          <p className="truncate text-[12px]" style={{ color: 'var(--color-on-surface-variant)' }}>
            {ASK_AI_BOOK.author}
          </p>
        </div>
        <span
          className="hidden shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold sm:inline-flex"
          style={{ backgroundColor: 'var(--color-secondary-container)', color: 'var(--color-primary)' }}
        >
          <Icon name="auto_awesome" className="text-[13px]" />
          Ask AI
        </span>
      </div>

      <ul className="flex flex-col gap-3.5 px-4 py-5 sm:px-5">
        {ASK_AI_THREAD.map((line, i) => (
          <Bubble key={i} line={line} />
        ))}
      </ul>

      {/* The wall. A good question, typed, that the free plan will not answer. */}
      <div className="px-4 pb-4 sm:px-5 sm:pb-5">
        <div
          className="flex items-center gap-2 rounded-full px-4 py-3"
          style={{ backgroundColor: 'var(--color-surface-container)' }}
        >
          <Icon name="edit" className="shrink-0 text-[17px]" style={{ color: 'var(--color-on-surface-variant)' }} />
          <span className="min-w-0 flex-1 truncate text-[13.5px]" style={{ color: 'var(--color-on-surface-variant)' }}>
            {ASK_AI_BLOCKED}
            <span className="caret" />
          </span>
          <Icon name="lock" className="shrink-0 text-[17px]" style={{ color: 'var(--color-tertiary-ink)' }} />
        </div>

        <div
          className="mt-3 flex flex-col gap-3 rounded-2xl p-3.5 sm:flex-row sm:items-center sm:justify-between"
          style={{ backgroundColor: 'var(--color-tertiary-fixed)' }}
        >
          <p className="text-[13px] font-semibold" style={{ color: 'var(--color-tertiary-container)' }}>
            You&rsquo;ve used {USAGE.askUsed} of {USAGE.askTotal} free questions {USAGE.periodLabel}.
          </p>
          <CtaButton
            location="ask-ai-inline"
            size="sm"
            variant="dark"
            className="shrink-0"
          >
            Unlock Ask AI
          </CtaButton>
        </div>
      </div>
    </div>
  )
}

export default function AskAI() {
  return (
    <section
      id="ask-ai"
      className="scroll-mt-24 py-16 sm:py-20 lg:py-24"
      style={{ backgroundColor: 'var(--color-surface)' }}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-8 md:px-12 lg:grid-cols-2 lg:gap-16">
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

          <ul className="mt-8 flex w-full flex-col gap-5">
            {ASK_AI_BENEFITS.map((benefit) => (
              <li key={benefit.title} className="flex items-start gap-3.5">
                <span
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl"
                  style={{ backgroundColor: 'var(--color-secondary-container)', color: 'var(--color-primary)' }}
                >
                  <Icon name={benefit.icon} className="text-[20px]" />
                </span>
                <div className="min-w-0">
                  <h3 className="rsp-card-h3 font-bold" style={{ color: 'var(--color-primary)' }}>
                    {benefit.title}
                  </h3>
                  <p className="mt-1 text-[14.5px] leading-relaxed" style={{ color: 'var(--color-on-surface-variant)' }}>
                    {benefit.desc}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <CtaButton location="ask-ai" size="lg" className="mt-8 w-full sm:w-auto">
            {CTA.hero}
          </CtaButton>
        </div>

        <div className="fade-up stagger-2 w-full">
          <AskAiMock />
        </div>
      </div>
    </section>
  )
}
