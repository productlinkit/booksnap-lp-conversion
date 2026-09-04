import { APP_URL } from '../lib/config'

const LINKS = [
  { label: 'Back to the app', href: APP_URL },
  { label: 'Plans', href: '#pricing' },
  { label: 'Ask AI', href: '#ask-ai' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ backgroundColor: 'var(--color-surface)' }}>
      <div
        className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-8 md:flex-row md:items-center md:justify-between md:px-12"
        style={{ borderTop: '1px solid rgba(0,54,37,0.10)' }}
      >
        <div className="flex items-center gap-3">
          <img src="/booksnap-logo.png" alt="BookSnap" className="h-7 w-auto" />
        </div>

        <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[13.5px] no-underline transition-opacity hover:opacity-70"
              style={{ color: 'var(--color-on-surface-variant)' }}
              {...(link.href.startsWith('#') ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <p className="text-[12.5px]" style={{ color: 'var(--color-on-surface-variant)' }}>
          © {year} BookSnap. Prices in your local currency at checkout.
        </p>
      </div>
    </footer>
  )
}
