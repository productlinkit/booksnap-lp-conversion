import { CTA, USAGE, RATING } from '../lib/config'
import { CtaButton, Icon, Stars } from './primitives'
import LibraryPreview from './LibraryPreview'

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pb-16 pt-28 sm:pb-20 sm:pt-32 lg:pb-28 lg:pt-36"
    >
      {/* A single soft wash behind the fold — no floating shapes, no glass. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[560px]"
        style={{
          background:
            'radial-gradient(1100px 460px at 20% 0%, rgba(164,244,191,0.34), transparent 62%), radial-gradient(900px 420px at 88% 12%, rgba(255,224,143,0.30), transparent 60%)',
        }}
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-8 md:px-12 lg:grid-cols-[minmax(0,1.04fr)_minmax(0,0.96fr)] lg:gap-14 xl:gap-16">
        <div className="fade-up flex flex-col items-start">
          {/* The reader's own counter, stated before anything is sold. */}
          <p
            className="inline-flex max-w-full items-center gap-2 rounded-full px-3.5 py-2 text-[12.5px] font-semibold sm:text-[13px]"
            style={{ backgroundColor: 'var(--color-tertiary-fixed)', color: 'var(--color-tertiary-container)' }}
          >
            <Icon name="bolt" className="shrink-0 text-[17px]" />
            <span>
              You&rsquo;ve snapped {USAGE.snapsUsed} of {USAGE.snapsTotal} free books {USAGE.periodLabel}
            </span>
          </p>

          <h1
            className="rsp-hero-h1 mt-5 font-extrabold"
            style={{ color: 'var(--color-primary)' }}
          >
            <span className="rl">
              <span>You&rsquo;ve Outgrown</span>
            </span>
            <span className="rl">
              <span>the Free Plan.</span>
            </span>
          </h1>

          <p
            className="rsp-hero-p mt-5 max-w-xl"
            style={{ color: 'var(--color-on-surface-variant)' }}
          >
            Keep the momentum going. Premium gives you unlimited Book Snaps, unlimited Ask AI
            questions, offline downloads and early access to every new release.
          </p>

          {/* `flex-wrap` + `whitespace-nowrap`: on a ~450px column (1024px
              viewport) the second button drops to its own line rather than
              breaking either label across two lines mid-phrase. */}
          <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <CtaButton location="hero" size="lg" className="w-full whitespace-nowrap sm:w-auto">
              <Icon name="lock_open" className="text-[19px]" />
              {CTA.hero}
            </CtaButton>
            <CtaButton
              href="#compare"
              variant="outline"
              size="lg"
              location="hero-compare"
              className="w-full whitespace-nowrap sm:w-auto"
            >
              See what&rsquo;s locked
            </CtaButton>
          </div>

          <p
            className="mt-4 flex items-center gap-1.5 text-[13px]"
            style={{ color: 'var(--color-on-surface-variant)' }}
          >
            <Icon name="check_circle" className="text-[16px]" style={{ color: 'var(--color-primary-container)' }} />
            {CTA.reassurance}
          </p>

          {RATING && (
            <div
              className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-1 border-t pt-6 text-[13px]"
              style={{ borderColor: 'rgba(0,54,37,0.10)', color: 'var(--color-on-surface-variant)' }}
            >
              <Stars />
              <span>
                <strong style={{ color: 'var(--color-primary)' }}>{RATING.score}</strong> from{' '}
                {RATING.count} readers
              </span>
            </div>
          )}
        </div>

        <div className="fade-up stagger-2 w-full">
          <LibraryPreview />
        </div>
      </div>
    </section>
  )
}
