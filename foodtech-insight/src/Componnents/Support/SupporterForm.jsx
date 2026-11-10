import { useId, useRef, useState } from 'react'
import { support } from '../../data/support.js'
import { magazine } from '../../data/magazine.js'
import { SubmissionError, submitSupporter } from '../../lib/supporterApi.js'
import { initialValues, validate } from '../../lib/validateSupporter.js'
import { CheckIcon } from './icons.jsx'

const steps = ['About you', 'Your work', 'Your support', 'Your purpose', 'Your journey']

function Field({ id, label, error, optional, children }) {
  return (
    <div className={`field${error ? ' is-invalid' : ''}`}>
      <label htmlFor={id}>{label}{optional ? <span className="field__opt">Optional</span> : <span className="field__req" aria-hidden="true">*</span>}</label>
      {children}
      {error && <p className="field__error" id={`${id}-error`} role="alert">{error}</p>}
    </div>
  )
}

function Chips({ name, options, selected, onToggle, describedBy }) {
  return (
    <div className="chips" role="group" aria-describedby={describedBy}>
      {options.map((opt) => {
        const on = selected.includes(opt)
        return (
          <button key={opt} type="button" className="chip" aria-pressed={on} data-name={name} onClick={() => onToggle(opt)}>
            <span className="chip__mark"><CheckIcon /></span>
            {opt}
          </button>
        )
      })}
    </div>
  )
}

function SupporterForm({ option, onChangeOption }) {
  const uid = useId()
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [message, setMessage] = useState('')
  const [result, setResult] = useState(null)
  const formRef = useRef(null)
  const submitting = status === 'submitting'

  const set = (name) => (e) => {
    const value = e.target.value
    setValues((v) => ({ ...v, [name]: value }))
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }))
  }
  const toggle = (name) => (opt) => {
    setValues((v) => {
      const list = v[name].includes(opt) ? v[name].filter((x) => x !== opt) : [...v[name], opt]
      return { ...v, [name]: list }
    })
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (submitting) return
    if (values.company) { setStatus('success'); setResult({ id: 'SUP-000' }); return } // bot filled the honeypot

    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length) {
      setStatus('error')
      setMessage('A few details need your attention before we can send this.')
      const first = formRef.current?.querySelector('.is-invalid input, .is-invalid textarea, .chips')
      first?.focus?.()
      first?.scrollIntoView?.({ behavior: 'smooth', block: 'center' })
      return
    }

    setStatus('submitting')
    setMessage('')
    try {
      const res = await submitSupporter({ ...values, category: option.title })
      setResult(res)
      setStatus('success')
      requestAnimationFrame(() => document.getElementById('support-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
    } catch (err) {
      setStatus('error')
      const friendly = err instanceof SubmissionError ? err.message : 'Something went wrong while sending your details. Please try again.'
      setMessage(err instanceof SubmissionError && err.code === 'not-configured'
        ? `${friendly} Write to ${magazine.email}.`
        : friendly)
    }
  }

  if (status === 'success') {
    return (
      <div className="support__success" role="status" aria-live="polite">
        <span className="support__success-mark" aria-hidden="true"><CheckIcon /></span>
        <p className="eyebrow eyebrow--plain">{option.title}</p>
        <h3 className="support__success-title">{support.success.heading}</h3>
        <p className="support__success-text">{support.success.text}</p>
        {result?.id && <p className="support__success-ref">Reference <strong>{result.id}</strong></p>}
        <button type="button" className="btn btn--ghost" onClick={onChangeOption}>{support.options.length > 1 ? 'Back to support options' : 'Done'}</button>
      </div>
    )
  }

  const f = (name) => `${uid}-${name}`
  const err = (name) => errors[name]

  return (
    <div className="sform">
      <aside className="sform__rail">
        <p className="eyebrow eyebrow--plain">You are joining as</p>
        <p className="sform__category">{option.title}</p>
        <button type="button" className="sform__change" onClick={onChangeOption}>{support.options.length > 1 ? 'Choose a different way to support' : 'Close this form'}</button>
        <ol className="sform__steps" aria-label="Form sections">
          {steps.map((s, i) => <li key={s}><span>{String(i + 1).padStart(2, '0')}</span>{s}</li>)}
        </ol>
        <p className="sform__note">No payment is collected here. A member of our editorial team will reach out to you personally.</p>
      </aside>

      <form className="sform__form" ref={formRef} onSubmit={onSubmit} noValidate aria-describedby={status === 'error' ? f('alert') : undefined}>
        {status === 'error' && message && (
          <div className="sform__alert" id={f('alert')} role="alert">{message}</div>
        )}

        <fieldset className="sform__group">
          <legend><span>01</span>Personal information</legend>
          <div className="sform__grid">
            <Field id={f('fullName')} label="Full name" error={err('fullName')}>
              <input id={f('fullName')} name="fullName" type="text" autoComplete="name" value={values.fullName} onChange={set('fullName')} aria-invalid={!!err('fullName')} aria-describedby={err('fullName') ? `${f('fullName')}-error` : undefined} placeholder="Your name" />
            </Field>
            <Field id={f('email')} label="Email address" error={err('email')}>
              <input id={f('email')} name="email" type="email" autoComplete="email" inputMode="email" value={values.email} onChange={set('email')} aria-invalid={!!err('email')} aria-describedby={err('email') ? `${f('email')}-error` : undefined} placeholder="you@example.com" />
            </Field>
            <Field id={f('phone')} label="Contact / WhatsApp number" error={err('phone')} optional>
              <input id={f('phone')} name="phone" type="tel" autoComplete="tel" inputMode="tel" value={values.phone} onChange={set('phone')} aria-invalid={!!err('phone')} placeholder="+94 77 123 4567" />
            </Field>
            <Field id={f('country')} label="Country" optional>
              <input id={f('country')} name="country" type="text" autoComplete="country-name" value={values.country} onChange={set('country')} placeholder="Sri Lanka" />
            </Field>
          </div>
        </fieldset>

        <fieldset className="sform__group">
          <legend><span>02</span>Professional information <em>Optional</em></legend>
          <div className="sform__grid">
            <Field id={f('organization')} label="Organization / Company" optional>
              <input id={f('organization')} name="organization" type="text" autoComplete="organization" value={values.organization} onChange={set('organization')} placeholder="Where you work or study" />
            </Field>
            <Field id={f('position')} label="Position / Designation" optional>
              <input id={f('position')} name="position" type="text" autoComplete="organization-title" value={values.position} onChange={set('position')} placeholder="Your role" />
            </Field>
            <Field id={f('website')} label="Website or social profile" error={err('website')} optional>
              <input id={f('website')} name="website" type="text" autoComplete="url" inputMode="url" value={values.website} onChange={set('website')} aria-invalid={!!err('website')} placeholder="https://… or @handle" />
            </Field>
          </div>
        </fieldset>

        <fieldset className={`sform__group${err('preferences') ? ' is-invalid' : ''}`}>
          <legend><span>03</span>How would you like to support us?</legend>
          <p className="sform__hint" id={f('pref-hint')}>Select one or more.</p>
          <Chips name="preferences" options={support.preferences} selected={values.preferences} onToggle={toggle('preferences')} describedBy={f('pref-hint')} />
          {err('preferences') && <p className="field__error" role="alert">{err('preferences')}</p>}
          {values.preferences.includes('Other') && (
            <div className="sform__other">
              <Field id={f('otherPreference')} label="Tell us more" error={err('otherPreference')}>
                <input id={f('otherPreference')} name="otherPreference" type="text" value={values.otherPreference} onChange={set('otherPreference')} aria-invalid={!!err('otherPreference')} placeholder="How would you like to support us?" />
              </Field>
            </div>
          )}
        </fieldset>

        <fieldset className="sform__group">
          <legend><span>04</span>{support.purpose.heading}</legend>
          <p className="sform__lead">{support.purpose.description}</p>
          <Field id={f('purpose')} label="Your message" error={err('purpose')} optional>
            <textarea id={f('purpose')} name="purpose" rows={6} maxLength={2000} value={values.purpose} onChange={set('purpose')} aria-invalid={!!err('purpose')} placeholder={support.purpose.placeholder} />
          </Field>
        </fieldset>

        <fieldset className="sform__group">
          <legend><span>05</span>{support.involvement.heading} <em>Optional</em></legend>
          <p className="sform__hint" id={f('inv-hint')}>Choose everything that sounds like you.</p>
          <Chips name="involvement" options={support.involvement.options} selected={values.involvement} onToggle={toggle('involvement')} describedBy={f('inv-hint')} />
        </fieldset>

        {/* Honeypot: hidden from people, tempting for bots. */}
        <div className="sform__hp" aria-hidden="true">
          <label htmlFor={f('company')}>Company</label>
          <input id={f('company')} name="company" type="text" tabIndex={-1} autoComplete="off" value={values.company} onChange={set('company')} />
        </div>

        <div className="sform__closing">
          <h3 className="sform__closing-title">{support.closing.heading}</h3>
          <p className="sform__closing-text">{support.closing.text}</p>
          <button type="submit" className={`btn sform__submit${submitting ? ' is-busy' : ''}`} disabled={submitting} aria-busy={submitting}>
            {submitting ? 'Sending your details…' : support.closing.button}
            <span className="sform__spinner" aria-hidden="true" />
          </button>
          <p className="sform__privacy">We only use your details to get in touch about supporting FoodTech Insight.</p>
        </div>
      </form>
    </div>
  )
}

export default SupporterForm
