import { useState } from 'react'
import './Home.css'

const topics = [
  {
    number: '01',
    title: 'Food innovation',
    label: 'IDEAS & TECHNOLOGY',
    description: 'Discover the ingredients, processes, and bright ideas changing how food is made and experienced.',
    symbol: '✳',
  },
  {
    number: '02',
    title: 'Food safety',
    label: 'QUALITY & TRUST',
    description: 'Explore the science and standards that help create safer, more trustworthy food for everyone.',
    symbol: '◌',
  },
  {
    number: '03',
    title: 'Sustainable futures',
    label: 'PEOPLE & PLANET',
    description: 'Follow new approaches to nourishing communities while caring for the resources we share.',
    symbol: '⌁',
  },
]

function Home() {
  const [activeTopic, setActiveTopic] = useState(0)
  const featuredTopic = topics[activeTopic]

  return (
    <main className="home-page">
      <header className="site-header">
        <a className="brand" href="#home" aria-label="FoodTech Insight home">
          <span className="brand-mark" aria-hidden="true"><span>F</span></span>
          <span className="brand-copy"><strong>FoodTech Insight</strong><small>FST ASSOCIATION · SABARAGAMUWA UNIVERSITY</small></span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#topics">Topics</a>
        </nav>
        <a className="header-issue" href="#cover">THE E-MAGAZINE <span aria-hidden="true">↗</span></a>
      </header>

      <section className="hero" id="home" aria-labelledby="hero-title">
        <div className="hero-copy" id="about">
          <p className="hero-kicker"><span className="kicker-line" /> THE OFFICIAL E-MAGAZINE OF THE FST ASSOCIATION</p>
          <p className="hero-edition">SABARAGAMUWA UNIVERSITY <span>·</span> FOOD SCIENCE &amp; TECHNOLOGY</p>
          <h1 id="hero-title"><span>FoodTech</span><em>Insight</em><i aria-hidden="true">.</i></h1>
          <p className="hero-description">A fresh perspective on the science, people, and ideas shaping what the world eats.</p>
          <div className="hero-actions">
            <a className="primary-button" href="#topics">Explore our topics <span aria-hidden="true">↘</span></a>
            <span className="hero-action-note">Curiosity starts at the table.</span>
          </div>
          <div className="hero-bottomline"><span>SCIENCE, SERVED WITH INSIGHT</span><span>VOL. 01 <b>—</b> FOOD FUTURES</span></div>
        </div>

        <div className="hero-art" id="cover">
          <div className="art-orbit orbit-one" aria-hidden="true" />
          <div className="art-orbit orbit-two" aria-hidden="true" />
          <div className="cover-label">THE<br />FOOD FUTURES<br />EDITION</div>
          <div className="book-stage">
            <div className="magazine-book">
              <span className="book-spine" aria-hidden="true" />
              <img src="/images/images%20(1).jpeg" alt="FoodTech Insight magazine cover" />
              <span className="book-pages" aria-hidden="true" />
            </div>
          </div>
          <span className="art-caption">A publication of food science &amp; technology</span>
        </div>
      </section>

      <div className="ticker" aria-label="Research, innovation, food culture and future systems">
        <div className="ticker-track" aria-hidden="true">
          {Array.from({ length: 2 }, (_, index) => (
            <span className="ticker-set" key={index}>RESEARCH <i>✳</i> INNOVATION <i>✳</i> FOOD CULTURE <i>✳</i> FUTURE SYSTEMS <i>✳</i> RESEARCH <i>✳</i> INNOVATION <i>✳</i> FOOD CULTURE <i>✳</i> FUTURE SYSTEMS <i>✳</i></span>
          ))}
        </div>
      </div>

      <section className="topics-section" id="topics" aria-labelledby="topics-heading">
        <div className="topics-heading">
          <div>
            <p className="section-kicker">A FIELD GUIDE TO WHAT’S NEXT</p>
            <h2 id="topics-heading">Good food has<br /><em>many stories.</em></h2>
          </div>
          <p className="topics-intro">From laboratory discoveries to the future of our food systems, explore the ideas behind every bite.</p>
        </div>

        <div className="topic-layout">
          <div className="topic-list" role="tablist" aria-label="Magazine topics">
            {topics.map((topic, index) => (
              <button
                className={`topic-tab${activeTopic === index ? ' is-active' : ''}`}
                type="button"
                role="tab"
                id={`topic-tab-${index}`}
                aria-selected={activeTopic === index}
                aria-controls="topic-feature"
                key={topic.number}
                onClick={() => setActiveTopic(index)}
              >
                <span className="topic-tab-number">{topic.number}</span>
                <span className="topic-tab-title">{topic.title}</span>
                <span className="topic-tab-arrow" aria-hidden="true">↗</span>
              </button>
            ))}
          </div>

          <article className="topic-feature" id="topic-feature" role="tabpanel" aria-labelledby={`topic-tab-${activeTopic}`} key={featuredTopic.number}>
            <div className="feature-topline"><span>IN THIS ISSUE</span><span>{featuredTopic.number} / 03</span></div>
            <div className="feature-symbol" aria-hidden="true">{featuredTopic.symbol}</div>
            <p className="feature-label">{featuredTopic.label}</p>
            <h3>{featuredTopic.title}</h3>
            <p className="feature-description">{featuredTopic.description}</p>
            <a className="feature-link" href="#cover">Discover FoodTech Insight <span aria-hidden="true">↗</span></a>
          </article>
        </div>
      </section>

      <footer className="page-footer"><span>FOODTECH INSIGHT</span><span>THE OFFICIAL E-MAGAZINE OF SABARAGAMUWA UNIVERSITY FST ASSOCIATION</span><a href="#home">BACK TO TOP ↑</a></footer>
    </main>
  )
}

export default Home
