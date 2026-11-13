import { magazine } from '../data/magazine.js'

let docPromise = null

/**
 * Loads PDF.js on demand (keeps it out of the main bundle) and opens the
 * magazine once; subsequent calls reuse the same document.
 *
 * Uses the "legacy" build on purpose: the default build relies on very new
 * JavaScript features and fails on many Android browsers (older Chrome,
 * Samsung Internet, in-app webviews). The legacy build bundles polyfills.
 */
export function loadMagazine() {
  if (!docPromise) {
    docPromise = import('pdfjs-dist/legacy/build/pdf.mjs').then((pdfjs) => {
      pdfjs.GlobalWorkerOptions.workerSrc = new URL(
        'pdfjs-dist/legacy/build/pdf.worker.min.mjs',
        import.meta.url,
      ).href
      return pdfjs.getDocument({
        url: magazine.pdf,
        // Fetch pages on demand instead of the whole 26 MB file up front.
        rangeChunkSize: 262144,
        disableAutoFetch: true,
      }).promise
    })
    docPromise.catch(() => { docPromise = null })
  }
  return docPromise
}
