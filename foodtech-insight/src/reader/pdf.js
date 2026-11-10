import { magazine } from '../data/magazine.js'

let docPromise = null

/**
 * Loads PDF.js on demand (keeps it out of the main bundle) and opens the
 * magazine once; subsequent calls reuse the same document.
 */
export function loadMagazine() {
  if (!docPromise) {
    docPromise = import('pdfjs-dist').then((pdfjs) => {
      pdfjs.GlobalWorkerOptions.workerSrc = new URL(
        'pdfjs-dist/build/pdf.worker.min.mjs',
        import.meta.url,
      ).href
      return pdfjs.getDocument({
        url: magazine.pdf,
        // Fetch pages on demand instead of the whole 25 MB file up front.
        rangeChunkSize: 262144,
        disableAutoFetch: true,
      }).promise
    })
    docPromise.catch(() => { docPromise = null })
  }
  return docPromise
}
