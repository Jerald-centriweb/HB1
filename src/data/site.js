// Honey Badgers — single source of truth for all editable content.
// Everything a non-technical editor would change lives here (and maps 1:1 to
// a Storyblok schema later). Design/layout stays in the components.
// House style: plain, grounded New Zealand voice. No em dashes.

export const site = {
  brand: {
    name: 'HONEY BADGERS',
    tagline: 'PURE STRENGTH',
    email: 'hello@honeybadgers.co',
  },

  nav: [
    { label: 'THE RANGE', href: '#range' },
    { label: 'FURY', href: '#fury' },
    { label: 'QUALITY', href: '#quality' },
    { label: 'WHOLESALE', href: '#trade' },
  ],

  hero: {
    badge: 'PRODUCT OF NEW ZEALAND',
    titleTop: 'PURE STRENGTH.',
    titleBottom: 'PURE MĀNUKA.',
    sub: 'Real New Zealand Mānuka honey, independently graded for strength and traced all the way back to the hive. No fluff, just the good stuff.',
    ctaPrimary: { label: 'ENQUIRE TO BUY →', href: '#enquire' },
    ctaSecondary: { label: 'EXPLORE THE RANGE →', href: '#range' },
    badgeNum: '829+',
  },

  story: {
    eyebrow: 'WHERE IT COMES FROM',
    heading: 'Straight from the wild corners of New Zealand.',
    body: "Honey Badgers is a New Zealand owned brand. We work directly with beekeepers we know and trust, pulling honey from some of the most remote land in the country. Every batch is tested before it leaves us. What you get is honey we would happily put on our own table. Clean, natural Mānuka, an easy part of your everyday wellbeing.",
    stats: [
      { value: '100%', label: 'NEW ZEALAND SOURCED' },
      { value: '829+', label: 'PEAK CERTIFIED MGO' },
      { value: 'EVERY', label: 'BATCH TESTED' },
    ],
  },

  nz: {
    eyebrow: 'PROUDLY NEW ZEALAND OWNED',
    heading: 'Born in Aotearoa.',
    body: 'New Zealand owned and New Zealand made. Our Mānuka is single origin, drawn from the land around New Plymouth in the Taranaki region of Aotearoa and worked by local beekeepers who know this whenua well. This is honey with a home, and we are proud of where it comes from.',
    stamp: '100% NZ OWNED · MADE IN AOTEAROA',
    mapEyebrow: 'WHERE IT COMES FROM · NŌ HEA',
    mapHeading: 'Single origin, from New Plymouth.',
    mapBody: 'Every jar traces back to one place: the Mānuka country around New Plymouth, in the Taranaki region of Aotearoa. Single origin, fully traceable, from this whenua to your shelf.',
  },

  trust: [
    { n: '01', title: 'CERTIFIED STRENGTH', body: 'Independently graded and verified MGO. Not a guess.' },
    { n: '02', title: 'PURE NZ ORIGIN', body: 'Remote New Zealand land. No compromises on where it comes from.' },
    { n: '03', title: 'FULLY TRACEABLE', body: 'Every batch tracked from hive to jar.' },
    { n: '04', title: 'TESTED AND VERIFIED', body: 'Checked for purity and authenticity. Every time.' },
    { n: '05', title: 'REAL FLAVOUR', body: 'Bold, strong and full of it. This is proper Mānuka.' },
  ],

  range: {
    eyebrow: 'THE JARS · PRODUCT OF NEW ZEALAND',
    heading: 'PICK YOUR STRENGTH',
    sub: 'Four MGO grades, from easy going to properly serious. Tap a jar to take a look.',
    note: '250g jars · Bulk grades available',
    cta: { label: 'ENQUIRE TO BUY →', href: '#enquire' },
    products: [
      {
        num: '100+', name: 'EVERYDAY STRENGTH', img: '/assets/jar-100.png', level: 16, tag: 'EVERYDAY', peak: false,
        desc: 'A solid start. Smooth, mild and easy to make part of your daily wellbeing.',
      },
      {
        num: '263+', name: 'STRONGER', img: '/assets/jar-263.png', level: 38, tag: 'MID GRADE', peak: false,
        desc: 'A bit more grunt for when a gentle spoonful just does not cut it.',
      },
      {
        num: '514+', name: 'SERIOUSLY STRONG', img: '/assets/jar-514.png', level: 66, tag: 'HIGH GRADE', peak: false,
        desc: 'Proper Mānuka. For people who already know they want the real deal.',
      },
      {
        num: '829+', name: 'FULL STRENGTH', img: '/assets/jar-829.png', level: 100, tag: 'TOP GRADE', peak: true,
        desc: 'Our hardest hitter. Mānuka at the very top of the scale. That is it.',
      },
    ],
  },

  fury: {
    badge: 'NEW FROM HONEY BADGERS',
    title: 'FURY',
    tagline: 'MGO 514+ MĀNUKA. ONE SACHET.',
    body: 'MGO 514+ Mānuka honey in a single serve sachet. Tear it, squeeze it, go. Throw it in a bag, take it to the gym, stick it in your pocket. The same honey as the jar, just ready when you are.',
    img: '/assets/fury-carton.png',
    badgeCount: '15',
    badgeLabel: 'SACHETS<br>PER BOX',
    stats: [
      { k: '514+', v: 'High grade certified MGO.' },
      { k: 'DAILY', v: 'Drops straight into your routine.' },
      { k: 'FUEL', v: 'Before, during or after a session.' },
    ],
    tags: ['PRE-WORKOUT', 'POST-WORKOUT', 'TRAVEL', 'GYM BAG', 'OUTDOORS'],
    cta: { label: 'EXPLORE FURY →', href: '#enquire' },
    note: '15 × 15g sachets · Net 225g · 100% NZ Mānuka',
  },

  compare: {
    heading: 'TWO WAYS TO TAKE YOUR MĀNUKA',
    sub: 'The jar lives in your kitchen. The sachet goes with you.',
    cards: [
      {
        title: 'THE JAR', subtitle: 'FOR HOME', img: '/assets/jar-829.png', accent: false,
        rows: [
          { k: 'Strength', v: 'MGO 100+ to 829+' },
          { k: 'Format', v: '250g / 500g jar' },
          { k: 'Best for', v: 'Home and everyday' },
          { k: 'Use', v: 'A spoonful a day' },
        ],
      },
      {
        title: 'FURY SACHET', subtitle: 'FOR ON THE GO', img: '/assets/fury-sachet.png', accent: true,
        rows: [
          { k: 'Strength', v: 'MGO 514+' },
          { k: 'Format', v: '15 × 15g sachets' },
          { k: 'Best for', v: 'Gym, travel, work' },
          { k: 'Use', v: 'Wherever you end up' },
        ],
      },
    ],
  },

  quality: {
    eyebrow: 'TESTED AND TRACEABLE',
    heading: 'EVERY BATCH IS TESTED<br>BEFORE IT SHIPS.',
    body: 'Before anything leaves us, it is independently tested for purity, authenticity and MGO strength. Every jar traces back to the batch and the hive it came from. We do not ship anything we would not eat ourselves. Pure Mānuka honey, naturally rich and exactly the way nature made it.',
    steps: [
      { n: '01', title: 'HIVE', desc: 'Remote NZ apiaries' },
      { n: '02', title: 'HARVEST', desc: 'Single origin batches' },
      { n: '03', title: 'TESTED', desc: 'Independent lab MGO' },
      { n: '04', title: 'PACKED', desc: 'Sealed in New Zealand' },
      { n: '05', title: 'SHIPPED', desc: 'Fully documented' },
    ],
    certs: [
      { mark: 'MGO', title: 'CERTIFIED MGO', desc: 'Independently graded strength' },
      { mark: 'HACCP', title: 'FOOD SAFE', desc: 'HACCP based controls' },
      { mark: 'RMP', title: 'RMP ASSURED', desc: 'Risk managed programme' },
      { mark: 'NZ', title: 'NEW ZEALAND MADE', desc: 'Sourced and packed in NZ' },
    ],
  },

  trade: {
    eyebrow: 'WHOLESALE & EXPORT',
    heading: 'FROM NEW ZEALAND<br>TO THE WORLD.',
    body: 'We get Mānuka honey to partners around the world. Retail ready, bulk, or under your own label. We keep it simple and we keep it moving.',
    supply: [
      'International importers',
      'Supermarket groups',
      'Health and wellness retailers',
      'Pharmacies',
      'Distributors',
      'E-commerce businesses',
      'Private label partners',
    ],
    offer: [
      'Retail ready branded jars',
      'Bulk supply',
      'Private label',
      'Packaging to suit you',
      'Steady, reliable supply',
      'Help with export paperwork',
    ],
    cta: { label: 'WHOLESALE & EXPORT ENQUIRIES →', href: '#enquire' },
  },

  finalCta: {
    titleTop: 'NEW ZEALAND',
    titleBottom: 'MĀNUKA WITH BITE.',
    body: "Want Honey Badgers on your shelf, in your pantry, or in your market? Tell us what you need and we will get back to you fast.",
    buttons: [
      { label: 'ENQUIRE TO BUY →', href: '#enquire', variant: 'solid' },
      { label: 'BECOME A STOCKIST', href: '#trade', variant: 'outline' },
      { label: 'WHERE TO BUY', href: 'mailto:hello@honeybadgers.co', variant: 'plain' },
    ],
  },

  footer: {
    links: [
      { label: 'THE RANGE', href: '#range' },
      { label: 'FURY', href: '#fury' },
      { label: 'QUALITY', href: '#quality' },
      { label: 'WHOLESALE', href: '#trade' },
      { label: 'CONTACT', href: '#enquire' },
    ],
    proud: 'Proudly New Zealand owned · Made in Aotearoa',
    copyright: '© 2026 Honey Badgers International · Product of New Zealand',
    disclaimer: 'Independently tested and certified · Not intended to diagnose, treat or cure any disease.',
  },

  modal: {
    eyebrow: 'ENQUIRE TO BUY',
    heading: "Tell us what you're after.",
    body: 'A single jar, the full range, FURY sachets, or a wholesale order. Let us know and we will come back to you quickly.',
    placeholderName: 'Your name',
    placeholderEmail: 'Email',
    products: [
      'General enquiry',
      'MGO 100+ jar',
      'MGO 263+ jar',
      'MGO 514+ jar',
      'MGO 829+ jar',
      'FURY sachets',
      'Wholesale / bulk',
    ],
    roles: [
      "I'm a consumer",
      'Stockist / retailer',
      'Wholesale / distributor',
      'International buyer / export',
      'Private label partner',
    ],
    placeholderMessage: 'What are you after? (e.g. MGO 829+ jars, FURY sachets, bulk supply)',
    submitLabel: 'SEND ENQUIRY →',
    emailNote: 'or email us directly at hello@honeybadgers.co',
  },
};
