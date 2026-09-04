import { TESTIMONIALS, PRICING_QUOTE_INDEX, TRUST } from '../lib/content'
import { RATING } from '../lib/config'
import { Blob, Icon, SectionHead, Stars } from './primitives'

/**
 * Proof, then the objections that stop a warm user at checkout.
 *
 * The reviews are laid out in CSS columns rather than a grid: quotes are
 * different lengths, and a masonry flow packs them without leaving the ragged
 * bottom edge a fixed grid would. Each card carries the slight rotation the
 * site gives its own review cards, so the block reads as a pinned board.
 *
 * The review quoted up in the pricing panel is dropped here — the same words
 * twice on one page reads as thin proof, not more of it.
 */
const REVIEWS = TESTIMONIALS.filter((_, i) => i !== PRICING_QUOTE_INDEX)

export default function Testimonial() {
  return (
    <section id="reviews" className="relative scroll-mt-28 overflow-hidden py-14 sm:py-20 lg:py-24">
      <Blob className="-left-20 top-16 h-72 w-72" color="var(--color-primary-fixed)" opacity={0.3} />
      <Blob className="-right-20 bottom-20 h-72 w-72" color="var(--color-secondary-container)" opacity={0.28} />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-8 md:px-12">
        <div className="fade-up flex justify-center">
          <SectionHead
            label="Readers"
            title="The people who upgraded were already reading like this."
            sub="Reviews from the BookSnap library, exactly as they were left."
          />
        </div>

        <div className="mt-10 columns-1 gap-4 sm:columns-2 sm:gap-5 lg:columns-3">
          {REVIEWS.map((review, i) => (
            <figure
              key={review.name}
              className={`lift-card fade-up mb-4 break-inside-avoid rounded-[24px] p-5 sm:mb-5 sm:p-6 stagger-${Math.min(i + 1, 5)}`}
              style={{
                backgroundColor: 'var(--color-surface-lowest)',
                border: '1px solid rgba(0,54,37,0.06)',
                boxShadow: '0 14px 40px rgba(0,54,37,0.08)',
                rotate: review.tilt,
              }}
            >
              <Stars className="mb-3" color="var(--color-tertiary-ink)" />
              <blockquote className="m-0 text-[15px] leading-relaxed" style={{ color: 'var(--color-on-surface)' }}>
                &ldquo;{review.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-4 flex items-center gap-3">
                <span
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-[13px] font-extrabold"
                  style={{ backgroundColor: review.tint, color: 'var(--color-primary)' }}
                >
                  {review.initials}
                </span>
                <span className="min-w-0">
                  <span className="block text-[14px] font-bold" style={{ color: 'var(--color-primary)' }}>
                    {review.name}
                  </span>
                  <span className="block text-[12.5px]" style={{ color: 'var(--color-on-surface-variant)' }}>
                    {review.role}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Trust strip — the four objections that stop a warm user at checkout. */}
        <ul
          className="fade-up mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-[28px] sm:grid-cols-2 lg:grid-cols-4"
          style={{ backgroundColor: 'rgba(0,54,37,0.09)', boxShadow: '0 14px 40px rgba(0,54,37,0.07)' }}
        >
          {TRUST.map((item) => (
            <li
              key={item.label}
              className="flex items-center gap-3 px-5 py-5"
              style={{ backgroundColor: 'var(--color-surface-lowest)' }}
            >
              <span
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full"
                style={{ backgroundColor: 'var(--color-secondary-container)', color: 'var(--color-primary)' }}
              >
                <Icon name={item.icon} className="text-[19px]" />
              </span>
              <span className="min-w-0">
                <span className="block text-[13.5px] font-bold" style={{ color: 'var(--color-primary)' }}>
                  {item.label}
                </span>
                <span className="block text-[12px]" style={{ color: 'var(--color-on-surface-variant)' }}>
                  {item.sub}
                </span>
              </span>
            </li>
          ))}
        </ul>

        {RATING && (
          <p
            className="fade-up mt-6 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-center text-[13.5px]"
            style={{ color: 'var(--color-on-surface-variant)' }}
          >
            <Stars color="var(--color-tertiary-ink)" />
            <span>
              <strong style={{ color: 'var(--color-primary)' }}>{RATING.score}</strong> average from{' '}
              {RATING.count} BookSnap readers
            </span>
          </p>
        )}
      </div>
    </section>
  )
}
