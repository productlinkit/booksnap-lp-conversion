import { COMPARISON } from '../lib/content'
import { CTA } from '../lib/config'
import { Blob, CtaButton, Icon, SectionHead } from './primitives'

/**
 * Free vs Premium.
 *
 * Two renderings of one data source: a real <table> from `md` up, and stacked
 * per-feature cards below it. Squeezing a three-column table into 375px would
 * either overflow or shrink the type past readable — so the small screen gets
 * a layout built for it instead of a scaled-down copy of the large one.
 *
 * The Premium column is a single tinted panel running the height of the table,
 * capped by a dark green header: the eye should land on that column first and
 * read down it, rather than scanning the grid left to right.
 */

const PREMIUM_BG = 'rgba(164,244,191,0.24)'

function ValueMark({ value, has }) {
  if (has === false) {
    return (
      <span className="inline-flex items-center gap-1.5" style={{ color: 'var(--color-on-surface-variant)' }}>
        <Icon name="close" className="text-[17px]" style={{ opacity: 0.5 }} />
        <span className="text-[13.5px]">{value}</span>
      </span>
    )
  }
  return <span className="text-[13.5px]">{value}</span>
}

function PremiumMark({ value }) {
  return (
    <span className="inline-flex items-center gap-1.5 font-bold" style={{ color: 'var(--color-primary)' }}>
      <Icon
        name="check_circle"
        className="shrink-0 text-[17px]"
        style={{ color: 'var(--color-primary-container)', fontVariationSettings: "'FILL' 1" }}
      />
      <span className="text-[13.5px]">{value}</span>
    </span>
  )
}

export default function Comparison() {
  return (
    <section id="compare" className="relative scroll-mt-28 overflow-hidden py-14 sm:py-20 lg:py-24">
      <Blob className="-left-24 top-24 h-72 w-72" color="var(--color-secondary-container)" opacity={0.34} data-parallax="0.14" />
      <Blob className="-right-24 bottom-10 h-72 w-72" color="var(--color-tertiary-fixed)" opacity={0.3} data-parallax="0.20" />

      <div className="relative mx-auto max-w-6xl px-3 sm:px-8 md:px-12">
        <div className="fade-up flex justify-center">
          <SectionHead
            label="What's locked"
            title="The same app. Without the ceiling."
            sub="You already know how BookSnap works. Premium simply stops counting."
          />
        </div>

        {/* The whole comparison lives on one raised card, the way every panel
            on booksnap.ai does — inset from the viewport, heavily rounded. */}
        <div
          className="fade-scale stagger-1 shell mt-10 p-4 sm:p-6 md:mt-12 md:p-8"
          style={{
            backgroundColor: 'var(--color-surface-lowest)',
            boxShadow: '0 24px 60px rgba(0,54,37,0.10)',
            border: '1px solid rgba(0,54,37,0.06)',
          }}
        >
          {/* ---------- md and up: table ---------- */}
          <div className="hidden md:block">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">Feature comparison between the Free and Premium plans</caption>
              <colgroup>
                <col style={{ width: '40%' }} />
                <col style={{ width: '23%' }} />
                <col style={{ width: '37%' }} />
              </colgroup>
              <thead>
                <tr>
                  <th scope="col" className="pb-4 pr-4 align-bottom">
                    <span
                      className="text-[12px] font-bold uppercase tracking-[0.1em]"
                      style={{ color: 'var(--color-on-surface-variant)' }}
                    >
                      Feature
                    </span>
                  </th>
                  <th scope="col" className="px-4 pb-4 align-bottom">
                    <span className="text-[15px] font-bold" style={{ color: 'var(--color-on-surface-variant)' }}>
                      Free
                    </span>
                    <span
                      className="mt-0.5 block text-[12px] font-normal"
                      style={{ color: 'var(--color-on-surface-variant)' }}
                    >
                      Your plan today
                    </span>
                  </th>
                  {/* The one dark cell in the section — it names the winner. */}
                  <th
                    scope="col"
                    className="rounded-t-[24px] px-5 py-4 align-bottom"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                  >
                    <span className="inline-flex flex-wrap items-center gap-2">
                      <span className="text-[16px] font-extrabold" style={{ color: '#fff' }}>
                        Premium
                      </span>
                      <span
                        className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.07em]"
                        style={{ backgroundColor: 'var(--color-tertiary-fixed)', color: 'var(--color-tertiary-container)' }}
                      >
                        Upgrade
                      </span>
                    </span>
                    <span className="mt-1 block text-[12px] font-normal" style={{ color: 'rgba(255,255,255,0.78)' }}>
                      No limits, no ads
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row, i) => (
                  // Rows arrive one after another, so the eye runs down the
                  // Premium column instead of meeting the whole grid at once.
                  <tr
                    key={row.feature}
                    className="fade-row"
                    style={{
                      borderTop: '1px solid rgba(0,54,37,0.09)',
                      transitionDelay: `${i * 0.07}s`,
                    }}
                  >
                    <th scope="row" className="py-4 pr-4 align-top font-normal">
                      <span className="flex items-start gap-3">
                        <span
                          className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-xl"
                          style={{ backgroundColor: 'var(--color-surface-container)', color: 'var(--color-primary-container)' }}
                        >
                          <Icon name={row.icon} className="text-[18px]" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[15px] font-bold" style={{ color: 'var(--color-primary)' }}>
                            {row.feature}
                          </span>
                          <span className="mt-0.5 block text-[12.5px]" style={{ color: 'var(--color-on-surface-variant)' }}>
                            {row.note}
                          </span>
                        </span>
                      </span>
                    </th>
                    <td className="px-4 py-4 align-top" style={{ color: 'var(--color-on-surface-variant)' }}>
                      <ValueMark value={row.free} has={row.freeHas} />
                    </td>
                    <td className="px-5 py-4 align-top" style={{ backgroundColor: PREMIUM_BG }}>
                      <PremiumMark value={row.premium} />
                    </td>
                  </tr>
                ))}
                <tr style={{ borderTop: '1px solid rgba(0,54,37,0.09)' }}>
                  {/* Not an empty cell: the reassurance sits opposite the button
                      it belongs to, instead of leaving a void under the table. */}
                  <td colSpan={2} className="py-5 pr-5 align-middle text-right">
                    <span
                      className="inline-flex items-center gap-1.5 text-[13px]"
                      style={{ color: 'var(--color-on-surface-variant)' }}
                    >
                      <Icon
                        name="check_circle"
                        className="text-[16px]"
                        style={{ color: 'var(--color-primary-container)' }}
                      />
                      {CTA.reassurance}
                    </span>
                  </td>
                  <td className="rounded-b-[24px] px-4 pb-5 pt-5 lg:px-5" style={{ backgroundColor: PREMIUM_BG }}>
                    <CtaButton
                      location="compare"
                      className="cta-sheen w-full whitespace-nowrap px-3 text-[13.5px] lg:px-5 lg:text-sm"
                    >
                      {CTA.pricing}
                    </CtaButton>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* ---------- below md: stacked per-feature cards ---------- */}
          <ul className="flex flex-col gap-3 md:hidden">
            {COMPARISON.map((row, i) => (
              <li
                key={row.feature}
                className={`fade-up rounded-[22px] p-3.5 stagger-${Math.min(i + 1, 5)}`}
                style={{ backgroundColor: 'var(--color-surface)', border: '1px solid rgba(0,54,37,0.06)' }}
              >
                <div className="flex items-start gap-2.5">
                  <span
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-xl"
                    style={{ backgroundColor: 'var(--color-surface-container)', color: 'var(--color-primary-container)' }}
                  >
                    <Icon name={row.icon} className="text-[18px]" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-[15px] font-bold" style={{ color: 'var(--color-primary)' }}>
                      {row.feature}
                    </h3>
                    <p className="mt-0.5 text-[12.5px]" style={{ color: 'var(--color-on-surface-variant)' }}>
                      {row.note}
                    </p>
                  </div>
                </div>

                <div className="mt-3.5 grid grid-cols-2 gap-2">
                  <div
                    className="min-w-0 rounded-2xl px-3 py-2.5"
                    style={{ backgroundColor: 'var(--color-surface-container)' }}
                  >
                    <span
                      className="block text-[10.5px] font-bold uppercase tracking-[0.07em]"
                      style={{ color: 'var(--color-on-surface-variant)' }}
                    >
                      Free
                    </span>
                    <span className="mt-1 block text-[13.5px]" style={{ color: 'var(--color-on-surface-variant)' }}>
                      {row.free}
                    </span>
                  </div>
                  {/* Solid green, white ink: on a phone the winner has to be
                      obvious at a glance, not a slightly warmer tint. */}
                  <div className="min-w-0 rounded-2xl px-3 py-2.5" style={{ backgroundColor: 'var(--color-primary)' }}>
                    <span
                      className="block text-[10.5px] font-bold uppercase tracking-[0.07em]"
                      style={{ color: 'var(--color-secondary-container)' }}
                    >
                      Premium
                    </span>
                    <span className="mt-1 block text-[13.5px] font-bold" style={{ color: '#fff' }}>
                      {row.premium}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="fade-up mt-5 md:hidden">
            <CtaButton location="compare-mobile" size="lg" className="cta-sheen w-full">
              {CTA.pricing}
            </CtaButton>
          </div>
        </div>
      </div>
    </section>
  )
}
