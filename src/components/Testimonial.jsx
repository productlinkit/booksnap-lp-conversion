import { TESTIMONIALS, TRUST } from '../lib/content'
import { RATING } from '../lib/config'
import { Icon, SectionHead, Stars } from './primitives'

export default function Testimonial() {
  return (
    <section
      id="reviews"
      className="scroll-mt-24 py-16 sm:py-20 lg:py-24"
      style={{ backgroundColor: 'var(--color-surface-lowest)' }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-8 md:px-12">
        <div className="fade-up flex justify-center">
          <SectionHead
            label="Readers on Premium"
            title="The readers who stopped counting"
            sub="What changes on Premium is not the app. It's how much of it you actually use."
          />
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <li
              key={t.name}
              className={`fade-up lift-card surface-card flex flex-col rounded-[28px] p-6 stagger-${i + 1}`}
            >
              <Stars className="mb-4" color="var(--color-tertiary-ink)" />
              <blockquote className="flex-1 text-[15px] leading-relaxed" style={{ color: 'var(--color-on-surface)' }}>
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-[13px] font-bold"
                  style={{ backgroundColor: t.tint, color: 'var(--color-primary)' }}
                >
                  {t.initials}
                </span>
                <span className="min-w-0">
                  <span className="block text-[14px] font-bold" style={{ color: 'var(--color-primary)' }}>
                    {t.name}
                  </span>
                  <span className="block text-[12.5px]" style={{ color: 'var(--color-on-surface-variant)' }}>
                    {t.role}
                  </span>
                </span>
              </figcaption>
            </li>
          ))}
        </ul>

        {/* Trust strip — the four objections that stop a warm user at checkout. */}
        <ul
          className="fade-up mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-[28px] sm:grid-cols-2 lg:grid-cols-4"
          style={{ backgroundColor: 'rgba(0,54,37,0.09)' }}
        >
          {TRUST.map((item) => (
            <li
              key={item.label}
              className="flex items-center gap-3 px-5 py-5"
              style={{ backgroundColor: 'var(--color-surface)' }}
            >
              <span
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full"
                style={{ backgroundColor: 'var(--color-secondary-container)', color: 'var(--color-primary)' }}
              >
                <Icon name={item.icon} className="text-[19px]" />
              </span>
              <span className="min-w-0">
                <span className="block text-[13.5px] font-bold" style={{ color: 'var(--color-primary)' }}>
                  {item.label}
                </span>
                <span className="block text-[12px]" style={{ color: 'var(--color-on-surface-variant)' }}>
                  {item.sub}
                </span>
              </span>
            </li>
          ))}
        </ul>

        {RATING && (
          <p
            className="fade-up mt-6 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-center text-[13.5px]"
            style={{ color: 'var(--color-on-surface-variant)' }}
          >
            <Stars color="var(--color-tertiary-ink)" />
            <span>
              <strong style={{ color: 'var(--color-primary)' }}>{RATING.score}</strong> average from{' '}
              {RATING.count} BookSnap readers
            </span>
          </p>
        )}
      </div>
    </section>
  )
}
