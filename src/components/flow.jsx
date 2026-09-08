import { Icon } from './primitives'

/**
 * The shared shell for the sign-up screens (`/start`) and the checkout.
 *
 * These live here rather than in `primitives.jsx` because they belong to the
 * app-style flow, not to the landing page: a phone-width panel, two background
 * washes, a two-line heading with its last word in green, and one pill button
 * pinned to the bottom. Colours are sampled from the BookSnap app's own
 * onboarding screens rather than guessed.
 */

export const ACCENT = '#379777'
export const DEEP = '#276b54'
export const INK = '#101512'
export const MUTED = '#3d4744'

/** The two washes behind every screen: a green arc above, a yellow one below. */
export function Backdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <span
        className="absolute rounded-full"
        style={{ background: '#f4f9f7', top: '-26%', left: '-46%', width: '186%', paddingBottom: '150%' }}
      />
      <span
        className="absolute rounded-full"
        style={{ background: '#fdf6d5', bottom: '-38%', right: '-52%', width: '200%', paddingBottom: '160%' }}
      />
    </div>
  )
}

/**
 * The panel every screen sits in.
 *
 * The washes are sized against their container, so they have to be clipped
 * here: at full desktop width a 200%-wide circle swallows the viewport.
 * Containing them also gives the flow a phone-shaped panel on desktop, which
 * is what it is.
 */
export function FlowShell({ children }) {
  return (
    <div className="flex min-h-[100svh] justify-center" style={{ backgroundColor: '#eaf0ed' }}>
      <div
        className="relative flex w-full max-w-[430px] flex-col overflow-hidden"
        style={{ backgroundColor: '#fff' }}
      >
        <Backdrop />
        <div className="relative flex flex-1 flex-col px-6 pb-7 pt-5">{children}</div>
      </div>
    </div>
  )
}

/**
 * Two lines with the last word in green. The break is set explicitly rather
 * than left to wrapping, because the app's screens break at a specific word
 * and a fluid wrap would not land there.
 */
export function Heading({ line1, line2, accent, sub }) {
  return (
    <>
      <h1
        className="font-extrabold"
        style={{ fontSize: 'clamp(30px, 8vw, 38px)', lineHeight: 1.16, letterSpacing: '-0.02em', color: INK }}
      >
        <span className="block">{line1}</span>
        <span className="block">
          {line2} <span style={{ color: ACCENT }}>{accent}</span>
        </span>
      </h1>
      <p className="mt-3 text-[14.5px] leading-relaxed" style={{ color: MUTED }}>
        {sub}
      </p>
    </>
  )
}

const BTN =
  'btn-hover-lift inline-flex min-h-[58px] w-full items-center justify-center gap-2 rounded-full text-center text-[16px] font-semibold no-underline transition-opacity'

export function PrimaryButton({ children, onClick, href, disabled, ...rest }) {
  const style = { backgroundColor: DEEP, color: '#fff', opacity: disabled ? 0.45 : 1 }
  if (href && !disabled) {
    return (
      <a href={href} className={BTN} style={style} {...rest}>
        {children}
      </a>
    )
  }
  return (
    <button type="button" onClick={onClick} disabled={disabled} className={BTN} style={style} {...rest}>
      {children}
    </button>
  )
}

export function GhostButton({ children, href, ...rest }) {
  return (
    <a href={href} className={BTN} style={{ border: `1.5px solid ${DEEP}`, color: INK }} {...rest}>
      {children}
    </a>
  )
}

/** The link back up the flow, in the slot "Skip" occupies on the other screens. */
export function TopLink({ href, children }) {
  return (
    <div className="flex justify-end">
      <a
        href={href}
        className="flex items-center gap-1 text-[16px] font-medium no-underline"
        style={{ color: INK }}
      >
        <Icon name="arrow_back" className="text-[18px]" />
        {children}
      </a>
    </div>
  )
}
