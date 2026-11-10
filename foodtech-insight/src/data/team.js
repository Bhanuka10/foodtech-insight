// Source: FoodTech Insight, Volume 1, Issue 2 (August 2026), page 2.
export const chiefEditor = { name: 'Dr. Gayani I. Dias', role: 'Chief Editor' }

export const editorialBoard = [
  { name: 'Dr. Thilini C. Kananke', role: 'Editorial Board' },
  { name: 'Dr. D.A. Choshani K. Dalukdeniya', role: 'Editorial Board' },
  { name: 'Dr. R. Chamodini N. Thilakarathne', role: 'Editorial Board' },
  { name: 'Ms. K.K.M.G. Kavindya', role: 'Editorial Board' },
]

export const editorialAssistants = [
  { name: 'Mr. H.M.P.G.C.D. Bandara', role: 'President of SUFSTA' },
  { name: 'Mr. L.G.U.S. Dharmasiri', role: 'Magazine Designer' },
  { name: 'Mr. W.R.O. Karunarathna', role: 'Editor of SUFSTA' },
]

export const reviewers = [
  'Mrs. K.M. Somawathie',
  'Dr. W.S.M. Senevirathne',
  'Mr. M.C.N. Jayasooriya',
  'Dr. P.G.I. Dias',
  'Dr. D.A.C.K. Dalukdeniya',
  'Dr. R.C.N. Thilakarathna',
  'Mr. K.G.P.N. Bandara',
  'Ms. Malmi Wickramasinghe',
  'Ms. Narmada Weerakkody',
  'Ms. Samanthi Liyanage',
  'Ms. Sumudu Dehideniya',
]

/** "Dr. Gayani I. Dias" -> "GD"; "Ms. K.K.M.G. Kavindya" -> "KK" */
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
