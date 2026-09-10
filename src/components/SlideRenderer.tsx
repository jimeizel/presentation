import React, { useState } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'motion/react';
import confetti from 'canvas-confetti';
import { SlideData } from '../types';
import { soundEngine } from '../lib/soundEffects';
import { 
  CheckCircle2, 
  XCircle, 
  RotateCcw,
  Sparkles,
  Flame,
  Globe2,
  Check,
  X
} from 'lucide-react';

interface SlideRendererProps {
  slide: SlideData;
  scale?: number;
  isInteractive?: boolean;
  isExportMode?: boolean;
}

export const SlideRenderer: React.FC<SlideRendererProps> = ({
  slide,
  scale = 1,
  isInteractive = true,
  isExportMode = false,
}) => {
  // Quiz reveal state for question slides
  const [userGuess, setUserGuess] = useState<'REAL' | 'FAKE' | null>(null);
  const [isRevealed, setIsRevealed] = useState<boolean>(false);

  const handleGuess = (guess: 'REAL' | 'FAKE') => {
    setUserGuess(guess);
    setIsRevealed(true);

    if (slide.quiz) {
      if (guess === slide.quiz.verdict) {
        soundEngine.playSuccessChime();
        try {
          confetti({
            particleCount: 90,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#16A34A', '#FBBF24', '#2563EB', '#DC2626'],
          });
        } catch {
          // ignore
        }
      } else {
        soundEngine.playIncorrectTone();
      }
    }
  };

  const handleResetGuess = () => {
    setUserGuess(null);
    setIsRevealed(false);
  };

  return (
    <MotionConfig reducedMotion={isExportMode ? "always" : "never"} transition={isExportMode ? { duration: 0 } : undefined}>
      <div 
        className="relative w-full h-full canva-cloud-bg text-slate-900 overflow-hidden flex flex-col justify-between select-none p-6 sm:p-10 md:p-12 lg:p-14 font-sans border border-slate-200/80"
      >
        {/* Subtle Canva Top Breadcrumb Header */}
        <div className="relative z-10 flex items-center justify-between text-[11px] font-medium tracking-widest text-slate-400 uppercase border-b border-slate-200/50 pb-2.5 mb-2">
          <div className="flex items-center gap-2">
            <span 
              className="w-2 h-2 rounded-full opacity-80" 
              style={{ backgroundColor: slide.colorHex || '#1E293B' }} 
            />
            <span className="font-canva-serif text-slate-600 font-bold tracking-wider">
              Monday Presentation
            </span>
          </div>

          <div className="font-mono text-slate-400 text-[10px]">
            {slide.id.toString().padStart(2, '0')} / 21
          </div>
        </div>

        {/* Slide Main Stage */}
        <div className="relative z-10 flex-1 flex flex-col justify-center items-center my-auto w-full max-w-5xl mx-auto py-2">

          {/* ======================= 1. COVER SLIDE ======================= */}
          {slide.category === 'cover' && (
            <div className="text-center space-y-6 max-w-4xl mx-auto my-auto">
              <motion.h1 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="text-5xl sm:text-7xl md:text-8xl font-canva-serif font-black tracking-widest text-slate-950 uppercase drop-shadow-xs"
              >
                {slide.title}
              </motion.h1>

              <motion.div 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-28 h-0.5 bg-slate-400 mx-auto"
              />

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg sm:text-2xl md:text-3xl font-canva-serif tracking-wider text-slate-700 uppercase font-semibold max-w-2xl mx-auto leading-relaxed"
              >
                {slide.subtitle}
              </motion.p>
            </div>
          )}

          {/* ======================= 2. OUTLINE SLIDE ======================= */}
          {slide.category === 'agenda' && (
            <div className="w-full max-w-3xl mx-auto space-y-8 my-auto text-center">
              <motion.h2 
                initial={{ y: -15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-5xl sm:text-6xl md:text-7xl font-canva-serif font-black uppercase tracking-widest text-slate-950"
              >
                {slide.title}
              </motion.h2>

              <div className="space-y-4 max-w-xl mx-auto text-left pt-2">
                {slide.bullets?.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.15 + idx * 0.1 }}
                    className="flex items-center gap-5 text-lg sm:text-2xl font-sans font-semibold text-slate-800 p-3 rounded-xl hover:bg-white/60 transition"
                  >
                    <span className="font-canva-serif font-bold text-slate-400 text-xl sm:text-2xl w-8">
                      0{idx + 1}
                    </span>
                    <span>{item.replace(/^\d+\.\s*/, '')}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* ======================= 3. SECTION 01: COLORS IN OUR LIVES ======================= */}
          {slide.id === 3 && (
            <div className="text-center my-auto max-w-4xl mx-auto">
              <motion.h2 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="text-5xl sm:text-7xl md:text-8xl font-canva-serif font-black uppercase tracking-widest text-slate-950 leading-tight"
              >
                {slide.title}
              </motion.h2>
            </div>
          )}

          {/* ======================= 4. PRIMARY COLORS ======================= */}
          {slide.id === 4 && (
            <div className="text-center space-y-8 my-auto w-full max-w-4xl mx-auto">
              <motion.h2 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-4xl sm:text-6xl md:text-7xl font-canva-serif font-black uppercase tracking-widest text-slate-950"
              >
                {slide.title}
              </motion.h2>

              {/* Authentic Canva Paint Swatches */}
              <motion.div 
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="flex items-center justify-center pt-2"
              >
                <img 
                  src="/assets/canva/slide_04.png" 
                  alt="Primary Colors: Red, Blue, Yellow paint swatches" 
                  className="max-h-64 sm:max-h-80 md:max-h-96 w-auto object-contain drop-shadow-md rounded-xl"
                />
              </motion.div>
            </div>
          )}

          {/* ======================= 5. RED ======================= */}
          {slide.id === 5 && (
            <div className="text-center space-y-4 my-auto w-full max-w-4xl mx-auto">
              <motion.h2 
                initial={{ y: -15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-5xl sm:text-7xl md:text-8xl font-canva-serif font-black uppercase tracking-widest text-[#D40000]"
              >
                {slide.title}
              </motion.h2>

              {/* Exact Canva Slide 5 Composition */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="flex items-center justify-center pt-1"
              >
                <img 
                  src="/assets/canva/slide_05.png" 
                  alt="Red: energy and appetite" 
                  className="max-h-72 sm:max-h-84 md:max-h-96 w-auto object-contain drop-shadow-md rounded-xl"
                />
              </motion.div>
            </div>
          )}

          {/* ======================= 6. BLUE ======================= */}
          {slide.id === 6 && (
            <div className="text-center space-y-4 my-auto w-full max-w-4xl mx-auto">
              <motion.h2 
                initial={{ y: -15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-5xl sm:text-7xl md:text-8xl font-canva-serif font-black uppercase tracking-widest text-[#0047AB]"
              >
                {slide.title}
              </motion.h2>

              {/* Exact Canva Slide 6 Composition */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="flex items-center justify-center pt-1"
              >
                <img 
                  src="/assets/canva/slide_06.png" 
                  alt="Blue: peace and stability" 
                  className="max-h-72 sm:max-h-84 md:max-h-96 w-auto object-contain drop-shadow-md rounded-xl"
                />
              </motion.div>
            </div>
          )}

          {/* ======================= 7. YELLOW ======================= */}
          {slide.id === 7 && (
            <div className="text-center space-y-4 my-auto w-full max-w-4xl mx-auto">
              <motion.h2 
                initial={{ y: -15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-5xl sm:text-7xl md:text-8xl font-canva-serif font-black uppercase tracking-widest text-[#D97706]"
              >
                {slide.title}
              </motion.h2>

              {/* Exact Canva Slide 7 Composition */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="flex items-center justify-center pt-1"
              >
                <img 
                  src="/assets/canva/slide_07.png" 
                  alt="Yellow: warmth and attention" 
                  className="max-h-72 sm:max-h-84 md:max-h-96 w-auto object-contain drop-shadow-md rounded-xl"
                />
              </motion.div>
            </div>
          )}

          {/* ======================= 8. SECTION 02: COLORS ACROSS CULTURES ======================= */}
          {slide.id === 8 && (
            <div className="text-center my-auto max-w-4xl mx-auto">
              <motion.h2 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="text-5xl sm:text-7xl md:text-8xl font-canva-serif font-black uppercase tracking-widest text-slate-950 leading-tight"
              >
                {slide.title}
              </motion.h2>
            </div>
          )}

          {/* ======================= 9. WHITE (WEST vs ASIA) ======================= */}
          {slide.id === 9 && (
            <div className="text-center space-y-4 my-auto w-full max-w-4xl mx-auto">
              <motion.h2 
                initial={{ y: -15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-5xl sm:text-7xl md:text-8xl font-canva-serif font-black uppercase tracking-widest text-slate-950"
              >
                {slide.title}
              </motion.h2>

              {/* Exact Canva Slide 9 Composition */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="flex items-center justify-center pt-1"
              >
                <img 
                  src="/assets/canva/slide_09.png" 
                  alt="White: West vs Asia" 
                  className="max-h-72 sm:max-h-84 md:max-h-96 w-auto object-contain drop-shadow-md rounded-xl"
                />
              </motion.div>
            </div>
          )}

          {/* ======================= 10. BLACK (U.S.A. vs AFRICA) ======================= */}
          {slide.id === 10 && (
            <div className="text-center space-y-4 my-auto w-full max-w-4xl mx-auto">
              <motion.h2 
                initial={{ y: -15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-5xl sm:text-7xl md:text-8xl font-canva-serif font-black uppercase tracking-widest text-slate-950"
              >
                {slide.title}
              </motion.h2>

              {/* Exact Canva Slide 10 Composition */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="flex items-center justify-center pt-1"
              >
                <img 
                  src="/assets/canva/slide_10.png" 
                  alt="Black: U.S.A. vs Africa" 
                  className="max-h-72 sm:max-h-84 md:max-h-96 w-auto object-contain drop-shadow-md rounded-xl"
                />
              </motion.div>
            </div>
          )}

          {/* ======================= 11. GREEN (ISLAMIC vs IRISH) ======================= */}
          {slide.id === 11 && (
            <div className="text-center space-y-4 my-auto w-full max-w-4xl mx-auto">
              <motion.h2 
                initial={{ y: -15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-5xl sm:text-7xl md:text-8xl font-canva-serif font-black uppercase tracking-widest text-[#15803D]"
              >
                {slide.title}
              </motion.h2>

              {/* Exact Canva Slide 11 Composition */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="flex items-center justify-center pt-1"
              >
                <img 
                  src="/assets/canva/slide_11.png" 
                  alt="Green: Islamic vs Irish" 
                  className="max-h-72 sm:max-h-84 md:max-h-96 w-auto object-contain drop-shadow-md rounded-xl"
                />
              </motion.div>
            </div>
          )}

          {/* ======================= 12. FAKE OR REAL INTRO ======================= */}
          {slide.id === 12 && (
            <div className="text-center space-y-6 my-auto w-full max-w-4xl mx-auto">
              <motion.h2 
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-6xl sm:text-8xl md:text-9xl font-black font-sans uppercase tracking-tight"
              >
                <span className="text-red-600">FAKE</span>{' '}
                <span className="text-slate-800 font-canva-serif font-light lowercase text-4xl sm:text-6xl">or</span>{' '}
                <span className="text-emerald-600">REAL</span>
              </motion.h2>

              {/* Exact Canva Questioning Cartoon */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center justify-center pt-2"
              >
                <img 
                  src="/assets/canva/slide_12.png" 
                  alt="Fake or Real presenter" 
                  className="max-h-60 sm:max-h-72 w-auto object-contain drop-shadow-sm rounded-xl"
                />
              </motion.div>
            </div>
          )}

          {/* ======================= 13, 15, 17, 19. TRIVIA QUESTIONS ======================= */}
          {slide.category === 'quiz-question' && slide.quiz && (
            <div className="text-center space-y-8 my-auto w-full max-w-4xl mx-auto">
              {/* Question Number in Canva Serif */}
              <motion.div 
                initial={{ y: -15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-4xl sm:text-6xl font-canva-serif font-black text-slate-950"
              >
                {slide.quiz.questionNumber}
              </motion.div>

              {/* Big, Clean Question Statement */}
              <motion.h3 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="text-3xl sm:text-5xl md:text-6xl font-sans font-bold text-slate-900 leading-tight px-4 max-w-3xl mx-auto"
              >
                {slide.quiz.statement}
              </motion.h3>

              {/* Interactive Guess Buttons & Canva Underlined Verdict */}
              <div className="pt-4 flex flex-col items-center justify-center gap-4">
                {isExportMode ? (
                  /* Static mode for print/export */
                  <div className="text-4xl sm:text-6xl font-sans font-black tracking-wider uppercase">
                    <span className={slide.quiz.verdict === 'REAL' ? 'text-emerald-600 underline decoration-4 underline-offset-8' : 'text-red-600 underline decoration-4 underline-offset-8'}>
                      {slide.quiz.verdict}
                    </span>
                  </div>
                ) : !isRevealed ? (
                  /* Interactive Voting Buttons */
                  <div className="flex items-center gap-6">
                    <button
                      onClick={() => handleGuess('REAL')}
                      className="px-8 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-black text-lg tracking-wider shadow-lg hover:shadow-emerald-500/25 transition-all flex items-center gap-2.5 cursor-pointer"
                    >
                      <CheckCircle2 className="w-6 h-6" />
                      <span>REAL</span>
                    </button>

                    <button
                      onClick={() => handleGuess('FAKE')}
                      className="px-8 py-3.5 rounded-2xl bg-red-600 hover:bg-red-700 active:scale-95 text-white font-black text-lg tracking-wider shadow-lg hover:shadow-red-500/25 transition-all flex items-center gap-2.5 cursor-pointer"
                    >
                      <XCircle className="w-6 h-6" />
                      <span>FAKE</span>
                    </button>
                  </div>
                ) : (
                  /* Authentic Canva Underlined Verdict Reveal */
                  <motion.div
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', damping: 14, stiffness: 220 }}
                    className="flex flex-col items-center gap-3"
                  >
                    <div className="text-5xl sm:text-7xl font-sans font-black tracking-wider uppercase">
                      <span className={slide.quiz.verdict === 'REAL' ? 'text-emerald-600 underline decoration-8 underline-offset-8' : 'text-red-600 underline decoration-8 underline-offset-8'}>
                        {slide.quiz.verdict}
                      </span>
                    </div>

                    <button
                      onClick={handleResetGuess}
                      className="text-xs font-semibold text-slate-400 hover:text-slate-600 transition flex items-center gap-1 mt-2 cursor-pointer"
                      title="Reset voting"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Vote again</span>
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          )}

          {/* ======================= 14, 16, 18, 20. WHY? ANSWERS ======================= */}
          {slide.category === 'quiz-answer' && (
            <div className="text-center space-y-8 my-auto w-full max-w-4xl mx-auto">
              <motion.h2 
                initial={{ y: -15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-4xl sm:text-6xl font-sans font-bold text-slate-950"
              >
                Why?
              </motion.h2>

              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="text-2xl sm:text-4xl md:text-5xl font-sans font-semibold text-slate-900 leading-snug px-4 max-w-3xl mx-auto"
              >
                {slide.subtitle}
              </motion.p>
            </div>
          )}

          {/* ======================= 21. CONCLUSION: THANK YOU! ======================= */}
          {slide.category === 'conclusion' && (
            <div className="text-center space-y-6 my-auto w-full max-w-4xl mx-auto">
              {/* Authentic Canva 3D Thank You Graphic */}
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', damping: 16, stiffness: 200 }}
                className="flex items-center justify-center"
              >
                <img 
                  src="/assets/canva/slide_21.png" 
                  alt="Thank you!" 
                  className="max-h-64 sm:max-h-80 md:max-h-96 w-auto object-contain drop-shadow-lg"
                />
              </motion.div>

              <motion.p
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-base sm:text-xl font-canva-serif text-slate-600 italic"
              >
                {slide.subtitle}
              </motion.p>
            </div>
          )}

        </div>

        {/* Subtle Canva Bottom Footer */}
        <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-400 font-medium border-t border-slate-200/50 pt-2.5 mt-2">
          <span>Monday Presentation • Colors</span>
          <span className="font-mono">Slide {slide.id} of 21</span>
        </div>
      </div>
    </MotionConfig>
  );
};
