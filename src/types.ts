export type TransitionType = 
  | 'none'
  | 'fade'
  | 'slide-left'
  | 'slide-right'
  | 'zoom'
  | 'flip';

export type ObjectAnimationType = 
  | 'fade-in'
  | 'fly-in-up'
  | 'fly-in-down'
  | 'fly-in-left'
  | 'fly-in-right'
  | 'zoom-in'
  | 'bounce-in'
  | 'pop';

export interface SlideElementAnimation {
  targetId: string;
  type: ObjectAnimationType;
  delay: number;
  duration: number;
}

export type SlideCategory = 
  | 'cover'
  | 'agenda'
  | 'section'
  | 'primary-overview'
  | 'primary-detail'
  | 'culture-compare'
  | 'quiz-intro'
  | 'quiz-question'
  | 'quiz-answer'
  | 'conclusion';

export interface QuizData {
  questionNumber: string;
  statement: string;
  verdict: 'REAL' | 'FAKE';
  explanationTitle?: string;
  explanationText?: string;
}

export interface CultureItem {
  region: string;
  meaning: string;
  details: string;
  iconName?: string;
}

export interface SlideData {
  id: number;
  category: SlideCategory;
  title: string;
  subtitle?: string;
  colorHex?: string; // Primary highlight color (e.g. #fd0000, #1800ad, #ffde59, #56911c)
  keywords?: string[];
  bullets?: string[];
  cultureItems?: CultureItem[];
  quiz?: QuizData;
  metrics?: { label: string; value: string; subtext?: string }[];
  brandExamples?: string[];
  wavelengthNm?: string;
  scientificCitation?: string;
  takeaway?: string;
  speakerNotes: string;
  animations: SlideElementAnimation[];
  transition: TransitionType;
}

export interface PresentationState {
  currentSlideIndex: number;
  isPlayingSlideshow: boolean;
  isPresenterNotesOpen: boolean;
  isAnimationPanelOpen: boolean;
  isExportModalOpen: boolean;
  selectedTransition: TransitionType;
  transitionSpeed: number; // in seconds
  autoPlayInterval: number; // in seconds, 0 = off
  isLaserPointerActive: boolean;
}
