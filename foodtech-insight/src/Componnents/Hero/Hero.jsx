import { magazine } from '../../data/magazine.js'
import { articles } from '../../data/articles.js'
import './Hero.css'

const ArrowDown = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
    <path d="M8 2v9M4.5 7.5 8 11l3.5-3.5M2.5 13.5h11" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const ArrowRight = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
    <path d="M2 8h11M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

function Hero() {
  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div className="hero__grid container">
        {/* ---------- Left: 3D magazine mockup ---------- */}
        <div className="hero__stage" aria-hidden="true">
          <div className="hero__backdrop" />
          <span className="hero__issue-no">02</span>
          <span className="hero__vertical">{magazine.volume} · {magazine.issue} · {magazine.date}</span>

          <div className="hero__float">
            <div className="hero__page">
              <img src={magazine.contentsPage} alt="" loading="eager" />
            </div>
            <div className="book">
              <div className="book__face book__back" />
              <div className="book__face book__pages" />
              <div className="book__face book__top" />
              <div className="book__face book__bottom" />
              <div className="book__face book__spine" />
              <div className="book__face book__front">
                <img src={magazine.cover} alt="" fetchPriority="high" />
              </div>
            </div>
            <div className="book__shadow" />
          </div>

          <div className="hero__caption">
            <span>{magazine.issn}</span>
            <span>{articles.length} articles · {magazine.pages} pages</span>
          </div>
        </div>

        {/* ---------- Right: editorial copy ---------- */}
        <div className="hero__copy">
          <p className="eyebrow" data-reveal>The Latest Edition</p>

          <h1 className="hero__title" id="hero-title" data-reveal style={{ '--delay': '80ms' }}>
            <span>FoodTech</span>
            <em>Insight</em>
          </h1>

          <p className="hero__tagline lede" data-reveal style={{ '--delay': '160ms' }}>
            {magazine.tagline}
          </p>

          <p className="hero__official" data-reveal style={{ '--delay': '220ms' }}>
            {magazine.description}
          </p>

          <p className="prose hero__intro" data-reveal style={{ '--delay': '280ms' }}>
            This issue brings together {articles.length} peer-reviewed articles exploring emerging technologies,
            novel food products, smart packaging, sustainable protein sources, food safety, digital
            innovations and advancements in nutrition and food processing.
          </p>

          <dl className="hero__meta" data-reveal style={{ '--delay': '340ms' }}>
            <div><dt>Edition</dt><dd>{magazine.volume}, {magazine.issue}</dd></div>
            <div><dt>Published</dt><dd>{magazine.date}</dd></div>
            <div><dt>ISSN</dt><dd>{magazine.issn.replace('ISSN ', '')}</dd></div>
            <div><dt>Frequency</dt><dd>Biannual</dd></div>
          </dl>

          <div className="hero__actions" data-reveal style={{ '--delay': '400ms' }}>
            <a className="btn" href={magazine.pdf} download>
              Download Digital Copy <ArrowDown />
            </a>
            <a className="link-arrow" href="#contents">
              Explore Contents <ArrowRight />
            </a>
          </div>
        </div>
      </div>

      <a className="hero__scroll" href="#contents" aria-label="Scroll to contents">
        <span>Scroll</span>
        <i />
      </a>
    </section>
  )
}

export default Hero
