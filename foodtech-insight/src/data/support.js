// Copy and options for the "Become a Supporter" section.
export const support = {
  eyebrow: 'Become a Supporter',
  headline: ['Be Part of Something', 'Worth Sharing.'],
  intro:
    'Every great story begins with a vision, but it takes a community to bring that vision to life. Your support helps us celebrate creativity, share fresh perspectives, empower new voices, and create a magazine that inspires people.',
  // Paste the Google Apps Script "Web app URL" (ends in /exec) here once it is
  // deployed - see google-apps-script/README.md. VITE_SUPPORT_ENDPOINT also works.
  endpoint: 'https://script.google.com/macros/s/AKfycbynwQGQ2i5fkv9ZvdnCoFmPaKf6zxzMP79BAyftws5TlgoHJSpz3qAUAt7ozCz8PJHv/exec',
  options: [
    {
      id: 'coffee', icon: 'coffee', title: 'Buy Us a Coffee',
      description:
        'A small gesture that keeps late editing nights, layout sessions and review rounds going. Tell us a little about yourself and our editorial team will reach out personally.',
      cta: 'Buy us a coffee', featured: true,
    },
  ],
  preferences: [
    'Financially support our magazine',
    'Support our creative initiatives',
    'Help us reach a wider audience',
    'Support independent journalism and storytelling',
    'Promote creativity and emerging talent',
    'Become a long-term community supporter',
    'Other',
  ],
  purpose: {
    heading: "What's Your Purpose Behind Supporting Us?",
    description:
      "Every supporter has a reason to believe in something meaningful. We'd love to know what inspires you to support our magazine. Whether it's a passion for creativity, a belief in new voices, a desire to make a difference, or simply a love for great stories, share your thoughts with us. Tell us what brings you here and how you'd like to be part of our journey.",
    placeholder: "Share your thoughts, inspiration, ideas, or the reason you'd love to support our magazine...",
  },
  involvement: {
    heading: 'How Would You Like to Be Part of Our Journey?',
    options: [
      'Stay updated with our latest publications',
      'Participate in magazine events and activities',
      'Share ideas and creative opportunities',
      'Support future magazine editions',
      'Explore long-term partnerships',
      'Be part of our creative community',
    ],
  },
  closing: {
    heading: 'Together, We Can Make Every Story Count.',
    text:
      "Your support means more than you know. Thank you for believing in our vision and helping us bring meaningful stories to life. We're excited to have you as part of our journey.",
    button: "Count Me In – Let's Make an Impact!",
  },
  success: {
    heading: "You're Now Part of Our Story!",
    text:
      "Thank you for supporting our magazine. Your interest means a lot to us, and we're looking forward to growing this creative journey together.",
  },
}
