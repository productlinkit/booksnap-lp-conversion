import { COMPARISON } from '../lib/content'
import { CTA } from '../lib/config'
import { CtaButton, Icon, SectionHead } from './primitives'

/**
 * Free vs Premium.
 *
 * Two renderings of one data source: a real <table> from `md` up, and stacked
 * per-feature cards below it. Squeezing a three-column table into 375px would
 * either overflow or shrink the type past readable — so the small screen gets
 * a layout built for it instead of a scaled-down copy of the large one.
 */

const PREMIUM_BG = 'rgba(0,54,37,0.045)'

function ValueMark({ value, has }) {
  if (has === false) {
    return (
      <span className="inline-flex items-center gap-1.5" style={{ color: 'var(--color-on-surface-variant)' }}>
        <Icon name="close" className="text-[17px]" style={{ opacity: 0.55 }} />
        <span className="text-[13.5px]">{value}</span>
      </span>
    )
  }
  return <span className="text-[13.5px]">{value}</span>
}

function PremiumMark({ value }) {
  return (
    <span className="inline-flex items-center gap-1.5 font-semibold" style={{ color: 'var(--color-primary)' }}>
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
    <section id="compare" className="scroll-mt-24 py-16 sm:py-20 lg:py-24" style={{ backgroundColor: 'var(--color-surface-lowest)' }}>
      <div className="mx-auto max-w-6xl px-4 sm:px-8 md:px-12">
        <div className="fade-up flex justify-center">
          <SectionHead
            label="What's locked"
            title="The same app. Without the ceiling."
            sub="You already know how BookSnap works. Premium simply stops counting."
          />
        </div>

        {/* ---------- md and up: table ---------- */}
        <div className="fade-up stagger-1 mt-12 hidden md:block">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">Feature comparison between the Free and Premium plans</caption>
            <colgroup>
              <col style={{ width: '42%' }} />
              <col style={{ width: '25%' }} />
              <col style={{ width: '33%' }} />
            </colgroup>
            <thead>
              <tr>
                <th scope="col" className="pb-4 pr-4 align-bottom">
                  <span className="text-[13px] font-semibold uppercase tracking-[0.08em]" style={{ color: 'var(--color-on-surface-variant)' }}>
                    Feature
                  </span>
                </th>
                <th scope="col" className="px-4 pb-4 align-bottom">
                  <span className="text-[15px] font-bold" style={{ color: 'var(--color-on-surface-variant)' }}>
                    Free
                  </span>
                  <span className="mt-0.5 block text-[12px] font-normal" style={{ color: 'var(--color-on-surface-variant)' }}>
                    Your plan today
                  </span>
                </th>
                <th
                  scope="col"
                  className="rounded-t-2xl px-5 pb-4 pt-4 align-bottom"
                  style={{ backgroundColor: PREMIUM_BG }}
                >
                  <span className="inline-flex items-center gap-2">
                    <span className="text-[15px] font-bold" style={{ color: 'var(--color-primary)' }}>
                      Premium
                    </span>
                    <span
                      className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.07em]"
                      style={{ backgroundColor: 'var(--color-tertiary-fixed)', color: 'var(--color-tertiary-container)' }}
                    >
                      Upgrade
                    </span>
                  </span>
                  <span className="mt-0.5 block text-[12px] font-normal" style={{ color: 'var(--color-on-surface-variant)' }}>
                    No limits, no ads
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((row) => (
                <tr key={row.feature} style={{ borderTop: '1px solid rgba(0,54,37,0.09)' }}>
                  <th scope="row" className="py-4 pr-4 align-top font-normal">
                    <span className="flex items-start gap-2.5">
                      <Icon
                        name={row.icon}
                        className="mt-0.5 shrink-0 text-[19px]"
                        style={{ color: 'var(--color-primary-container)' }}
                      />
                      <span className="min-w-0">
                        <span className="block text-[15px] font-semibold" style={{ color: 'var(--color-primary)' }}>
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
                <td colSpan={2} />
                <td className="rounded-b-2xl px-5 pb-5 pt-5" style={{ backgroundColor: PREMIUM_BG }}>
                  <CtaButton location="compare" className="w-full px-4 lg:px-6">
                    {CTA.pricing}
                  </CtaButton>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ---------- below md: stacked per-feature cards ---------- */}
        <ul className="mt-10 flex flex-col gap-3 md:hidden">
          {COMPARISON.map((row, i) => (
            <li
              key={row.feature}
              className={`fade-up surface-card rounded-3xl p-4 stagger-${Math.min(i + 1, 5)}`}
            >
              <div className="flex items-start gap-2.5">
                <Icon
                  name={row.icon}
                  className="mt-0.5 shrink-0 text-[20px]"
                  style={{ color: 'var(--color-primary-container)' }}
                />
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
                <div
                  className="min-w-0 rounded-2xl px-3 py-2.5"
                  style={{ backgroundColor: 'rgba(164,244,191,0.36)' }}
                >
                  <span
                    className="block text-[10.5px] font-bold uppercase tracking-[0.07em]"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    Premium
                  </span>
                  <span className="mt-1 block text-[13.5px] font-semibold" style={{ color: 'var(--color-primary)' }}>
                    {row.premium}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="fade-up mt-6 md:hidden">
          <CtaButton location="compare-mobile" size="lg" className="w-full">
            {CTA.pricing}
          </CtaButton>
        </div>
      </div>
    </section>
  )
}
