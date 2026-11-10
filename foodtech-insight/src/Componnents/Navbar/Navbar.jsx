import { useEffect, useState } from 'react'
import { magazine } from '../../data/magazine.js'
import './Navbar.css'

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Contents', href: '#contents' },
  { label: 'About', href: '#about' },
  { label: 'Contributors', href: '#contributors' },
  { label: 'Support', href: '#support' },
]

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <header className={`nav${scrolled ? ' nav--scrolled' : ''}${open ? ' nav--open' : ''}`}>
      <div className="container nav__bar">
        <div className="nav__left">
          <img className="nav__logo" src="/images/SUFSTA LOGO.png" alt="SUFSTA" />
          <span className="nav__divider" aria-hidden="true" />
          <a className="nav__brand" href="#home" aria-label="FoodTech Insight — home" onClick={() => setOpen(false)}>
            <span className="nav__wordmark">FoodTech <em>Insight</em></span>
          </a>
        </div>

        <nav className="nav__links" aria-label="Primary">
          {links.map((l) => (
            <a key={l.href} href={l.href}>{l.label}</a>
          ))}
        </nav>

        <div className="nav__actions">
          <a className="nav__download" href={magazine.pdf} download>
            <span>Download</span>
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
              <path d="M8 2v9M4.5 7.5 8 11l3.5-3.5M2.5 13.5h11" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <button
            className="nav__toggle"
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span /><span />
          </button>
        </div>
      </div>

      <div className="nav__menu" id="mobile-menu" hidden={!open}>
        <div className="container">
          {links.map((l, i) => (
            <a key={l.href} href={l.href} style={{ '--i': i }} onClick={() => setOpen(false)}>
              <small>0{i + 1}</small>{l.label}
            </a>
          ))}
          <a className="btn" href={magazine.pdf} download onClick={() => setOpen(false)}>Download Digital Copy</a>
        </div>
      </div>
    </header>
  )
}

export default Navbar
