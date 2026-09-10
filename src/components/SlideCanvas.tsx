import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SlideData, TransitionType } from '../types';
import { SlideRenderer } from './SlideRenderer';

interface SlideCanvasProps {
  slide: SlideData;
  transitionType: TransitionType;
  transitionDuration: number;
  animationKey: number; // incremented to force replay of animations
}

export const SlideCanvas: React.FC<SlideCanvasProps> = ({
  slide,
  transitionType,
  transitionDuration,
  animationKey,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 960, height: 540 });

  // Calculate dynamic 16:9 dimensions matching the container size using ResizeObserver
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;

      const availWidth = entry.contentRect.width - 48; // padding
      const availHeight = entry.contentRect.height - 48;

      if (availWidth <= 0 || availHeight <= 0) return;

      const targetRatio = 16 / 9;
      let width = availWidth;
      let height = width / targetRatio;

      if (height > availHeight) {
        height = availHeight;
        width = height * targetRatio;
      }

      setDimensions({ width, height });
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Motion transition variants based on selected Google Slides transition
  const getTransitionVariants = () => {
    switch (transitionType) {
      case 'slide-left':
        return {
          initial: { x: 300, opacity: 0 },
          animate: { x: 0, opacity: 1 },
          exit: { x: -300, opacity: 0 },
        };
      case 'slide-right':
        return {
          initial: { x: -300, opacity: 0 },
          animate: { x: 0, opacity: 1 },
          exit: { x: 300, opacity: 0 },
        };
      case 'zoom':
        return {
          initial: { scale: 0.85, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          exit: { scale: 1.15, opacity: 0 },
        };
      case 'flip':
        return {
          initial: { rotateY: 90, opacity: 0 },
          animate: { rotateY: 0, opacity: 1 },
          exit: { rotateY: -90, opacity: 0 },
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

  const variants = getTransitionVariants();

  return (
    <div 
      ref={containerRef}
      className="flex-1 bg-slate-200/80 flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-hidden relative shadow-inner"
    >
      <div 
        style={{ width: `${dimensions.width}px`, height: `${dimensions.height}px` }}
        className="relative bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-150 border border-slate-300/90 ring-1 ring-slate-900/5"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`${slide.id}-${animationKey}`}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: transitionDuration, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full"
          >
            <SlideRenderer slide={slide} isInteractive={true} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
