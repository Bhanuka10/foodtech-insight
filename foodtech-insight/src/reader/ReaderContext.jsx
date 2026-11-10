import { useCallback, useMemo, useState } from 'react'
import { ReaderContext } from './readerContext.js'

/**
 * Holds the open/closed state of the in-page magazine reader so any section
 * (Contents, Team index, …) can open the PDF at a given page.
 * `session` increments on every open so the reader remounts at the new page.
 */
export function ReaderProvider({ children }) {
  const [state, setState] = useState({ open: false, page: 1, title: '', session: 0 })

  const openReader = useCallback((page, title = '') => {
    setState((s) => ({ open: true, page: Math.max(1, Number(page) || 1), title, session: s.session + 1 }))
  }, [])
  const closeReader = useCallback(() => setState((s) => ({ ...s, open: false })), [])

  const value = useMemo(() => ({ ...state, openReader, closeReader }), [state, openReader, closeReader])
  return <ReaderContext.Provider value={value}>{children}</ReaderContext.Provider>
}
