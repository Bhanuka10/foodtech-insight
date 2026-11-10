import { useEffect, useRef, useState } from 'react'
import { magazine } from '../data/magazine.js'
import { loadMagazine } from './pdf.js'
import { useReader } from './useReader.js'
import './Reader.css'

const pad = (n) => String(n).padStart(2, '0')

function Reader() {
  const { open, page, title, session, closeReader } = useReader()
  if (!open) return null
  // Keyed on the session so each open starts fresh at the requested page.
  return <ReaderPanel key={session} startPage={page} title={title} onClose={closeReader} />
}

function ReaderPanel({ startPage, title, onClose }) {
  const [page, setPage] = useState(startPage)
  const [total, setTotal] = useState(magazine.pages)
  const [status, setStatus] = useState('loading') // loading | ready | error
  const stageRef = useRef(null)
  const canvasRef = useRef(null)
  const closeRef = useRef(null)
  const renderTask = useRef(null)
  const touch = useRef(null)

  // Body scroll lock, focus and keyboard shortcuts while open.
  useEffect(() => {
    const prevFocus = document.activeElement
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight' || e.key === 'PageDown') setPage((p) => Math.min(total, p + 1))
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') setPage((p) => Math.max(1, p - 1))
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      prevFocus?.focus?.()
    }
  }, [total, onClose])

  // Render the current page (and re-render when the stage resizes).
  useEffect(() => {
    let cancelled = false
    const stage = stageRef.current
    const canvas = canvasRef.current
    if (!stage || !canvas) return undefined

    const draw = async () => {
      setStatus('loading')
      try {
        const pdf = await loadMagazine()
        if (cancelled) return
        setTotal(pdf.numPages)
        const pdfPage = await pdf.getPage(Math.min(page, pdf.numPages))
        if (cancelled) return

        renderTask.current?.cancel()
        const base = pdfPage.getViewport({ scale: 1 })
        const cs = getComputedStyle(stage)
        const availW = stage.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight)
        const availH = stage.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom)
        const scale = Math.min(availW / base.width, availH / base.height)
        const viewport = pdfPage.getViewport({ scale })
        const dpr = Math.min(window.devicePixelRatio || 1, 3)

        canvas.width = Math.floor(viewport.width * dpr)
        canvas.height = Math.floor(viewport.height * dpr)
        canvas.style.width = `${Math.floor(viewport.width)}px`
        canvas.style.height = `${Math.floor(viewport.height)}px`

        const ctx = canvas.getContext('2d', { alpha: false })
        const task = pdfPage.render({
          canvasContext: ctx,
          viewport,
          transform: dpr !== 1 ? [dpr, 0, 0, dpr, 0, 0] : null,
        })
        renderTask.current = task
        await task.promise
        if (!cancelled) setStatus('ready')
      } catch (err) {
        if (cancelled || err?.name === 'RenderingCancelledException') return
        console.error('Reader: could not render page', err)
        setStatus('error')
      }
    }

    draw()
    const ro = new ResizeObserver(() => { if (!cancelled) draw() })
    ro.observe(stage)
    return () => {
      cancelled = true
      ro.disconnect()
      renderTask.current?.cancel()
    }
  }, [page])

  const prev = () => setPage((p) => Math.max(1, p - 1))
  const next = () => setPage((p) => Math.min(total, p + 1))
  const onTouchStart = (e) => { touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY } }
  const onTouchEnd = (e) => {
    if (!touch.current) return
    const dx = e.changedTouches[0].clientX - touch.current.x
    const dy = e.changedTouches[0].clientY - touch.current.y
    touch.current = null
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) (dx < 0 ? next : prev)()
  }
  const pdfHref = `${magazine.pdf}#page=${page}`

  return (
    <div className="reader" role="dialog" aria-modal="true" aria-label={title ? `Reading: ${title}` : 'Magazine reader'}>
      <div className="reader__backdrop" onClick={onClose} />
      <div className="reader__panel">
        <header className="reader__bar">
          <div className="reader__heading">
            <span className="reader__eyebrow">{magazine.name} · {magazine.volume}, {magazine.issue}</span>
            {title && <span className="reader__title">{title}</span>}
          </div>
          <div className="reader__actions">
            <a className="reader__open" href={pdfHref} target="_blank" rel="noreferrer">Open PDF</a>
            <button ref={closeRef} type="button" className="reader__close" onClick={onClose} aria-label="Close reader">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M3 3l10 10M13 3L3 13" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </header>

        <div className="reader__stage" ref={stageRef} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <canvas ref={canvasRef} className={`reader__canvas${status === 'ready' ? ' is-ready' : ''}`} />
          {status === 'loading' && <p className="reader__status" aria-live="polite">Loading page {page}…</p>}
          {status === 'error' && (
            <p className="reader__status reader__status--error">
              This page couldn't be displayed.{' '}
              <a href={pdfHref} target="_blank" rel="noreferrer">Open the PDF instead</a>.
            </p>
          )}
          <button type="button" className="reader__nav reader__nav--prev" onClick={prev} disabled={page <= 1} aria-label="Previous page">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
              <path d="M10 3L5 8l5 5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button type="button" className="reader__nav reader__nav--next" onClick={next} disabled={page >= total} aria-label="Next page">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
              <path d="M6 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <footer className="reader__foot">
          <button type="button" className="reader__step" onClick={prev} disabled={page <= 1}>Previous</button>
          <span className="reader__count">Page <strong>{pad(page)}</strong> / {pad(total)}</span>
          <button type="button" className="reader__step" onClick={next} disabled={page >= total}>Next</button>
        </footer>
      </div>
    </div>
  )
}

export default Reader
