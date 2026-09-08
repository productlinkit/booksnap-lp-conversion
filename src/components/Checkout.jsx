import { PLANS } from '../lib/onboarding'
import { HOME_URL, PLANS_URL } from '../lib/config'
import { Icon } from './primitives'
import { DEEP, INK, MUTED, FlowShell, Heading, PrimaryButton, TopLink } from './flow'

/**
 * The last screen of the flow, in the same clothes as the ones before it:
 * phone-width panel, the two washes, a two-line heading with its last word in
 * green, one pill button at the bottom.
 *
 * ⚠️ No payment is taken here and none can be. The card fields are `readOnly`
 * with sample values, nothing is bound to state, and the page makes no network
 * call of any kind. Keep it that way until there is a real integration: a
 * checkout that accepts typing gets given real card numbers by real people,
 * and this project has no backend, no Stripe key and no session to hold them
 * safely. Inert fields mean no card data can be entered at all, so none can
 * leak.
 *
 * Real payment lives in the app, behind a signed-in session, and the button
 * hands off to it. To take money here instead needs Stripe Elements, the
 * publishable key, and an authenticated call to `/stripe/subscribe` — a
 * different piece of work, not a few edits to this file.
 */

/** The plan chosen back in /start, read off the query string. */
function chosenPlan() {
  const id = new URLSearchParams(window.location.search).get('plan')
  return PLANS.find((p) => p.id === id) || PLANS[0]
}

/** A card field: dressed like the flow's email input, accepts nothing. */
function Field({ label, value, icon, className = '' }) {
  return (
    <label className={`flex flex-col gap-1.5 ${className}`}>
      <span className="text-[13px] font-bold" style={{ color: DEEP }}>
        {label}
      </span>
      <span
        className="flex items-center gap-2 rounded-2xl px-4 py-3.5"
        style={{ backgroundColor: '#fff', border: '1.5px solid rgba(39,107,84,0.3)' }}
      >
        <input
          type="text"
          value={value}
          readOnly
          tabIndex={-1}
          autoComplete="off"
          className="w-full cursor-default bg-transparent text-[15.5px] outline-none"
          style={{ color: INK }}
        />
        {icon && <Icon name={icon} className="shrink-0 text-[18px]" style={{ color: 'rgba(39,107,84,0.45)' }} />}
      </span>
    </label>
  )
}

export default function Checkout() {
  const plan = chosenPlan()

  return (
    <FlowShell>
      <TopLink href="/start">Back</TopLink>

      <div className="mt-6">
        <Heading
          line1="One Last Step to"
          line2="Unlimited"
          accent="Reading"
          sub={
            plan.badge
              ? 'Your first 3 days are free. Cancel before they end and you are not charged.'
              : `${plan.name} — ${plan.tagline}`
          }
        />
      </div>

      <div className="mt-5 flex flex-1 flex-col gap-4">
        {/* What was chosen back in /start, in the same card shape it was chosen in. */}
        <div
          className="rounded-[20px] p-4"
          style={{ backgroundColor: '#fff', boxShadow: '0 6px 20px rgba(16,21,18,0.06)' }}
        >
          <div className="flex items-start justify-between gap-3">
            <span className="min-w-0">
              <span className="block text-[19px] font-extrabold" style={{ color: DEEP }}>
                {plan.name}
              </span>
              <a href="/start" className="mt-0.5 block text-[13.5px] underline" style={{ color: MUTED }}>
                Change plan
              </a>
            </span>
            <span className="shrink-0 text-right">
              <span className="flex items-baseline justify-end gap-1">
                <span className="text-[28px] font-extrabold leading-none" style={{ color: INK }}>
                  {plan.price}
                </span>
                <span className="text-[13px] font-semibold" style={{ color: MUTED }}>
                  {plan.currency}
                </span>
              </span>
              <span className="mt-1 block text-[13px]" style={{ color: MUTED }}>
                {plan.then ? plan.then : 'per month'}
              </span>
            </span>
          </div>

          {plan.badge && (
            <p
              className="mt-3 flex items-center gap-2 rounded-xl px-3 py-2 text-[13px] font-semibold"
              style={{ backgroundColor: '#fdf6d5', color: '#7a5c05' }}
            >
              <Icon name="schedule" className="shrink-0 text-[17px]" />
              {plan.badge} · nothing due today
            </p>
          )}
        </div>

        <Field label="Card number" value="4242 4242 4242 4242" icon="credit_card" />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Expiry" value="04 / 28" />
          <Field label="CVC" value="•••" icon="lock" />
        </div>
        <Field label="Name on card" value="Your name" />

        <p className="flex items-center gap-2 text-[13px]" style={{ color: MUTED }}>
          <Icon name="lock" className="shrink-0 text-[16px]" style={{ color: DEEP }} />
          Secure payment, processed by Stripe.
        </p>
      </div>

      <div className="mt-5 flex flex-col gap-3">
        <PrimaryButton href={HOME_URL} data-cta="checkout-continue">
          Continue to BookSnap
        </PrimaryButton>
        <p className="text-center text-[14px]" style={{ color: MUTED }}>
          Cancel Anytime before next renewal
        </p>
        <p className="text-center text-[13px]" style={{ color: MUTED }}>
          Prefer to pick your plan in the app?{' '}
          <a
            href={PLANS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline"
            style={{ color: DEEP }}
          >
            Open plans there
          </a>
          .
        </p>
      </div>
    </FlowShell>
  )
}
