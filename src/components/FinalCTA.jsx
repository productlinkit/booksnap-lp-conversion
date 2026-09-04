import { CTA, USAGE, PRICING } from '../lib/config'
import { Blob, CtaButton, Flower, Icon, Phone } from './primitives'

/**
 * The closing push, built the way booksnap.ai builds its own CTA band: a deep
 * green panel inset from the viewport edge, flowers in the corners, and two
 * real app screens drifting behind the copy.
 *
 * The phones are `md`-and-up only — at phone width they would sit under the
 * headline and fight it for the same pixels.
 */
export default function FinalCTA() {
  return (
    <section className="px-3 pb-14 pt-6 sm:px-6 sm:pb-20">
      <div
        className="shell relative mx-auto max-w-[1150px] px-4 py-16 sm:px-8 md:py-24"
        style={{ backgroundColor: 'var(--color-primary)', boxShadow: '0 30px 80px rgba(0,54,37,0.28)' }}
      >
        <Flower src="/flower-2.png" className="-left-14 -top-14 w-44 md:w-64" opacity={0.13} />
        <Flower src="/flower-1.png" className="-bottom-16 -right-14 w-48 md:w-72" opacity={0.13} />
        <Blob className="left-[18%] top-0 h-72 w-72" color="var(--color-secondary-container)" opacity={0.18} />
        <Blob className="bottom-0 right-[16%] h-72 w-72" color="var(--color-tertiary-fixed)" opacity={0.14} />

        {/* Real screens drifting behind the copy, dimmed so they never compete
            with it for contrast. Decorative — alt is empty by design. */}
        {/* The frames are wrapped rather than positioned directly: `.phone` sets
            `position: relative` from plain CSS, which outranks Tailwind's
            `absolute` utility and would drop both screens into normal flow. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden md:block">
          <div className="absolute left-[3%] top-[10%] w-[168px] lg:left-[6%] lg:w-[196px]">
            <Phone
              className="animate-float-2"
              src="/app/screen-audio.png"
              alt=""
              style={{ opacity: 0.5, borderColor: 'rgba(255,255,255,0.16)', background: 'rgba(255,255,255,0.16)' }}
            />
          </div>
          <div className="absolute bottom-[10%] right-[3%] w-[168px] lg:right-[6%] lg:w-[196px]">
            <Phone
              className="animate-float-4"
              src="/app/screen-reading.png"
              alt=""
              style={{ opacity: 0.5, borderColor: 'rgba(255,255,255,0.16)', background: 'rgba(255,255,255,0.16)' }}
            />
          </div>
        </div>

        <div className="relative mx-auto flex max-w-2xl flex-col items-center px-2 text-center">
          <p
            className="glass-card-dark inline-flex max-w-full items-center gap-2 rounded-full px-4 py-2 text-[12.5px] font-bold"
            style={{ color: 'var(--color-secondary-container)' }}
          >
            <Icon name="local_fire_department" className="shrink-0 text-[17px]" />
            <span>
              {USAGE.snapsUsed} of {USAGE.snapsTotal} free snaps used {USAGE.periodLabel}
            </span>
          </p>

          <h2 className="rsp-cta-h2 mt-6 font-extrabold" style={{ color: '#fff' }}>
            Don&rsquo;t let a limit stop your learning.
          </h2>

          <p className="rsp-section-p mt-5 max-w-xl" style={{ color: 'rgba(255,255,255,0.82)' }}>
            {PRICING.paperback}
          </p>

          <CtaButton location="final" size="lg" className="cta-sheen mt-8 w-full sm:w-auto">
            <Icon name="lock_open" className="text-[19px]" />
            {CTA.final}
          </CtaButton>

          <p
            className="mt-4 flex items-center gap-1.5 text-[13px]"
            style={{ color: 'rgba(255,255,255,0.68)' }}
          >
            <Icon name="check_circle" className="text-[16px]" style={{ color: 'var(--color-secondary-container)' }} />
            Cancel anytime. Keep learning without limits.
          </p>
        </div>
      </div>
    </section>
  )
}
