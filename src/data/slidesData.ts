import { SlideData } from '../types';

export const SLIDES_DATA: SlideData[] = [
  // Slide 1: Cover
  {
    id: 1,
    category: 'cover',
    title: 'MONDAY PRESENTATION',
    subtitle: 'THE PSYCHOLOGY & CULTURAL POWER OF COLORS',
    colorHex: '#0F172A',
    keywords: ['PERCEPTION', 'COGNITION', 'CULTURE', 'MARKETING TRIVIA'],
    metrics: [
      { label: 'Snap Judgments', value: '90%', subtext: 'of initial product impressions are based on color alone (CCIC Study)' },
      { label: 'Brand Recognition', value: '+80%', subtext: 'increase in consumer recall with distinctive brand palette (Loyola Study)' },
    ],
    takeaway: 'Color is not merely aesthetic ornamentation — it is biological, neurological, and culturally communicative.',
    speakerNotes: 'Good morning everyone! Welcome to today’s presentation. Color is one of the most immediate, powerful, yet subconscious forms of communication on Earth. In the next 20 minutes, we are going to explore how colors physically alter our biology, examine the three foundational primary colors, uncover how global cultures interpret the exact same hue in diametrically opposed ways, and conclude with an interactive "Fake or Real" science trivia session.',
    transition: 'fade',
    animations: [
      { targetId: 'cover-title', type: 'fly-in-down', delay: 0.1, duration: 0.6 },
      { targetId: 'cover-subtitle', type: 'fly-in-up', delay: 0.3, duration: 0.6 },
      { targetId: 'cover-tags', type: 'pop', delay: 0.5, duration: 0.5 },
      { targetId: 'cover-splatters', type: 'fade-in', delay: 0.2, duration: 0.8 },
    ],
  },

  // Slide 2: Agenda / Executive Roadmap
  {
    id: 2,
    category: 'agenda',
    title: 'PRESENTATION OUTLINE',
    subtitle: 'Executive Agenda & Core Learning Objectives',
    colorHex: '#0F172A',
    bullets: [
      '01. Colors in Our Lives — The subconscious neurology of human sight and snap perception.',
      '02. The Primary Spectrum — Deep dive into the biological and commercial impact of Red, Blue, and Yellow.',
      '03. Cross-Cultural Symbolism — How geography and heritage radically reverse color meanings (West, Asia, Africa, Middle East).',
      '04. Interactive Color Trivia — A fast-paced "Fake or Real?" challenge on infant retinas, optics, and history.',
    ],
    metrics: [
      { label: 'Modules', value: '4 Pillars', subtext: 'Foundations, Biology, Culture & Science' },
      { label: 'Target Runtime', value: '18–22 Min', subtext: 'Including active audience quiz' },
    ],
    speakerNotes: 'Here is our roadmap for today. We will move through 4 cohesive modules: starting with how color operates as a silent cognitive shortcut, dissecting our three primary pillars, examining real cross-cultural marketing risks, and finally testing your knowledge with 4 fascinating interactive questions.',
    transition: 'slide-left',
    animations: [
      { targetId: 'agenda-title', type: 'fly-in-left', delay: 0.1, duration: 0.5 },
      { targetId: 'agenda-item-0', type: 'fly-in-right', delay: 0.2, duration: 0.5 },
      { targetId: 'agenda-item-1', type: 'fly-in-right', delay: 0.35, duration: 0.5 },
      { targetId: 'agenda-item-2', type: 'fly-in-right', delay: 0.5, duration: 0.5 },
      { targetId: 'agenda-item-3', type: 'fly-in-right', delay: 0.65, duration: 0.5 },
    ],
  },

  // Slide 3: Chapter 01 - Divider
  {
    id: 3,
    category: 'section',
    title: 'COLORS IN OUR LIVES',
    subtitle: 'Chapter 01 — Neurological Pathways & Subconscious Impact',
    colorHex: '#000000',
    takeaway: '"Color does not wait for cognitive reasoning; it hits the autonomic nervous system within 100 milliseconds."',
    speakerNotes: 'Let us begin with Chapter 1: Colors in Our Lives. When visible light hits the photoreceptors in your retina, the signals do not just travel to the visual cortex. They also route directly to the hypothalamus and amygdala, dictating hormone release, appetite, pulse rate, and alertness before you even finish forming a rational thought.',
    transition: 'zoom',
    animations: [
      { targetId: 'sec-badge', type: 'pop', delay: 0.1, duration: 0.4 },
      { targetId: 'sec-title', type: 'zoom-in', delay: 0.2, duration: 0.7 },
      { targetId: 'sec-decor', type: 'fade-in', delay: 0.4, duration: 0.6 },
    ],
  },

  // Slide 4: Primary Overview
  {
    id: 4,
    category: 'primary-overview',
    title: 'THE PRIMARY TRIAD',
    subtitle: 'The foundational building blocks of human color perception',
    colorHex: '#0F172A',
    keywords: ['RED (620–750 nm)', 'BLUE (450–495 nm)', 'YELLOW (570–590 nm)'],
    bullets: [
      'Red: The evolutionary trigger of urgency, adrenaline, high stakes, and primal appetite.',
      'Blue: The psychological sanctuary of calm, mental stability, corporate security, and dependable trust.',
      'Yellow: The maximum luminous spectrum of warmth, spontaneous peripheral capture, and mental sharpness.',
    ],
    scientificCitation: 'Trichromatic Vision Theory (Young-Helmholtz): S, M, and L retinal cones process the visual spectrum.',
    speakerNotes: 'All chromatic emotion originates from these three primary wavelengths. Red has the longest visible wave; blue has short, high-frequency cycles; yellow strikes the exact midpoint where human photopic sensitivity peaks. Marketers, architects, and product designers harness these biological realities every single day.',
    transition: 'slide-left',
    animations: [
      { targetId: 'prim-title', type: 'fly-in-down', delay: 0.1, duration: 0.5 },
      { targetId: 'swatch-red', type: 'bounce-in', delay: 0.25, duration: 0.5 },
      { targetId: 'swatch-blue', type: 'bounce-in', delay: 0.45, duration: 0.5 },
      { targetId: 'swatch-yellow', type: 'bounce-in', delay: 0.65, duration: 0.5 },
    ],
  },

  // Slide 5: RED Deep Dive
  {
    id: 5,
    category: 'primary-detail',
    title: 'RED',
    colorHex: '#DC2626',
    wavelengthNm: '620 – 750 nm',
    keywords: ['adrenaline', 'appetite acceleration', 'urgency', 'dominance'],
    bullets: [
      'Physiological Trigger: Elevates heart rate, blood pressure, and stimulates the release of adrenaline.',
      'The "Appetite Accelerator": Stimulates metabolism and salivary glands — the hallmark of global quick-service restaurants.',
      'High-Stakes Urgency: Demands immediate cognitive priority for emergency vehicles, brake lights, clearance sales, and high-conversion CTA buttons.',
    ],
    metrics: [
      { label: 'CTA Conversion', value: '+21%', subtext: 'Higher click-through in red vs green button A/B tests (HubSpot)' },
      { label: 'Heart Rate', value: 'Elevated', subtext: 'Stimulates autonomic sympathetic nervous system' },
    ],
    brandExamples: ['Coca-Cola', 'Netflix', 'Ferrari', 'Target', 'McDonald’s', 'YouTube'],
    takeaway: 'Use Red when you need immediate decision-making, excitement, or visceral hunger. Avoid overusing in detailed reading environments.',
    speakerNotes: 'Let’s start with Red. Red possesses the longest visible wavelength. Physiologically, exposure to red actually increases blood pressure and respiratory rates. That is why fast food titans like McDonald’s, KFC, and Coca-Cola rely on it — red accelerates appetite and drives impulsive decision-making.',
    transition: 'fade',
    animations: [
      { targetId: 'color-head', type: 'zoom-in', delay: 0.1, duration: 0.5 },
      { targetId: 'keyword-0', type: 'fly-in-left', delay: 0.25, duration: 0.5 },
      { targetId: 'keyword-1', type: 'fly-in-right', delay: 0.4, duration: 0.5 },
      { targetId: 'card-details', type: 'fly-in-up', delay: 0.55, duration: 0.5 },
    ],
  },

  // Slide 6: BLUE Deep Dive
  {
    id: 6,
    category: 'primary-detail',
    title: 'BLUE',
    colorHex: '#1D4ED8',
    wavelengthNm: '450 – 495 nm',
    keywords: ['calm tranquility', 'corporate security', 'intellect', 'stability'],
    bullets: [
      'Physiological Equilibrium: Lowers pulse rate, reduces body temperature, and promotes calm alpha brainwave states.',
      'The Corporate Anchor: Emits dependability and institutional integrity — chosen by 33% of the world’s top 100 global brands.',
      'Natural Appetite Suppressant: Seldom found in organic edible vegetation; signals safety and thirst-quenching hydration rather than hunger.',
    ],
    metrics: [
      { label: 'Global Brands', value: '33%', subtext: 'of Fortune 500 companies feature blue as primary corporate identity' },
      { label: 'Top Preference', value: '#1', subtext: 'Universally chosen as humanity’s favorite color across all continents' },
    ],
    brandExamples: ['IBM', 'Intel', 'Samsung', 'PayPal', 'Chase Bank', 'LinkedIn', 'American Express'],
    takeaway: 'Deploy Blue to foster long-term loyalty, user confidence, and calm focused productivity.',
    speakerNotes: 'Blue does the exact biological opposite of red. It activates the parasympathetic nervous system, lowering pulse and relaxing muscles. Why do 33% of top global enterprises use blue? Because blue eliminates perceived risk. Financial giants like Chase and PayPal and tech innovators like IBM and LinkedIn rely on blue to convey unshakeable reliability.',
    transition: 'fade',
    animations: [
      { targetId: 'color-head', type: 'zoom-in', delay: 0.1, duration: 0.5 },
      { targetId: 'keyword-0', type: 'fly-in-left', delay: 0.25, duration: 0.5 },
      { targetId: 'keyword-1', type: 'fly-in-right', delay: 0.4, duration: 0.5 },
      { targetId: 'card-details', type: 'fly-in-up', delay: 0.55, duration: 0.5 },
    ],
  },

  // Slide 7: YELLOW Deep Dive
  {
    id: 7,
    category: 'primary-detail',
    title: 'YELLOW',
    colorHex: '#D97706',
    wavelengthNm: '570 – 590 nm',
    keywords: ['luminous energy', 'peripheral capture', 'optimism', 'mental acuity'],
    bullets: [
      'Maximum Optical Visibility: Captured by human peripheral rod and cone cells 1.24x faster than any other chromatic color.',
      'The Spark of Optimism: Releases serotonin in moderate doses, triggering creative dopamine pathways and cheerfulness.',
      'High-Alert Contrast: Paired with black or red to signal danger, construction hazards, high-visibility crosswalks, and school buses.',
    ],
    metrics: [
      { label: 'Peripheral Speed', value: '1.24x', subtext: 'Faster recognition in peripheral vision than red or green' },
      { label: 'Wavelength Peak', value: '555 nm', subtext: 'Closest to peak human photopic eye sensitivity under daylight' },
    ],
    brandExamples: ['IKEA', 'Ferrari', 'Snapchat', 'CAT', 'National Geographic', 'Bic'],
    takeaway: 'Yellow is the ultimate attention magnet. Use as high-contrast accents or warning calls; avoid dense wall-to-wall text backgrounds.',
    speakerNotes: 'Now look at Yellow. Yellow is optically luminous. Because it falls precisely where our human daylight eye sensitivity peaks, our peripheral vision detects yellow faster than any other hue. That is why school buses and caution signs across the globe are painted yellow. Paired with blue or black, it cuts through visual noise with razor sharpness.',
    transition: 'fade',
    animations: [
      { targetId: 'color-head', type: 'zoom-in', delay: 0.1, duration: 0.5 },
      { targetId: 'keyword-0', type: 'fly-in-left', delay: 0.25, duration: 0.5 },
      { targetId: 'keyword-1', type: 'fly-in-right', delay: 0.4, duration: 0.5 },
      { targetId: 'card-details', type: 'fly-in-up', delay: 0.55, duration: 0.5 },
    ],
  },

  // Slide 8: Chapter 02 - Divider
  {
    id: 8,
    category: 'section',
    title: 'COLORS ACROSS CULTURES',
    subtitle: 'Chapter 02 — Same Hue, Opposite Meanings Across the Globe',
    colorHex: '#000000',
    takeaway: '"Color has no intrinsic human meaning until culture breathes history, ritual, and geography into it."',
    speakerNotes: 'Now we step into Chapter 2: Colors Across Cultures. Biology gives us shared optical hardware, but human history, religion, and geography overlay dramatically different software. A color that radiates joyful celebration in London can signify profound grief or ill fortune in Tokyo or Cairo.',
    transition: 'zoom',
    animations: [
      { targetId: 'sec-badge', type: 'pop', delay: 0.1, duration: 0.4 },
      { targetId: 'sec-title', type: 'zoom-in', delay: 0.2, duration: 0.7 },
      { targetId: 'sec-decor', type: 'fade-in', delay: 0.4, duration: 0.6 },
    ],
  },

  // Slide 9: Culture Comparison - WHITE
  {
    id: 9,
    category: 'culture-compare',
    title: 'WHITE',
    colorHex: '#334155',
    cultureItems: [
      {
        region: 'WESTERN CULTURE',
        meaning: 'Purity, Joy & Celebration',
        details: 'The universal attire of bridal elegance, fresh beginnings, peace treaties (white dove/flag), and sterile hospital wellness.',
        iconName: 'Sparkles',
      },
      {
        region: 'EAST ASIAN TRADITION',
        meaning: 'Mourning, Funerals & Reincarnation',
        details: 'Worn during funeral rites in China, Japan, and Korea. Symbolizes departure to the spirit world; gifting white flowers or wrapping gifts in plain white is considered deeply taboo.',
        iconName: 'Moon',
      },
    ],
    takeaway: 'Global Marketing Case: A major American tech brand failed an East Asian product rollout when they packaged launch devices in stark white gift boxes resembling bereavement envelopes.',
    speakerNotes: 'Look at White. In the West, white signifies marriage, innocence, and celebration. Yet throughout China, Japan, and Korea, white has historically been the color of funerals and mourning. Gifting white flowers in Japan is an insult associated with grief. Global marketers must know this difference.',
    transition: 'slide-left',
    animations: [
      { targetId: 'cult-title', type: 'fly-in-down', delay: 0.1, duration: 0.5 },
      { targetId: 'cult-card-0', type: 'fly-in-left', delay: 0.25, duration: 0.5 },
      { targetId: 'cult-card-1', type: 'fly-in-right', delay: 0.45, duration: 0.5 },
    ],
  },

  // Slide 10: Culture Comparison - BLACK
  {
    id: 10,
    category: 'culture-compare',
    title: 'BLACK',
    colorHex: '#0F172A',
    cultureItems: [
      {
        region: 'U.S. & WESTERN WORLD',
        meaning: 'Formality, Luxury & Executive Power',
        details: 'The hallmark of sleek corporate sophistication, black-tie galas, bespoke tuxedos, high-end perfume packaging, and authoritative minimalism.',
        iconName: 'ShieldCheck',
      },
      {
        region: 'AFRICAN TRADITIONS',
        meaning: 'Spiritual Maturity, Earth & Vitality',
        details: 'Revered in Ghana and Nigeria as symbolic of the rich fertile soil, ancestral grounding, spiritual adulthood, and masculine life force.',
        iconName: 'Zap',
      },
    ],
    takeaway: 'While Western narratives traditionally associated black with death or mourning, African art and textiles treat black as a vibrant representation of fertile earth and ancestral wisdom.',
    speakerNotes: 'Consider Black: in Western capitals, black is executive luxury, high-fashion, and formal prestige. In multiple West African traditions, black represents the fertile, life-giving soil and spiritual maturity of ancestors — a symbol of life force rather than darkness.',
    transition: 'slide-left',
    animations: [
      { targetId: 'cult-title', type: 'fly-in-down', delay: 0.1, duration: 0.5 },
      { targetId: 'cult-card-0', type: 'fly-in-left', delay: 0.25, duration: 0.5 },
      { targetId: 'cult-card-1', type: 'fly-in-right', delay: 0.45, duration: 0.5 },
    ],
  },

  // Slide 11: Culture Comparison - GREEN
  {
    id: 11,
    category: 'culture-compare',
    title: 'GREEN',
    colorHex: '#15803D',
    cultureItems: [
      {
        region: 'ISLAMIC TRADITION',
        meaning: 'Sacred Paradise (Jannah) & Serenity',
        details: 'The revered sacred color of Islam, symbolizing the lush verdant gardens of Paradise, divine life, spiritual oasis in desert topography, and peace.',
        iconName: 'Compass',
      },
      {
        region: 'IRISH HERITAGE',
        meaning: 'National Resilience, Emerald Isle & Luck',
        details: 'Deeply intertwined with the shamrock, St. Patrick’s historic lore, Celtic folklore, agricultural rolling hills, and enduring national pride.',
        iconName: 'Clover',
      },
    ],
    takeaway: 'In Islamic flags and mosques, green is treated with supreme sacred reverence, whereas in Western commerce it often signifies eco-sustainability, fresh organic products, or Wall Street money.',
    speakerNotes: 'And look at Green: in the Islamic world, green holds supreme sacred status as the color of Paradise and divine serenity, frequently described in the Quran. In Ireland, it is the emblem of independence, resilience, and the lush Emerald landscape.',
    transition: 'slide-left',
    animations: [
      { targetId: 'cult-title', type: 'fly-in-down', delay: 0.1, duration: 0.5 },
      { targetId: 'cult-card-0', type: 'fly-in-left', delay: 0.25, duration: 0.5 },
      { targetId: 'cult-card-1', type: 'fly-in-right', delay: 0.45, duration: 0.5 },
    ],
  },

  // Slide 12: Quiz Section Intro
  {
    id: 12,
    category: 'quiz-intro',
    title: 'FAKE  or  REAL',
    subtitle: 'Chapter 03 — Interactive Color Science & Optics Trivia',
    colorHex: '#16A34A',
    bullets: [
      'Put your intuition to the test across 4 fascinating questions covering retinal biology, infant optics, genetics, and historical sumptuary laws.',
      'Audience Participation: Cast your vote for REAL or FAKE before we unveil the empirical scientific evidence.',
    ],
    takeaway: 'Get ready: Click or call out your answer before each verdict is stamped!',
    speakerNotes: 'Now, let us put your intuition and scientific instincts to the test! We have 4 intriguing statements. Before I reveal the answer, I want everyone to vote: is it REAL or is it FAKE? Let’s begin with Question Number One!',
    transition: 'flip',
    animations: [
      { targetId: 'quiz-intro-title', type: 'zoom-in', delay: 0.1, duration: 0.6 },
      { targetId: 'quiz-intro-sub', type: 'fly-in-up', delay: 0.3, duration: 0.5 },
      { targetId: 'quiz-intro-badge', type: 'pop', delay: 0.5, duration: 0.4 },
    ],
  },

  // Slide 13: Quiz 01 - Question
  {
    id: 13,
    category: 'quiz-question',
    title: 'QUESTION 01',
    quiz: {
      questionNumber: '01',
      statement: 'The most universally popular color across the world is blue.',
      verdict: 'REAL',
    },
    colorHex: '#2563EB',
    speakerNotes: 'Statement One: "The most universally popular color across the world is blue." Does blue truly reign supreme across all continents, or is this an urban myth? Cast your vote!',
    transition: 'slide-left',
    animations: [
      { targetId: 'quiz-num', type: 'pop', delay: 0.1, duration: 0.4 },
      { targetId: 'quiz-stmt', type: 'fly-in-down', delay: 0.25, duration: 0.6 },
      { targetId: 'quiz-verdict', type: 'bounce-in', delay: 0.5, duration: 0.5 },
    ],
  },

  // Slide 14: Quiz 01 - Explanation
  {
    id: 14,
    category: 'quiz-answer',
    title: 'QUESTION 01: SCIENTIFIC VERDICT',
    subtitle: 'Why Blue Dominates Global Human Preference',
    bullets: [
      'Cross-Cultural Surveys: In a landmark 10-country study by YouGov, blue secured 35% to 44% of all first-choice votes across North America, Europe, Asia, and Latin America.',
      'Evolutionary Ecological Valence Theory (Palmer & Schloss, 2010): Humans are evolutionarily hardwired to favor colors linked with life-sustaining resources — clear daytime skies and clean, uncontaminated drinking water.',
      'Zero Disgust Associations: Unlike brown (decay) or greenish-yellow (bile/toxins), blue has virtually no negative biological survival associations.',
    ],
    metrics: [
      { label: 'Global Rank', value: '#1 Worldwide', subtext: 'In every single tested continent' },
      { label: 'Vote Share', value: '38–44%', subtext: 'Double that of the runner-up color' },
    ],
    colorHex: '#1D4ED8',
    takeaway: 'When designing for massive multi-cultural audiences where trust is paramount, blue is statistically the safest, most resonant chromatic anchor.',
    speakerNotes: 'It is REAL! Global survey after survey — from YouGov to academic psychological studies across 10 countries — proves blue is humanity’s undisputed favorite. Evolutionary biologists call this Ecological Valence: clean water and daylight skies mean safety and survival to the human brain.',
    transition: 'fade',
    animations: [
      { targetId: 'ans-why', type: 'pop', delay: 0.1, duration: 0.4 },
      { targetId: 'ans-box', type: 'fly-in-up', delay: 0.25, duration: 0.6 },
    ],
  },

  // Slide 15: Quiz 02 - Question
  {
    id: 15,
    category: 'quiz-question',
    title: 'QUESTION 02',
    quiz: {
      questionNumber: '02',
      statement: 'Yellow is the very first color a newborn baby can see.',
      verdict: 'FAKE',
    },
    colorHex: '#DC2626',
    speakerNotes: 'Statement Two: "Yellow is the very first color a newborn baby can see." Yellow is radiant and bright, but is it the first hue processed by infant cone cells? What do you think?',
    transition: 'slide-left',
    animations: [
      { targetId: 'quiz-num', type: 'pop', delay: 0.1, duration: 0.4 },
      { targetId: 'quiz-stmt', type: 'fly-in-down', delay: 0.25, duration: 0.6 },
      { targetId: 'quiz-verdict', type: 'bounce-in', delay: 0.5, duration: 0.5 },
    ],
  },

  // Slide 16: Quiz 02 - Explanation
  {
    id: 16,
    category: 'quiz-answer',
    title: 'QUESTION 02: SCIENTIFIC VERDICT',
    subtitle: 'The Optical Development of Infant Retinas',
    bullets: [
      'Infant Cone Maturation: Newborn retinas initially only distinguish high contrast (black, white, and gray luminance).',
      'The Long-Wavelength Advantage: Around week 4 to 8 after birth, Long-wavelength (L) retinal cones develop first. Because RED has the longest wavelength (~650–700 nm), red is the very first true color recognized by infants.',
      'S-Cones Mature Last: Blue (short wavelength) photoreceptors take up to 4 months to establish complete synaptic clarity in an infant’s visual cortex.',
    ],
    metrics: [
      { label: 'First Color', value: 'RED', subtext: 'Recognized at weeks 4–8 of life' },
      { label: 'Birth State', value: 'High Contrast', subtext: 'Distinguishes black, white, and grays' },
    ],
    colorHex: '#DC2626',
    takeaway: 'Pediatric designers know this well: high-contrast black-and-white graphics and bold red patterns stimulate early cognitive brain wiring faster than soft pastel yellows.',
    speakerNotes: 'This statement is FAKE! While yellow is high visibility for adult eyes, RED is actually the very first chromatic color an infant’s brain perceives. Because red has the longest wavelength, L-cone photoreceptors develop before the shorter-wavelength blue and yellow receptors.',
    transition: 'fade',
    animations: [
      { targetId: 'ans-why', type: 'pop', delay: 0.1, duration: 0.4 },
      { targetId: 'ans-box', type: 'fly-in-up', delay: 0.25, duration: 0.6 },
    ],
  },

  // Slide 17: Quiz 03 - Question
  {
    id: 17,
    category: 'quiz-question',
    title: 'QUESTION 03',
    quiz: {
      questionNumber: '03',
      statement: 'Women can genetically distinguish more shades of red than men.',
      verdict: 'REAL',
    },
    colorHex: '#BE123C',
    speakerNotes: 'Statement Three: "Women can genetically distinguish more shades of red than men." Is this an urban myth or verifiable genetics? Cast your vote!',
    transition: 'slide-left',
    animations: [
      { targetId: 'quiz-num', type: 'pop', delay: 0.1, duration: 0.4 },
      { targetId: 'quiz-stmt', type: 'fly-in-down', delay: 0.25, duration: 0.6 },
      { targetId: 'quiz-verdict', type: 'bounce-in', delay: 0.5, duration: 0.5 },
    ],
  },

  // Slide 18: Quiz 03 - Explanation
  {
    id: 18,
    category: 'quiz-answer',
    title: 'QUESTION 03: SCIENTIFIC VERDICT',
    subtitle: 'The Genetics of the OPN1LW Chromosome',
    bullets: [
      'X-Linked Chromosomal Genetics: The gene encoding the red photopigment opsin (OPN1LW) is located exclusively on the X chromosome.',
      'Two Copies vs. One: Women possess two X chromosomes (XX), allowing heterozygosity where two slightly different red-cone alleles can coexist, creating wider sensitivity to nuanced shades (crimson, burgundy, scarlet, coral).',
      'Tetrachromacy: Approximately 12% of women possess 4 distinct cone cell types instead of 3, allowing them to distinguish up to 100 million colors compared to the standard 1 million.',
    ],
    metrics: [
      { label: 'Gene Location', value: 'X Chromosome', subtext: 'Directly dictates red photopigment diversity' },
      { label: 'Tetrachromats', value: '~12% of Women', subtext: 'Can perceive up to 100M distinct color shades' },
    ],
    colorHex: '#BE123C',
    takeaway: 'Evolutionary anthropologists believe this adaptation helped female ancestral gatherers identify ripe berries, edible foliage, and subtle illness flushes in infants.',
    speakerNotes: 'It is 100% REAL! The OPN1LW gene responsible for the red cone photopigment sits squarely on the X chromosome. Because women have two X chromosomes, they can inherit variations of the red pigment gene, enabling extraordinary discrimination among subtle crimson, coral, and scarlet tones.',
    transition: 'fade',
    animations: [
      { targetId: 'ans-why', type: 'pop', delay: 0.1, duration: 0.4 },
      { targetId: 'ans-box', type: 'fly-in-up', delay: 0.25, duration: 0.6 },
    ],
  },

  // Slide 19: Quiz 04 - Question
  {
    id: 19,
    category: 'quiz-question',
    title: 'QUESTION 04',
    quiz: {
      questionNumber: '04',
      statement: 'Historically, wearing bright vibrant colors was legally restricted to royalty.',
      verdict: 'REAL',
    },
    colorHex: '#7C3AED',
    speakerNotes: 'Final Question: "Historically, wearing bright vibrant colors was legally restricted to royalty." Did governments truly enact laws forbidding ordinary citizens from dressing in vibrant colors?',
    transition: 'slide-left',
    animations: [
      { targetId: 'quiz-num', type: 'pop', delay: 0.1, duration: 0.4 },
      { targetId: 'quiz-stmt', type: 'fly-in-down', delay: 0.25, duration: 0.6 },
      { targetId: 'quiz-verdict', type: 'bounce-in', delay: 0.5, duration: 0.5 },
    ],
  },

  // Slide 20: Quiz 04 - Explanation
  {
    id: 20,
    category: 'quiz-answer',
    title: 'QUESTION 04: SCIENTIFIC VERDICT',
    subtitle: 'Sumptuary Laws & The Extravagant Economics of Dyes',
    bullets: [
      'Sumptuary Laws: From ancient Rome through Elizabethan England, strict sumptuary statutes made wearing vibrant purple, scarlet, and crimson a criminal offense punishable by imprisonment or heavy fines for non-aristocrats.',
      'Tyrian Purple: Required crushing over 10,000 predatory Bolinus brandaris sea snails to yield a single gram of dye — literally worth its weight in gold.',
      'Ultramarine Blue: Ground laboriously from imported lapis lazuli gemstones mined in the Badakhshan mountains of Afghanistan, reserved exclusively for the robes of the Virgin Mary and crowned emperors.',
    ],
    metrics: [
      { label: 'Production Cost', value: '10,000+ Snails', subtext: 'For 1 gram of ancient imperial Tyrian purple' },
      { label: 'Synthetic Shift', value: '1856 A.D.', subtext: 'William Perkin invents mauveine, democratizing color' },
    ],
    colorHex: '#7C3AED',
    takeaway: 'Before synthetic chemistry was discovered in 1856, color was the most visible, strictly enforced socioeconomic hierarchy badge in human civilization.',
    speakerNotes: 'It is REAL! Ancient Rome, feudal Japan, and Elizabethan England enforced strict Sumptuary Laws. Tyrian Purple required harvesting tens of thousands of sea snails for one garment, making it more expensive than gold. Anyone below an emperor caught wearing it was considered a criminal.',
    transition: 'fade',
    animations: [
      { targetId: 'ans-why', type: 'pop', delay: 0.1, duration: 0.4 },
      { targetId: 'ans-box', type: 'fly-in-up', delay: 0.25, duration: 0.6 },
    ],
  },

  // Slide 21: Conclusion & Strategy Matrix
  {
    id: 21,
    category: 'conclusion',
    title: 'THE STRATEGIC COLOR MATRIX',
    subtitle: 'Executive Summary & Key Presentation Takeaways',
    colorHex: '#0F172A',
    bullets: [
      'Biology Dictates Baseline Emotion: Red sparks adrenaline, Blue stabilizes trust, and Yellow commands optical speed.',
      'Culture Overrides Biology: Always cross-reference regional semiotics before launching global marketing campaigns.',
      'Purpose-Driven Palette: Never select brand or presentation colors by personal whim — match the hue directly to the desired neurological outcome.',
    ],
    metrics: [
      { label: 'Takeaway 1', value: 'Biology', subtext: 'Neurology responds in <100ms' },
      { label: 'Takeaway 2', value: 'Context', subtext: 'Respect global regional taboos' },
      { label: 'Takeaway 3', value: 'Strategy', subtext: 'Intentional chromatic hierarchy' },
    ],
    takeaway: 'Thank you for your attention! The floor is now open for questions and discussion.',
    speakerNotes: 'To wrap up: Color is not visual fluff — it is a biological, neurological, and cultural communication system. When you design, lead, or build, be deliberate with your palette. Thank you very much, and let’s open up the floor for any questions or observations!',
    transition: 'flip',
    animations: [
      { targetId: 'thanks-head', type: 'zoom-in', delay: 0.1, duration: 0.6 },
      { targetId: 'thanks-sub', type: 'fly-in-up', delay: 0.3, duration: 0.5 },
      { targetId: 'thanks-bullets', type: 'fly-in-up', delay: 0.5, duration: 0.6 },
    ],
  },
];
