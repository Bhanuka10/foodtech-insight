import { magazine } from '../../data/magazine.js'
import './About.css'

function About() {
  return (
    <section className="section about" id="about" aria-labelledby="about-title">
      <div className="container about__grid">
        <div className="about__visual" data-reveal="left">
          <div className="about__block" aria-hidden="true" />
          <figure className="about__main">
            <img src="/images/about-microgreens.jpg" alt="Hands lifting a tray of freshly grown microgreens" loading="lazy" />
          </figure>
          <figure className="about__inset" data-reveal="scale" style={{ '--delay': '200ms' }}>
            <img src="/images/about-fermenters.jpg" alt="Stainless steel fermentation tanks in a production hall" loading="lazy" />
            <figcaption>Precision fermentation · FT 06</figcaption>
          </figure>
          <span className="about__folio" aria-hidden="true">Vol. 3 — No. 1</span>
        </div>

        <div className="about__copy">
          <p className="eyebrow" data-reveal>About the Magazine</p>
          <h2 className="display about__title" id="about-title" data-reveal style={{ '--delay': '80ms' }}>
            Bringing Food Science and Innovation <em>Closer to Everyone.</em>
          </h2>

          <div className="about__text" data-reveal style={{ '--delay': '160ms' }}>
            <p className="prose">
              <strong>FoodTech Insight</strong> is the biannual e-magazine of the {magazine.association}, published
              from the {magazine.department}, {magazine.faculty}, {magazine.university}.
            </p>
            <p className="prose">
              Each edition gathers peer-reviewed articles from students, researchers and academics on the
              science and technology shaping what we eat: emerging processing technologies, novel food
              products, smart packaging, sustainable protein sources, food safety, digital innovation, and
              advances in nutrition and food processing.
            </p>
            <p className="prose">
              Alongside the technology, the magazine makes room for the questions around it: food law,
              ultra-processed foods, media myths and the blind spots in today’s safety systems. The aim is
              simple: to make evidence-based food science a resource for students, researchers, academics and
              industry professionals alike.
            </p>
          </div>

          <ul className="about__facts" data-reveal style={{ '--delay': '240ms' }}>
            <li><span>Published by</span><strong>SUFSTA</strong></li>
            
            <li><span>Review</span><strong>Peer-reviewed</strong></li>
            <li><span>Sharing</span><strong>Open to circulate with acknowledgement</strong></li>
          </ul>

          <a className="link-arrow" href={magazine.website} target="_blank" rel="noreferrer" data-reveal style={{ '--delay': '300ms' }}>
            Department of Food Science &amp; Technology
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
              <path d="M3 13 13 3M6 3h7v7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

export default About
