import { useState } from 'react'
import { PRICING, CTA } from '../lib/config'
import { PREMIUM_FEATURES } from '../lib/content'
import { TESTIMONIALS, PRICING_QUOTE_INDEX } from '../lib/content'
import { Blob, CtaButton, Flower, Icon, SectionHead, Stars } from './primitives'

/**
 * Two plans, one recommended.
 *
 * Selection is a real radio group so the choice is keyboard-operable and
 * announced; the card body just forwards its clicks to the input. The CTA is a
 * sibling of the input rather than a child of a <label>, because a link inside
 * a label is invalid HTML and swallows the click on touch.
 */
/** The Ask AI review, quoted beside the price because Ask AI is what is sold. */
const QUOTE = TESTIMONIALS[PRICING_QUOTE_INDEX]

export default function Pricing() {
  const [plan, setPlan] = useState('annual')

  return (
    <section id="pricing" className="scroll-mt-28 px-3 py-10 sm:px-6 sm:py-14 lg:py-16">
      {/* The site's signature panel: a deep green card inset from the viewport
          edge with the cut-paper flowers in its corners, not a full-bleed band. */}
      <div
        className="shell relative mx-auto max-w-[1150px] px-4 py-14 sm:px-8 md:py-20 lg:px-12"
        style={{ backgroundColor: 'var(--color-primary)', boxShadow: '0 30px 80px rgba(0,54,37,0.28)' }}
      >
        <Flower src="/flower-1.png" className="-left-16 -top-16 w-48 md:w-72" opacity={0.14} data-parallax="0.13" />
        <Flower src="/flower-2.png" className="-bottom-20 -right-16 w-52 md:w-80" opacity={0.14} data-parallax="-0.13" />
        <Blob className="left-[10%] top-6 h-64 w-64" color="var(--color-secondary-container)" opacity={0.16} />
        <Blob className="bottom-6 right-[8%] h-64 w-64" color="var(--color-tertiary-fixed)" opacity={0.14} />

        <div className="relative mx-auto max-w-6xl">
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
              className="fade-left stagger-1 order-2 cursor-pointer rounded-[28px] p-6 transition-all duration-300 sm:p-7 lg:order-1 lg:mt-6"
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
              className="fade-right stagger-2 order-1 cursor-pointer rounded-[28px] p-6 transition-all duration-300 sm:p-8 lg:order-2"
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

              <CtaButton location="pricing-annual" size="lg" className="cta-sheen mt-7 w-full">
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

        {/* One power user, right where the price is — the brief's quote block. */}
        <figure className="fade-up glass-card-dark mx-auto mt-10 flex max-w-2xl flex-col items-center gap-3 rounded-[24px] p-5 text-center sm:mt-12 sm:p-6">
          <Stars color="var(--color-tertiary-fixed)" />
          <blockquote className="rsp-section-p m-0" style={{ color: '#fff' }}>
            &ldquo;{QUOTE.quote}&rdquo;
          </blockquote>
          <figcaption className="text-[13px]" style={{ color: 'rgba(255,255,255,0.72)' }}>
            <strong style={{ color: 'var(--color-secondary-container)' }}>{QUOTE.name}</strong> · {QUOTE.role}
          </figcaption>
        </figure>
        </div>
      </div>
    </section>
  )
}
