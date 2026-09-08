import { useState } from 'react'
import { PLANS, YEARLY_SAVE_PCT } from '../lib/onboarding'
import { UPGRADE_URL, HOME_URL, CTA } from '../lib/config'
import { TESTIMONIALS, PRICING_QUOTE_INDEX } from '../lib/content'
import { Blob, Flower, Icon, SectionHead, Stars } from './primitives'

/**
 * The three plan cards, matching the app's own.
 *
 * Free is mint, Premium is gold and raised with the "Best deal" badge, Pro is
 * the dark card. The billing toggle switches the per-month figure on all three
 * at once — see the warning above `PLANS`: the yearly numbers are derived at
 * the advertised 20%, not confirmed.
 *
 * One deliberate difference from the design it copies. Its Free card carries a
 * "Get Started Free" button, which is written for someone who does not have an
 * account. This page is only ever served to signed-in free users, so that card
 * states where they already are instead of inviting them to sign up for it.
 * To restore the original, give the free plan a `cta` in `onboarding.js` and
 * it will render as a button like the others.
 */

/** The Ask AI review, quoted beside the price because Ask AI is what is sold. */
const QUOTE = TESTIMONIALS[PRICING_QUOTE_INDEX]

const TONES = {
  mint: {
    card: 'var(--color-secondary-container)',
    corner: 'rgba(0,54,37,0.06)',
    ink: 'var(--color-primary)',
    muted: 'rgba(0,54,37,0.68)',
    check: 'var(--color-primary)',
    button: { backgroundColor: 'var(--color-primary)', color: '#fff' },
  },
  gold: {
    card: 'var(--color-tertiary-fixed)',
    corner: 'rgba(0,54,37,0.07)',
    ink: 'var(--color-primary)',
    muted: 'var(--color-tertiary-ink)',
    check: 'var(--color-primary)',
    button: { backgroundColor: 'var(--color-primary)', color: '#fff' },
  },
  dark: {
    card: '#012a1c',
    corner: 'rgba(255,255,255,0.05)',
    ink: '#fff',
    muted: 'rgba(255,255,255,0.72)',
    check: 'var(--color-tertiary-fixed)',
    button: { backgroundColor: 'var(--color-tertiary-fixed)', color: 'var(--color-primary)' },
  },
}

function PlanCard({ plan, period, featured }) {
  const t = TONES[plan.tone]
  const amount = plan.price[period]

  return (
    <div
      className={`fade-scale relative flex flex-col overflow-hidden rounded-[28px] p-6 sm:p-7 ${
        featured ? 'lg:-my-4 lg:py-10' : ''
      }`}
      style={{
        backgroundColor: t.card,
        boxShadow: featured ? '0 28px 70px rgba(0,0,0,0.30)' : '0 12px 36px rgba(0,0,0,0.18)',
      }}
    >
      {/* The quarter-circle the design tucks into every card's top corner. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full"
        style={{ backgroundColor: t.corner }}
      />

      {plan.badge && (
        <span
          className="absolute right-5 top-6 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.07em]"
          style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-tertiary-fixed)' }}
        >
          {plan.badge}
          <Icon name="auto_awesome" className="text-[13px]" />
        </span>
      )}

      <h3 className="relative text-[24px] font-extrabold" style={{ color: t.ink }}>
        {plan.name}
      </h3>

      <p className="relative mt-1 flex flex-wrap items-baseline gap-x-2">
        <span className="rsp-price font-extrabold" style={{ color: t.ink }}>
          {amount}
        </span>
        <span className="text-[15px]" style={{ color: t.muted }}>
          /month
        </span>
      </p>

      <p className="relative mt-3 text-[14.5px]" style={{ color: t.muted }}>
        {plan.tagline}
        {period === 'yearly' && plan.yearlyTotal !== '$0' && (
          <span className="mt-1 block font-semibold">{plan.yearlyTotal} billed yearly.</span>
        )}
      </p>

      <ul className="relative mt-6 flex flex-col gap-3">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5">
            <Icon name="check_circle" className="mt-px shrink-0 text-[19px]" style={{ color: t.check }} />
            <span className="text-[14.5px]" style={{ color: t.ink }}>
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <div className="flex-1" />

      {plan.cta ? (
        <a
          href={UPGRADE_URL}
          data-cta={`pricing-${plan.id}`}
          className={`btn-hover-lift relative mt-7 inline-flex min-h-[54px] w-full items-center justify-center rounded-full text-center text-[16px] font-semibold no-underline ${
            featured ? 'cta-sheen' : ''
          }`}
          style={t.button}
        >
          {plan.cta}
        </a>
      ) : (
        // Free: this reader is already on it, so the slot says so.
        <a
          href={HOME_URL}
          target="_blank"
          rel="noopener noreferrer"
          data-cta="pricing-free"
          className="relative mt-7 inline-flex min-h-[54px] w-full items-center justify-center gap-2 rounded-full text-center text-[15px] font-semibold no-underline"
          style={{ border: '1.5px solid rgba(0,54,37,0.35)', color: 'var(--color-primary)' }}
        >
          <Icon name="check" className="text-[18px]" />
          Your current plan
        </a>
      )}
    </div>
  )
}

export default function Pricing() {
  const [period, setPeriod] = useState('monthly')

  return (
    <section id="pricing" className="scroll-mt-28 px-3 py-10 sm:px-6 sm:py-14 lg:py-16">
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
              sub="Pick the plan that matches how much you read. Cancel anytime."
              ink="#fff"
              subInk="rgba(255,255,255,0.78)"
            />
          </div>

          {/* Billing toggle */}
          <div className="fade-up mt-8 flex justify-center">
            <div
              className="inline-flex items-center gap-1 rounded-full p-1"
              style={{ backgroundColor: 'rgba(255,255,255,0.10)' }}
              role="group"
              aria-label="Billing period"
            >
              {['monthly', 'yearly'].map((key) => {
                const on = period === key
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setPeriod(key)}
                    aria-pressed={on}
                    className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[15px] font-bold capitalize transition-all duration-200"
                    style={
                      on
                        ? { backgroundColor: 'var(--color-tertiary-fixed)', color: 'var(--color-primary)' }
                        : { color: 'rgba(255,255,255,0.82)' }
                    }
                  >
                    {key}
                    {key === 'yearly' && (
                      <span
                        className="rounded-full px-2 py-0.5 text-[10.5px] font-bold uppercase tracking-[0.06em]"
                        style={
                          on
                            ? { backgroundColor: 'var(--color-primary)', color: 'var(--color-tertiary-fixed)' }
                            : { backgroundColor: 'var(--color-tertiary-fixed)', color: 'var(--color-primary)' }
                        }
                      >
                        Save {YEARLY_SAVE_PCT}%
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 items-stretch gap-5 md:grid-cols-3 md:gap-6">
            {PLANS.map((plan) => (
              <PlanCard key={plan.id} plan={plan} period={period} featured={plan.id === 'premium'} />
            ))}
          </div>

          <p
            className="fade-up mt-6 flex items-center justify-center gap-1.5 text-center text-[13px]"
            style={{ color: 'rgba(255,255,255,0.7)' }}
          >
            <Icon name="check_circle" className="text-[16px]" style={{ color: 'var(--color-secondary-container)' }} />
            {CTA.reassurance}
          </p>

          {/* One power user, right where the price is. */}
          <figure className="fade-up glass-card-dark mx-auto mt-10 flex max-w-2xl flex-col items-center gap-3 rounded-[24px] p-5 text-center sm:p-6">
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
