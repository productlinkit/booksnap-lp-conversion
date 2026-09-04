import { useState } from 'react'
import { LIBRARY } from '../lib/covers'
import { USAGE } from '../lib/config'
import { Icon } from './primitives'

/**
 * The hero visual: the reader's own BookSnap library, shown locked and then
 * unlocked. It is built from the real app's parts — the usage meter, the cover
 * grid, the Ask AI counter — rather than an illustration, because the argument
 * ("this is your account, and this is what the limit is holding shut") only
 * lands if the thing on screen is recognisably the product.
 */

function BookCover({ book, locked, snapped }) {
  const [failed, setFailed] = useState(false)

  return (
    <div
      className={`cover-tile relative overflow-hidden rounded-xl ${locked ? 'is-locked' : ''}`}
      style={{ backgroundColor: 'var(--color-surface-container)' }}
    >
      <div className="aspect-[2/3] w-full">
        {failed ? (
          // A remote cover that fails should still read as a book, never as a
          // broken image icon inside a product mock.
          <div
            className="flex h-full w-full flex-col justify-end p-2"
            style={{ backgroundColor: 'var(--color-primary-container)' }}
          >
            <span className="text-[9px] font-semibold leading-tight text-white/90 line-clamp-3">
              {book.title}
            </span>
          </div>
        ) : (
          <img
            src={book.cover}
            alt=""
            loading="lazy"
            decoding="async"
            onError={() => setFailed(true)}
            className="h-full w-full object-cover"
          />
        )}
      </div>

      {/* Locked scrim + padlock, or the "you already snapped this" tick. */}
      <span
        className={`lock-chip absolute right-1.5 top-1.5 grid h-6 w-6 place-items-center rounded-full ${
          locked ? '' : 'is-hidden'
        }`}
        style={{ backgroundColor: 'rgba(27,27,29,0.72)', color: '#fff' }}
      >
        <Icon name="lock" className="text-[13px]" />
      </span>
      {snapped && (
        <span
          className={`lock-chip absolute right-1.5 top-1.5 grid h-6 w-6 place-items-center rounded-full ${
            locked ? 'is-hidden' : ''
          }`}
          style={{ backgroundColor: 'var(--color-secondary-container)', color: 'var(--color-primary)' }}
          title="Already snapped"
        >
          <Icon name="check" className="text-[14px]" />
        </span>
      )}
    </div>
  )
}

function MeterRow({ premium }) {
  const pct = premium ? 100 : Math.round((USAGE.snapsUsed / USAGE.snapsTotal) * 100)

  return (
    <div
      className="rounded-2xl p-3.5"
      style={{
        backgroundColor: premium ? 'rgba(164,244,191,0.34)' : 'var(--color-surface-container)',
        transition: 'background-color 0.5s ease',
      }}
    >
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
        <span className="text-[13px] font-semibold" style={{ color: 'var(--color-primary)' }}>
          Book Snaps
        </span>
        <span
          className="text-[13px] font-bold tabular-nums"
          style={{ color: premium ? 'var(--color-primary)' : 'var(--color-tertiary-ink)' }}
        >
          {premium ? 'Unlimited' : `${USAGE.snapsUsed} / ${USAGE.snapsTotal} used`}
        </span>
      </div>

      <div
        className="mt-2.5 h-2 w-full overflow-hidden rounded-full"
        style={{ backgroundColor: 'rgba(0,54,37,0.10)' }}
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={premium ? 'Unlimited Book Snaps' : 'Free Book Snaps used'}
      >
        <div
          className="meter-fill h-full rounded-full"
          style={{
            width: `${pct}%`,
            backgroundColor: premium ? 'var(--color-primary)' : 'var(--color-tertiary-fixed)',
          }}
        />
      </div>

      <p className="mt-2 text-[11.5px]" style={{ color: 'var(--color-on-surface-variant)' }}>
        {premium ? 'No monthly cap. Snap as many as you like.' : `Limit reached — resets next month.`}
      </p>
    </div>
  )
}

function LibraryState({ premium }) {
  return (
    <div
      className="relative overflow-hidden rounded-[24px] p-3.5 sm:p-4"
      style={{
        backgroundColor: 'var(--color-surface-lowest)',
        border: '1px solid rgba(0,54,37,0.09)',
        boxShadow: premium ? '0 20px 44px rgba(0,54,37,0.14)' : '0 12px 30px rgba(0,54,37,0.07)',
      }}
    >
      {!premium && <span aria-hidden="true" className="pointer-events-none absolute inset-0 z-10" style={{ background: 'rgba(240,237,239,0.14)' }} />}

      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <Icon name="auto_stories" className="text-[17px]" style={{ color: 'var(--color-primary)' }} />
          <span className="truncate text-[13px] font-bold" style={{ color: 'var(--color-primary)' }}>
            {premium ? 'Unlocked library' : 'Your library'}
          </span>
        </div>
        <span
          className="shrink-0 rounded-full px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[0.07em]"
          style={{
            backgroundColor: premium ? 'var(--color-tertiary-fixed)' : 'var(--color-surface-container)',
            color: premium ? 'var(--color-tertiary-container)' : 'var(--color-on-surface-variant)',
            transition: 'background-color 0.5s ease, color 0.5s ease',
          }}
        >
          {premium ? 'Premium' : 'Free'}
        </span>
      </div>

      <MeterRow premium={premium} />

      <ul className="mt-3 grid grid-cols-3 gap-1.5 sm:gap-2">
        {LIBRARY.map((book) => (
          <li key={book.title}>
            <BookCover book={book} locked={!premium && !book.snapped} snapped={book.snapped} />
          </li>
        ))}
      </ul>

      <div
        className="mt-3 flex items-center justify-between gap-2 rounded-xl px-3 py-2.5"
        style={{
          backgroundColor: premium ? 'var(--color-primary)' : 'var(--color-surface-container)',
          transition: 'background-color 0.5s ease',
        }}
      >
        <span className="flex min-w-0 items-center gap-2">
          <Icon
            name="forum"
            className="shrink-0 text-[18px]"
            style={{ color: premium ? 'var(--color-secondary-container)' : 'var(--color-on-surface-variant)' }}
          />
          <span
            className="truncate text-[12px] font-semibold"
            style={{ color: premium ? '#fff' : 'var(--color-on-surface-variant)' }}
          >
            Ask AI
          </span>
        </span>
        <span
          className="shrink-0 text-[12px] font-bold tabular-nums"
          style={{ color: premium ? 'var(--color-tertiary-fixed)' : 'var(--color-tertiary-ink)' }}
        >
          {premium ? 'Unlimited' : `${USAGE.askUsed} / ${USAGE.askTotal} used`}
        </span>
      </div>
    </div>
  )
}

export default function LibraryPreview() {
  return (
    <div className="mx-auto w-full max-w-[560px]">
      <div className="mb-3 flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-[0.1em]" style={{ color: 'var(--color-on-surface-variant)' }}>
        <span className="h-px w-8" style={{ backgroundColor: 'var(--color-outline-variant)' }} />
        Your upgrade, side by side
        <span className="h-px w-8" style={{ backgroundColor: 'var(--color-outline-variant)' }} />
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
        <LibraryState premium={false} />
        <LibraryState premium />
      </div>
      <p
        className="mt-3 text-center text-[12px]"
        style={{ color: 'var(--color-on-surface-variant)' }}
      >
        <Icon name="lock_open" className="mr-1 align-[-3px] text-[15px]" />
        Same library. No ceiling.
      </p>
    </div>
  )
}
