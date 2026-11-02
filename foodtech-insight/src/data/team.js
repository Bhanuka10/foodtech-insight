// Source: FoodTech Insight, Volume 1, Issue 2 (August 2026), page 2.
export const chiefEditor = { name: 'Dr. Gayani I. Dias', role: 'Chief Editor' }

export const editorialBoard = [
  { name: 'Dr. Thilini C. Kananke', role: 'Editorial Board' },
  { name: 'Dr. D.A. Choshani K. Dalukdeniya', role: 'Editorial Board' },
  { name: 'Dr. R. Chamodini N. Thilakarathne', role: 'Editorial Board' },
  { name: 'Ms. K.K.G.M. Kavindya', role: 'Editorial Board' },
]

export const editorialAssistants = [
  { name: 'Mr. H.M.P.G.C.D. Bandara', role: 'Editorial Assistant' },
  { name: 'Mr. L.G.U.S. Dharmasiri', role: 'Editorial Assistant' },
]

export const reviewers = [
  'Dr. W.S.M. Senevirathne',
  'Dr. R.C.N. Thilakarathna',
  'Dr. D.A.C.K. Dalukdeniya',
  'Dr. P.G.I. Dias',
  'Mr. M.C.N. Jayasooriya',
  'Mrs. K.M. Somawathie',
  'Mr. K.G.P.N. Bandara',
  'Ms. Malmi Wickramasinghe',
  'Ms. Narmada Weerakkody',
  'Ms. Samanthi Liyanage',
  'Ms. Sumudu Dehideniya',
]

/** "Dr. Gayani I. Dias" -> "GD"; "Ms. K.K.G.M. Kavindya" -> "KK" */
export function initials(name) {
  const parts = name
    .replace(/^(Dr|Mr|Mrs|Ms|Prof)\.\s*/i, '')
    .split(/\s+/)
    .filter(Boolean)
  if (parts.length === 0) return '?'
  const first = parts[0].replace(/\./g, '')[0] ?? ''
  const last = parts[parts.length - 1][0] ?? ''
  return (first + last).toUpperCase()
}
