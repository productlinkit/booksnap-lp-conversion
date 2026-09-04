import { useState } from 'react'
import { PRICING, CTA } from '../lib/config'
import { PREMIUM_FEATURES } from '../lib/content'
import { CtaButton, Icon, SectionHead } from './primitives'

/**
 * Two plans, one recommended.
 *
 * Selection is a real radio group so the choice is keyboard-operable and
 * announced; the card body just forwards its clicks to the input. The CTA is a
 * sibling of the input rather than a child of a <label>, because a link inside
 * a label is invalid HTML and swallows the click on touch.
 */
export default function Pricing() {
  const [plan, setPlan] = useState('annual')

  return (
    <section
      id="pricing"
      className="scroll-mt-24 py-16 sm:py-20 lg:py-24"
      style={{ backgroundColor: 'var(--color-primary)' }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-8 md:px-12">
        <div className="fade-up flex justify-center">
          <SectionHead
            label="Premium"
            labelTone="rgba(255,255,255,0.14)"
            labelInk="var(--color-secondary-container)"
            title="One upgrade. Everything open."
            sub={PRICING.paperback}
            ink="#fff"
            subInk="rgba(255,255,255,0.78)"
          />
        </div>

        <fieldset className="mt-12 border-0 p-0">
          <legend className="sr-only">Choose a billing period</legend>

          <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1fr)] lg:gap-6">
            {/* ---------- Monthly: deliberately the quieter card ---------- */}
            <div
              onClick={() => setPlan('monthly')}
              className="order-2 cursor-pointer rounded-[28px] p-6 transition-all duration-300 sm:p-7 lg:order-1 lg:mt-6"
              style={{
                backgroundColor: 'rgba(255,255,255,0.07)',
                border: `1.5px solid ${plan === 'monthly' ? 'var(--color-tertiary-fixed)' : 'rgba(255,255,255,0.16)'}`,
              }}
            >
              <div className="flex items-center gap-2.5">
                <input
                  type="radio"
                  id="plan-monthly"
                  name="billing"
                  value="monthly"
                  checked={plan === 'monthly'}
                  onChange={() => setPlan('monthly')}
                  className="h-4 w-4 shrink-0 accent-[var(--color-tertiary-fixed)]"
                />
                <label
                  htmlFor="plan-monthly"
                  className="cursor-pointer text-[15px] font-bold"
                  style={{ color: '#fff' }}
                >
                  Monthly
                </label>
              </div>

              <p className="mt-5 flex flex-wrap items-baseline gap-x-2">
                <span className="rsp-price font-extrabold" style={{ color: '#fff' }}>
                  {PRICING.monthly.amount}
                </span>
                <span className="text-[15px]" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  {PRICING.monthly.period}
                </span>
              </p>

              <p className="mt-3 text-[14px]" style={{ color: 'rgba(255,255,255,0.78)' }}>
                Every Premium feature, billed month to month. Stop whenever you like.
              </p>

              <CtaButton
                location="pricing-monthly"
                variant="outline-light"
                size="lg"
                className="mt-6 w-full"
              >
                Go Premium monthly
              </CtaButton>

              <p className="mt-3 text-center text-[12.5px]" style={{ color: 'rgba(255,255,255,0.6)' }}>
                Cancel anytime.
              </p>
            </div>

            {/* ---------- Annual: the recommended plan ---------- */}
            <div
              onClick={() => setPlan('annual')}
              className="order-1 cursor-pointer rounded-[28px] p-6 transition-all duration-300 sm:p-8 lg:order-2"
              style={{
                backgroundColor: 'var(--color-surface-lowest)',
                border: `2px solid ${plan === 'annual' ? 'var(--color-tertiary-fixed)' : 'transparent'}`,
                boxShadow:
                  plan === 'annual'
                    ? '0 28px 70px rgba(0,0,0,0.30)'
                    : '0 12px 36px rgba(0,0,0,0.18)',
              }}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <input
                    type="radio"
                    id="plan-annual"
                    name="billing"
                    value="annual"
                    checked={plan === 'annual'}
                    onChange={() => setPlan('annual')}
                    className="h-4 w-4 shrink-0 accent-[var(--color-primary)]"
                  />
                  <label
                    htmlFor="plan-annual"
                    className="cursor-pointer text-[15px] font-bold"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    Annual
                  </label>
                </div>
                <span
                  className="rounded-full px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.08em]"
                  style={{ backgroundColor: 'var(--color-tertiary-fixed)', color: 'var(--color-tertiary-container)' }}
                >
                  Best value · Save {PRICING.annual.savePct}%
                </span>
              </div>

              <p className="mt-5 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <span className="rsp-price font-extrabold" style={{ color: 'var(--color-primary)' }}>
                  {PRICING.annual.amount}
                </span>
                <span className="text-[15px]" style={{ color: 'var(--color-on-surface-variant)' }}>
                  {PRICING.annual.period}
                </span>
                <span
                  className="text-[15px] line-through"
                  style={{ color: 'var(--color-on-surface-variant)', opacity: 0.6 }}
                >
                  {PRICING.annual.strike}
                </span>
              </p>

              <p className="mt-2 text-[14px] font-semibold" style={{ color: 'var(--color-primary-container)' }}>
                {PRICING.annual.perMonth}
              </p>

              <ul className="mt-6 flex flex-col gap-2.5">
                {PREMIUM_FEATURES.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <Icon
                      name="check_circle"
                      className="mt-px shrink-0 text-[18px]"
                      style={{ color: 'var(--color-primary-container)', fontVariationSettings: "'FILL' 1" }}
                    />
                    <span className="text-[14.5px]" style={{ color: 'var(--color-on-surface-variant)' }}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <CtaButton location="pricing-annual" size="lg" className="mt-7 w-full">
                <Icon name="lock_open" className="text-[19px]" />
                {CTA.pricing}
              </CtaButton>

              <p
                className="mt-3 flex items-center justify-center gap-1.5 text-center text-[12.5px]"
                style={{ color: 'var(--color-on-surface-variant)' }}
              >
                <Icon name="check_circle" className="text-[15px]" />
                {CTA.reassurance}
              </p>
            </div>
          </div>
        </fieldset>
      </div>
    </section>
  )
}
