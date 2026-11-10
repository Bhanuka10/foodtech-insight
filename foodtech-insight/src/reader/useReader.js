import { useCallback, useContext } from 'react'
import { ReaderContext } from './readerContext.js'

export function useReader() {
  const ctx = useContext(ReaderContext)
  if (!ctx) throw new Error('useReader must be used inside <ReaderProvider>')
  return ctx
}

/**
 * Returns an onClick factory that opens the reader at `page` instead of
 * following the `href`. Modified clicks (cmd/ctrl/shift/alt) are left alone
 * so "open in new tab" keeps working.
 */
export function useOpenArticle() {
  const { openReader } = useReader()
  return useCallback(
    (page, title) => (e) => {
      if (e.defaultPrevented || e.button !== 0) return
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      e.preventDefault()
      openReader(page, title)
    },
    [openReader],
  )
}
