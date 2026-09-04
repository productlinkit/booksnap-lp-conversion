import { useState } from 'react'
import { PRICING, TRIAL, HOME_URL, PLANS_URL, CTA } from '../lib/config'
import { PREMIUM_FEATURES, TRUST } from '../lib/content'
import { Blob, Icon } from './primitives'

/**
 * The checkout preview.
 *
 * ⚠️ No payment is taken here and none can be. The card fields are `readOnly`
 * and hold sample values, nothing is bound to state, and there is no form
 * submission or network call anywhere on this page. That is deliberate rather
 * than unfinished: a page that looks like a checkout and accepts typing will
 * be given real card numbers by real people, and this project has no backend,
 * no Stripe key and no session to do anything safe with them. Real payment
 * lives in the app, behind a signed-in session, and the button hands off to it.
 *
 * To make this take money for real it needs Stripe Elements, the publishable
 * key, and an authenticated call to `/stripe/subscribe` — which is a different
 * piece of work, not a few edits to this file.
 */

/** A card field: looks like the real thing, accepts nothing. */
function Field({ label, value, className = '', icon }) {
  return (
    <label className={`flex flex-col gap-1.5 ${className}`}>
      <span className="text-[12.5px] font-bold" style={{ color: 'var(--color-primary)' }}>
        {label}
      </span>
      <span
        className="flex items-center gap-2 rounded-2xl px-3.5 py-3"
        style={{
          backgroundColor: 'var(--color-surface-container)',
          border: '1px solid rgba(0,54,37,0.08)',
        }}
      >
        <input
          type="text"
          value={value}
          readOnly
          tabIndex={-1}
          aria-describedby="preview-notice"
          autoComplete="off"
          className="w-full cursor-default bg-transparent text-[14.5px] outline-none"
          style={{ color: 'var(--color-on-surface-variant)' }}
        />
        {icon && <Icon name={icon} className="shrink-0 text-[18px]" style={{ color: 'var(--color-outline-variant)' }} />}
      </span>
    </label>
  )
}

function PlanOption({ id, name, note, amount, period, badge, selected, onSelect }) {
  return (
    <label
      htmlFor={`co-${id}`}
      className="flex cursor-pointer items-start gap-3 rounded-2xl p-3.5 transition-all duration-200"
      style={{
        backgroundColor: selected ? 'var(--color-secondary-container)' : 'var(--color-surface)',
        border: `1.5px solid ${selected ? 'var(--color-primary-container)' : 'rgba(0,54,37,0.10)'}`,
      }}
    >
      <input
        type="radio"
        id={`co-${id}`}
        name="co-plan"
        checked={selected}
        onChange={onSelect}
        className="mt-1 h-4 w-4 shrink-0"
        style={{ accentColor: 'var(--color-primary)' }}
      />
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-2">
          <span className="text-[14.5px] font-bold" style={{ color: 'var(--color-primary)' }}>
            {name}
          </span>
          {badge && (
            <span
              className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.07em]"
              style={{ backgroundColor: 'var(--color-tertiary-fixed)', color: 'var(--color-tertiary-container)' }}
            >
              {badge}
            </span>
          )}
        </span>
        <span className="mt-0.5 block text-[12.5px]" style={{ color: 'var(--color-on-surface-variant)' }}>
          {note}
        </span>
      </span>
      <span className="shrink-0 text-right">
        <span className="block text-[15px] font-extrabold" style={{ color: 'var(--color-primary)' }}>
          {amount}
        </span>
        <span className="block text-[11.5px]" style={{ color: 'var(--color-on-surface-variant)' }}>
          {period}
        </span>
      </span>
    </label>
  )
}

export default function Checkout() {
  const [plan, setPlan] = useState('annual')
  const chosen = plan === 'annual' ? PRICING.annual : PRICING.monthly
  const dueToday = TRIAL.show ? PRICING.trialPrice : chosen.amount

  return (
    <div className="relative min-h-full overflow-x-clip pb-16">
      <Blob className="-left-24 top-0 h-72 w-72" color="var(--color-secondary-container)" opacity={0.35} />
      <Blob className="-right-24 top-40 h-72 w-72" color="var(--color-tertiary-fixed)" opacity={0.3} />

      <header className="relative mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-6 sm:px-8">
        <a href="/" className="flex items-center gap-2.5 no-underline">
          <img src="/booksnap-logo.png" alt="BookSnap" className="h-6 w-auto sm:h-7" />
        </a>
        <a
          href="/"
          className="flex items-center gap-1.5 text-[13.5px] font-semibold no-underline transition-opacity hover:opacity-70"
          style={{ color: 'var(--color-on-surface-variant)' }}
        >
          <Icon name="arrow_back" className="text-[17px]" />
          Back
        </a>
      </header>

      <main className="relative mx-auto max-w-5xl px-4 sm:px-8">
        <h1 className="rsp-section-h2 font-extrabold" style={{ color: 'var(--color-primary)' }}>
          Confirm your upgrade.
        </h1>
        <p className="rsp-section-p mt-2 max-w-xl" style={{ color: 'var(--color-on-surface-variant)' }}>
          {TRIAL.show
            ? `Your first ${TRIAL.days} days are free. Cancel before they end and you are not charged.`
            : 'One upgrade, every cap lifted. Cancel anytime.'}
        </p>

        {/* Stated once, plainly, at the top of the form it applies to. */}
        <p
          id="preview-notice"
          className="mt-6 flex items-start gap-2.5 rounded-2xl p-3.5 text-[13px]"
          style={{ backgroundColor: 'var(--color-error-container)', color: 'var(--color-tertiary-container)' }}
        >
          <Icon name="info" className="mt-px shrink-0 text-[18px]" />
          <span>
            <strong>Preview only.</strong> No card is charged and these fields accept nothing — payment
            is taken in the BookSnap app, where your account and card are already set up. Continuing
            takes you there.
          </span>
        </p>

        <div className="mt-6 grid grid-cols-1 items-start gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.86fr)] lg:gap-6">
          {/* ---------- Payment details ---------- */}
          <section
            className="rounded-[28px] p-5 sm:p-6"
            style={{
              backgroundColor: 'var(--color-surface-lowest)',
              border: '1px solid rgba(0,54,37,0.07)',
              boxShadow: '0 14px 40px rgba(0,54,37,0.07)',
            }}
            aria-label="Payment details"
          >
            <h2 className="rsp-card-h3 font-bold" style={{ color: 'var(--color-primary)' }}>
              Payment details
            </h2>

            <div className="mt-5 flex flex-col gap-4">
              <Field label="Card number" value="4242 4242 4242 4242" icon="credit_card" />
              <div className="grid grid-cols-2 gap-4">
                <Field label="Expiry" value="04 / 28" />
                <Field label="CVC" value="•••" icon="lock" />
              </div>
              <Field label="Name on card" value="Your name" />
              <Field label="Country" value="Indonesia" icon="expand_more" />
            </div>
          </section>

          {/* ---------- Order summary ---------- */}
          <section
            className="rounded-[28px] p-5 sm:p-6"
            style={{
              backgroundColor: 'var(--color-surface-lowest)',
              border: '1px solid rgba(0,54,37,0.07)',
              boxShadow: '0 14px 40px rgba(0,54,37,0.07)',
            }}
            aria-label="Your plan"
          >
            <h2 className="rsp-card-h3 font-bold" style={{ color: 'var(--color-primary)' }}>
              Your plan
            </h2>

            <fieldset className="mt-4 flex flex-col gap-2.5 border-0 p-0">
              <legend className="sr-only">Choose a billing period</legend>
              <PlanOption
                id="annual"
                name="Premium Annual"
                note={PRICING.annual.perMonth}
                amount={PRICING.annual.amount}
                period={PRICING.annual.period}
                badge={`Save ${PRICING.annual.savePct}%`}
                selected={plan === 'annual'}
                onSelect={() => setPlan('annual')}
              />
              <PlanOption
                id="monthly"
                name="Premium Monthly"
                note="Billed month to month"
                amount={PRICING.monthly.amount}
                period={PRICING.monthly.period}
                selected={plan === 'monthly'}
                onSelect={() => setPlan('monthly')}
              />
            </fieldset>

            <ul className="mt-5 flex flex-col gap-2" style={{ borderTop: '1px solid rgba(0,54,37,0.08)' }}>
              {PREMIUM_FEATURES.slice(0, 3).map((feature) => (
                <li key={feature} className="mt-2 flex items-start gap-2 first:mt-3">
                  <Icon
                    name="check_circle"
                    className="mt-px shrink-0 text-[16px]"
                    style={{ color: 'var(--color-primary-container)', fontVariationSettings: "'FILL' 1" }}
                  />
                  <span className="text-[13.5px]" style={{ color: 'var(--color-on-surface-variant)' }}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <dl
              className="mt-5 flex flex-col gap-2 pt-4 text-[13.5px]"
              style={{ borderTop: '1px solid rgba(0,54,37,0.08)' }}
            >
              <div className="flex items-baseline justify-between gap-3">
                <dt style={{ color: 'var(--color-on-surface-variant)' }}>
                  {plan === 'annual' ? 'Premium Annual' : 'Premium Monthly'}
                </dt>
                <dd className="font-semibold" style={{ color: 'var(--color-primary)' }}>
                  {chosen.amount}
                  {chosen.period}
                </dd>
              </div>
              {TRIAL.show && (
                <div className="flex items-baseline justify-between gap-3">
                  <dt style={{ color: 'var(--color-on-surface-variant)' }}>{TRIAL.days}-day free trial</dt>
                  <dd className="font-semibold" style={{ color: 'var(--color-primary-container)' }}>
                    −{chosen.amount}
                  </dd>
                </div>
              )}
              <div
                className="mt-2 flex items-baseline justify-between gap-3 pt-3"
                style={{ borderTop: '1px solid rgba(0,54,37,0.08)' }}
              >
                <dt className="text-[15px] font-bold" style={{ color: 'var(--color-primary)' }}>
                  Due today
                </dt>
                <dd className="text-[24px] font-extrabold leading-none" style={{ color: 'var(--color-primary)' }}>
                  {dueToday}
                </dd>
              </div>
            </dl>

            {/* Not a submit button: there is no form to submit. It is the
                hand-off to the app, where the real checkout lives. */}
            <a
              href={HOME_URL}
              data-cta="checkout-continue"
              className="btn-hover-lift cta-sheen mt-5 inline-flex min-h-[54px] w-full items-center justify-center gap-2 rounded-full text-center text-[15px] font-semibold no-underline"
              style={{ backgroundColor: 'var(--color-tertiary-fixed)', color: 'var(--color-primary-container)' }}
            >
              <Icon name="lock_open" className="text-[19px]" />
              Continue to BookSnap
            </a>

            <p
              className="mt-3 flex items-center justify-center gap-1.5 text-center text-[12.5px]"
              style={{ color: 'var(--color-on-surface-variant)' }}
            >
              <Icon name="check_circle" className="text-[15px]" />
              {CTA.reassurance}
            </p>

            <p className="mt-2 text-center text-[12px]" style={{ color: 'var(--color-on-surface-variant)' }}>
              Prefer to pick your plan in the app?{' '}
              <a
                href={PLANS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold underline"
                style={{ color: 'var(--color-primary)' }}
              >
                Open plans there
              </a>
              .
            </p>
          </section>
        </div>

        <ul
          className="mt-6 grid grid-cols-1 gap-px overflow-hidden rounded-[24px] sm:grid-cols-2 lg:grid-cols-4"
          style={{ backgroundColor: 'rgba(0,54,37,0.09)' }}
        >
          {TRUST.map((item) => (
            <li
              key={item.label}
              className="flex items-center gap-3 px-4 py-4"
              style={{ backgroundColor: 'var(--color-surface-lowest)' }}
            >
              <span
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full"
                style={{ backgroundColor: 'var(--color-secondary-container)', color: 'var(--color-primary)' }}
              >
                <Icon name={item.icon} className="text-[18px]" />
              </span>
              <span className="min-w-0">
                <span className="block text-[13px] font-bold" style={{ color: 'var(--color-primary)' }}>
                  {item.label}
                </span>
                <span className="block text-[11.5px]" style={{ color: 'var(--color-on-surface-variant)' }}>
                  {item.sub}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}
