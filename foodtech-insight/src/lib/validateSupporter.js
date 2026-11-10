/** Validation rules for the "Become a Supporter" form (shared so they can be tested). */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export const initialValues = {
  fullName: '', email: '', phone: '', country: '',
  organization: '', position: '', website: '',
  preferences: [], otherPreference: '', purpose: '', involvement: [],
  company: '', // honeypot: real visitors never see or fill this
}

export function validate(v) {
  const errors = {}
  if (!v.fullName.trim()) errors.fullName = 'Please tell us your name.'
  if (!v.email.trim()) errors.email = 'Please add your email address.'
  else if (!EMAIL_RE.test(v.email.trim())) errors.email = 'That email address does not look right.'
  if (v.phone.trim() && (v.phone.replace(/\D/g, '').length < 7 || /[^\d\s()+-]/.test(v.phone))) {
    errors.phone = 'Please enter a valid phone or WhatsApp number.'
  }
  if (v.website.trim() && /\s/.test(v.website.trim())) errors.website = 'Links cannot contain spaces.'
  if (v.preferences.length === 0) errors.preferences = 'Choose at least one way you would like to support us.'
  if (v.preferences.includes('Other') && !v.otherPreference.trim()) errors.otherPreference = 'Tell us a little about what you have in mind.'
  if (v.purpose.length > 2000) errors.purpose = 'Please keep this under 2000 characters.'
  return errors
}

