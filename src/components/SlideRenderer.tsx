import React, { useState } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'motion/react';
import confetti from 'canvas-confetti';
import { SlideData } from '../types';
import { soundEngine } from '../lib/soundEffects';
import { 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Award, 
  Zap, 
  AlertTriangle, 
  Waves, 
  Compass, 
  Clover, 
  Moon, 
  Target, 
  Info, 
  BookOpen,
  Eye
} from 'lucide-react';

interface SlideRendererProps {
  slide: SlideData;
  scale?: number;
  isInteractive?: boolean;
  isExportMode?: boolean;
}

// Visible Light Electromagnetic Spectrum Bar Component
const VisibleSpectrumBar: React.FC<{ activeNm?: string; activeColor?: string; compact?: boolean }> = ({
  activeNm,
  activeColor,
  compact = false,
}) => {
  return (
    <div className={`w-full rounded-xl p-2.5 bg-white/70 backdrop-blur-md border border-gray-200/80 shadow-2xs ${compact ? 'py-1.5' : ''}`}>
      <div className="flex items-center justify-between text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
        <span className="flex items-center gap-1.5 font-mono">
          <Eye className="w-3.5 h-3.5 text-indigo-500" />
          <span>Visible Electromagnetic Spectrum (380 – 750 nm)</span>
        </span>
        {activeNm && (
          <span 
            className="px-2 py-0.5 rounded-full font-mono text-[10px] font-extrabold text-white shadow-xs"
            style={{ backgroundColor: activeColor || '#0F172A' }}
          >
            Current: {activeNm}
          </span>
        )}
      </div>

      {/* The Continuous Rainbow Spectrum Gradient Bar */}
      <div className="relative h-3 w-full rounded-full spectrum-gradient shadow-inner">
        {/* Active marker pin if nm is provided */}
        {activeNm?.includes('620') && (
          <div className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-red-600 shadow-md animate-pulse" />
        )}
        {activeNm?.includes('450') && (
          <div className="absolute left-16 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-blue-600 shadow-md animate-pulse" />
        )}
        {activeNm?.includes('570') && (
          <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-3 w-4 h-4 rounded-full bg-white border-2 border-amber-500 shadow-md animate-pulse" />
        )}
      </div>

      <div className="flex justify-between text-[9px] font-mono text-gray-500 font-semibold px-0.5 pt-1">
        <span>380nm Violet</span>
        <span className="text-blue-600 font-bold">450nm Blue</span>
        <span className="text-emerald-600 font-bold">520nm Green</span>
        <span className="text-amber-600 font-bold">580nm Yellow</span>
        <span className="text-red-600 font-bold">650nm Red</span>
        <span>750nm Infrared</span>
      </div>
    </div>
  );
};

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
            colors: ['#10B981', '#F59E0B', '#3B82F6', '#EF4444'],
          });
        } catch {
          // ignore
        }
      } else {
        soundEngine.playIncorrectTone();
      }
    }
  };

  // Category breadcrumb helper
  const getCategoryLabel = () => {
    switch (slide.category) {
      case 'cover':
        return 'EXECUTIVE KEYNOTE';
      case 'agenda':
        return 'ROADMAP & OBJECTIVES';
      case 'section':
        return 'CHAPTER OVERVIEW';
      case 'primary-overview':
        return 'CH. 01 • FOUNDATIONAL TRIAD';
      case 'primary-detail':
        return `CH. 01 • COLOR PSYCHOLOGY (${slide.title})`;
      case 'culture-compare':
        return `CH. 02 • CROSS-CULTURAL SEMIOTICS (${slide.title})`;
      case 'quiz-intro':
        return 'CH. 03 • INTERACTIVE SCIENCE TRIVIA';
      case 'quiz-question':
        return `CH. 03 • QUESTION ${slide.quiz?.questionNumber || ''}`;
      case 'quiz-answer':
        return 'CH. 03 • SCIENTIFIC EVIDENCE';
      case 'conclusion':
        return 'EXECUTIVE STRATEGY MATRIX';
      default:
        return 'PSYCHOLOGY OF COLORS';
    }
  };

  // Determine slide thematic background
  const isDarkSlide = slide.category === 'cover' || slide.category === 'section';

  return (
    <MotionConfig reducedMotion={isExportMode ? "always" : "never"} transition={isExportMode ? { duration: 0 } : undefined}>
      <div 
        className={`relative w-full h-full overflow-hidden flex flex-col justify-between select-none p-6 sm:p-9 md:p-11 lg:p-12 font-sans transition-colors duration-300 ${
          isDarkSlide 
            ? 'bg-gradient-to-br from-slate-950 via-[#0B0F19] to-slate-900 text-white' 
            : 'bg-[#F8FAFC] text-slate-900'
        }`}
        style={!isDarkSlide ? {
          backgroundImage: `radial-gradient(#E2E8F0 1.2px, transparent 1.2px), radial-gradient(#F1F5F9 1.2px, #F8FAFC 1.2px)`,
          backgroundSize: '32px 32px',
          backgroundPosition: '0 0, 16px 16px',
        } : undefined}
      >
        {/* Dynamic Chromatic Ambient Lighting Auroras */}
        {slide.category === 'cover' ? (
          <>
            <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-red-600/20 blur-3xl pointer-events-none" />
            <div className="absolute top-1/3 right-0 w-96 h-96 rounded-full bg-blue-600/20 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 left-1/3 w-96 h-96 rounded-full bg-amber-500/20 blur-3xl pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />
          </>
        ) : slide.category === 'section' ? (
          <>
            <div 
              className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full blur-[110px] pointer-events-none opacity-25"
              style={{ backgroundColor: slide.id === 3 ? '#DC2626' : slide.id === 8 ? '#2563EB' : '#16A34A' }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none" />
          </>
        ) : (
          <>
            <div 
              className="absolute -top-20 -left-20 w-80 h-80 rounded-full blur-[100px] pointer-events-none opacity-30 transition-colors duration-700" 
              style={{ backgroundColor: slide.colorHex || '#3B82F6' }}
            />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-slate-200/60 blur-[100px] pointer-events-none" />
          </>
        )}

        {/* Top Header Bar */}
        <div className={`relative z-10 flex items-center justify-between text-xs font-semibold tracking-wider uppercase border-b pb-2.5 mb-1.5 transition ${
          isDarkSlide ? 'border-slate-800 text-slate-400' : 'border-slate-200/80 text-slate-500'
        }`}>
          <div className="flex items-center gap-2.5">
            <span 
              className="w-2.5 h-2.5 rounded-full shadow-xs" 
              style={{ backgroundColor: slide.colorHex || (isDarkSlide ? '#F59E0B' : '#2563EB') }} 
            />
            <span className={`font-bold tracking-wide ${isDarkSlide ? 'text-slate-200' : 'text-slate-800'}`}>
              {getCategoryLabel()}
            </span>
            {slide.wavelengthNm && (
              <span className={`hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border shadow-2xs ${
                isDarkSlide 
                  ? 'bg-slate-900 border-slate-700 text-amber-400' 
                  : 'bg-white border-slate-200 text-slate-700'
              }`}>
                λ = {slide.wavelengthNm}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <span className={`text-[11px] px-3 py-0.5 rounded-full font-mono border shadow-2xs ${
              isDarkSlide 
                ? 'bg-slate-900/90 border-slate-700 text-slate-300' 
                : 'bg-white/90 border-slate-200 text-slate-700'
            }`}>
              SLIDE {slide.id.toString().padStart(2, '0')} / 21
            </span>
          </div>
        </div>

        {/* Slide Stage Body */}
        <div className="relative z-10 flex-1 flex flex-col justify-center my-auto py-1">

          {/* ======================= 1. COVER SLIDE ======================= */}
          {slide.category === 'cover' && (
            <div className="text-center max-w-5xl mx-auto space-y-6">
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-slate-900/90 border border-amber-400/40 text-amber-300 text-xs font-black tracking-widest uppercase shadow-lg backdrop-blur-md"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Executive Keynote • Cognitive & Cultural Science</span>
              </motion.div>

              <div className="space-y-3">
                <motion.h1 
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight uppercase font-['Oswald'] leading-none text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-amber-200 drop-shadow-sm"
                >
                  {slide.title}
                </motion.h1>

                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-base sm:text-xl md:text-2xl font-bold tracking-wide uppercase max-w-3xl mx-auto text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-amber-300 to-blue-400"
                >
                  {slide.subtitle}
                </motion.p>
              </div>

              {/* Empirical Research Snapshots */}
              {slide.metrics && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.35 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto pt-1"
                >
                  {slide.metrics.map((m, idx) => (
                    <div 
                      key={idx} 
                      className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-xl backdrop-blur-md flex items-center gap-4 text-left hover:border-slate-700 transition"
                    >
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center font-black text-2xl shrink-0 font-mono shadow-inner ${
                        idx === 0 
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' 
                          : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      }`}>
                        {m.value}
                      </div>
                      <div>
                        <div className="font-extrabold text-sm uppercase tracking-wider text-white">{m.label}</div>
                        <div className="text-xs text-slate-400 leading-snug mt-1 font-normal">{m.subtext}</div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* Central Takeaway Quote */}
              {slide.takeaway && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.45 }}
                  className="max-w-2xl mx-auto px-5 py-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs sm:text-sm text-slate-300 italic backdrop-blur-xs font-medium"
                >
                  "{slide.takeaway}"
                </motion.div>
              )}

              {/* Keyword tags */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.55 }}
                className="flex flex-wrap items-center justify-center gap-2 pt-1"
              >
                {slide.keywords?.map((tag, idx) => (
                  <span 
                    key={tag}
                    className={`px-3.5 py-1 text-xs font-extrabold rounded-lg border backdrop-blur-xs tracking-wider uppercase shadow-xs ${
                      idx === 0 ? 'bg-red-950/40 text-red-300 border-red-800/50' :
                      idx === 1 ? 'bg-blue-950/40 text-blue-300 border-blue-800/50' :
                      idx === 2 ? 'bg-amber-950/40 text-amber-300 border-amber-800/50' :
                      'bg-slate-800/60 text-slate-300 border-slate-700'
                    }`}
                  >
                    #{tag}
                  </span>
                ))}
              </motion.div>
            </div>
          )}

          {/* ======================= 2. AGENDA SLIDE ======================= */}
          {slide.category === 'agenda' && (
            <div className="max-w-5xl mx-auto w-full space-y-5">
              <div className="flex flex-col sm:flex-row items-baseline justify-between border-b border-gray-200/80 pb-3 gap-2">
                <div>
                  <motion.h2 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="text-3xl sm:text-5xl font-black font-['Oswald'] uppercase tracking-tight text-gray-950"
                  >
                    {slide.title}
                  </motion.h2>
                  <p className="text-gray-600 font-medium text-xs sm:text-sm mt-0.5">
                    {slide.subtitle}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-bold text-gray-700 bg-white px-3.5 py-1.5 rounded-xl border border-gray-200 shadow-2xs">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  <span>4 Core Pillars • ~20 Minutes Total</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {slide.bullets?.map((item, idx) => {
                  const parts = item.split('—');
                  const heading = parts[0] || item;
                  const desc = parts[1] || '';
                  const pillarColors = ['#DC2626', '#2563EB', '#D97706', '#16A34A'];
                  const currentColor = pillarColors[idx % pillarColors.length];

                  return (
                    <motion.div
                      key={idx}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.15 + idx * 0.1 }}
                      className="p-5 rounded-2xl bg-white border border-gray-200 shadow-xs hover:border-blue-500 hover:shadow-md transition-all group flex flex-col justify-between relative overflow-hidden"
                    >
                      <div 
                        className="absolute top-0 left-0 right-0 h-1 transition-all group-hover:h-1.5"
                        style={{ backgroundColor: currentColor }}
                      />
                      <div className="space-y-2 pt-1">
                        <div className="flex items-center justify-between">
                          <span 
                            className="w-8 h-8 rounded-xl font-black text-sm flex items-center justify-center shrink-0 font-mono shadow-2xs"
                            style={{ 
                              backgroundColor: `${currentColor}15`, 
                              color: currentColor 
                            }}
                          >
                            0{idx + 1}
                          </span>
                          <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider">
                            MODULE 0{idx + 1}
                          </span>
                        </div>
                        <h3 className="text-base font-extrabold text-gray-950 group-hover:text-blue-600 transition">
                          {heading.replace(/^\d+\.\s*/, '')}
                        </h3>
                        {desc && (
                          <p className="text-xs text-gray-600 leading-relaxed font-normal">
                            {desc.trim()}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Agenda Footer Overview */}
              {slide.metrics && (
                <div className="flex flex-wrap items-center justify-between p-3 rounded-xl bg-white border border-gray-200/90 shadow-2xs text-xs font-semibold text-gray-700 gap-3">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-emerald-600" />
                    <span>Learning Objective: Master psychological trigger palettes and international market semiotics</span>
                  </div>
                  <div className="flex items-center gap-4 text-gray-500 font-mono text-[11px]">
                    <span>Pillars: 4</span>
                    <span>Audience: Interactive Quiz Included</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ======================= 3. SECTION DIVIDER ======================= */}
          {slide.category === 'section' && (
            <div className="relative text-center max-w-4xl mx-auto space-y-6">
              {/* Oversized Background Watermark Number */}
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 text-[140px] sm:text-[180px] font-black font-['Oswald'] text-slate-800/30 select-none pointer-events-none -z-0">
                0{slide.id === 3 ? 1 : slide.id === 8 ? 2 : 3}
              </div>

              <div className="relative z-10 space-y-5">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 16 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-700 text-amber-400 text-xs font-black uppercase tracking-widest shadow-xl"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Chapter 0{slide.id === 3 ? 1 : slide.id === 8 ? 2 : 3} Focus</span>
                </motion.div>

                <motion.h2
                  initial={{ scale: 0.92, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className="text-4xl sm:text-6xl lg:text-7xl font-black font-['Oswald'] uppercase tracking-tight text-white drop-shadow-md"
                >
                  {slide.title}
                </motion.h2>

                {slide.subtitle && (
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-base sm:text-xl font-bold text-slate-300 uppercase tracking-wider max-w-2xl mx-auto"
                  >
                    {slide.subtitle}
                  </motion.p>
                )}

                {slide.takeaway && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 }}
                    className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 max-w-2xl mx-auto shadow-2xl text-sm sm:text-base font-semibold text-slate-200 italic backdrop-blur-md"
                  >
                    {slide.takeaway}
                  </motion.div>
                )}
              </div>
            </div>
          )}

          {/* ======================= 4. PRIMARY OVERVIEW ======================= */}
          {slide.category === 'primary-overview' && (
            <div className="max-w-5xl mx-auto w-full space-y-4">
              <div className="text-center space-y-1">
                <motion.h2 
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-4xl sm:text-6xl font-black font-['Oswald'] uppercase tracking-tight text-gray-950"
                >
                  {slide.title}
                </motion.h2>
                <p className="text-gray-600 font-medium text-xs sm:text-sm">
                  {slide.subtitle}
                </p>
              </div>

              {/* Electromagnetic Spectrum Visualizer Bar */}
              <VisibleSpectrumBar compact={true} />

              {/* Triad Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
                {[
                  { 
                    name: 'RED', 
                    color: '#DC2626', 
                    gradient: 'from-red-600 to-rose-700',
                    border: '#FECACA', 
                    wavelength: '620–750 nm',
                    badge: 'Long Wavelength',
                    text: 'Urgency • Adrenaline • Appetite Stimulation',
                    neuro: 'Activates sympathetic nervous system; accelerates heart rate'
                  },
                  { 
                    name: 'BLUE', 
                    color: '#1D4ED8', 
                    gradient: 'from-blue-600 to-indigo-700',
                    border: '#BFDBFE', 
                    wavelength: '450–495 nm',
                    badge: 'Short Wavelength',
                    text: 'Serenity • Mental Stability • Corporate Trust',
                    neuro: 'Triggers parasympathetic calming state; lowers pulse rate'
                  },
                  { 
                    name: 'YELLOW', 
                    color: '#D97706', 
                    gradient: 'from-amber-500 to-yellow-600',
                    border: '#FDE68A', 
                    wavelength: '570–590 nm',
                    badge: 'Photopic Sensitivity Peak',
                    text: 'Warmth • Peripheral Speed • High Alert',
                    neuro: 'Captured 1.24x faster peripherally; stimulates dopamine'
                  },
                ].map((c, i) => (
                  <motion.div
                    key={c.name}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 + i * 0.15 }}
                    className="rounded-2xl p-5 border-2 shadow-xs flex flex-col items-center text-center hover:shadow-xl transition-all group bg-white relative overflow-hidden"
                    style={{ borderColor: c.border }}
                  >
                    <div 
                      className={`w-16 h-16 rounded-2xl mb-2.5 shadow-md flex flex-col items-center justify-center text-white font-extrabold group-hover:scale-105 transition duration-300 bg-gradient-to-br ${c.gradient}`}
                    >
                      <span className="text-2xl font-black font-['Oswald']">{c.name[0]}</span>
                      <span className="text-[9px] font-mono opacity-90">{c.wavelength.split('–')[0]}</span>
                    </div>

                    <h3 className="text-2xl font-black font-['Oswald'] tracking-wider" style={{ color: c.color }}>
                      {c.name}
                    </h3>
                    
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-gray-100 text-gray-700 font-bold mt-1">
                      λ = {c.wavelength}
                    </span>

                    <p className="text-xs font-bold text-gray-800 mt-2.5 leading-snug">
                      {c.text}
                    </p>

                    <div className="mt-3 pt-2.5 border-t border-gray-100 text-[11px] text-gray-500 font-normal leading-relaxed">
                      {c.neuro}
                    </div>
                  </motion.div>
                ))}
              </div>

              {slide.scientificCitation && (
                <div className="text-center text-xs text-gray-600 font-medium pt-1 flex items-center justify-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                  <span>{slide.scientificCitation}</span>
                </div>
              )}
            </div>
          )}

          {/* ======================= 5. PRIMARY DETAIL (RED, BLUE, YELLOW) ======================= */}
          {slide.category === 'primary-detail' && (
            <div className="max-w-5xl mx-auto w-full space-y-4">
              {/* Header with Title and Wavelength */}
              <div className="flex flex-col sm:flex-row items-baseline justify-between border-b border-gray-200/80 pb-2.5 gap-2">
                <div className="flex items-center gap-3">
                  <motion.h2 
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="text-5xl sm:text-6xl font-black font-['Oswald'] uppercase tracking-tight"
                    style={{ color: slide.colorHex }}
                  >
                    {slide.title}
                  </motion.h2>

                  {slide.wavelengthNm && (
                    <span 
                      className="px-3 py-1 rounded-lg text-xs font-mono font-black tracking-wide border shadow-2xs"
                      style={{ 
                        backgroundColor: `${slide.colorHex}15`, 
                        borderColor: `${slide.colorHex}40`,
                        color: slide.colorHex 
                      }}
                    >
                      λ = {slide.wavelengthNm}
                    </span>
                  )}
                </div>

                {/* Keywords Chips */}
                <div className="flex flex-wrap items-center gap-1.5">
                  {slide.keywords?.map((kw, i) => (
                    <motion.span
                      key={kw}
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.15 + i * 0.08 }}
                      className="px-2.5 py-0.5 text-xs font-extrabold rounded-lg bg-white border border-gray-200 shadow-2xs uppercase tracking-wider text-gray-700"
                    >
                      {kw}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Visible Spectrum Positioner Bar */}
              <VisibleSpectrumBar activeNm={slide.wavelengthNm} activeColor={slide.colorHex} compact={true} />

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                {/* Left Column: Bullets & Executive Design Rule */}
                <div className="md:col-span-8 space-y-2.5">
                  {slide.bullets?.map((bullet, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 + idx * 0.1 }}
                      className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-gray-200 shadow-2xs hover:shadow-xs transition"
                    >
                      <div 
                        className="w-3.5 h-3.5 rounded-full mt-0.5 shrink-0 shadow-xs flex items-center justify-center"
                        style={{ backgroundColor: slide.colorHex }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-gray-800 leading-relaxed">
                        {bullet}
                      </span>
                    </motion.div>
                  ))}

                  {/* Executive Design Rule Box */}
                  {slide.takeaway && (
                    <div 
                      className="p-3.5 rounded-xl border-l-4 border shadow-xs text-xs sm:text-sm font-semibold flex items-start gap-2.5 mt-2 bg-white"
                      style={{ 
                        borderLeftColor: slide.colorHex,
                        borderColor: `${slide.colorHex}30`
                      }}
                    >
                      <Info className="w-4 h-4 shrink-0 mt-0.5" style={{ color: slide.colorHex }} />
                      <div>
                        <strong className="block font-extrabold uppercase text-[11px] tracking-wider" style={{ color: slide.colorHex }}>
                          Executive Design Rule
                        </strong>
                        <span className="text-gray-700 leading-relaxed">{slide.takeaway}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column: Research Metrics & Iconic Brand Utilization */}
                <div className="md:col-span-4 flex flex-col gap-3">
                  {/* Empirical Metric Cards */}
                  {slide.metrics?.map((m, idx) => (
                    <div 
                      key={idx}
                      className="p-3.5 rounded-xl bg-white border border-gray-200 shadow-2xs flex items-center justify-between"
                    >
                      <div>
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{m.label}</div>
                        <div className="text-[11px] text-gray-600 mt-0.5 font-medium leading-snug">{m.subtext}</div>
                      </div>
                      <div 
                        className="text-xl font-black font-mono ml-2 shrink-0"
                        style={{ color: slide.colorHex }}
                      >
                        {m.value}
                      </div>
                    </div>
                  ))}

                  {/* Brand Applications Pill Box */}
                  {slide.brandExamples && (
                    <div className="p-3.5 rounded-xl bg-white border border-gray-200 shadow-2xs space-y-2">
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 text-amber-500" />
                        <span>Iconic Brand Utilization</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {slide.brandExamples.map((brand) => (
                          <span 
                            key={brand}
                            className="px-2.5 py-1 rounded-lg text-xs font-bold border shadow-2xs"
                            style={{ 
                              backgroundColor: `${slide.colorHex}10`,
                              borderColor: `${slide.colorHex}25`,
                              color: slide.colorHex 
                            }}
                          >
                            {brand}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ======================= 6. CULTURE COMPARISON ======================= */}
          {slide.category === 'culture-compare' && (
            <div className="max-w-5xl mx-auto w-full space-y-4">
              <div className="text-center space-y-0.5">
                <motion.h2 
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-4xl sm:text-6xl font-black font-['Oswald'] uppercase tracking-tight"
                  style={{ color: slide.colorHex }}
                >
                  {slide.title}
                </motion.h2>
                <p className="text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-widest">
                  Opposite Meanings Across Civilizations & Continents
                </p>
              </div>

              {/* Side-by-side Comparative Panels */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                {slide.cultureItems?.map((item, idx) => (
                  <motion.div
                    key={item.region}
                    initial={{ x: idx === 0 ? -25 : 25, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 + idx * 0.15 }}
                    className="p-5 rounded-2xl bg-white border-2 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                    style={{ borderColor: idx === 0 ? '#CBD5E1' : `${slide.colorHex}60` }}
                  >
                    <div>
                      <div className="flex items-center justify-between border-b border-gray-100 pb-2.5 mb-2.5">
                        <span className="text-base font-black tracking-wider text-gray-950 font-['Oswald'] uppercase">
                          {item.region}
                        </span>
                        {item.iconName === 'Clover' ? (
                          <Clover className="w-5 h-5 text-emerald-600" />
                        ) : item.iconName === 'Sparkles' ? (
                          <Sparkles className="w-5 h-5 text-amber-500" />
                        ) : item.iconName === 'ShieldCheck' ? (
                          <ShieldCheck className="w-5 h-5 text-slate-800" />
                        ) : item.iconName === 'Moon' ? (
                          <Moon className="w-5 h-5 text-indigo-600" />
                        ) : item.iconName === 'Zap' ? (
                          <Zap className="w-5 h-5 text-amber-600" />
                        ) : (
                          <Compass className="w-5 h-5 text-blue-600" />
                        )}
                      </div>

                      <h3 
                        className="text-lg font-black mb-1.5 leading-snug"
                        style={{ color: slide.colorHex }}
                      >
                        {item.meaning}
                      </h3>

                      <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-normal">
                        {item.details}
                      </p>
                    </div>

                    <div className="pt-2.5 mt-2.5 border-t border-gray-100 flex items-center justify-between text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                      <span>Cultural Semiotics</span>
                      <span className="font-mono text-gray-500">{item.region.split(' ')[0]}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Cross-Cultural Warning / Case Study */}
              {slide.takeaway && (
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-xs sm:text-sm text-amber-950 flex items-start gap-3 shadow-2xs">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-black uppercase text-[11px] tracking-wider text-amber-900">
                      Global Marketing Risk / Cultural Taboo:
                    </strong>
                    <span className="text-amber-950 leading-relaxed">{slide.takeaway}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ======================= 7. QUIZ INTRO ======================= */}
          {slide.category === 'quiz-intro' && (
            <div className="text-center max-w-3xl mx-auto space-y-5">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', bounce: 0.5 }}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 font-extrabold text-xs uppercase shadow-xs"
              >
                <HelpCircle className="w-4 h-4 text-emerald-600" />
                <span>Audience Participation • Test Your Intuition</span>
              </motion.div>

              <motion.h2 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-5xl sm:text-7xl lg:text-8xl font-black font-['Oswald'] uppercase tracking-tight"
              >
                <span className="text-red-600 drop-shadow-sm">FAKE</span>{' '}
                <span className="text-gray-400 font-sans font-light">or</span>{' '}
                <span className="text-emerald-600 drop-shadow-sm">REAL</span>
              </motion.h2>

              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="space-y-3 text-gray-700 font-medium text-xs sm:text-sm max-w-xl mx-auto"
              >
                {slide.bullets?.map((b, i) => (
                  <p key={i} className="p-3.5 rounded-xl bg-white border border-gray-200 shadow-2xs leading-relaxed">
                    {b}
                  </p>
                ))}
              </motion.div>

              <div className="pt-1 text-xs font-bold text-gray-500 uppercase tracking-wider">
                Click or call out your answer on each upcoming slide!
              </div>
            </div>
          )}

          {/* ======================= 8. QUIZ QUESTION ======================= */}
          {slide.category === 'quiz-question' && slide.quiz && (
            <div className="max-w-4xl mx-auto w-full text-center space-y-5">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-14 h-14 mx-auto rounded-2xl bg-gray-950 text-white font-black text-2xl flex items-center justify-center font-['Oswald'] shadow-lg"
              >
                {slide.quiz.questionNumber}
              </motion.div>

              {/* The Question Statement Card */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-gray-200 shadow-lg relative max-w-3xl mx-auto"
              >
                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 font-mono">
                  TRIVIA CHALLENGE #{slide.quiz.questionNumber}
                </div>
                <blockquote className="text-xl sm:text-3xl md:text-4xl font-black text-gray-950 leading-snug font-['Oswald'] tracking-wide">
                  "{slide.quiz.statement}"
                </blockquote>
              </motion.div>

              {/* Interactive Guess Buttons & Verdict Reveal */}
              <div className="pt-2 flex flex-col items-center gap-3">
                {isExportMode ? (
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex items-center gap-4">
                      <div className="px-6 py-2.5 rounded-xl bg-emerald-50 border-2 border-emerald-500 text-emerald-800 font-extrabold text-sm tracking-wider flex items-center gap-2 shadow-xs">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        <span>OPTION A: REAL</span>
                      </div>
                      <div className="px-6 py-2.5 rounded-xl bg-red-50 border-2 border-red-500 text-red-800 font-extrabold text-sm tracking-wider flex items-center gap-2 shadow-xs">
                        <XCircle className="w-5 h-5 text-red-600" />
                        <span>OPTION B: FAKE</span>
                      </div>
                    </div>
                    <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                      Guess before advancing to unveil the scientific evidence!
                    </span>
                  </div>
                ) : !isRevealed ? (
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleGuess('REAL')}
                      className="px-8 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-black text-base tracking-wider shadow-lg hover:shadow-emerald-500/25 transition-all flex items-center gap-2.5 cursor-pointer"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      <span>IT'S REAL!</span>
                    </button>

                    <button
                      onClick={() => handleGuess('FAKE')}
                      className="px-8 py-3.5 rounded-2xl bg-red-600 hover:bg-red-700 active:scale-95 text-white font-black text-base tracking-wider shadow-lg hover:shadow-red-500/25 transition-all flex items-center gap-2.5 cursor-pointer"
                    >
                      <XCircle className="w-5 h-5" />
                      <span>IT'S FAKE!</span>
                    </button>
                  </div>
                ) : (
                  <motion.div
                    initial={{ scale: 0.3, rotate: -10, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    transition={{ type: 'spring', damping: 14, stiffness: 220 }}
                    className="flex flex-col items-center gap-2"
                  >
                    <div 
                      className={`px-8 py-3 rounded-2xl font-black text-3xl sm:text-4xl font-['Oswald'] tracking-widest uppercase shadow-2xl border-4 flex items-center gap-3 ${
                        slide.quiz.verdict === 'REAL'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-500'
                          : 'bg-red-50 text-red-700 border-red-500'
                      }`}
                    >
                      {slide.quiz.verdict === 'REAL' ? (
                        <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                      ) : (
                        <XCircle className="w-8 h-8 text-red-600" />
                      )}
                      <span>VERDICT: {slide.quiz.verdict}!</span>
                    </div>

                    {userGuess && (
                      <span className="text-xs font-bold text-gray-700 mt-0.5">
                        {userGuess === slide.quiz.verdict 
                          ? '🎉 Audience was correct! Advance to see the scientific proof.' 
                          : '💡 Advance to the next slide to discover the scientific reason!'}
                      </span>
                    )}
                  </motion.div>
                )}
              </div>
            </div>
          )}

          {/* ======================= 9. QUIZ ANSWER / SCIENTIFIC PROOF ======================= */}
          {slide.category === 'quiz-answer' && (
            <div className="max-w-5xl mx-auto w-full space-y-4">
              <div className="flex flex-col sm:flex-row items-baseline justify-between border-b border-gray-200/80 pb-2.5 gap-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-black px-2.5 py-0.5 bg-amber-100 text-amber-900 rounded-md uppercase tracking-wider">
                      Empirical Scientific Verdict
                    </span>
                  </div>
                  <motion.h2
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="text-2xl sm:text-4xl font-black font-['Oswald'] uppercase tracking-tight text-gray-950"
                  >
                    {slide.subtitle || 'Why?'}
                  </motion.h2>
                </div>

                {/* Evidence Metrics */}
                {slide.metrics && (
                  <div className="flex items-center gap-2.5">
                    {slide.metrics.map((m, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-white border border-gray-200 text-right shadow-2xs">
                        <div className="text-[9px] font-bold text-gray-400 uppercase">{m.label}</div>
                        <div className="text-sm font-black font-mono" style={{ color: slide.colorHex }}>{m.value}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2.5 pt-1">
                {slide.bullets?.map((b, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.15 + idx * 0.1 }}
                    className="p-3.5 rounded-xl bg-white border border-gray-200 shadow-2xs text-xs sm:text-sm text-gray-800 leading-relaxed font-medium flex items-start gap-3"
                  >
                    <span 
                      className="w-2.5 h-2.5 rounded-full mt-1.5 shrink-0" 
                      style={{ backgroundColor: slide.colorHex || '#2563EB' }} 
                    />
                    <span>{b}</span>
                  </motion.div>
                ))}
              </div>

              {slide.takeaway && (
                <div 
                  className="p-3 rounded-xl border text-xs sm:text-sm font-semibold flex items-start gap-2.5 bg-white shadow-2xs"
                  style={{ 
                    borderColor: `${slide.colorHex}30` 
                  }}
                >
                  <Sparkles className="w-4 h-4 shrink-0 mt-0.5" style={{ color: slide.colorHex }} />
                  <div>
                    <strong className="block text-[10px] uppercase tracking-wider font-extrabold" style={{ color: slide.colorHex }}>
                      Practitioner Takeaway
                    </strong>
                    <span className="text-gray-800">{slide.takeaway}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ======================= 10. CONCLUSION & STRATEGY MATRIX ======================= */}
          {slide.category === 'conclusion' && (
            <div className="max-w-5xl mx-auto w-full text-center space-y-4">
              <div className="space-y-1">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-12 h-12 mx-auto rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-lg"
                >
                  <Target className="w-6 h-6 text-amber-400" />
                </motion.div>

                <motion.h2
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-3xl sm:text-5xl font-black font-['Oswald'] uppercase tracking-tight text-gray-950"
                >
                  {slide.title}
                </motion.h2>

                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15 }}
                  className="text-xs sm:text-sm font-bold text-gray-600 uppercase tracking-wider"
                >
                  {slide.subtitle}
                </motion.p>
              </div>

              {/* The Executive Color Matrix Framework */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-left pt-1">
                {[
                  { 
                    hue: 'RED', 
                    color: '#DC2626', 
                    emotion: 'Adrenaline, Urgency, Hunger', 
                    bestFor: 'CTAs, Food & Beverage, Emergency Alerts',
                    caution: 'Overuse causes anxiety & retinal fatigue'
                  },
                  { 
                    hue: 'BLUE', 
                    color: '#1D4ED8', 
                    emotion: 'Security, Dependability, Calm', 
                    bestFor: 'Finance, Tech, Healthcare, Enterprise',
                    caution: 'Suppresses appetite; cold if unaccented'
                  },
                  { 
                    hue: 'YELLOW', 
                    color: '#D97706', 
                    emotion: 'Cheer, Speed, High Alert', 
                    bestFor: 'Safety Signage, Accents, Retail Callouts',
                    caution: 'Low contrast on white; causes visual glare'
                  },
                ].map((item) => (
                  <div 
                    key={item.hue}
                    className="p-4 rounded-2xl bg-white border border-gray-200 shadow-2xs space-y-1.5 hover:shadow-md transition relative overflow-hidden"
                  >
                    <div className="h-1 absolute top-0 left-0 right-0" style={{ backgroundColor: item.color }} />
                    <div className="flex items-center justify-between pt-1">
                      <span className="font-black font-['Oswald'] text-lg tracking-wide" style={{ color: item.color }}>
                        {item.hue}
                      </span>
                      <span className="w-3.5 h-3.5 rounded-full shadow-2xs" style={{ backgroundColor: item.color }} />
                    </div>
                    <div className="text-xs text-gray-700">
                      <strong>Triggers:</strong> {item.emotion}
                    </div>
                    <div className="text-xs text-gray-700">
                      <strong>Best For:</strong> {item.bestFor}
                    </div>
                    <div className="text-[11px] text-gray-500 font-normal">
                      <strong>Caution:</strong> {item.caution}
                    </div>
                  </div>
                ))}
              </div>

              {/* Closing Callout */}
              <div className="p-3.5 rounded-2xl bg-slate-900 text-white max-w-2xl mx-auto shadow-xl flex items-center justify-between text-left">
                <div>
                  <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">Thank You for Your Attention!</div>
                  <div className="text-xs sm:text-sm text-gray-200 font-semibold mt-0.5">Floor Open for Q&A, Observations & Brainstorming</div>
                </div>
                <Sparkles className="w-5 h-5 text-amber-400 shrink-0 ml-3" />
              </div>
            </div>
          )}
        </div>

        {/* Bottom Footer Bar */}
        <div className={`relative z-10 flex items-center justify-between text-[11px] font-medium border-t pt-2 mt-1.5 transition ${
          isDarkSlide ? 'border-slate-800 text-slate-500' : 'border-slate-200/70 text-slate-400'
        }`}>
          <span>Monday Presentation • The Psychology & Cultural Power of Colors</span>
          <span className="font-mono">Slide {slide.id} of 21</span>
        </div>
      </div>
    </MotionConfig>
  );
};
