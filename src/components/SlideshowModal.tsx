import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Play, 
  Pause, 
  MessageSquare, 
  Pointer as PointerIcon,
  Maximize,
  Minimize,
  Grid,
  Volume2,
  VolumeX,
  Clock,
  RotateCcw,
  Sparkles,
  Layers
} from 'lucide-react';
import { SlideData, TransitionType } from '../types';
import { SlideRenderer } from './SlideRenderer';
import { soundEngine } from '../lib/soundEffects';

interface SlideshowModalProps {
  isOpen: boolean;
  onClose: () => void;
  slides: SlideData[];
  currentIndex: number;
  onSelectIndex: (index: number) => void;
  transitionType: TransitionType;
  transitionDuration: number;
  autoPlayInterval: number;
}

export const SlideshowModal: React.FC<SlideshowModalProps> = ({
  isOpen,
  onClose,
  slides,
  currentIndex,
  onSelectIndex,
  transitionType,
  transitionDuration,
  autoPlayInterval,
}) => {
  const [isPlaying, setIsPlaying] = useState(autoPlayInterval > 0);
  const [showNotes, setShowNotes] = useState(false);
  const [isLaserPointer, setIsLaserPointer] = useState(false);
  const [laserPos, setLaserPos] = useState({ x: 0, y: 0 });
  const [showControls, setShowControls] = useState(true);
  const [showGridNavigator, setShowGridNavigator] = useState(false);
  const [isBlackout, setIsBlackout] = useState(false);
  const [isWhiteout, setIsWhiteout] = useState(false);
  const [isMuted, setIsMuted] = useState(soundEngine.isMuted);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const elapsedTimerRef = useRef<NodeJS.Timeout | null>(null);
  const hideControlsTimer = useRef<NodeJS.Timeout | null>(null);

  const currentSlide = slides[currentIndex];

  // Presentation stopwatch
  useEffect(() => {
    if (!isOpen) {
      setElapsedSeconds(0);
      if (elapsedTimerRef.current) clearInterval(elapsedTimerRef.current);
      return;
    }

    elapsedTimerRef.current = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);

    return () => {
      if (elapsedTimerRef.current) clearInterval(elapsedTimerRef.current);
    };
  }, [isOpen]);

  // Format elapsed time as mm:ss
  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Auto-play timer
  useEffect(() => {
    if (!isOpen || !isPlaying || autoPlayInterval <= 0) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      onSelectIndex((prev) => {
        const next = (prev + 1) % slides.length;
        soundEngine.playSlideChange();
        return next;
      });
    }, autoPlayInterval * 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isOpen, isPlaying, autoPlayInterval, slides.length, onSelectIndex]);

  // Navigate with sound
  const handleGoNext = () => {
    if (currentIndex < slides.length - 1) {
      soundEngine.playSlideChange();
      onSelectIndex(currentIndex + 1);
    }
  };

  const handleGoPrev = () => {
    if (currentIndex > 0) {
      soundEngine.playSlideChange();
      onSelectIndex(currentIndex - 1);
    }
  };

  const handleJumpToSlide = (idx: number) => {
    soundEngine.playSlideChange();
    onSelectIndex(idx);
    setShowGridNavigator(false);
  };

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await containerRef.current?.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch {
      // Fullscreen not supported or blocked in iframe
    }
  };

  const toggleSound = () => {
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
  };

  // Keyboard shortcuts
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Do not trigger shortcuts when typing in an input
      if ((e.target as HTMLElement)?.tagName === 'INPUT' || (e.target as HTMLElement)?.tagName === 'TEXTAREA') {
        return;
      }

      if (e.key === 'Escape') {
        if (showGridNavigator) {
          setShowGridNavigator(false);
        } else if (isBlackout || isWhiteout) {
          setIsBlackout(false);
          setIsWhiteout(false);
        } else {
          onClose();
        }
      } else if (e.key === 'ArrowRight' || e.key === 'Space' || e.key === 'PageDown') {
        e.preventDefault();
        handleGoNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        handleGoPrev();
      } else if (e.key === 'l' || e.key === 'L') {
        setIsLaserPointer((prev) => !prev);
      } else if (e.key === 'n' || e.key === 'N') {
        setShowNotes((prev) => !prev);
      } else if (e.key === 'g' || e.key === 'G') {
        setShowGridNavigator((prev) => !prev);
      } else if (e.key === 'b' || e.key === 'B') {
        setIsBlackout((prev) => !prev);
        setIsWhiteout(false);
      } else if (e.key === 'w' || e.key === 'W') {
        setIsWhiteout((prev) => !prev);
        setIsBlackout(false);
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      } else if (e.key === 'm' || e.key === 'M') {
        toggleSound();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, slides.length, showGridNavigator, isBlackout, isWhiteout]);

  // Mouse move handler for laser pointer & auto-hiding controls
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isLaserPointer) {
      setLaserPos({ x: e.clientX, y: e.clientY });
    }

    setShowControls(true);
    if (hideControlsTimer.current) clearTimeout(hideControlsTimer.current);
    hideControlsTimer.current = setTimeout(() => {
      setShowControls(false);
    }, 4000);
  };

  if (!isOpen) return null;

  // Variants for transition animation
  const getVariants = () => {
    switch (transitionType) {
      case 'slide-left':
        return {
          initial: { x: '100%', opacity: 0 },
          animate: { x: 0, opacity: 1 },
          exit: { x: '-100%', opacity: 0 },
        };
      case 'slide-right':
        return {
          initial: { x: '-100%', opacity: 0 },
          animate: { x: 0, opacity: 1 },
          exit: { x: '100%', opacity: 0 },
        };
      case 'zoom':
        return {
          initial: { scale: 0.88, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          exit: { scale: 1.1, opacity: 0 },
        };
      case 'flip':
        return {
          initial: { rotateY: 70, opacity: 0 },
          animate: { rotateY: 0, opacity: 1 },
          exit: { rotateY: -70, opacity: 0 },
        };
      case 'none':
        return {
          initial: { opacity: 1 },
          animate: { opacity: 1 },
          exit: { opacity: 1 },
        };
      case 'fade':
      default:
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
        };
    }
  };

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 bg-[#0B0F17] flex items-center justify-center select-none overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Blackout Mode (Speaker focus) */}
      {isBlackout && (
        <div 
          onClick={() => setIsBlackout(false)}
          className="fixed inset-0 z-50 bg-black cursor-pointer flex items-center justify-center text-gray-600 text-xs tracking-widest uppercase animate-in fade-in duration-200"
        >
          <span>Screen Blackout Active • Click anywhere or press B to resume</span>
        </div>
      )}

      {/* Whiteout Mode */}
      {isWhiteout && (
        <div 
          onClick={() => setIsWhiteout(false)}
          className="fixed inset-0 z-50 bg-white cursor-pointer flex items-center justify-center text-gray-400 text-xs tracking-widest uppercase animate-in fade-in duration-200"
        >
          <span>Screen Whiteout Active • Click anywhere or press W to resume</span>
        </div>
      )}

      {/* Laser Pointer */}
      {isLaserPointer && (
        <div 
          className="fixed pointer-events-none z-50 w-5 h-5 -ml-2.5 -mt-2.5 rounded-full bg-red-500 shadow-[0_0_15px_#ff0000,0_0_30px_#ff0000] animate-pulse"
          style={{ left: `${laserPos.x}px`, top: `${laserPos.y}px` }}
        />
      )}

      {/* 16:9 Executive Presentation Stage */}
      <div className="w-full h-full max-w-[177.78vh] max-h-[56.25vw] aspect-video relative flex items-center justify-center p-3 sm:p-6 md:p-8">
        <div className="w-full h-full rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-white border border-gray-800/40 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id}
              variants={getVariants()}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: transitionDuration, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full"
            >
              <SlideRenderer slide={currentSlide} isInteractive={true} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Floating Presenter Notes Overlay */}
      {showNotes && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          className="absolute bottom-24 left-1/2 -translate-x-1/2 max-w-2xl w-[92%] bg-gray-950/95 backdrop-blur-xl text-white p-6 rounded-2xl border border-gray-700/80 shadow-2xl z-40"
        >
          <div className="flex items-center justify-between border-b border-gray-800 pb-3 mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4" />
                <span>Executive Speaker Notes — Slide {currentSlide.id} ({currentSlide.title})</span>
              </span>
            </div>
            <button 
              onClick={() => setShowNotes(false)}
              className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition"
              title="Close notes (N)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-normal select-text">
            {currentSlide.speakerNotes}
          </p>
          {currentSlide.takeaway && (
            <div className="mt-3 pt-3 border-t border-gray-800 text-xs text-amber-300/90 font-medium">
              <strong>Key Delivery Takeaway:</strong> {currentSlide.takeaway}
            </div>
          )}
        </motion.div>
      )}

      {/* Slide Overview Grid Navigator Modal */}
      {showGridNavigator && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md p-6 flex flex-col items-center justify-center"
        >
          <div className="max-w-6xl w-full h-[85vh] flex flex-col bg-gray-900 rounded-2xl border border-gray-700 shadow-2xl overflow-hidden">
            <div className="p-4 border-b border-gray-800 flex items-center justify-between bg-gray-950">
              <div className="flex items-center gap-2.5 text-white">
                <Grid className="w-5 h-5 text-amber-400" />
                <span className="font-bold text-sm">Slide Navigator — Jump to Any Slide</span>
                <span className="text-xs text-gray-400">({slides.length} slides)</span>
              </div>
              <button
                onClick={() => setShowGridNavigator(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {slides.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => handleJumpToSlide(idx)}
                  className={`group text-left p-3 rounded-xl border transition flex flex-col gap-2 relative ${
                    idx === currentIndex 
                      ? 'bg-amber-500/10 border-amber-500 text-white shadow-lg ring-2 ring-amber-500/30' 
                      : 'bg-gray-800/80 border-gray-700 text-gray-300 hover:bg-gray-800 hover:border-gray-500'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="font-bold text-amber-400">Slide {s.id}</span>
                    <span className="text-[10px] uppercase text-gray-400">{s.category}</span>
                  </div>
                  <div className="font-bold text-xs line-clamp-2 text-white group-hover:text-amber-300 transition">
                    {s.title}
                  </div>
                  {s.subtitle && (
                    <div className="text-[10px] text-gray-400 line-clamp-1">
                      {s.subtitle}
                    </div>
                  )}
                  {idx === currentIndex && (
                    <span className="text-[10px] font-bold text-amber-400 flex items-center gap-1 mt-auto">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                      Active Slide
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Floating Presenter Controls Bar (Bottom Center) */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-gray-950/90 backdrop-blur-xl border border-gray-800 text-white rounded-full px-5 py-2.5 shadow-2xl flex items-center gap-2.5 z-40 text-xs"
          >
            {/* Presentation Stopwatch */}
            <div className="flex items-center gap-1.5 text-gray-400 font-mono text-[11px] px-2 py-0.5 rounded-md bg-gray-900 border border-gray-800 mr-1" title="Presentation Elapsed Time">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>{formatTime(elapsedSeconds)}</span>
              <button 
                onClick={() => setElapsedSeconds(0)} 
                className="hover:text-white ml-0.5" 
                title="Reset timer"
              >
                <RotateCcw className="w-2.5 h-2.5" />
              </button>
            </div>

            {/* Previous */}
            <button
              onClick={handleGoPrev}
              disabled={currentIndex === 0}
              className="p-1.5 rounded-full hover:bg-gray-800 disabled:opacity-30 transition"
              title="Previous Slide (Left Arrow / PageUp)"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Slide Counter & Grid Trigger */}
            <button
              onClick={() => setShowGridNavigator(true)}
              className="font-mono font-semibold px-2 py-1 rounded-md hover:bg-gray-800 transition flex items-center gap-1.5 text-amber-400"
              title="Open Slide Navigator (Key: G)"
            >
              <Grid className="w-3.5 h-3.5" />
              <span>{currentIndex + 1} / {slides.length}</span>
            </button>

            {/* Next */}
            <button
              onClick={handleGoNext}
              disabled={currentIndex === slides.length - 1}
              className="p-1.5 rounded-full hover:bg-gray-800 disabled:opacity-30 transition"
              title="Next Slide (Right Arrow / Space / PageDown)"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div className="h-4 w-px bg-gray-800 mx-1" />

            {/* Play/Pause Auto-Play */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`p-1.5 rounded-full transition ${
                isPlaying ? 'bg-amber-500 text-white' : 'hover:bg-gray-800 text-gray-300'
              }`}
              title={isPlaying ? 'Pause Auto-Play' : 'Play Slideshow'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
            </button>

            {/* Laser Pointer Toggle */}
            <button
              onClick={() => setIsLaserPointer(!isLaserPointer)}
              className={`p-1.5 rounded-full transition ${
                isLaserPointer ? 'bg-red-600 text-white shadow-[0_0_10px_#ef4444]' : 'hover:bg-gray-800 text-gray-300'
              }`}
              title="Toggle Laser Pointer (Key: L)"
            >
              <PointerIcon className="w-4 h-4" />
            </button>

            {/* Speaker Notes Toggle */}
            <button
              onClick={() => setShowNotes(!showNotes)}
              className={`p-1.5 rounded-full transition ${
                showNotes ? 'bg-indigo-600 text-white' : 'hover:bg-gray-800 text-gray-300'
              }`}
              title="Toggle Speaker Notes (Key: N)"
            >
              <MessageSquare className="w-4 h-4" />
            </button>

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              className={`p-1.5 rounded-full transition ${
                !isMuted ? 'text-amber-400 hover:bg-gray-800' : 'text-gray-500 hover:bg-gray-800'
              }`}
              title={!isMuted ? 'Mute Sound Effects (Key: M)' : 'Unmute Sound Effects (Key: M)'}
            >
              {!isMuted ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Blackout Toggle */}
            <button
              onClick={() => setIsBlackout(!isBlackout)}
              className={`px-2 py-1 rounded text-[11px] font-bold transition ${
                isBlackout ? 'bg-white text-black' : 'hover:bg-gray-800 text-gray-400'
              }`}
              title="Black Screen (Focus on Speaker) (Key: B)"
            >
              B
            </button>

            <div className="h-4 w-px bg-gray-800 mx-1" />

            {/* Fullscreen Toggle */}
            <button
              onClick={toggleFullscreen}
              className="p-1.5 rounded-full hover:bg-gray-800 text-gray-300 hover:text-white transition"
              title="Toggle Fullscreen (Key: F)"
            >
              {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
            </button>

            {/* Exit Slideshow */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-red-600 text-gray-400 hover:text-white transition"
              title="Exit Presentation (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
