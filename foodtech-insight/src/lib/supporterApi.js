/**
 * Sends "Become a Supporter" submissions to the Google Apps Script web app
 * that appends them to the magazine's Google Sheet (see google-apps-script/).
 */
import { support } from '../data/support.js'

const ENDPOINT = (support.endpoint || import.meta.env.VITE_SUPPORT_ENDPOINT || '').trim()
const STORAGE_KEY = 'ftinsight.supporter.submissions'
const DUPLICATE_WINDOW_MS = 24 * 60 * 60 * 1000
const TIMEOUT_MS = 25000

export class SubmissionError extends Error {
  constructor(code, message) {
    super(message)
    this.name = 'SubmissionError'
    this.code = code
  }
}

export function makeSubmissionId(date = new Date()) {
  const stamp = date.toISOString().slice(0, 10).replace(/-/g, '')
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `SUP-${stamp}-${rand}`
}

const recentKey = (email, category) => `${email.trim().toLowerCase()}|${category}`

function readRecent() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {} } catch { return {} }
}
export function wasRecentlySubmitted(email, category) {
  const at = readRecent()[recentKey(email, category)]
  return Boolean(at) && Date.now() - at < DUPLICATE_WINDOW_MS
}
function remember(email, category) {
  const recent = readRecent()
  recent[recentKey(email, category)] = Date.now()
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(recent)) } catch { /* storage unavailable */ }
}

const clean = (v) => String(v ?? '').trim()

/** Flattens the form state into the exact row stored in the sheet. */
export function buildRecord(form, now = new Date()) {
  const preferences = [...(form.preferences || [])]
  const otherIdx = preferences.indexOf('Other')
  if (otherIdx !== -1 && clean(form.otherPreference)) preferences[otherIdx] = `Other: ${clean(form.otherPreference)}`
  return {
    submissionId: form.submissionId || makeSubmissionId(now),
    submittedAt: now.toISOString(),
    category: clean(form.category),
    fullName: clean(form.fullName),
    email: clean(form.email).toLowerCase(),
    phone: clean(form.phone),
    country: clean(form.country),
    organization: clean(form.organization),
    position: clean(form.position),
    website: clean(form.website),
    preferences: preferences.join('; '),
    purpose: clean(form.purpose),
    involvement: (form.involvement || []).join('; '),
    source: typeof location !== 'undefined' ? location.origin : '',
  }
}

async function post(record, mode) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    return await fetch(ENDPOINT, {
      method: 'POST',
      mode,
      redirect: 'follow',
      signal: controller.signal,
      // text/plain keeps this a "simple" request, so Apps Script needs no CORS preflight.
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(record),
    })
  } finally {
    clearTimeout(timer)
  }
}

export async function submitSupporter(form) {
  if (!ENDPOINT) {
    throw new SubmissionError('not-configured', 'Submissions are not set up yet. Please email us instead.')
  }
  if (wasRecentlySubmitted(form.email, form.category)) {
    throw new SubmissionError('duplicate', "We already have your details for this - thank you! We'll be in touch soon.")
  }

  const record = buildRecord(form)
  let result
  try {
    const res = await post(record, 'cors')
    if (!res.ok) throw new SubmissionError('server', `The server responded with status ${res.status}.`)
    result = await res.json()
  } catch (err) {
    if (err instanceof SubmissionError) throw err
    if (err?.name === 'AbortError') throw new SubmissionError('timeout', 'The request timed out. Please check your connection and try again.')
    // The browser blocked us from reading the response (CORS). Apps Script still
    // accepts opaque requests, and the script ignores repeats of the same ID.
    try {
      await post(record, 'no-cors')
      result = { status: 'ok', unverified: true }
    } catch {
      throw new SubmissionError('network', "We couldn't reach the server. Please check your connection and try again.")
    }
  }

  if (result.status === 'duplicate') {
    remember(form.email, form.category)
    throw new SubmissionError('duplicate', result.message || "We already have your details for this - thank you! We'll be in touch soon.")
  }
  if (result.status !== 'ok') {
    throw new SubmissionError('server', result.message || 'The submission was not accepted. Please try again.')
  }
  remember(form.email, form.category)
  return { id: record.submissionId, unverified: Boolean(result.unverified) }
}
