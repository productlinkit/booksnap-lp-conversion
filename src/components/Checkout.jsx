import { useState } from 'react'
import { PLANS } from '../lib/onboarding'
import { HOME_URL, PLANS_URL } from '../lib/config'
import { Icon } from './primitives'
import { DEEP } from './flow'

/**
 * The Payment Method screen, rebuilt from the app's own.
 *
 * Measured off its capture rather than eyeballed: the page is #e3e7e8, fields
 * are 58px tall with 18px between them and a 1.5px #1e5341 border, the page
 * padding is 26px, and the total bar is a white sheet pinned to the bottom.
 * There are no background overlays on this screen — it is flat grey — so it
 * does not use FlowShell.
 *
 * ⚠️ THE FIELDS TAKE INPUT, BUT NOTHING IS TAKEN FROM THEM.
 *
 * They were `readOnly`; typing was enabled on request so the flow can be
 * walked end to end. What has not changed, and must not:
 *
 *   - Values live in this component's `useState` and nowhere else. They are
 *     never written to storage, never attached to an analytics event, and
 *     never sent anywhere — this page makes no network call at all. Clicking
 *     Continue navigates away and the state is gone with the page.
 *   - `autoComplete="off"` on every field, so the browser does not offer to
 *     save a card either.
 *   - No charge happens. Continue hands off to the app, where real payment
 *     lives behind a signed-in session.
 *
 * So a real card number typed here is discarded, not collected. That is the
 * only reason this is safe to have live. Wiring these values to anything —
 * a fetch, localStorage, a tracking call — turns a harmless mock into a form
 * that quietly harvests card data. Do not. To take payment for real, use
 * Stripe Elements with the publishable key and an authenticated
 * `/stripe/subscribe` call, which never lets raw card data touch this page.
 */

const INK = '#101512'
const MUTED = '#6b7671'
const PAGE = '#e3e7e8'
const BORDER = '#1e5341'

function chosenPlan() {
  const id = new URLSearchParams(window.location.search).get('plan')
  // Falls back to Premium, not PLANS[0] — that is the free plan now.
  return PLANS.find((p) => p.id === id) || PLANS.find((p) => p.id === 'premium')
}

/** A field in the app's shape: label above the value, inside one box. */
function Field({ label, placeholder, value, onChange, trailing, inputMode, maxLength, className = '' }) {
  return (
    <label
      className={`flex min-h-[58px] flex-col justify-center gap-0.5 rounded-[14px] px-4 py-2 ${className}`}
      style={{ border: `1.5px solid ${BORDER}` }}
    >
      <span className="text-[13px]" style={{ color: INK }}>
        {label}
      </span>
      <span className="flex items-center gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          inputMode={inputMode}
          maxLength={maxLength}
          /* Off on every field: nothing here should reach a password manager
             either, since nothing here is a real payment. */
          autoComplete="off"
          className="w-full bg-transparent text-[15px] outline-none placeholder:text-[#9aa5a1]"
          style={{ color: INK }}
        />
        {trailing}
      </span>
    </label>
  )
}

/** Digit grouping as you type — presentation only, nothing is validated. */
const groupCard = (v) =>
  v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()

const groupExpiry = (v) => {
  const d = v.replace(/\D/g, '').slice(0, 4)
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d
}

/** The Visa mark that sits in the card-number field. */
function VisaMark() {
  return (
    <span
      className="grid h-[22px] w-[34px] shrink-0 place-items-center rounded-[3px] text-[11px] font-extrabold italic tracking-tight"
      style={{ backgroundColor: '#1a1f71', color: '#fff' }}
      aria-label="Visa"
    >
      VISA
    </span>
  )
}

export default function Checkout() {
  const plan = chosenPlan()

  // Local only. Never stored, never sent — see the note at the top of the file.
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [card, setCard] = useState('')
  const [expiry, setExpiry] = useState('')
  const [ccv, setCcv] = useState('')

  return (
    <div className="flex min-h-[100svh] justify-center" style={{ backgroundColor: '#d7dcdd' }}>
      <div className="relative flex w-full max-w-[430px] flex-col" style={{ backgroundColor: PAGE }}>
        <div className="flex flex-1 flex-col px-[26px] pb-[190px] pt-8">
          <header className="flex items-center gap-4">
            <a href="/start" aria-label="Go back" className="-ml-1 flex items-center no-underline" style={{ color: INK }}>
              <Icon name="chevron_left" className="text-[30px]" />
            </a>
            <h1 className="text-[24px] font-bold" style={{ color: INK }}>
              Payment Method
            </h1>
          </header>

          <section className="mt-9">
            <h2 className="text-[21px] font-extrabold" style={{ color: DEEP }}>
              {plan.name}
            </h2>
            {plan.trial && (
              <p className="mt-2 text-[14.5px] font-bold" style={{ color: INK }}>
                {plan.trial.badge}
              </p>
            )}
            <p className="mt-2 flex flex-wrap items-baseline gap-x-2.5">
              <span className="flex items-baseline gap-1.5">
                <span className="text-[34px] font-extrabold leading-none" style={{ color: INK }}>
                  {plan.trial ? plan.trial.price : plan.price.monthly}
                </span>
                <span className="text-[15px] font-bold" style={{ color: INK }}>
                  {plan.currency}
                </span>
              </span>
              {plan.trial && (
                <span className="text-[15px] line-through" style={{ color: '#9aa5a1' }}>
                  {plan.trial.strike}
                </span>
              )}
            </p>
            <p className="mt-3 text-[15px] leading-relaxed" style={{ color: MUTED }}>
              {plan.trial ? plan.trial.blurb : plan.tagline}
            </p>
          </section>

          <h2 className="mt-8 text-[19px] font-extrabold" style={{ color: DEEP }}>
            Credit Card Details
          </h2>

          <div className="mt-5 flex flex-col gap-[18px]">
            <Field label="Name on Card" placeholder="Alexander Pierce" value={name} onChange={setName} />
            <Field label="Email" placeholder="example@email.com" value={email} onChange={setEmail} />
            <Field
              label="Card Number"
              placeholder="XXXX XXXX XXXX XXXX"
              value={card}
              onChange={(v) => setCard(groupCard(v))}
              inputMode="numeric"
              maxLength={19}
              trailing={<VisaMark />}
            />
            <div className="grid grid-cols-2 gap-[18px]">
              <Field
                label="Expiration Date"
                placeholder="MM/YY"
                value={expiry}
                onChange={(v) => setExpiry(groupExpiry(v))}
                inputMode="numeric"
                maxLength={5}
              />
              <Field
                label="CCV"
                placeholder="XXX"
                value={ccv}
                onChange={(v) => setCcv(v.replace(/\D/g, '').slice(0, 4))}
                inputMode="numeric"
                maxLength={4}
              />
            </div>
          </div>

          <a
            href={PLANS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-hover-lift mt-7 flex min-h-[64px] items-center gap-4 rounded-[18px] px-5 no-underline"
            style={{ backgroundColor: DEEP, color: '#fff' }}
          >
            <Icon name="credit_card" className="shrink-0 text-[26px]" />
            <span className="flex-1 text-[17px] font-medium">Other Payment Methods</span>
            <Icon name="chevron_right" className="shrink-0 text-[26px]" />
          </a>
        </div>

        {/* The total sheet, pinned to the bottom of the panel as in the app. */}
        <div
          className="sticky bottom-0 mt-auto rounded-t-[28px] px-[26px] pb-7 pt-6"
          style={{ backgroundColor: '#fcfdfd', boxShadow: '0 -8px 30px rgba(16,21,18,0.06)' }}
        >
          <div className="flex items-baseline justify-between gap-4">
            <span className="text-[17px]" style={{ color: INK }}>
              Total
            </span>
            <span className="flex items-baseline gap-1.5">
              <span className="text-[30px] font-extrabold leading-none" style={{ color: INK }}>
                {plan.price}
              </span>
              <span className="text-[15px] font-bold" style={{ color: INK }}>
                {plan.currency}
              </span>
            </span>
          </div>

          {/* Always enabled and never validated: the reader continues whatever
              the fields hold, which is the bypass this flow is meant to be. */}
          <a
            href={HOME_URL}
            data-cta="checkout-continue"
            className="btn-hover-lift mt-5 inline-flex min-h-[58px] w-full items-center justify-center rounded-full text-center text-[17px] font-semibold no-underline"
            style={{ backgroundColor: DEEP, color: '#fff' }}
          >
            Continue Payment
          </a>
        </div>
      </div>
    </div>
  )
}
