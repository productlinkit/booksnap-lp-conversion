import { CTA, USAGE, PRICING } from '../lib/config'
import { Blob, CtaButton, Icon } from './primitives'

/**
 * The closing push: a deep green panel inset from the viewport edge, and
 * nothing else.
 *
 * It carried two drifting app screens and the cut-paper ornaments; both were
 * removed. The ornaments collided with the headline at every width, and the
 * screens repeated mockups the reader has already passed three times. A final
 * CTA earns its keep by having one thing to look at.
 */
export default function FinalCTA() {
  return (
    <section className="px-3 pb-14 pt-6 sm:px-6 sm:pb-20">
      <div
        className="shell relative mx-auto max-w-[1150px] px-4 py-16 sm:px-8 md:py-24"
        style={{ backgroundColor: 'var(--color-primary)', boxShadow: '0 30px 80px rgba(0,54,37,0.28)' }}
      >
        {/* Two soft washes for depth. They sit well outside the copy column and
            drift at opposite rates, so the panel is never flat but never busy. */}
        <Blob
          className="left-[12%] top-[-60px] h-72 w-72"
          color="var(--color-secondary-container)"
          opacity={0.16}
          data-parallax="0.10"
        />
        <Blob
          className="bottom-[-60px] right-[12%] h-72 w-72"
          color="var(--color-tertiary-fixed)"
          opacity={0.13}
          data-parallax="-0.10"
        />

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
