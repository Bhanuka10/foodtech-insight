import { useEffect } from 'react'

/**
 * Adds `.is-visible` to every `[data-reveal]` element as it enters the viewport.
 * Elements can stagger with `style={{ '--delay': '120ms' }}`.
 * Tall blocks (taller than ~60% of the viewport) reveal as soon as they intersect,
 * since a fixed ratio threshold could never be reached for them on small screens.
 */
export function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll('[data-reveal]')
    if (!('IntersectionObserver' in window)) {
      nodes.forEach((n) => n.classList.add('is-visible'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          const tall = e.boundingClientRect.height > window.innerHeight * 0.6
          if (tall || e.intersectionRatio >= 0.12) {
            e.target.classList.add('is-visible')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: [0, 0.12], rootMargin: '0px 0px -8% 0px' },
    )
    nodes.forEach((n) => io.observe(n))
    return () => io.disconnect()
  }, [])
}
