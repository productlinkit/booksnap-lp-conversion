import { useState } from 'react'
import { NAV_LINKS } from '../lib/content'
import { CTA } from '../lib/config'
import { useScrolled } from '../lib/hooks'
import { CtaButton, Icon } from './primitives'

export default function Navbar() {
  const scrolled = useScrolled(24)
  const [open, setOpen] = useState(false)

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-500 ${
        scrolled ? 'nav-scrolled' : 'border-transparent bg-transparent shadow-none'
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-8 md:px-12"
      >
        <a href="#top" className="flex min-w-0 shrink items-center gap-2.5">
          <img src="/booksnap-logo.png" alt="BookSnap" className="h-6 w-auto sm:h-7 md:h-8" />
          {/* This page is only ever served to a signed-in free user, so the nav
              states which plan they are on — the whole argument starts there. */}
          <span
            className="hidden shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.07em] sm:inline-block"
            style={{ backgroundColor: 'var(--color-surface-container)', color: 'var(--color-on-surface-variant)' }}
          >
            Free plan
          </span>
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium no-underline transition-colors hover:opacity-70"
              style={{ color: 'var(--color-on-surface-variant)' }}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {/* Never leaves the screen: this is warm traffic one tap from paying. */}
          <CtaButton location="nav" size="sm" className="sm:px-7 sm:py-[13px] sm:text-sm">
            {CTA.nav}
          </CtaButton>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="grid h-10 w-10 place-items-center rounded-full transition-opacity hover:opacity-80 lg:hidden"
            style={{ backgroundColor: 'var(--color-surface-container)', color: 'var(--color-primary)' }}
          >
            <Icon name={open ? 'close' : 'menu'} />
          </button>
        </div>
      </nav>

      {open && (
        <div
          className="mx-4 mb-3 max-h-[calc(100svh-6rem)] overflow-y-auto rounded-3xl p-4 sm:mx-8 md:mx-12 lg:hidden"
          style={{ backgroundColor: 'var(--color-surface-lowest)', boxShadow: '0 12px 40px rgba(0,54,37,0.12)' }}
        >
          <div className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-medium no-underline"
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
