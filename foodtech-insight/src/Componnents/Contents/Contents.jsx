import { articles } from '../../data/articles.js'
import { magazine, editorsNote } from '../../data/magazine.js'
import { useOpenArticle } from '../../reader/useReader.js'
import './Contents.css'

const pad = (n) => String(n).padStart(2, '0')

function ArticleCard({ article }) {
  const openArticle = useOpenArticle()
  const href = `${magazine.pdf}#page=${article.page}`
  const onClick = openArticle(article.page, article.title)
  return (
    <article className="card">
      <a className="card__media" href={href} onClick={onClick} target="_blank" rel="noreferrer" tabIndex={-1} aria-hidden="true">
        <img src={article.image} alt="" loading="lazy" width="900" height="506" />
      </a>
      <div className="card__body">
        <div className="card__meta">
          <span className="card__no">FT {pad(article.no)}</span>
          <span className="card__cat">{article.category}</span>
        </div>
        <h3 className="card__title">
          <a href={href} onClick={onClick} target="_blank" rel="noreferrer">{article.title}</a>
        </h3>
        <p className="card__desc">{article.description}</p>
        <div className="card__foot">
          <span className="card__author">{article.authors.join(', ')}</span>
          <a className="card__read" href={href} onClick={onClick} target="_blank" rel="noreferrer" aria-label={`Read ${article.title} (page ${article.page})`}>
            Read Article
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
              <path d="M2 8h11M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </article>
  )
}

function Column({ items, direction }) {
  // Items are duplicated so the CSS translate loop is seamless.
  return (
    <div className={`scroller scroller--${direction}`}>
      <div className="scroller__track">
        {[...items, ...items].map((a, i) => (
          <ArticleCard key={`${a.no}-${i}`} article={a} />
        ))}
      </div>
    </div>
  )
}

function Contents() {
  const half = Math.ceil(articles.length / 2)
  const left = articles.slice(0, half)
  const right = articles.slice(half)

  return (
    <section className="section contents" id="contents" aria-labelledby="contents-title">
      <div className="container">
        <header className="section-head">
          <div>
            <p className="eyebrow" data-reveal>Contents · {magazine.volume}, {magazine.issue}</p>
            <h2 className="display" id="contents-title" data-reveal style={{ '--delay': '80ms' }}>
              Inside <em>this</em> Edition
            </h2>
          </div>
          <p className="lede" data-reveal style={{ '--delay': '160ms' }}>
            Discover the ideas shaping the future of food.
          </p>
        </header>

        <div className="contents__layout" data-reveal="fade" style={{ '--delay': '200ms' }}>
          <aside className="contents__rail">
            <div className="rail__block">
              <span className="rail__num">{pad(articles.length)}</span>
              <span className="rail__label">Peer-reviewed articles</span>
            </div>
            <div className="rail__block">
              <span className="rail__num">{pad(new Set(articles.map((a) => a.category)).size)}</span>
              <span className="rail__label">Fields of enquiry</span>
            </div>
            <div className="rail__block rail__block--quote">
              <p>“{editorsNote.quote}”</p>
              <cite>{editorsNote.author}<br /><span>{editorsNote.role}</span></cite>
            </div>
            <p className="rail__hint" aria-hidden="true">Hover a column to pause</p>
          </aside>

          <div className="contents__columns">
            <Column items={left} direction="up" />
            <Column items={right} direction="down" />
          </div>

          {/* Static list for small screens */}
          <div className="contents__static">
            {articles.map((a) => <ArticleCard key={a.no} article={a} />)}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contents
