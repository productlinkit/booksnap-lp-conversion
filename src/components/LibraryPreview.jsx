import { USAGE } from '../lib/config'
import { useInView } from '../lib/hooks'
import { Blob, Icon, Phone } from './primitives'

/**
 * The hero visual: the same product, twice — the free plan drained and locked,
 * Premium in full colour beside it. Both panes are real production screenshots
 * from booksnap.ai (`public/app/`), so the comparison is the actual app rather
 * than a drawing of it.
 *
 * The free side is the production limit screen — the same capture the Ask AI
 * section shows in full colour, here drained and behind a padlock, so the hero
 * states the reader's situation with the product's own screen rather than a
 * generic reading view.
 *
 * Laid out as a two-column grid rather than overlapping absolute phones: the
 * pair then shrinks with the column all the way to 320px instead of colliding.
 * The floating chips sit above it and only appear from `sm` up, where there is
 * room for them to overlap the frames without covering the screens.
 */

function PlanTag({ premium }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.08em] sm:text-[12px]"
      style={
        premium
          ? { backgroundColor: 'var(--color-tertiary-fixed)', color: 'var(--color-tertiary-container)' }
          : { backgroundColor: 'var(--color-surface-container)', color: 'var(--color-on-surface-variant)' }
      }
    >
      <Icon name={premium ? 'lock_open' : 'lock'} className="text-[14px]" />
      {premium ? 'Premium' : 'Free plan'}
    </span>
  )
}

/**
 * The usage meter under each phone — full on Free, open on Premium.
 *
 * The bar fills from empty when it is reached rather than arriving already
 * full: watching the free plan's allowance run out to the end of the track is
 * the argument, and a static bar does not make it.
 */
function Meter({ premium }) {
  const [ref, inView] = useInView(0.6)

  return (
    <div ref={ref} className="mt-3 w-full">
      <div className="flex items-baseline justify-between gap-2 text-[11px] font-semibold sm:text-[12px]">
        <span style={{ color: 'var(--color-on-surface-variant)' }}>Snaps</span>
        <span
          className="tabular-nums font-bold"
          style={{ color: premium ? 'var(--color-primary)' : 'var(--color-tertiary-ink)' }}
        >
          {premium ? 'Unlimited' : `${USAGE.snapsUsed}/${USAGE.snapsTotal}`}
        </span>
      </div>
      <div
        className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full"
        style={{ backgroundColor: 'var(--color-surface-container)' }}
      >
        <div
          className={`meter-fill h-full rounded-full ${premium || !inView ? '' : 'meter-full'}`}
          style={{
            width: inView ? '100%' : '0%',
            transitionDelay: premium ? '0.25s' : '0s',
            backgroundColor: premium ? 'var(--color-primary)' : 'var(--color-tertiary-fixed)',
          }}
        />
      </div>
    </div>
  )
}

/** A floating stat chip. `tone="gold"` marks the one that states the payoff. */
function Chip({ className, icon, label, value, tone }) {
  const gold = tone === 'gold'
  return (
    <span
      className={`glass-card absolute hidden items-center gap-2.5 rounded-2xl px-3.5 py-2.5 sm:flex ${className}`}
      style={gold ? { background: 'var(--color-tertiary-fixed)', border: '1px solid rgba(255,255,255,0.6)' } : undefined}
    >
      <span
        className="grid h-8 w-8 shrink-0 place-items-center rounded-full"
        style={{
          backgroundColor: gold ? 'rgba(255,255,255,0.55)' : 'var(--color-secondary-container)',
          color: gold ? 'var(--color-tertiary-container)' : 'var(--color-primary)',
        }}
      >
        <Icon name={icon} className="text-[17px]" />
      </span>
      <span className="min-w-0 leading-tight">
        <span
          className="block text-[10px] font-bold uppercase tracking-[0.07em]"
          style={{ color: gold ? 'var(--color-tertiary-ink)' : 'var(--color-on-surface-variant)' }}
        >
          {label}
        </span>
        <span
          className="block text-[13px] font-extrabold"
          style={{ color: gold ? 'var(--color-tertiary-container)' : 'var(--color-primary)' }}
        >
          {value}
        </span>
      </span>
    </span>
  )
}

export default function LibraryPreview() {
  return (
    <div className="relative mx-auto w-full max-w-[440px]">
      {/* Colour wash behind the pair, the same soft blobs the site uses. */}
      <Blob className="-left-10 top-4 h-56 w-56" color="var(--color-secondary-container)" opacity={0.5} />
      <Blob className="-right-8 bottom-6 h-64 w-64" color="var(--color-tertiary-fixed)" opacity={0.45} />

      <div className="relative grid grid-cols-2 items-end gap-3 sm:gap-5">
        {/* ---------- Free: what the reader is looking at right now ---------- */}
        <figure className="m-0 flex flex-col items-center">
          <Phone
            className="animate-float-1 w-full"
            src="/app/screen-limit.png"
            alt="BookSnap on the free plan with the monthly limit reached"
            locked
          >
            <span
              className="absolute left-1/2 top-1/2 z-[2] grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full sm:h-14 sm:w-14"
              style={{ backgroundColor: 'rgba(252,248,251,0.92)', color: 'var(--color-primary)' }}
            >
              <Icon name="lock" className="text-[22px] sm:text-[26px]" />
            </span>
          </Phone>
          <figcaption className="mt-3 flex w-full flex-col items-center">
            <PlanTag premium={false} />
            <Meter premium={false} />
          </figcaption>
        </figure>

        {/* ---------- Premium: the same app with the ceiling removed ---------- */}
        <figure className="m-0 flex flex-col items-center">
          <Phone
            className="animate-float-3 w-full"
            src="/app/screen-book.png"
            alt="The BookSnap reader on Premium, with unlimited snaps"
            style={{ boxShadow: '0 26px 60px rgba(0,54,37,0.30)' }}
          />
          <figcaption className="mt-3 flex w-full flex-col items-center">
            <PlanTag premium />
            <Meter premium />
          </figcaption>
        </figure>
      </div>

      {/* Floating chips — the two numbers the whole page argues about. */}
      <Chip
        className="animate-float-2 -left-6 top-[18%] md:-left-10"
        icon="forum"
        label="Ask AI"
        value={`${USAGE.askUsed}/${USAGE.askTotal} used`}
      />
      <Chip
        className="animate-float-4 -right-4 top-[46%] md:-right-8"
        icon="all_inclusive"
        label="On Premium"
        value="No limit"
        tone="gold"
      />
    </div>
  )
}
