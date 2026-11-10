const paths = {
  coffee: (
    <>
      <path d="M4.5 8.5h11v5.5a4 4 0 0 1-4 4h-3a4 4 0 0 1-4-4z" />
      <path d="M15.5 10.5h1.5a2.25 2.25 0 0 1 0 4.5h-1.5" />
      <path d="M8 3.5c0 1.3 1 1.5 1 2.8M11.5 3.5c0 1.3 1 1.5 1 2.8" />
      <path d="M3.5 21h13" />
    </>
  ),
  heart: (
    <path d="M12 20.3s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.6a4.3 4.3 0 0 1 7.5 2.5c0 5.6-7.5 10.2-7.5 10.2z" />
  ),
  handshake: (
    <>
      <path d="M2.5 9.5 6 6.5h4.2l2.8 2.4-3.2 3a1.5 1.5 0 0 0 2 2.2L16 10.3" />
      <path d="M21.5 9.5 18 6.5h-4" />
      <path d="M6 12.8l3.4 3.3a1.5 1.5 0 0 0 2.1 0" />
      <path d="M8.6 15.4l1.4 1.4a1.5 1.5 0 0 0 2.1 0" />
      <path d="M21.5 9.5 16.4 14.6" />
    </>
  ),
  megaphone: (
    <>
      <path d="M3 10.5v3a1 1 0 0 0 1 1h3l8 4.5v-14L7 9.5H4a1 1 0 0 0-1 1z" />
      <path d="M18 9.5a3.2 3.2 0 0 1 0 5" />
      <path d="M7 14.5l1 5h2.5" />
    </>
  ),
  sparkle: (
    <>
      <path d="M11 3.5l1.9 5.1 5.1 1.9-5.1 1.9L11 17.5l-1.9-5.1L4 10.5l5.1-1.9z" />
      <path d="M18.5 16.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z" />
    </>
  ),
  pen: (
    <>
      <path d="M4 20l4.2-1L19.2 8a2.1 2.1 0 0 0-3-3L5.1 15.8z" />
      <path d="M14 7.2l2.9 2.9" />
      <path d="M4 20l1.1-4.2" />
    </>
  ),
}

export function OptionIcon({ name }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  )
}

export const ArrowIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
    <path d="M2 8h11M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const CheckIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <path d="M3 8.5l3.2 3L13 4.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
