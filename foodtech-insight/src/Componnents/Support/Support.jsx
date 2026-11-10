import { useEffect, useRef, useState } from 'react'
import { support } from '../../data/support.js'
import SupporterForm from './SupporterForm.jsx'
import { ArrowIcon, OptionIcon } from './icons.jsx'
import './Support.css'

const pad = (n) => String(n).padStart(2, '0')

function Support() {
  const [activeId, setActiveId] = useState(null)
  const panelRef = useRef(null)
  const offersRef = useRef(null)
  const active = support.options.find((o) => o.id === activeId) || null

  // Bring the form into view once it has been rendered for the chosen option.
  useEffect(() => {
    if (!activeId || !panelRef.current) return
    const id = requestAnimationFrame(() => panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
    return () => cancelAnimationFrame(id)
  }, [activeId])

  const changeOption = () => {
    setActiveId(null)
    offersRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="section support" id="support" aria-labelledby="support-title">
      <div className="container">
        <header className="section-head support__head">
          <div>
            <p className="eyebrow" data-reveal>{support.eyebrow}</p>
            <h2 className="display" id="support-title" data-reveal style={{ '--delay': '80ms' }}>
              {support.headline[0]} <em>{support.headline[1]}</em>
            </h2>
          </div>
          <p className="prose support__intro" data-reveal style={{ '--delay': '160ms' }}>{support.intro}</p>
        </header>

        <div className={`support__offers${support.options.length === 1 ? ' support__offers--solo' : ''}`} ref={offersRef} data-reveal="fade" style={{ '--delay': '200ms' }} role="list">
          {support.options.map((o, i) => {
            const isActive = o.id === activeId
            return (
              <button
                key={o.id}
                type="button"
                role="listitem"
                className={`offer${isActive ? ' is-active' : ''}${o.featured ? ' offer--featured' : ''}`}
                style={{ '--i': i }}
                aria-pressed={isActive}
                aria-controls="support-form"
                onClick={() => setActiveId(o.id)}
              >
                <span className="offer__top">
                  <span className="offer__no">{pad(i + 1)}</span>
                  <span className="offer__icon"><OptionIcon name={o.icon} /></span>
                </span>
                <span className="offer__title">{o.title}</span>
                <span className="offer__desc">{o.description}</span>
                <span className="offer__cta">{isActive ? 'Selected' : o.cta}<ArrowIcon /></span>
              </button>
            )
          })}
        </div>

        <div className="support__panel" id="support-form" ref={panelRef} hidden={!active}>
          {active && <SupporterForm key={active.id} option={active} onChangeOption={changeOption} />}
        </div>
      </div>
    </section>
  )
}

export default Support
