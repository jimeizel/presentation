import { SlideData } from '../types';

export const SLIDES_DATA: SlideData[] = [
  // Slide 1: Guess the Color (Black & White - No Text)
  {
    id: 1,
    category: 'cover',
    title: 'Guess the Color',
    subtitle: 'Black & White',
    colorHex: '#676767',
    canvaImage: '/assets/canva/slide_01.png',
    speakerNotes: 'Good morning everyone! Take a close look at the screen. We have intentionally removed all text and color. Can anyone in the audience guess what color is on the left, and what color is on the right? Call out your guesses!',
    transition: 'fade',
    animations: [],
  },

  // Slide 2: What Do You Think About This Color? (Red & Blue - No Text)
  {
    id: 2,
    category: 'agenda',
    title: 'What Do You Think of This Color?',
    subtitle: 'Red & Blue Revealed',
    colorHex: '#FF1616',
    canvaImage: '/assets/canva/slide_02.png',
    speakerNotes: 'Here are the actual colors: Red on the left and Blue on the right! Now that you see them: What do you think about these colors? What emotions, feelings, or thoughts immediately come to your mind?',
    transition: 'slide-left',
    animations: [],
  },

  // Slide 3: Chapter 01 - Divider (Topic Revealed)
  {
    id: 3,
    category: 'section',
    title: 'COLORS IN OUR LIVES',
    colorHex: '#000000',
    canvaImage: '/assets/canva/slide_03.png',
    speakerNotes: 'That’s right! Today’s presentation is COLORS IN OUR LIVES: The Psychology & Cultural Power of Colors. Welcome everyone! Color operates as an immediate subconscious shortcut in our everyday environment, affecting our mood, behavior, and physiological responses.',
    transition: 'zoom',
    animations: [],
  },

  // Slide 4: Primary Colors Overview
  {
    id: 4,
    category: 'primary-overview',
    title: 'PRIMARY COLORS',
    colorHex: '#0F172A',
    canvaImage: '/assets/canva/slide_04.png',
    speakerNotes: 'All chromatic emotion originates from these three foundational primary colors: Red, Blue, and Yellow.',
    transition: 'slide-left',
    animations: [],
  },

  // Slide 5: RED
  {
    id: 5,
    category: 'primary-detail',
    title: 'RED',
    colorHex: '#D40000',
    keywords: ['energy.', 'appetite.'],
    canvaImage: '/assets/canva/slide_05.png',
    speakerNotes: 'Let’s start with Red. Red is associated with intense energy, urgency, and passion. Notice how clearance sales and "Best Seller" stamps rely on red to spur fast action. Red also stimulates appetite and metabolism, which is why fast food titans like KFC, Jollibee, and Pizza Hut feature bold red in their logos and packaging.',
    transition: 'fade',
    animations: [],
  },

  // Slide 6: BLUE
  {
    id: 6,
    category: 'primary-detail',
    title: 'BLUE',
    colorHex: '#0047AB',
    keywords: ['peace.', 'stability.'],
    canvaImage: '/assets/canva/slide_06.png',
    speakerNotes: 'Now look at Blue. Blue evokes tranquility, calm oceans, clear skies, and global unity. At the same time, blue represents security and institutional stability — which is why corporate networks like LinkedIn and Facebook, financial institutions, and healthcare medical professionals all use blue to communicate unshakeable trust.',
    transition: 'fade',
    animations: [],
  },

  // Slide 7: YELLOW
  {
    id: 7,
    category: 'primary-detail',
    title: 'YELLOW',
    colorHex: '#D97706',
    keywords: ['warmth', 'attention'],
    canvaImage: '/assets/canva/slide_07.png',
    speakerNotes: 'Yellow radiates warmth, optimism, and cheerfulness like the morning sun or a bright lightbulb. However, because yellow has high optical visibility in peripheral vision, it is also the ultimate attention grabber. That is why school buses, caution tape, and pedestrian crossing signs worldwide use yellow.',
    transition: 'fade',
    animations: [],
  },

  // Slide 8: Chapter 02 - Divider
  {
    id: 8,
    category: 'section',
    title: 'COLORS ACROSS CULTURES',
    colorHex: '#000000',
    canvaImage: '/assets/canva/slide_08.png',
    speakerNotes: 'Now we move to Colors Across Cultures. Biology gives us shared eyes, but geography, religion, and history overlay radically different meanings onto the exact same hue.',
    transition: 'zoom',
    animations: [],
  },

  // Slide 9: Culture Comparison - WHITE
  {
    id: 9,
    category: 'culture-compare',
    title: 'WHITE',
    colorHex: '#1E293B',
    cultureItems: [
      {
        region: 'WEST',
        meaning: 'Purity & Celebration',
        details: 'Bridal gowns, joyful beginnings, and sterile medical wellness.',
      },
      {
        region: 'ASIA',
        meaning: 'Mourning & Funerals',
        details: 'Traditional funeral attire in China, Korea, and Japan.',
      },
    ],
    canvaImage: '/assets/canva/slide_09.png',
    speakerNotes: 'Take White. In the West, white is universally the color of weddings, celebration, and purity. Yet across East Asia, white has historically been the traditional color of mourning, worn at funerals.',
    transition: 'slide-left',
    animations: [],
  },

  // Slide 10: Culture Comparison - BLACK
  {
    id: 10,
    category: 'culture-compare',
    title: 'BLACK',
    colorHex: '#0F172A',
    cultureItems: [
      {
        region: 'U.S.A.',
        meaning: 'Formality & Executive Power',
        details: 'Judges robes, tuxedos, and sleek luxury supercars.',
      },
      {
        region: 'AFRICA',
        meaning: 'Strength & Spiritual Maturity',
        details: 'Fertile earth, ancestral grounding, and masculine vitality.',
      },
    ],
    canvaImage: '/assets/canva/slide_10.png',
    speakerNotes: 'Look at Black. In the United States and the Western world, black signifies formal authority, judicial robes, and luxury. In multiple African traditions, black represents fertile soil, strength, and ancestral spiritual maturity.',
    transition: 'slide-left',
    animations: [],
  },

  // Slide 11: Culture Comparison - GREEN
  {
    id: 11,
    category: 'culture-compare',
    title: 'GREEN',
    colorHex: '#15803D',
    cultureItems: [
      {
        region: 'ISLAMIC',
        meaning: 'Sacred Paradise & Serenity',
        details: 'The revered color of Islamic tradition, representing the lush verdant gardens of Paradise.',
      },
      {
        region: 'IRISH',
        meaning: 'National Pride & Luck',
        details: 'The Emerald Isle, shamrock lore, and enduring St. Patrick heritage.',
      },
    ],
    canvaImage: '/assets/canva/slide_11.png',
    speakerNotes: 'And Green: In Islamic culture, green is deeply revered as the sacred color of paradise and peace. In Irish heritage, it represents national identity, the Emerald landscape, and folklore.',
    transition: 'slide-left',
    animations: [],
  },

  // Slide 12: Quiz Section Intro
  {
    id: 12,
    category: 'quiz-intro',
    title: 'FAKE  or  REAL',
    colorHex: '#16A34A',
    canvaImage: '/assets/canva/slide_12.png',
    speakerNotes: 'Now it’s time to test your intuition! We have four fast-paced trivia statements. Call out or vote before I reveal the verdict: is it Fake or is it Real?',
    transition: 'flip',
    animations: [],
  },

  // Slide 13: Quiz 01 - Question
  {
    id: 13,
    category: 'quiz-question',
    title: 'QUESTION 01',
    quiz: {
      questionNumber: '01',
      statement: 'The most famous color is blue',
      verdict: 'REAL',
    },
    colorHex: '#2563EB',
    canvaImage: '/assets/canva/slide_13.png',
    speakerNotes: 'Question 01: "The most famous color is blue." What do you think? Real or Fake?',
    transition: 'slide-left',
    animations: [],
  },

  // Slide 14: Quiz 01 - Explanation
  {
    id: 14,
    category: 'quiz-answer',
    title: 'Why?',
    subtitle: 'Global surveys show about 35% to 45% of people name blue as their top choice.',
    colorHex: '#1D4ED8',
    canvaImage: '/assets/canva/slide_14.png',
    speakerNotes: 'It is REAL! International surveys repeatedly show blue is chosen as the favorite color by 35% to 45% of respondents worldwide.',
    transition: 'fade',
    animations: [],
  },

  // Slide 15: Quiz 02 - Question
  {
    id: 15,
    category: 'quiz-question',
    title: 'QUESTION 02',
    quiz: {
      questionNumber: '02',
      statement: 'Yellow is the first color a baby sees.',
      verdict: 'FAKE',
    },
    colorHex: '#DC2626',
    canvaImage: '/assets/canva/slide_15.png',
    speakerNotes: 'Question 02: "Yellow is the first color a baby sees." Real or Fake?',
    transition: 'slide-left',
    animations: [],
  },

  // Slide 16: Quiz 02 - Explanation
  {
    id: 16,
    category: 'quiz-answer',
    title: 'Why?',
    subtitle: 'Red has the longest wavelength of the colors, making it easier for a baby\'s eyes to see.',
    colorHex: '#DC2626',
    canvaImage: '/assets/canva/slide_16.png',
    speakerNotes: 'It is FAKE! Because red has the longest wavelength in visible light, infant photoreceptors detect red long before shorter wavelengths like yellow and blue.',
    transition: 'fade',
    animations: [],
  },

  // Slide 17: Quiz 03 - Question
  {
    id: 17,
    category: 'quiz-question',
    title: 'QUESTION 03',
    quiz: {
      questionNumber: '03',
      statement: 'Women can see more shades of red.',
      verdict: 'REAL',
    },
    colorHex: '#BE123C',
    canvaImage: '/assets/canva/slide_17.png',
    speakerNotes: 'Question 03: "Women can see more shades of red." What is your verdict?',
    transition: 'slide-left',
    animations: [],
  },

  // Slide 18: Quiz 03 - Explanation
  {
    id: 18,
    category: 'quiz-answer',
    title: 'Why?',
    subtitle: 'With the help two X chromosomes, women can see more orange-red tones such as ruby, scarlet, and many more (and red flags).',
    colorHex: '#BE123C',
    canvaImage: '/assets/canva/slide_18.png',
    speakerNotes: 'It is REAL! The red-cone photopigment gene sits on the X chromosome. Having two X chromosomes allows women to distinguish finer variations among red tones.',
    transition: 'fade',
    animations: [],
  },

  // Slide 19: Quiz 04 - Question
  {
    id: 19,
    category: 'quiz-question',
    title: 'QUESTION 04',
    quiz: {
      questionNumber: '04',
      statement: 'Historically, wearing bright colors meant wealth',
      verdict: 'REAL',
    },
    colorHex: '#7C3AED',
    canvaImage: '/assets/canva/slide_19.png',
    speakerNotes: 'Question 04: "Historically, wearing bright colors meant wealth." Real or Fake?',
    transition: 'slide-left',
    animations: [],
  },

  // Slide 20: Quiz 04 - Explanation
  {
    id: 20,
    category: 'quiz-answer',
    title: 'Why?',
    subtitle: 'Vibrant dyes were rare and expensive.',
    colorHex: '#7C3AED',
    canvaImage: '/assets/canva/slide_20.png',
    speakerNotes: 'It is REAL! Historically, vibrant natural dyes like Tyrian purple and scarlet were painstakingly difficult to extract and more costly than gold, reserving bright colors for royalty and the wealthy.',
    transition: 'fade',
    animations: [],
  },

  // Slide 21: Conclusion
  {
    id: 21,
    category: 'conclusion',
    title: 'Thank you!',
    subtitle: 'Floor open for Q&A and discussion',
    colorHex: '#0F172A',
    canvaImage: '/assets/canva/slide_21.png',
    speakerNotes: 'Thank you very much for your time and participation! Let’s open the floor to any questions or observations.',
    transition: 'flip',
    animations: [],
  },
];
