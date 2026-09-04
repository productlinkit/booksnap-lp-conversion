import { useState } from 'react'
import { PRICING, CTA } from '../lib/config'
import { PREMIUM_FEATURES, TESTIMONIALS, PRICING_QUOTE_INDEX } from '../lib/content'
import { Blob, CtaButton, Flower, Icon, SectionHead, Stars } from './primitives'

/**
 * One plan.
 *
 * Selection is a real radio so the choice is keyboard-operable and announced;
 * the card body forwards its clicks to the input. The CTA is a sibling of the
 * input rather than a child of a <label> — a link inside a label is invalid
 * HTML and swallows the tap on touch.
 *
 * `recommended` is the only thing that separates the two visually: a white
 * ground instead of a translucent one, a gold badge, a gold button and the
 * struck-through price. The rows themselves are identical on both.
 */
function PlanCard({
  id,
  name,
  recommended = false,
  selected,
  onSelect,
  tagline,
  amount,
  period,
  strike,
  note,
  cta,
  ctaLocation,
  reveal,
  order,
}) {
  const ink = recommended ? 'var(--color-primary)' : '#fff'
  const muted = recommended ? 'var(--color-on-surface-variant)' : 'rgba(255,255,255,0.72)'

  return (
    <div
      onClick={onSelect}
      className={`${reveal} ${order} flex cursor-pointer flex-col rounded-[28px] p-6 transition-all duration-300 sm:p-7`}
      style={
        recommended
          ? {
              backgroundColor: 'var(--color-surface-lowest)',
              border: `2px solid ${selected ? 'var(--color-tertiary-fixed)' : 'transparent'}`,
              boxShadow: selected ? '0 28px 70px rgba(0,0,0,0.30)' : '0 12px 36px rgba(0,0,0,0.18)',
            }
          : {
              backgroundColor: 'rgba(255,255,255,0.07)',
              border: `1.5px solid ${selected ? 'var(--color-tertiary-fixed)' : 'rgba(255,255,255,0.16)'}`,
            }
      }
    >
      {/* Row 1 — name and badge. Both cards carry a chip so the two header
          rows are the same height and the prices below them line up. */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="flex items-center gap-2.5">
          <input
            type="radio"
            id={`plan-${id}`}
            name="billing"
            value={id}
            checked={selected}
            onChange={onSelect}
            className="h-4 w-4 shrink-0"
            style={{ accentColor: recommended ? 'var(--color-primary)' : 'var(--color-tertiary-fixed)' }}
          />
          <label htmlFor={`plan-${id}`} className="cursor-pointer text-[15px] font-bold" style={{ color: ink }}>
            {name}
          </label>
        </span>
        <span
          className="rounded-full px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.08em]"
          style={
            recommended
              ? { backgroundColor: 'var(--color-tertiary-fixed)', color: 'var(--color-tertiary-container)' }
              : { backgroundColor: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.82)' }
          }
        >
          {tagline}
        </span>
      </div>

      {/* Row 2 — the price. */}
      <p className="mt-5 flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <span className="rsp-price font-extrabold" style={{ color: ink }}>
          {amount}
        </span>
        <span className="text-[15px]" style={{ color: muted }}>
          {period}
        </span>
        {strike && (
          <span className="text-[15px] line-through" style={{ color: muted, opacity: 0.7 }}>
            {strike}
          </span>
        )}
      </p>

      {/* Row 3 — one line under the price, on both cards. */}
      <p
        className="mt-2 text-[14px] font-semibold"
        style={{ color: recommended ? 'var(--color-primary-container)' : 'rgba(255,255,255,0.78)' }}
      >
        {note}
      </p>

      {/* Row 4 — the same six features, because both plans ship them. */}
      <ul className="mt-6 flex flex-col gap-2.5">
        {PREMIUM_FEATURES.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5">
            <Icon
              name="check_circle"
              className="mt-px shrink-0 text-[18px]"
              style={{
                color: recommended ? 'var(--color-primary-container)' : 'var(--color-secondary-container)',
                fontVariationSettings: "'FILL' 1",
              }}
            />
            <span className="text-[14.5px]" style={{ color: muted }}>
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {/* Absorbs any residual difference so both buttons sit on one line. */}
      <div className="flex-1" />

      <CtaButton
        location={ctaLocation}
        size="lg"
        variant={recommended ? 'primary' : 'outline-light'}
        className={`mt-7 w-full ${recommended ? 'cta-sheen' : ''}`}
      >
        {recommended && <Icon name="lock_open" className="text-[19px]" />}
        {cta}
      </CtaButton>

      <p
        className="mt-3 flex items-center justify-center gap-1.5 text-center text-[12.5px]"
        style={{ color: recommended ? 'var(--color-on-surface-variant)' : 'rgba(255,255,255,0.6)' }}
      >
        <Icon name="check_circle" className="text-[15px]" />
        {CTA.reassurance}
      </p>
    </div>
  )
}

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

          {/* Both cards run the same six rows in the same order, so they end at
              the same height without being forced to — no stretched card with a
              hole in it, and no card that reads as an afterthought. The plans
              really do ship identical features; only the billing differs, and
              two matching lists say that more plainly than a footnote would. */}
          <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-6">
            <PlanCard
              id="monthly"
              name="Monthly"
              selected={plan === 'monthly'}
              onSelect={() => setPlan('monthly')}
              tagline="Flexible"
              amount={PRICING.monthly.amount}
              period={PRICING.monthly.period}
              note="Billed month to month. Stop whenever you like."
              cta="Go Premium monthly"
              ctaLocation="pricing-monthly"
              reveal="fade-left stagger-1"
              order="order-2 lg:order-1"
            />

            <PlanCard
              id="annual"
              name="Annual"
              recommended
              selected={plan === 'annual'}
              onSelect={() => setPlan('annual')}
              tagline={`Best value · Save ${PRICING.annual.savePct}%`}
              amount={PRICING.annual.amount}
              period={PRICING.annual.period}
              strike={PRICING.annual.strike}
              note={PRICING.annual.perMonth}
              cta={CTA.pricing}
              ctaLocation="pricing-annual"
              reveal="fade-right stagger-2"
              order="order-1 lg:order-2"
            />
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
