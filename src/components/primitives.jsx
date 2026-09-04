import { UPGRADE_URL } from '../lib/config'

export function Icon({ name, className = '', style }) {
  return (
    <span className={`msym ${className}`} style={style} aria-hidden="true">
      {name}
    </span>
  )
}

/**
 * Every CTA on the page points at the same upgrade route and carries
 * `data-cta`, so GA4 can attribute the conversion to the section that earned
 * it from one delegated listener.
 */
export function CtaButton({
  children,
  variant = 'primary',
  size = 'md',
  location,
  className = '',
  href = UPGRADE_URL,
  style,
  ...rest
}) {
  // `max-w-full` lets the button shrink with its container instead of pushing
  // out of it; the label is allowed to wrap on a 320px screen rather than
  // being clipped, which is why there is no `whitespace-nowrap` here.
  const base =
    'btn-hover-lift inline-flex max-w-full items-center justify-center gap-2 rounded-full text-center font-semibold leading-tight no-underline'

  // Both sizes clear the 44px minimum touch target.
  const sizes = {
    lg: 'min-h-[54px] px-7 py-4 text-[15px] sm:px-9 sm:text-base',
    md: 'min-h-[46px] px-6 py-[13px] text-sm sm:px-7',
    sm: 'min-h-[40px] px-4 py-2.5 text-[13px]',
  }

  const styles = {
    primary: { backgroundColor: 'var(--color-tertiary-fixed)', color: 'var(--color-primary-container)' },
    dark: { backgroundColor: 'var(--color-primary)', color: '#fff' },
    outline: {
      backgroundColor: 'transparent',
      color: 'var(--color-primary)',
      border: '1.5px solid var(--color-outline-variant)',
    },
    // Same shape as `outline`, for use on the dark green sections.
    'outline-light': {
      backgroundColor: 'transparent',
      color: '#fff',
      border: '1.5px solid rgba(255,255,255,0.45)',
    },
  }

  const isInternal = href.startsWith('#')

  return (
    <a
      href={href}
      data-cta={location}
      className={`${base} ${sizes[size]} ${className}`}
      style={{ ...styles[variant], ...style }}
      {...(isInternal ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
      {...rest}
    >
      {children}
    </a>
  )
}

export function SectionLabel({ children, tone = 'var(--color-secondary-container)', ink = 'var(--color-primary)' }) {
  return (
    <span
      className="inline-block max-w-full rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.09em]"
      style={{ backgroundColor: tone, color: ink }}
    >
      {children}
    </span>
  )
}

export function Stars({ count = 5, className = '', color = 'var(--color-tertiary-fixed)' }) {
  return (
    <span className={`inline-flex items-center gap-0.5 ${className}`} role="img" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }, (_, i) => (
        <Icon key={i} name="star" className="text-[17px]" style={{ color, fontVariationSettings: "'FILL' 1" }} />
      ))}
    </span>
  )
}

/** The section framing used across the page: eyebrow, headline, one line of copy. */
export function SectionHead({ label, labelTone, labelInk, title, sub, align = 'center', ink, subInk }) {
  const alignment = align === 'center' ? 'mx-auto text-center items-center' : 'text-left items-start'
  return (
    <div className={`flex max-w-3xl flex-col gap-4 ${alignment}`}>
      {label && (
        <SectionLabel tone={labelTone} ink={labelInk}>
          {label}
        </SectionLabel>
      )}
      <h2 className="rsp-section-h2 font-extrabold" style={{ color: ink || 'var(--color-primary)' }}>
        {title}
      </h2>
      {sub && (
        <p
          className={`rsp-section-p max-w-2xl ${align === 'center' ? 'mx-auto' : ''}`}
          style={{ color: subInk || 'var(--color-on-surface-variant)' }}
        >
          {sub}
        </p>
      )}
    </div>
  )
}

/**
 * A real app screenshot inside a device bezel. `locked` drains the colour and
 * drops the scrim over it — the free plan's half of the hero.
 *
 * Screens live in `public/app/` and are the production booksnap.ai captures,
 * so the mockups show the actual product rather than a drawn approximation.
 */
export function Phone({ src, alt, locked = false, className = '', style, children }) {
  return (
    <div className={`phone ${locked ? 'phone-locked' : ''} ${className}`} style={style}>
      <img src={src} alt={alt} loading="lazy" decoding="async" />
      {children}
    </div>
  )
}

/** A soft colour wash. Purely decorative, never in the accessibility tree. */
export function Blob({ className = '', color, opacity = 0.4 }) {
  return (
    <span aria-hidden="true" className={`blob ${className}`} style={{ backgroundColor: color, opacity }} />
  )
}

/**
 * The cut-paper flowers booksnap.ai parks in the corners of its dark panels.
 * Hidden below `sm` — at phone width they eat the padding the copy needs.
 */
export function Flower({ src, className = '', opacity = 0.5 }) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      loading="lazy"
      className={`pointer-events-none absolute hidden select-none sm:block ${className}`}
      style={{ opacity }}
    />
  )
}
