import { useMemo, useState } from 'react'
import './Home.css'

const stories = [
  { id: 1, category: 'Market pulse', time: '6 min read', title: 'The next wave of food innovation is built around everyday rituals', summary: 'The brands gaining momentum make small moments feel better, with smarter snacks and more thoughtful sourcing.', tag: 'Consumer trends', color: 'citrus', mark: '01' },
  { id: 2, category: 'Founder stories', time: '8 min read', title: 'How a neighborhood kitchen became a better-for-you favorite', summary: 'A founder shares the lessons behind building a loyal community before chasing scale.', tag: 'New perspectives', color: 'tomato', mark: '02' },
  { id: 3, category: 'What’s new', time: '4 min read', title: 'Five emerging ingredients to keep on your radar this season', summary: 'A quick scan of ingredients showing up in menus, launches, and conversations.', tag: 'Ingredient watch', color: 'berry', mark: '03' },
]

const topics = [
  { name: 'Market pulse', number: '01', description: 'Signals, shifts, and what they mean for the food business.' },
  { name: 'Founder stories', number: '02', description: 'Meet the people making the next generation of food.' },
  { name: 'What’s new', number: '03', description: 'Ingredients, products, and ideas just coming into view.' },
]

const categories = ['All stories', ...topics.map((topic) => topic.name)]

function Home() {
  const [activeCategory, setActiveCategory] = useState('All stories')
  const [query, setQuery] = useState('')
  const [saved, setSaved] = useState([])
  const [subscribed, setSubscribed] = useState(false)

  const visibleStories = useMemo(() => stories.filter((story) => {
    const matchesCategory = activeCategory === 'All stories' || story.category === activeCategory
    const matchesQuery = `${story.title} ${story.summary} ${story.tag}`.toLowerCase().includes(query.toLowerCase())
    return matchesCategory && matchesQuery
  }), [activeCategory, query])

  const selectTopic = (topic) => {
    setActiveCategory(topic)
    document.querySelector('#stories')?.scrollIntoView({ behavior: 'smooth' })
  }

  const toggleSaved = (id) => setSaved((current) => current.includes(id)
    ? current.filter((item) => item !== id)
    : [...current, id])

  return (
    <main className="home-page">
      <header className="site-header">
        <a className="brand" href="/" aria-label="Foodtech Insight home"><span className="brand-mark">fi</span><span>foodtech<span className="brand-light"> insight</span></span></a>
        <nav aria-label="Main navigation"><a href="#stories">Stories</a><a href="#signals">Signals</a><a href="#topics">Topics</a></nav>
        <a className="header-link" href="#newsletter">The monthly plate <span aria-hidden="true">↗</span></a>
      </header>

      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow"><span className="live-dot" /> FOOD, THROUGH A FRESH LENS</p>
          <h1>Make room<br />for <em>what’s next.</em></h1>
          <p className="hero-description">Foodtech Insight tracks the people and ideas changing the way we grow, make, and enjoy food.</p>
          <a className="primary-button" href="#stories">Read the latest <span aria-hidden="true">↓</span></a>
          <div className="hero-proof"><span className="proof-icon">✳</span><span>Independent insight for a<br /><strong>better food future.</strong></span></div>
        </div>
        <div className="hero-art" role="img" aria-label="Illustration of fresh ingredients on a plate">
          <span className="art-sticker sticker-one">GOOD<br />FOOD<br />AHEAD</span>
          <span className="art-sticker sticker-two">FIELD NOTES<br />VOL. 08</span>
          <div className="plate"><span className="plate-center" /><i className="ingredient ingredient-one" /><i className="ingredient ingredient-two" /><i className="ingredient ingredient-three" /><i className="ingredient ingredient-four" /><i className="ingredient ingredient-five" /><i className="ingredient ingredient-six" /></div>
          <span className="art-spark spark-one">✳</span><span className="art-spark spark-two">✳</span>
        </div>
        <div className="hero-foot"><span>Ideas with substance, served without the noise.</span><a href="#signals">Scroll to explore <span aria-hidden="true">↓</span></a></div>
      </section>

      <section className="signal-strip" id="signals" aria-label="Food industry signals">
        <div className="signal-intro"><span className="eyebrow">THE BIG PICTURE</span><h2>Food is<br /><em>in motion.</em></h2></div>
        <article className="signal"><span className="signal-icon">↗</span><strong>New habits</strong><p>Changing routines are creating room for new products.</p></article>
        <article className="signal"><span className="signal-icon">✳</span><strong>Better inputs</strong><p>Ingredient innovation is reaching everyday plates.</p></article>
        <article className="signal"><span className="signal-icon">◎</span><strong>Closer loops</strong><p>More makers are designing with the whole system in mind.</p></article>
      </section>

      <section className="topics-section" id="topics">
        <div className="section-heading"><div><p className="eyebrow">FOLLOW YOUR CURIOSITY</p><h2>Pick a place <em>to begin.</em></h2></div><span className="section-aside">A few good paths into<br />the world of foodtech.</span></div>
        <div className="topic-grid">{topics.map((topic) => <button className="topic-card" key={topic.name} type="button" onClick={() => selectTopic(topic.name)}><span className="topic-number">{topic.number}</span><span className="topic-arrow" aria-hidden="true">↗</span><strong>{topic.name}</strong><span className="topic-description">{topic.description}</span><span className="topic-link">Explore stories <span aria-hidden="true">→</span></span></button>)}</div>
      </section>

      <section className="stories-section" id="stories">
        <div className="section-heading"><div><p className="eyebrow">THE LATEST THINKING</p><h2>Curiosity, <em>served fresh.</em></h2></div><label className="search-box"><span aria-hidden="true">⌕</span><input aria-label="Search stories" placeholder="Search our stories" value={query} onChange={(event) => setQuery(event.target.value)} />{query && <button type="button" aria-label="Clear search" onClick={() => setQuery('')}>×</button>}</label></div>
        <div className="story-controls" role="group" aria-label="Filter stories">{categories.map((category) => <button key={category} className={`filter-chip ${activeCategory === category ? 'selected' : ''}`} onClick={() => setActiveCategory(category)} type="button">{category}</button>)}</div>
        <div className="story-grid">{visibleStories.map((story) => <article className="story-card" key={story.id}><div className={`story-art ${story.color}`}><span className="story-number">FIELD NOTE / {story.mark}</span><span className="story-shape" /><button className={`save-button ${saved.includes(story.id) ? 'is-saved' : ''}`} type="button" aria-label={saved.includes(story.id) ? 'Remove saved story' : 'Save story'} onClick={() => toggleSaved(story.id)}>{saved.includes(story.id) ? '♥' : '♡'}</button><span className="art-caption">{story.tag}</span></div><div className="story-meta"><span>{story.category}</span><span>{story.time}</span></div><h3>{story.title}</h3><p>{story.summary}</p><a className="read-link" href="#newsletter">Read the story <span aria-hidden="true">↗</span></a></article>)}</div>
        {visibleStories.length === 0 && <div className="empty-state"><span>No stories match that search.</span><button type="button" onClick={() => { setQuery(''); setActiveCategory('All stories') }}>Clear search and filters</button></div>}
        <p className="saved-note" aria-live="polite">{saved.length ? `${saved.length} ${saved.length === 1 ? 'story' : 'stories'} saved for later` : 'Save a story to keep it close.'}</p>
      </section>

      <section className="newsletter" id="newsletter"><div><p className="eyebrow">A NOTE FROM THE FUTURE</p><h2>A little more<br /><em>food for thought.</em></h2></div><div className="newsletter-action"><p>Our monthly briefing on what’s changing in food. Thoughtful, useful, and always worth a read.</p><button type="button" className="primary-button" onClick={() => setSubscribed(true)}>{subscribed ? 'You’re on the list ✓' : 'Count me in'} <span aria-hidden="true">↗</span></button><span className="signup-message" aria-live="polite">{subscribed ? 'Thanks for joining us. Look out for the next edition.' : 'No noise. Just good ideas, once a month.'}</span></div></section>
      <footer id="about"><a className="brand" href="/" aria-label="Foodtech Insight home"><span className="brand-mark">fi</span><span>foodtech<span className="brand-light"> insight</span></span></a><span>Making sense of what’s next in food.</span><span>© 2025 Foodtech Insight</span></footer>
    </main>
  )
}

export default Home
