import { useState } from 'react'
import { NAV_LINKS } from '../lib/content'
import { CTA } from '../lib/config'
import { useScrolled, useScrollProgress } from '../lib/hooks'
import { CtaButton, Icon } from './primitives'

/**
 * The floating pill nav booksnap.ai uses: a rounded bar inset from the viewport
 * edge rather than a full-width band. It starts translucent and deepens its
 * shadow once the page moves, so the hero reads as one uninterrupted surface.
 */
export default function Navbar() {
  const scrolled = useScrolled(24)
  const progress = useScrollProgress()
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed left-0 top-0 z-50 w-full transition-all duration-500">
      <nav
        aria-label="Primary"
        className="relative mx-3 mt-3 flex items-center justify-between gap-3 overflow-hidden rounded-full px-3 py-2 transition-all duration-500 sm:mx-auto sm:w-fit sm:gap-8 sm:px-4 md:mt-4 md:gap-12 md:py-2.5 md:pl-5 md:pr-2.5"
        style={{
          backgroundColor: scrolled ? 'rgba(255,255,255,0.86)' : 'rgba(255,255,255,0.62)',
          WebkitBackdropFilter: 'blur(14px)',
          backdropFilter: 'blur(14px)',
          border: '1px solid rgba(255,255,255,0.7)',
          boxShadow: scrolled ? '0 10px 34px rgba(0,54,37,0.13)' : '0 6px 22px rgba(0,54,37,0.07)',
        }}
      >
        <a href="#top" className="flex min-w-0 shrink items-center gap-2.5 pl-1 no-underline">
          <img src="/booksnap-logo.png" alt="BookSnap" className="h-6 w-auto sm:h-7" />
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap text-[13.5px] font-semibold no-underline transition-colors hover:opacity-60"
              style={{ color: 'var(--color-on-surface-variant)' }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* The page argues about momentum; this is the one ornament that shows
            it. Sits inside the pill, under the content, clipped by its radius. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[3px] overflow-hidden rounded-b-full"
        >
          <span
            className="nav-progress block h-full w-full rounded-full"
            style={{
              transform: `scaleX(${progress})`,
              background:
                'linear-gradient(90deg, var(--color-secondary-container), var(--color-tertiary-fixed))',
            }}
          />
        </span>

        <div className="flex shrink-0 items-center gap-2">
          {/* Never leaves the screen: this is warm traffic one tap from paying. */}
          <CtaButton location="nav" size="sm" className="cta-sheen sm:px-6">
            {CTA.nav}
          </CtaButton>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="grid h-9 w-9 place-items-center rounded-full transition-opacity hover:opacity-70 lg:hidden"
            style={{ backgroundColor: 'var(--color-surface-container)', color: 'var(--color-primary)' }}
          >
            <Icon name={open ? 'close' : 'menu'} className="text-[20px]" />
          </button>
        </div>
      </nav>

      {open && (
        <div
          className="mx-3 mt-2 max-h-[calc(100svh-7rem)] overflow-y-auto rounded-[28px] p-3 sm:mx-auto sm:w-[min(420px,calc(100%-1.5rem))] lg:hidden"
          style={{
            backgroundColor: 'var(--color-surface-lowest)',
            boxShadow: '0 16px 44px rgba(0,54,37,0.14)',
            border: '1px solid rgba(0,54,37,0.06)',
          }}
        >
          <div className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-3.5 py-3 text-sm font-semibold no-underline transition-colors hover:bg-[var(--color-surface-container)]"
                style={{ color: 'var(--color-on-surface-variant)' }}
              >
                {link.label}
              </a>
            ))}
            <CtaButton location="nav-mobile" className="mt-2 w-full" onClick={() => setOpen(false)}>
              {CTA.nav}
            </CtaButton>
          </div>
        </div>
      )}
    </header>
  )
}
