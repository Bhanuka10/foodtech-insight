import { magazine } from '../../data/magazine.js'
import './Footer.css'

function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer" id="download">
      {/* ---------- CTA ---------- */}
      <section className="cta" aria-labelledby="cta-title">
        <div className="container cta__inner">
          <span className="cta__ring" aria-hidden="true" />
          <p className="eyebrow cta__eyebrow" data-reveal>{magazine.volume} · {magazine.issue} · {magazine.date}</p>
          <h2 className="display cta__title" id="cta-title" data-reveal style={{ '--delay': '80ms' }}>
            Explore the Future <em>of Food Science.</em>
          </h2>
          <p className="cta__text" data-reveal style={{ '--delay': '160ms' }}>
            Read the complete edition, free to download and share with proper acknowledgement.
          </p>
          <div className="cta__actions" data-reveal style={{ '--delay': '240ms' }}>
            <a className="btn btn--light" href={magazine.pdf} download>
              Download Magazine
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                <path d="M8 2v9M4.5 7.5 8 11l3.5-3.5M2.5 13.5h11" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <span className="cta__note">PDF · {magazine.pages} pages</span>
          </div>
        </div>
      </section>

      {/* ---------- Footer ---------- */}
      <div className="footer__main">
        <div className="container footer__grid">
          <div className="footer__brand">
            <a href="#home" className="footer__wordmark">FoodTech <em>Insight</em></a>
            <p>{magazine.tagline}</p>
            <p className="footer__official">{magazine.description}</p>
          </div>

          <div className="footer__col">
            <h3>Publisher</h3>
            <p>{magazine.association}</p>
            <p>{magazine.department}</p>
            <p>{magazine.faculty}</p>
            <p>{magazine.university}</p>
            <p>{magazine.address}</p>
          </div>

          <div className="footer__col">
            <h3>Contact</h3>
            <p><a href={`mailto:${magazine.email}`}>{magazine.email}</a></p>
            <p><a href={magazine.website} target="_blank" rel="noreferrer">Official website ↗</a></p>
            <h3 className="footer__col-sub">Edition</h3>
            <p>{magazine.volume} · {magazine.issue}</p>
            <p>{magazine.date} · {magazine.issn}</p>
          </div>

          <nav className="footer__col" aria-label="Footer">
            <h3>Explore</h3>
            <p><a href="#home">Home</a></p>
            <p><a href="#contents">Contents</a></p>
            <p><a href="#about">About</a></p>
            <p><a href="#contributors">Contributors</a></p>
            <p><a href={magazine.pdf} download>Download</a></p>
          </nav>
        </div>

        <div className="container footer__bottom">
          <span>© {year} FoodTech Insight · SUFSTA</span>
          <span>Published after peer review and editorial corrections for uniformity.</span>
          <a href="#home">Back to top ↑</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
