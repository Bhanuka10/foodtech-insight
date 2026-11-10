import { chiefEditor, editorialBoard, editorialAssistants, reviewers, studentReviewers, initials } from '../../data/team.js'
import { articles } from '../../data/articles.js'
import { magazine } from '../../data/magazine.js'
import './Team.css'

const pad = (n) => String(n).padStart(2, '0')

function Person({ name, role, size = 'md', delay = 0 }) {
  return (
    <div className={`person person--${size}`} data-reveal style={{ '--delay': `${delay}ms` }}>
      <span className="person__mono" aria-hidden="true">{initials(name)}</span>
      <div className="person__text">
        <strong className="person__name">{name}</strong>
        <span className="person__role">{role}</span>
      </div>
    </div>
  )
}

function Team() {
  return (
    <section className="section team" id="contributors" aria-labelledby="team-title">
      <div className="container">
        <header className="section-head">
          <div>
            <p className="eyebrow" data-reveal>Editorial Team &amp; Contributors</p>
            <h2 className="display" id="team-title" data-reveal style={{ '--delay': '80ms' }}>
              The People <em>Behind</em> the Ideas.
            </h2>
          </div>
          <p className="lede" data-reveal style={{ '--delay': '160ms' }}>
            Responsibility for the contents of the articles remains with the individual authors. All articles
            were published after peer review and editorial corrections for uniformity.
          </p>
        </header>

        {/* ---------- Editorial board ---------- */}
        <div className="team__row">
          <div className="team__label" data-reveal>
            <span>01</span>Editorial Board
          </div>
          <div className="team__board">
            <Person name={chiefEditor.name} role={chiefEditor.role} size="lg" />
            <div className="team__board-grid">
              {editorialBoard.map((p, i) => (
                <Person key={p.name} name={p.name} role={p.role} delay={80 + i * 60} />
              ))}
            </div>
          </div>
        </div>

        {/* ---------- Assistants ---------- */}
        <div className="team__row">
          <div className="team__label" data-reveal>
            <span>02</span>Editorial Assistants
          </div>
          <div>
            <div className="team__assistants">
              {editorialAssistants.map((p, i) => (
                <Person key={p.name} name={p.name} role={p.role} delay={i * 80} />
              ))}
            </div>

            <div className="team__sublabel" data-reveal>Student Reviewers</div>
            <ul className="team__reviewers">
              {studentReviewers.map((name, i) => (
                <li key={name} data-reveal style={{ '--delay': `${(i % 4) * 60}ms` }}>
                  <span className="team__reviewer-mono" aria-hidden="true">{initials(name)}</span>
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ---------- Reviewers ---------- */}
        <div className="team__row">
          <div className="team__label" data-reveal>
            <span>03</span>Reviewers
          </div>
          <ul className="team__reviewers">
            {reviewers.map((name, i) => (
              <li key={name} data-reveal style={{ '--delay': `${(i % 4) * 60}ms` }}>
                <span className="team__reviewer-mono" aria-hidden="true">{initials(name)}</span>
                {name}
              </li>
            ))}
          </ul>
        </div>

        {/* ---------- Contributors index ---------- */}
        <div className="team__row team__row--index">
          <div className="team__label" data-reveal>
            <span>04</span>Contributing Authors
          </div>
          <ol className="index">
            {articles.map((a, i) => (
              <li key={a.no} className="index__row" data-reveal="fade" style={{ '--delay': `${(i % 6) * 40}ms` }}>
                <span className="index__no">FT {pad(a.no)}</span>
                <div className="index__who">
                  <strong>{a.authors.join(', ')}</strong>
                  <span>{a.affiliation}</span>
                </div>
                <a className="index__title" href={`${magazine.pdf}#page=${a.page}`} target="_blank" rel="noreferrer">
                  {a.title}
                </a>
                <span className="index__page">p. {pad(a.page)}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

export default Team
