import { CTA, USAGE, PRICING } from '../lib/config'
import { CtaButton, Icon } from './primitives'

export default function FinalCTA() {
  return (
    <section
      className="relative overflow-hidden py-20 sm:py-24 lg:py-28"
      style={{ backgroundColor: 'var(--color-primary)' }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(760px 320px at 50% 0%, rgba(164,244,191,0.20), transparent 68%)',
        }}
      />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-4 text-center sm:px-8">
        <p
          className="inline-flex max-w-full items-center gap-2 rounded-full px-3.5 py-2 text-[12.5px] font-semibold"
          style={{ backgroundColor: 'rgba(255,255,255,0.12)', color: 'var(--color-secondary-container)' }}
        >
          <Icon name="local_fire_department" className="shrink-0 text-[17px]" />
          <span>
            {USAGE.snapsUsed} of {USAGE.snapsTotal} free snaps used {USAGE.periodLabel}
          </span>
        </p>

        <h2 className="rsp-cta-h2 mt-6 font-extrabold" style={{ color: '#fff' }}>
          Don&rsquo;t let a limit stop your learning.
        </h2>

        <p className="rsp-section-p mt-5 max-w-xl" style={{ color: 'rgba(255,255,255,0.80)' }}>
          {PRICING.paperback}
        </p>

        <CtaButton location="final" size="lg" className="mt-8 w-full sm:w-auto">
          <Icon name="lock_open" className="text-[19px]" />
          {CTA.final}
        </CtaButton>

        <p className="mt-4 text-[13px]" style={{ color: 'rgba(255,255,255,0.65)' }}>
          Cancel anytime. Keep learning without limits.
        </p>
      </div>
    </section>
  )
}
