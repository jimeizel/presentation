import React, { useState, useEffect } from 'react';
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

  // Reset quiz state on slide change
  useEffect(() => {
    setUserGuess(null);
    setIsRevealed(false);
  }, [slide.id]);

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
              {slide.id <= 2 ? 'Guess the Topic' : 'Monday Presentation'}
            </span>
          </div>

          <div className="font-mono text-slate-400 text-[10px]">
            {slide.id.toString().padStart(2, '0')} / 21
          </div>
        </div>

        {/* Slide Main Stage */}
        <div className="relative z-10 flex-1 flex flex-col justify-center items-center my-auto w-full max-w-5xl mx-auto py-2">

          {/* ======================= 1. GUESS THE TOPIC: ANIMATED COLOR CONSTELLATION ======================= */}
          {slide.id === 1 && (
            <div className="w-full h-full max-w-5xl mx-auto my-auto flex flex-col items-center justify-between py-2 sm:py-4 relative">
              {/* Top Mystery Question */}
              <motion.div 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="text-center z-20 space-y-1.5"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/5 border border-slate-900/10 text-xs font-semibold tracking-wider text-slate-700 uppercase mb-0.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" style={{ animationDuration: '8s' }} />
                  <span>Audience Challenge</span>
                </div>
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-canva-serif font-black tracking-wider text-slate-950 uppercase">
                  Guess The Topic
                </h1>
                <p className="text-xs sm:text-base font-canva-serif tracking-widest text-slate-500 uppercase font-semibold">
                  Tap or click any orb for a musical clue
                </p>
              </motion.div>

              {/* Dynamic Floating Color Constellation Stage */}
              <div className="relative w-full flex-1 min-h-[300px] sm:min-h-[380px] md:min-h-[420px] flex items-center justify-center my-2">
                {/* Ambient Center Glow */}
                <motion.div 
                  animate={{ 
                    scale: [1, 1.15, 1],
                    opacity: [0.35, 0.6, 0.35]
                  }}
                  transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                  className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-rose-200/40 via-sky-200/40 to-amber-200/40 filter blur-3xl pointer-events-none"
                />

                {/* Center Mystery Hub */}
                <motion.div 
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: 'spring', damping: 14, stiffness: 200 }}
                  onClick={() => {
                    soundEngine.playSuccessChime();
                    try {
                      confetti({
                        particleCount: 50,
                        spread: 70,
                        origin: { y: 0.55 },
                        colors: ['#EF4444', '#3B82F6', '#F59E0B', '#10B981', '#8B5CF6', '#EC4899']
                      });
                    } catch {}
                  }}
                  whileHover={{ scale: 1.12, rotate: 5 }}
                  whileTap={{ scale: 0.94 }}
                  className="relative z-20 cursor-pointer group flex flex-col items-center justify-center"
                  title="Click for a celebratory hint!"
                >
                  {/* Rotating Dashed Orbital Track */}
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
                    className="absolute -inset-4 sm:-inset-6 rounded-full border-2 border-dashed border-slate-300/80 pointer-events-none"
                  />

                  {/* Core Glass Sphere */}
                  <div className="w-22 h-22 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white flex flex-col items-center justify-center shadow-2xl border-4 border-white/90 group-hover:border-amber-400/90 transition-colors">
                    <span className="font-canva-serif font-black text-4xl sm:text-5xl md:text-6xl text-white drop-shadow-md group-hover:text-amber-300 transition-colors">
                      ?
                    </span>
                    <span className="text-[8px] sm:text-[10px] font-sans font-bold tracking-widest text-slate-400 uppercase group-hover:text-white transition-colors">
                      WHAT IS IT?
                    </span>
                  </div>
                </motion.div>

                {/* Floating Interactive Color Orbs */}
                {[
                  { id: 'red', name: 'Crimson', grad: 'from-[#FF3B30] via-[#E11D48] to-[#991B1B]', glow: 'shadow-red-500/35', size: 'w-18 h-18 sm:w-24 sm:h-24 md:w-28 md:h-28', pos: '-top-2 sm:-top-4 left-[6%] sm:left-[12%]', dur: 3.2, delay: 0.1, freq: 261.63 },
                  { id: 'blue', name: 'Azure', grad: 'from-[#007AFF] via-[#2563EB] to-[#1E3A8A]', glow: 'shadow-blue-500/35', size: 'w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32', pos: '-top-1 sm:-top-3 right-[6%] sm:right-[12%]', dur: 3.8, delay: 0.25, freq: 392.00 },
                  { id: 'yellow', name: 'Amber', grad: 'from-[#FACC15] via-[#F59E0B] to-[#D97706]', glow: 'shadow-amber-500/35', size: 'w-18 h-18 sm:w-24 sm:h-24 md:w-28 md:h-28', pos: 'top-1/2 -translate-y-1/2 left-[2%] sm:left-[6%]', dur: 3.5, delay: 0.4, freq: 329.63 },
                  { id: 'green', name: 'Emerald', grad: 'from-[#34D399] via-[#10B981] to-[#047857]', glow: 'shadow-emerald-500/35', size: 'w-18 h-18 sm:w-24 sm:h-24 md:w-28 md:h-28', pos: 'top-1/2 -translate-y-1/2 right-[2%] sm:right-[6%]', dur: 4.1, delay: 0.35, freq: 349.23 },
                  { id: 'purple', name: 'Violet', grad: 'from-[#A855F7] via-[#7C3AED] to-[#581C87]', glow: 'shadow-purple-500/35', size: 'w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24', pos: '-bottom-3 sm:-bottom-4 left-[14%] sm:left-[22%]', dur: 3.6, delay: 0.5, freq: 440.00 },
                  { id: 'pink', name: 'Rose', grad: 'from-[#F472B6] via-[#EC4899] to-[#BE185D]', glow: 'shadow-pink-500/35', size: 'w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24', pos: '-bottom-3 sm:-bottom-4 right-[14%] sm:right-[22%]', dur: 4.3, delay: 0.6, freq: 493.88 },
                  { id: 'orange', name: 'Tangerine', grad: 'from-[#FB923C] via-[#F97316] to-[#C2410C]', glow: 'shadow-orange-500/35', size: 'w-14 h-14 sm:w-18 sm:h-18 md:w-22 md:h-22', pos: 'top-1 sm:top-2 left-1/2 -translate-x-1/2', dur: 3.0, delay: 0.2, freq: 293.66 },
                ].map((orb) => (
                  <motion.div
                    key={orb.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                      scale: 1, 
                      opacity: 1,
                      y: [0, -10, 0, 7, 0],
                      x: [0, 4, 0, -4, 0]
                    }}
                    transition={{ 
                      scale: { delay: orb.delay, type: 'spring', damping: 12, stiffness: 200 },
                      opacity: { delay: orb.delay, duration: 0.4 },
                      y: { repeat: Infinity, duration: orb.dur, ease: 'easeInOut', delay: orb.delay * 2 },
                      x: { repeat: Infinity, duration: orb.dur * 1.2, ease: 'easeInOut', delay: orb.delay }
                    }}
                    whileHover={{ scale: 1.22, rotate: 8 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => soundEngine.playTone(orb.freq)}
                    className={`absolute ${orb.pos} ${orb.size} rounded-full bg-gradient-to-tr ${orb.grad} shadow-xl ${orb.glow} border-3 border-white/90 cursor-pointer z-10 flex items-center justify-center select-none group transition-shadow`}
                    title={`Click to hear ${orb.name}!`}
                  >
                    {/* Glossy 3D Sphere Specular Highlight */}
                    <div className="absolute top-2 left-3 w-4 h-2.5 sm:w-6 sm:h-4 bg-white/50 rounded-full blur-[1px] rotate-[-25deg] pointer-events-none" />
                    
                    {/* Subtle Musical Note Icon on Hover */}
                    <span className="opacity-0 group-hover:opacity-90 text-white font-bold text-xs sm:text-sm drop-shadow-md transition-opacity">
                      ♪
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Bottom Subtle Hint */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-xs font-sans text-slate-400 font-medium tracking-wider uppercase text-center z-20 pt-1"
              >
                Clue 1 of 2 • What is the underlying theme?
              </motion.div>
            </div>
          )}

          {/* ======================= 2. GUESS THE TOPIC: CLUE 2 (THE DUAL CLASH) ======================= */}
          {slide.id === 2 && (
            <div className="w-full h-full max-w-5xl mx-auto my-auto flex flex-col items-center justify-between py-2 sm:py-4 relative">
              {/* Header */}
              <motion.div 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="text-center z-20 space-y-1.5"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/5 border border-slate-900/10 text-xs font-semibold tracking-wider text-slate-700 uppercase mb-0.5">
                  <span>Clue #2</span>
                </div>
                <h2 className="text-3xl sm:text-5xl md:text-6xl font-canva-serif font-black tracking-wider text-slate-950 uppercase">
                  Two Elemental Forces
                </h2>
                <p className="text-xs sm:text-base font-canva-serif tracking-widest text-slate-500 uppercase font-semibold">
                  What connects these two sides?
                </p>
              </motion.div>

              {/* Two Massive Animated Interactive Color Monoliths */}
              <div className="grid grid-cols-2 gap-6 sm:gap-12 w-full max-w-4xl my-auto items-center justify-center relative py-2 sm:py-4">
                {/* Center Floating VS Badge */}
                <motion.div 
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ 
                    scale: 1, 
                    rotate: 0,
                    y: [0, -6, 0]
                  }}
                  transition={{ 
                    scale: { delay: 0.3, type: 'spring', damping: 14, stiffness: 220 },
                    y: { repeat: Infinity, duration: 2.8, ease: 'easeInOut' }
                  }}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-slate-950 text-white font-canva-serif font-black text-base sm:text-xl flex items-center justify-center shadow-2xl border-4 border-white"
                >
                  VS
                </motion.div>

                {/* Left Card: Red Pillar */}
                <motion.div 
                  initial={{ x: -60, opacity: 0 }}
                  animate={{ 
                    x: 0, 
                    opacity: 1,
                    y: [0, -6, 0]
                  }}
                  transition={{ 
                    x: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
                    opacity: { duration: 0.6 },
                    y: { repeat: Infinity, duration: 3.4, ease: 'easeInOut', delay: 0.4 }
                  }}
                  whileHover={{ scale: 1.04, rotate: -1 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => soundEngine.playTone(261.63)}
                  className="h-56 sm:h-72 md:h-80 rounded-3xl bg-gradient-to-br from-[#FF3B30] via-[#DC2626] to-[#991B1B] shadow-2xl shadow-red-500/30 border-4 border-white flex flex-col items-center justify-center p-6 cursor-pointer relative overflow-hidden group"
                >
                  <div className="absolute top-4 left-6 w-16 h-8 bg-white/30 rounded-full blur-[2px] rotate-[-20deg] pointer-events-none" />
                  <motion.div 
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                    className="w-14 h-14 sm:w-18 sm:h-18 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center mb-3 shadow-inner"
                  >
                    <Flame className="w-7 h-7 sm:w-9 sm:h-9 text-white" />
                  </motion.div>
                  <span className="text-white font-canva-serif font-black text-xl sm:text-3xl tracking-widest uppercase drop-shadow-md">
                    WARMTH & FIRE
                  </span>
                  <span className="text-white/80 font-sans text-[10px] sm:text-xs font-semibold tracking-wider uppercase mt-1">
                    Click to hear
                  </span>
                </motion.div>

                {/* Right Card: Blue Pillar */}
                <motion.div 
                  initial={{ x: 60, opacity: 0 }}
                  animate={{ 
                    x: 0, 
                    opacity: 1,
                    y: [0, -6, 0]
                  }}
                  transition={{ 
                    x: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
                    opacity: { duration: 0.6 },
                    y: { repeat: Infinity, duration: 3.6, ease: 'easeInOut', delay: 0.7 }
                  }}
                  whileHover={{ scale: 1.04, rotate: 1 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => soundEngine.playTone(392.00)}
                  className="h-56 sm:h-72 md:h-80 rounded-3xl bg-gradient-to-br from-[#007AFF] via-[#2563EB] to-[#1E3A8A] shadow-2xl shadow-blue-500/30 border-4 border-white flex flex-col items-center justify-center p-6 cursor-pointer relative overflow-hidden group"
                >
                  <div className="absolute top-4 left-6 w-16 h-8 bg-white/30 rounded-full blur-[2px] rotate-[-20deg] pointer-events-none" />
                  <motion.div 
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 2.3, ease: 'easeInOut' }}
                    className="w-14 h-14 sm:w-18 sm:h-18 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center mb-3 shadow-inner"
                  >
                    <Globe2 className="w-7 h-7 sm:w-9 sm:h-9 text-white" />
                  </motion.div>
                  <span className="text-white font-canva-serif font-black text-xl sm:text-3xl tracking-widest uppercase drop-shadow-md">
                    CALM & OCEAN
                  </span>
                  <span className="text-white/80 font-sans text-[10px] sm:text-xs font-semibold tracking-wider uppercase mt-1">
                    Click to hear
                  </span>
                </motion.div>
              </div>

              {/* Bottom Note */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-xs font-sans text-slate-400 font-medium tracking-wider uppercase text-center z-20 pt-1"
              >
                Next slide reveals the official topic!
              </motion.div>
            </div>
          )}

          {/* ======================= 3. SECTION 01: COLORS IN OUR LIVES ======================= */}
          {slide.id === 3 && (
            <div className="text-center my-auto max-w-4xl mx-auto">
              <motion.h2 
                initial={{ scale: 0.9, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="text-5xl sm:text-7xl md:text-8xl font-canva-serif font-black uppercase tracking-widest text-slate-950 leading-tight"
              >
                {slide.title}
              </motion.h2>
            </div>
          )}

          {/* ======================= 4. PRIMARY COLORS ======================= */}
          {slide.id === 4 && (
            <div className="w-full max-w-5xl mx-auto my-auto flex flex-col items-center justify-center space-y-8">
              <motion.h2 
                initial={{ y: -25, opacity: 0, scale: 0.95 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="text-5xl sm:text-7xl md:text-8xl font-canva-serif font-black uppercase tracking-widest text-slate-950 text-center"
              >
                {slide.title}
              </motion.h2>

              {/* 3 Large Paint Swatches with Floating Breathing Loop */}
              <div className="grid grid-cols-3 gap-6 sm:gap-10 w-full max-w-4xl items-center justify-center pt-2">
                {/* Red Swatch */}
                <motion.div 
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ 
                    scale: 1, 
                    opacity: 1,
                    y: [0, -6, 0]
                  }}
                  transition={{ 
                    scale: { delay: 0.15, type: 'spring', damping: 14, stiffness: 180 },
                    opacity: { delay: 0.15, duration: 0.4 },
                    y: { repeat: Infinity, duration: 3.2, ease: 'easeInOut', delay: 0.5 }
                  }}
                  whileHover={{ scale: 1.1, rotate: -3 }}
                  className="flex flex-col items-center group cursor-pointer"
                >
                  <div className="w-28 h-28 sm:w-44 sm:h-44 md:w-56 md:h-56 rounded-full bg-gradient-to-tr from-[#991B1B] via-[#DC2626] to-[#EF4444] shadow-xl flex items-center justify-center border-4 border-white/90 shadow-red-500/20">
                    <span className="text-white font-canva-serif font-black text-xl sm:text-3xl tracking-widest uppercase drop-shadow-md">
                      RED
                    </span>
                  </div>
                </motion.div>

                {/* Blue Swatch */}
                <motion.div 
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ 
                    scale: 1, 
                    opacity: 1,
                    y: [0, -8, 0]
                  }}
                  transition={{ 
                    scale: { delay: 0.28, type: 'spring', damping: 14, stiffness: 180 },
                    opacity: { delay: 0.28, duration: 0.4 },
                    y: { repeat: Infinity, duration: 3.6, ease: 'easeInOut', delay: 0.6 }
                  }}
                  whileHover={{ scale: 1.1, rotate: 3 }}
                  className="flex flex-col items-center group cursor-pointer"
                >
                  <div className="w-28 h-28 sm:w-44 sm:h-44 md:w-56 md:h-56 rounded-full bg-gradient-to-tr from-[#1E40AF] via-[#2563EB] to-[#60A5FA] shadow-xl flex items-center justify-center border-4 border-white/90 shadow-blue-500/20">
                    <span className="text-white font-canva-serif font-black text-xl sm:text-3xl tracking-widest uppercase drop-shadow-md">
                      BLUE
                    </span>
                  </div>
                </motion.div>

                {/* Yellow Swatch (with real paint texture) */}
                <motion.div 
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ 
                    scale: 1, 
                    opacity: 1,
                    y: [0, -6, 0]
                  }}
                  transition={{ 
                    scale: { delay: 0.4, type: 'spring', damping: 14, stiffness: 180 },
                    opacity: { delay: 0.4, duration: 0.4 },
                    y: { repeat: Infinity, duration: 3.4, ease: 'easeInOut', delay: 0.7 }
                  }}
                  whileHover={{ scale: 1.1, rotate: -2 }}
                  className="flex flex-col items-center group cursor-pointer"
                >
                  <div className="w-28 h-28 sm:w-44 sm:h-44 md:w-56 md:h-56 rounded-full bg-gradient-to-tr from-[#D97706] via-[#F59E0B] to-[#FDE047] shadow-xl flex items-center justify-center border-4 border-white/90 overflow-hidden relative shadow-amber-500/20">
                    <img 
                      src="/assets/canva/elements/asset_02_1450x927.png" 
                      alt="Yellow paint" 
                      className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-75"
                    />
                    <span className="relative z-10 text-slate-950 font-canva-serif font-black text-xl sm:text-3xl tracking-widest uppercase drop-shadow-sm">
                      YELLOW
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>
          )}

          {/* ======================= 5. RED ======================= */}
          {slide.id === 5 && (
            <div className="w-full max-w-5xl mx-auto my-auto flex flex-col items-center justify-center">
              {/* Massive Bold Red Title with Spring Bounce */}
              <motion.h2 
                initial={{ y: -28, opacity: 0, scale: 0.92 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="text-6xl sm:text-8xl md:text-9xl font-canva-serif font-black uppercase tracking-wider text-[#D40000] mb-8 sm:mb-12"
              >
                RED
              </motion.h2>

              {/* Two Big Columns spanning the slide */}
              <div className="grid grid-cols-2 gap-10 md:gap-20 w-full items-center">
                {/* Left Column: energy. */}
                <motion.div 
                  initial={{ x: -40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center text-center space-y-6"
                >
                  {/* Top: Flame + Best Seller Stamp */}
                  <div className="flex items-center justify-center gap-6">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.08, 1],
                        rotate: [-2, 2, -2],
                      }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 2.2, 
                        ease: "easeInOut" 
                      }}
                      whileHover={{ scale: 1.25, rotate: 8 }}
                      className="cursor-pointer"
                    >
                      <svg className="w-16 h-16 sm:w-20 sm:h-20 drop-shadow-md" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2C8.5 7 6 9.5 6 13.5C6 16.5 8.2 19 11.2 19.4C10.5 18.5 10.1 17.4 10.1 16.2C10.1 13.2 12.2 11 13 9C14.2 11.8 17 13.5 17 16.5C17 17.5 16.6 18.4 16 19.1C18.4 18 20 15.5 20 12.5C20 8.5 16 6 12 2Z" fill="url(#flameGradRed)" />
                        <path d="M12 11C10.5 13 9.5 14.5 9.5 16.5C9.5 18 10.5 19 12 19.5C13.5 19 14.5 18 14.5 16.5C14.5 14.5 13.5 13 12 11Z" fill="#FDE047" />
                        <defs>
                          <linearGradient id="flameGradRed" x1="12" y1="2" x2="12" y2="20" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#FF3B30" />
                            <stop offset="0.7" stopColor="#FF9500" />
                            <stop offset="1" stopColor="#FFCC00" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </motion.div>

                    {/* Authentic Best Seller Stamp with Impact Stamp Bounce */}
                    <motion.div 
                      initial={{ scale: 2.4, opacity: 0, rotate: 25 }}
                      animate={{ scale: 1, opacity: 1, rotate: -12 }}
                      transition={{ delay: 0.28, type: 'spring', damping: 11, stiffness: 220 }}
                      whileHover={{ rotate: 0, scale: 1.12 }}
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-[3px] border-dashed border-red-600 flex flex-col items-center justify-center bg-red-50/60 p-1 shadow-sm cursor-pointer"
                    >
                      <span className="text-[9px] sm:text-[10px] tracking-widest text-red-600 font-bold">★ ★ ★</span>
                      <span className="text-[11px] sm:text-[13px] font-black tracking-wider text-red-600 uppercase border-y-2 border-red-600 px-1 py-0.5 my-0.5">
                        BEST SELLER
                      </span>
                      <span className="text-[8px] tracking-widest text-red-600 font-bold">TOP RATED</span>
                    </motion.div>
                  </div>

                  {/* Center: energy. with animated underline */}
                  <div className="relative inline-block">
                    <h3 className="text-4xl sm:text-5xl md:text-6xl font-sans font-black tracking-tight text-slate-900">
                      energy.
                    </h3>
                    <motion.div 
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.35, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                      className="h-[5px] bg-slate-900 mt-2 origin-left rounded-full"
                    />
                  </div>

                  {/* Bottom: Authentic 3D SALE sticker with floating & bounce */}
                  <motion.div 
                    initial={{ scale: 0.5, opacity: 0, rotate: -20 }}
                    animate={{ 
                      scale: 1, 
                      opacity: 1, 
                      rotate: -6,
                      y: [0, -5, 0]
                    }}
                    transition={{ 
                      scale: { delay: 0.45, type: 'spring', damping: 12, stiffness: 200 },
                      opacity: { delay: 0.45, duration: 0.3 },
                      y: { repeat: Infinity, duration: 3, ease: 'easeInOut', delay: 0.8 }
                    }}
                    whileHover={{ scale: 1.12, rotate: -2 }}
                    className="pt-2 cursor-pointer"
                  >
                    <img 
                      src="/assets/canva/elements/asset_06_525x350.png" 
                      alt="SALE SALE SALE" 
                      className="h-20 sm:h-24 md:h-28 w-auto object-contain drop-shadow-xl"
                    />
                  </motion.div>
                </motion.div>

                {/* Right Column: appetite */}
                <motion.div 
                  initial={{ x: 40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.22, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center text-center space-y-6"
                >
                  {/* Top: KFC Logo */}
                  <motion.div 
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.28, type: 'spring', damping: 14, stiffness: 200 }}
                    whileHover={{ scale: 1.08, rotate: 2 }}
                    className="h-16 sm:h-20 flex items-center justify-center cursor-pointer"
                  >
                    <img 
                      src="/assets/canva/elements/asset_04_2400x1350.png" 
                      alt="KFC" 
                      className="h-full w-auto object-contain drop-shadow-md"
                    />
                  </motion.div>

                  {/* Center: appetite with animated underline */}
                  <div className="relative inline-block">
                    <h3 className="text-4xl sm:text-5xl md:text-6xl font-sans font-black tracking-tight text-slate-900">
                      appetite
                    </h3>
                    <motion.div 
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.42, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                      className="h-[5px] bg-slate-900 mt-2 origin-left rounded-full"
                    />
                  </div>

                  {/* Bottom: Jollibee + Pizza Hut Logos */}
                  <div className="flex items-center justify-center gap-6 sm:gap-8 pt-2">
                    <motion.div
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.45, type: 'spring', damping: 14, stiffness: 200 }}
                      whileHover={{ scale: 1.15, rotate: -4 }}
                      className="cursor-pointer"
                    >
                      <img 
                        src="/assets/canva/elements/asset_03_2400x1600.png" 
                        alt="Jollibee" 
                        className="h-16 sm:h-20 w-auto object-contain drop-shadow-md"
                      />
                    </motion.div>
                    <motion.div
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.55, type: 'spring', damping: 14, stiffness: 200 }}
                      whileHover={{ scale: 1.15, rotate: 4 }}
                      className="cursor-pointer"
                    >
                      <img 
                        src="/assets/canva/elements/asset_05_2400x1350.png" 
                        alt="Pizza Hut" 
                        className="h-16 sm:h-20 w-auto object-contain drop-shadow-md"
                      />
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          )}

          {/* ======================= 6. BLUE ======================= */}
          {slide.id === 6 && (
            <div className="w-full max-w-5xl mx-auto my-auto flex flex-col items-center justify-center">
              {/* Title BLUE */}
              <motion.h2 
                initial={{ y: -28, opacity: 0, scale: 0.92 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="text-6xl sm:text-8xl md:text-9xl font-canva-serif font-black uppercase tracking-wider text-[#0047AB] mb-8 sm:mb-12"
              >
                BLUE
              </motion.h2>

              <div className="grid grid-cols-2 gap-10 md:gap-20 w-full items-center">
                {/* Left Column: peace. */}
                <motion.div 
                  initial={{ x: -40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center text-center space-y-6"
                >
                  {/* Top: Handshake photo */}
                  <motion.div 
                    initial={{ y: -15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, type: 'spring', damping: 14, stiffness: 200 }}
                    whileHover={{ scale: 1.08, y: -3 }}
                    className="h-20 sm:h-24 w-36 sm:w-44 rounded-2xl overflow-hidden shadow-md border-2 border-white/80 cursor-pointer"
                  >
                    <img 
                      src="/assets/photos/handshake.jpg" 
                      alt="Peace & Agreement" 
                      className="w-full h-full object-cover"
                    />
                  </motion.div>

                  {/* Center: peace. with animated underline */}
                  <div className="relative inline-block">
                    <h3 className="text-4xl sm:text-5xl md:text-6xl font-sans font-black tracking-tight text-slate-900">
                      peace
                    </h3>
                    <motion.div 
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.35, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                      className="h-[5px] bg-slate-900 mt-2 origin-left rounded-full"
                    />
                  </div>

                  {/* Bottom: Ocean Waves + Earth Globe */}
                  <div className="flex items-center justify-center gap-4 pt-1">
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.4, type: 'spring', damping: 14 }}
                      whileHover={{ scale: 1.1, y: -3 }}
                      className="h-16 sm:h-20 w-28 sm:w-32 rounded-xl overflow-hidden shadow-md border border-white cursor-pointer"
                    >
                      <img src="/assets/photos/ocean.jpg" alt="Ocean" className="w-full h-full object-cover" />
                    </motion.div>
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ 
                        scale: 1, 
                        opacity: 1,
                        rotate: [0, 4, 0, -4, 0]
                      }}
                      transition={{ 
                        scale: { delay: 0.48, type: 'spring', damping: 14 },
                        rotate: { repeat: Infinity, duration: 6, ease: 'easeInOut', delay: 1 }
                      }}
                      whileHover={{ scale: 1.18, rotate: 20 }}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden shadow-md border border-white cursor-pointer"
                    >
                      <img src="/assets/photos/earth.jpg" alt="Earth" className="w-full h-full object-cover" />
                    </motion.div>
                  </div>
                </motion.div>

                {/* Right Column: stability. */}
                <motion.div 
                  initial={{ x: 40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.22, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center text-center space-y-6"
                >
                  {/* Top: LinkedIn Badge */}
                  <motion.div 
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.28, type: 'spring', damping: 14, stiffness: 220 }}
                    whileHover={{ scale: 1.15, rotate: 6 }}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-[#0A66C2] flex items-center justify-center shadow-lg text-white font-bold text-3xl font-sans cursor-pointer"
                  >
                    in
                  </motion.div>

                  {/* Center: stability. with animated underline */}
                  <div className="relative inline-block">
                    <h3 className="text-4xl sm:text-5xl md:text-6xl font-sans font-black tracking-tight text-slate-900">
                      stability.
                    </h3>
                    <motion.div 
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.42, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                      className="h-[5px] bg-slate-900 mt-2 origin-left rounded-full"
                    />
                  </div>

                  {/* Bottom: Doctor in Scrubs + Facebook */}
                  <div className="flex items-center justify-center gap-4 pt-1">
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.5, type: 'spring', damping: 14 }}
                      whileHover={{ scale: 1.1, y: -3 }}
                      className="h-16 sm:h-20 w-28 sm:w-32 rounded-xl overflow-hidden shadow-md border border-white cursor-pointer"
                    >
                      <img src="/assets/photos/doctor.jpg" alt="Healthcare Doctor" className="w-full h-full object-cover" />
                    </motion.div>
                    <motion.div 
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.58, type: 'spring', damping: 14, stiffness: 220 }}
                      whileHover={{ scale: 1.15, rotate: -6 }}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#1877F2] flex items-center justify-center shadow-lg text-white font-black text-3xl font-sans cursor-pointer"
                    >
                      f
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          )}

          {/* ======================= 7. YELLOW ======================= */}
          {slide.id === 7 && (
            <div className="w-full max-w-5xl mx-auto my-auto flex flex-col items-center justify-center">
              {/* Title YELLOW */}
              <motion.h2 
                initial={{ y: -28, opacity: 0, scale: 0.92 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="text-6xl sm:text-8xl md:text-9xl font-canva-serif font-black uppercase tracking-wider text-[#D97706] mb-8 sm:mb-12"
              >
                YELLOW
              </motion.h2>

              <div className="grid grid-cols-2 gap-10 md:gap-20 w-full items-center">
                {/* Left Column: warmth */}
                <motion.div 
                  initial={{ x: -40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center text-center space-y-6"
                >
                  {/* Top: Glowing Sun */}
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ 
                      scale: [1, 1.03, 1],
                      opacity: 1 
                    }}
                    transition={{ 
                      scale: { repeat: Infinity, duration: 3.5, ease: 'easeInOut' },
                      opacity: { duration: 0.4 }
                    }}
                    whileHover={{ scale: 1.08, y: -3 }}
                    className="h-20 sm:h-24 w-36 sm:w-44 rounded-2xl overflow-hidden shadow-md border-2 border-white/80 cursor-pointer"
                  >
                    <img 
                      src="/assets/photos/sun.jpg" 
                      alt="Warm Glowing Sun" 
                      className="w-full h-full object-cover"
                    />
                  </motion.div>

                  {/* Center: warmth with animated underline */}
                  <div className="relative inline-block">
                    <h3 className="text-4xl sm:text-5xl md:text-6xl font-sans font-black tracking-tight text-slate-900">
                      warmth
                    </h3>
                    <motion.div 
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.35, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                      className="h-[5px] bg-slate-900 mt-2 origin-left rounded-full"
                    />
                  </div>

                  {/* Bottom: Incandescent Lightbulb */}
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.45, type: 'spring', damping: 14 }}
                    whileHover={{ scale: 1.1, y: -3 }}
                    className="h-16 sm:h-20 w-28 sm:w-32 rounded-xl overflow-hidden shadow-md border border-white cursor-pointer"
                  >
                    <img src="/assets/photos/lightbulb.jpg" alt="Lightbulb" className="w-full h-full object-cover" />
                  </motion.div>
                </motion.div>

                {/* Right Column: attention */}
                <motion.div 
                  initial={{ x: 40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.22, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center text-center space-y-6"
                >
                  {/* Top: Pedestrian Crossing Road Sign */}
                  <motion.div 
                    initial={{ scale: 0.6, opacity: 0, rotate: 25 }}
                    animate={{ scale: 1, opacity: 1, rotate: 45 }}
                    transition={{ delay: 0.28, type: 'spring', damping: 14, stiffness: 220 }}
                    whileHover={{ scale: 1.15, rotate: 50 }}
                    className="w-16 h-16 sm:w-20 sm:h-20 bg-amber-400 rounded-lg border-2 border-black flex items-center justify-center shadow-lg cursor-pointer"
                  >
                    <span className="-rotate-45 text-2xl sm:text-3xl">🚸</span>
                  </motion.div>

                  {/* Center: attention with animated underline */}
                  <div className="relative inline-block">
                    <h3 className="text-4xl sm:text-5xl md:text-6xl font-sans font-black tracking-tight text-slate-900">
                      attention
                    </h3>
                    <motion.div 
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.42, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                      className="h-[5px] bg-slate-900 mt-2 origin-left rounded-full"
                    />
                  </div>

                  {/* Bottom: 😂 Emoji + School bus + Caution banner */}
                  <div className="flex items-center justify-center gap-4 pt-1">
                    <motion.span 
                      animate={{ y: [0, -6, 0] }}
                      transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                      whileHover={{ scale: 1.3, rotate: -10 }}
                      className="text-4xl sm:text-5xl inline-block cursor-pointer"
                    >
                      😂
                    </motion.span>
                    <motion.span 
                      whileHover={{ scale: 1.25, x: 4 }}
                      className="text-4xl sm:text-5xl inline-block cursor-pointer"
                    >
                      🚌
                    </motion.span>
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
                      animate={{ scale: 1, opacity: 1, rotate: -3 }}
                      transition={{ delay: 0.5, type: 'spring', damping: 14 }}
                      whileHover={{ scale: 1.12, rotate: 0 }}
                      className="bg-amber-300 border-2 border-black px-3 py-1 font-black text-black text-xs sm:text-sm tracking-wider uppercase shadow-md cursor-pointer"
                    >
                      CAUTION
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          )}

          {/* ======================= 8. SECTION 02: COLORS ACROSS CULTURES ======================= */}
          {slide.id === 8 && (
            <div className="text-center my-auto max-w-4xl mx-auto">
              <motion.h2 
                initial={{ scale: 0.9, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="text-5xl sm:text-7xl md:text-8xl font-canva-serif font-black uppercase tracking-widest text-slate-950 leading-tight"
              >
                {slide.title}
              </motion.h2>
            </div>
          )}

          {/* ======================= 9. WHITE (WEST vs ASIA) ======================= */}
          {slide.id === 9 && (
            <div className="w-full max-w-5xl mx-auto my-auto flex flex-col items-center justify-center">
              <motion.h2 
                initial={{ y: -28, opacity: 0, scale: 0.92 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="text-6xl sm:text-8xl md:text-9xl font-canva-serif font-black uppercase tracking-wider text-slate-900 mb-8 sm:mb-12"
              >
                WHITE
              </motion.h2>

              <div className="grid grid-cols-2 gap-10 md:gap-16 w-full items-start">
                {/* Left Column: WEST */}
                <motion.div 
                  initial={{ x: -40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center text-center space-y-4"
                >
                  <div className="relative inline-block">
                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-sans font-black tracking-wider uppercase text-slate-900">
                      WEST
                    </h3>
                    <motion.div 
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="h-[4px] bg-slate-900 mt-1 origin-left rounded-full"
                    />
                  </div>
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.25, duration: 0.5 }}
                    whileHover={{ scale: 1.04, y: -4 }}
                    className="h-56 sm:h-72 w-full max-w-sm rounded-2xl overflow-hidden shadow-xl border border-slate-200 cursor-pointer"
                  >
                    <img src="/assets/photos/bride.jpg" alt="West Wedding" className="w-full h-full object-cover" />
                  </motion.div>
                  <span className="text-xs sm:text-sm font-semibold tracking-widest text-slate-500 uppercase">
                    Weddings, Purity & Peace
                  </span>
                </motion.div>

                {/* Right Column: ASIA */}
                <motion.div 
                  initial={{ x: 40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.22, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center text-center space-y-4"
                >
                  <div className="relative inline-block">
                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-sans font-black tracking-wider uppercase text-slate-900">
                      ASIA
                    </h3>
                    <motion.div 
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.4, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="h-[4px] bg-slate-900 mt-1 origin-left rounded-full"
                    />
                  </div>
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.35, duration: 0.5 }}
                    whileHover={{ scale: 1.04, y: -4 }}
                    className="h-56 sm:h-72 w-full max-w-sm rounded-2xl overflow-hidden shadow-xl border border-slate-200 cursor-pointer"
                  >
                    <img src="/assets/canva/elements/asset_07_850x564.png" alt="Asia Mourning" className="w-full h-full object-cover" />
                  </motion.div>
                  <span className="text-xs sm:text-sm font-semibold tracking-widest text-slate-500 uppercase">
                    Funerals, Mourning & Rebirth
                  </span>
                </motion.div>
              </div>
            </div>
          )}

          {/* ======================= 10. BLACK (U.S.A. vs AFRICA) ======================= */}
          {slide.id === 10 && (
            <div className="w-full max-w-5xl mx-auto my-auto flex flex-col items-center justify-center">
              <motion.h2 
                initial={{ y: -28, opacity: 0, scale: 0.92 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="text-6xl sm:text-8xl md:text-9xl font-canva-serif font-black uppercase tracking-wider text-slate-950 mb-8 sm:mb-12"
              >
                BLACK
              </motion.h2>

              <div className="grid grid-cols-2 gap-10 md:gap-16 w-full items-start">
                {/* Left Column: U.S.A. */}
                <motion.div 
                  initial={{ x: -40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center text-center space-y-4"
                >
                  <div className="relative inline-block">
                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-sans font-black tracking-wider uppercase text-slate-900">
                      U.S.A.
                    </h3>
                    <motion.div 
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="h-[4px] bg-slate-900 mt-1 origin-left rounded-full"
                    />
                  </div>
                  <div className="flex flex-col gap-3 w-full max-w-sm">
                    <motion.div 
                      initial={{ y: 15, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.25 }}
                      whileHover={{ scale: 1.04, y: -2 }}
                      className="h-32 sm:h-36 rounded-xl overflow-hidden shadow-lg border border-slate-200 cursor-pointer"
                    >
                      <img src="/assets/canva/elements/asset_08_390x280.png" alt="USA Judge" className="w-full h-full object-cover" />
                    </motion.div>
                    <motion.div 
                      initial={{ y: 15, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.35 }}
                      whileHover={{ scale: 1.04, y: -2 }}
                      className="h-32 sm:h-36 rounded-xl overflow-hidden shadow-lg border border-slate-200 cursor-pointer"
                    >
                      <img src="/assets/photos/black_car.jpg" alt="Black Sports Car" className="w-full h-full object-cover" />
                    </motion.div>
                  </div>
                  <span className="text-xs sm:text-sm font-semibold tracking-widest text-slate-500 uppercase">
                    Authority, Judiciary & Elegance
                  </span>
                </motion.div>

                {/* Right Column: AFRICA */}
                <motion.div 
                  initial={{ x: 40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.22, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center text-center space-y-4"
                >
                  <div className="relative inline-block">
                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-sans font-black tracking-wider uppercase text-slate-900">
                      AFRICA
                    </h3>
                    <motion.div 
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.4, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="h-[4px] bg-slate-900 mt-1 origin-left rounded-full"
                    />
                  </div>
                  <div className="flex flex-col gap-3 w-full max-w-sm items-center">
                    <motion.div 
                      initial={{ y: 15, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      whileHover={{ scale: 1.04, y: -2 }}
                      className="h-44 sm:h-48 w-full rounded-xl overflow-hidden shadow-lg border border-slate-200 cursor-pointer"
                    >
                      <img src="/assets/photos/muscular.jpg" alt="Strength & Masculinity" className="w-full h-full object-cover" />
                    </motion.div>
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.4, type: 'spring', damping: 14 }}
                      whileHover={{ scale: 1.08, rotate: 3 }}
                      className="h-20 sm:h-24 w-full rounded-xl overflow-hidden shadow-lg flex items-center justify-center bg-slate-950 cursor-pointer"
                    >
                      <img src="/assets/canva/elements/asset_09_447x447.png" alt="Mature" className="h-full w-auto object-contain" />
                    </motion.div>
                  </div>
                  <span className="text-xs sm:text-sm font-semibold tracking-widest text-slate-500 uppercase">
                    Strength, Maturity & Seniority
                  </span>
                </motion.div>
              </div>
            </div>
          )}

          {/* ======================= 11. GREEN (ISLAMIC vs IRISH) ======================= */}
          {slide.id === 11 && (
            <div className="w-full max-w-5xl mx-auto my-auto flex flex-col items-center justify-center">
              <motion.h2 
                initial={{ y: -28, opacity: 0, scale: 0.92 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="text-6xl sm:text-8xl md:text-9xl font-canva-serif font-black uppercase tracking-wider text-[#15803D] mb-8 sm:mb-12"
              >
                GREEN
              </motion.h2>

              <div className="grid grid-cols-2 gap-10 md:gap-16 w-full items-start">
                {/* Left Column: ISLAMIC */}
                <motion.div 
                  initial={{ x: -40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center text-center space-y-4"
                >
                  <div className="relative inline-block">
                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-sans font-black tracking-wider uppercase text-slate-900">
                      ISLAMIC
                    </h3>
                    <motion.div 
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="h-[4px] bg-slate-900 mt-1 origin-left rounded-full"
                    />
                  </div>
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.25, duration: 0.5 }}
                    whileHover={{ scale: 1.04, y: -4 }}
                    className="h-56 sm:h-72 w-full max-w-sm rounded-2xl overflow-hidden shadow-xl border border-slate-200 cursor-pointer"
                  >
                    <img src="/assets/canva/elements/asset_10_640x819.png" alt="Islamic Green Dome" className="w-full h-full object-cover" />
                  </motion.div>
                  <span className="text-xs sm:text-sm font-semibold tracking-widest text-slate-500 uppercase">
                    Paradise, Spirituality & Nature
                  </span>
                </motion.div>

                {/* Right Column: IRISH */}
                <motion.div 
                  initial={{ x: 40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.22, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center text-center space-y-4"
                >
                  <div className="relative inline-block">
                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-sans font-black tracking-wider uppercase text-slate-900">
                      IRISH
                    </h3>
                    <motion.div 
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.4, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="h-[4px] bg-slate-900 mt-1 origin-left rounded-full"
                    />
                  </div>
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.35, duration: 0.5 }}
                    whileHover={{ scale: 1.04, y: -4 }}
                    className="h-56 sm:h-72 w-full max-w-sm rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-emerald-600 via-green-700 to-emerald-900 p-8 flex flex-col items-center justify-center text-white border border-emerald-500 cursor-pointer"
                  >
                    <motion.span 
                      animate={{ scale: [1, 1.1, 1], rotate: [-2, 2, -2] }}
                      transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                      className="text-6xl sm:text-7xl mb-4 filter drop-shadow-md inline-block"
                    >
                      ☘️
                    </motion.span>
                    <span className="text-xl sm:text-2xl font-canva-serif font-bold tracking-wider text-amber-200 uppercase">
                      St. Patrick
                    </span>
                    <span className="text-sm font-sans text-emerald-100 font-semibold tracking-widest mt-1">
                      Heritage & Luck
                    </span>
                  </motion.div>
                  <span className="text-xs sm:text-sm font-semibold tracking-widest text-slate-500 uppercase">
                    Good Luck, Spring & Heritage
                  </span>
                </motion.div>
              </div>
            </div>
          )}

          {/* ======================= 12. FAKE OR REAL INTRO ======================= */}
          {slide.id === 12 && (
            <div className="text-center space-y-8 my-auto w-full max-w-4xl mx-auto flex flex-col items-center justify-center">
              <div className="text-6xl sm:text-8xl md:text-9xl font-black font-sans uppercase tracking-tight flex items-center justify-center gap-3 sm:gap-5">
                <motion.span 
                  initial={{ x: -50, opacity: 0, scale: 0.85 }}
                  animate={{ x: 0, opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', damping: 14, stiffness: 200 }}
                  className="text-red-600 inline-block"
                >
                  FAKE
                </motion.span>
                <motion.span 
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.15, duration: 0.4 }}
                  className="text-slate-800 font-canva-serif font-light lowercase text-4xl sm:text-6xl inline-block"
                >
                  or
                </motion.span>
                <motion.span 
                  initial={{ x: 50, opacity: 0, scale: 0.85 }}
                  animate={{ x: 0, opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', damping: 14, stiffness: 200, delay: 0.22 }}
                  className="text-emerald-600 inline-block"
                >
                  REAL
                </motion.span>
              </div>

              <motion.div 
                initial={{ y: 30, opacity: 0 }}
                animate={{ 
                  y: [0, -8, 0],
                  opacity: 1 
                }}
                transition={{ 
                  y: { repeat: Infinity, duration: 3.6, ease: 'easeInOut', delay: 0.6 },
                  opacity: { delay: 0.25, duration: 0.5 }
                }}
                whileHover={{ scale: 1.04 }}
                className="flex items-center justify-center pt-2 cursor-pointer"
              >
                <img 
                  src="/assets/canva/slide_12.png" 
                  alt="Fake or Real presenter" 
                  className="max-h-72 sm:max-h-84 md:max-h-96 w-auto object-contain drop-shadow-xl rounded-2xl"
                />
              </motion.div>
            </div>
          )}

          {/* ======================= 13, 15, 17, 19. TRIVIA QUESTIONS ======================= */}
          {slide.category === 'quiz-question' && slide.quiz && (
            <div className="text-center space-y-8 my-auto w-full max-w-4xl mx-auto">
              {/* Question Number in Canva Serif */}
              <motion.div 
                initial={{ y: -20, opacity: 0, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="text-4xl sm:text-6xl font-canva-serif font-black text-slate-950"
              >
                {slide.quiz.questionNumber}
              </motion.div>

              {/* Big, Clean Question Statement */}
              <motion.h3 
                initial={{ scale: 0.95, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
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
                  /* Interactive Voting Buttons with spring hover and tap */
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.28, duration: 0.5 }}
                    className="flex items-center gap-6"
                  >
                    <motion.button
                      onClick={() => handleGuess('REAL')}
                      whileHover={{ scale: 1.08, y: -3 }}
                      whileTap={{ scale: 0.93 }}
                      className="px-8 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-lg tracking-wider shadow-lg hover:shadow-emerald-500/30 transition-shadow flex items-center gap-2.5 cursor-pointer"
                    >
                      <CheckCircle2 className="w-6 h-6" />
                      <span>REAL</span>
                    </motion.button>

                    <motion.button
                      onClick={() => handleGuess('FAKE')}
                      whileHover={{ scale: 1.08, y: -3 }}
                      whileTap={{ scale: 0.93 }}
                      className="px-8 py-3.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-black text-lg tracking-wider shadow-lg hover:shadow-red-500/30 transition-shadow flex items-center gap-2.5 cursor-pointer"
                    >
                      <XCircle className="w-6 h-6" />
                      <span>FAKE</span>
                    </motion.button>
                  </motion.div>
                ) : (
                  /* Authentic Canva Underlined Verdict Reveal with Rubber Stamp Impact */
                  <motion.div
                    initial={{ scale: 1.8, opacity: 0, rotate: -8 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    transition={{ type: 'spring', damping: 11, stiffness: 220 }}
                    className="flex flex-col items-center gap-3"
                  >
                    <div className="relative inline-block">
                      <div className={`text-5xl sm:text-7xl font-sans font-black tracking-wider uppercase ${slide.quiz.verdict === 'REAL' ? 'text-emerald-600' : 'text-red-600'}`}>
                        {slide.quiz.verdict}
                      </div>
                      <motion.div 
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.25, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className={`h-[6px] mt-2 origin-left rounded-full ${slide.quiz.verdict === 'REAL' ? 'bg-emerald-600' : 'bg-red-600'}`}
                      />
                    </div>

                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.94 }}
                      onClick={handleResetGuess}
                      className="text-xs font-semibold text-slate-400 hover:text-slate-600 transition flex items-center gap-1 mt-3 cursor-pointer"
                      title="Reset voting"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Vote again</span>
                    </motion.button>
                  </motion.div>
                )}
              </div>
            </div>
          )}

          {/* ======================= 14, 16, 18, 20. WHY? ANSWERS ======================= */}
          {slide.category === 'quiz-answer' && (
            <div className="text-center space-y-8 my-auto w-full max-w-4xl mx-auto">
              <motion.h2 
                initial={{ y: -22, opacity: 0, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="text-4xl sm:text-6xl font-sans font-bold text-slate-950"
              >
                Why?
              </motion.h2>

              <motion.p 
                initial={{ y: 25, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="text-2xl sm:text-4xl md:text-5xl font-sans font-semibold text-slate-900 leading-snug px-4 max-w-3xl mx-auto"
              >
                {slide.subtitle}
              </motion.p>
            </div>
          )}

          {/* ======================= 21. CONCLUSION: THANK YOU! ======================= */}
          {slide.category === 'conclusion' && (
            <div className="text-center space-y-8 my-auto w-full max-w-5xl mx-auto flex flex-col items-center justify-center">
              {/* Ultra High-Res Authentic Canva 3D Thank You Graphic with Ambient Wave Float */}
              <motion.div 
                initial={{ scale: 0.65, opacity: 0, y: 20 }}
                animate={{ 
                  scale: 1, 
                  opacity: 1, 
                  y: [0, -9, 0] 
                }}
                transition={{ 
                  scale: { type: 'spring', damping: 14, stiffness: 180 },
                  opacity: { duration: 0.5 },
                  y: { repeat: Infinity, duration: 3.8, ease: 'easeInOut', delay: 0.7 }
                }}
                whileHover={{ scale: 1.08, rotate: -1 }}
                className="w-full flex justify-center py-4 cursor-pointer"
              >
                <img 
                  src="/assets/canva/elements/asset_11_1875x480.png" 
                  alt="Thank you!" 
                  className="max-h-56 sm:max-h-72 md:max-h-80 w-auto object-contain drop-shadow-2xl"
                />
              </motion.div>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="text-lg sm:text-2xl font-canva-serif text-slate-600 font-semibold tracking-wider uppercase"
              >
                {slide.subtitle}
              </motion.p>
            </div>
          )}

        </div>

        {/* Subtle Canva Bottom Footer */}
        <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-400 font-medium border-t border-slate-200/50 pt-2.5 mt-2">
          <span>{slide.id <= 2 ? 'Monday Presentation' : 'Monday Presentation • Colors'}</span>
          <span className="font-mono">Slide {slide.id} of 21</span>
        </div>
      </div>
    </MotionConfig>
  );
};
