import { useEffect, useRef, useState } from 'react'

/** Every reveal variant. One observer drives all of them. */
const REVEAL = '.fade-up, .fade-left, .fade-right, .fade-scale, .fade-row'

/** Adds `.visible` to every reveal descendant once it scrolls into view. */
export function useReveal() {
  const ref = useRef(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' },
    )

    const observeAll = () =>
      root
        .querySelectorAll(REVEAL)
        .forEach((el) => !el.classList.contains('visible') && io.observe(el))

    observeAll()

    // Nodes can appear after mount (the pricing cards re-render on selection).
    // Without this, replacements are never observed and stay at opacity 0.
    const mo = new MutationObserver(observeAll)
    mo.observe(root, { childList: true, subtree: true })

    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [])

  return ref
}

/** True once the page has scrolled past `offset`. */
export function useScrolled(offset = 24) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > offset)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [offset])

  return scrolled
}

/** True once the element has scrolled into view (fires once). */
export function useInView(threshold = 0.35) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || inView) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { threshold },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold, inView])

  return [ref, inView]
}

/** True when the viewport matches `query`, kept in sync with resizes. */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches,
  )

  useEffect(() => {
    // The lazy initialiser already has the value for the first render, so the
    // effect only has to subscribe — no synchronous setState on mount.
    const mql = window.matchMedia(query)
    const onChange = (e) => setMatches(e.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])

  return matches
}

/** True when the user has asked for reduced motion. */
export function usePrefersReducedMotion() {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}

/**
 * One rAF-throttled scroll loop for the whole page.
 *
 * Every parallax layer opts in with `data-parallax="<factor>"` instead of
 * mounting its own listener, so a page with a dozen drifting elements still
 * costs exactly one scroll handler and one transform pass per frame.
 * Positive factors trail the scroll, negative ones lead it.
 */
export function useParallax() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    // Parallax on a phone is mostly wasted: the layers are small, the viewport
    // is short, and the scroll is already doing the work.
    if (!window.matchMedia('(min-width: 768px)').matches) return

    const layers = [...document.querySelectorAll('[data-parallax]')]
    if (!layers.length) return

    let frame = 0
    const paint = () => {
      frame = 0
      const mid = window.innerHeight / 2
      for (const el of layers) {
        const rect = el.getBoundingClientRect()
        // Distance of the element's centre from the viewport's, so a layer is
        // at its neutral position when it is centred rather than at the top.
        const offset = (rect.top + rect.height / 2 - mid) * Number(el.dataset.parallax)
        el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`
      }
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(paint)
    }

    paint()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      for (const el of layers) el.style.transform = ''
    }
  }, [])
}

/** How far down the page the reader is, 0–1. Drives the nav's progress line. */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame = 0
    const paint = () => {
      frame = 0
      const doc = document.documentElement
      const max = doc.scrollHeight - doc.clientHeight
      setProgress(max > 0 ? Math.min(1, doc.scrollTop / max) : 0)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(paint)
    }
    paint()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return progress
}

/**
 * Counts from 0 to `value` once the element is in view, easing out so the last
 * digits land slowly — the number arrives rather than spins.
 *
 * Returns `[ref, display]`. `decimals` keeps "4.8" from rendering as "5".
 */
export function useCountUp(value, { duration = 1100, decimals = 0 } = {}) {
  const [ref, inView] = useInView(0.5)
  const reduced = usePrefersReducedMotion()
  const [shown, setShown] = useState(() => (value === 0 ? 0 : null))

  useEffect(() => {
    // `shown === null` already renders the final value, so reduced motion needs
    // no state update — it just never starts the ramp.
    if (!inView || reduced) return
    let frame = 0
    const start = performance.now()
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setShown(value * eased)
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, value, duration, reduced])

  // Before the first frame, render the final value so the number never flashes
  // as "0" for a reader who lands mid-page or has JS timing against them.
  const display = shown === null ? value : shown
  return [ref, display.toFixed(decimals)]
}
