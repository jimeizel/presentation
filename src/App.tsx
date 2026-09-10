import React, { useState, useEffect, useCallback } from 'react';
import { SLIDES_DATA } from './data/slidesData';
import { SlideData, TransitionType } from './types';
import { GoogleSlidesHeader } from './components/GoogleSlidesHeader';
import { GoogleSlidesToolbar } from './components/GoogleSlidesToolbar';
import { SlideFilmstrip } from './components/SlideFilmstrip';
import { SlideCanvas } from './components/SlideCanvas';
import { AnimationPanel } from './components/AnimationPanel';
import { PresenterNotes } from './components/PresenterNotes';
import { SlideshowModal } from './components/SlideshowModal';
import { ExportModal } from './components/ExportModal';
import { SlideRenderer } from './components/SlideRenderer';

export default function App() {
  const [slides, setSlides] = useState<SlideData[]>(SLIDES_DATA);
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [title, setTitle] = useState<string>('Monday Presentation - Psychology of Colors');
  const [selectedTransition, setSelectedTransition] = useState<TransitionType>('fade');
  const [transitionSpeed, setTransitionSpeed] = useState<number>(0.5);
  const [autoPlayInterval, setAutoPlayInterval] = useState<number>(0);
  const [animationKey, setAnimationKey] = useState<number>(0);

  // Panels and Modals
  const [isAnimationPanelOpen, setIsAnimationPanelOpen] = useState<boolean>(false);
  const [isSpeakerNotesOpen, setIsSpeakerNotesOpen] = useState<boolean>(true);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);
  const [isPlayingSlideshow, setIsPlayingSlideshow] = useState<boolean>(false);

  const currentSlide = slides[currentSlideIndex];

  // Navigation handlers
  const handlePrevSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  const handleNextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => Math.min(prev + 1, slides.length - 1));
  }, [slides.length]);

  // Replay animation on current slide
  const handlePlayPreview = useCallback(() => {
    setAnimationKey((prev) => prev + 1);
  }, []);

  // Apply transition to all slides
  const handleApplyTransitionToAll = useCallback(() => {
    setSlides((prevSlides) =>
      prevSlides.map((s) => ({
        ...s,
        transition: selectedTransition,
      }))
    );
  }, [selectedTransition]);

  // Global keyboard shortcuts for presentation app
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (isPlayingSlideshow) return; // Handled inside SlideshowModal

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        handleNextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        handlePrevSlide();
      } else if (e.key === 'F5' || ((e.metaKey || e.ctrlKey) && e.key === 'Enter')) {
        e.preventDefault();
        setIsPlayingSlideshow(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNextSlide, handlePrevSlide, isPlayingSlideshow]);

  return (
    <>
      <div className="flex flex-col h-screen w-screen overflow-hidden bg-white text-gray-900 select-none print:hidden">
        {/* Google Slides Top Header */}
      <GoogleSlidesHeader
        title={title}
        onTitleChange={setTitle}
        onStartSlideshow={() => setIsPlayingSlideshow(true)}
        onOpenExport={() => setIsExportModalOpen(true)}
        onToggleAnimationPanel={() => setIsAnimationPanelOpen(!isAnimationPanelOpen)}
        onToggleSpeakerNotes={() => setIsSpeakerNotesOpen(!isSpeakerNotesOpen)}
        isAnimationPanelOpen={isAnimationPanelOpen}
        isSpeakerNotesOpen={isSpeakerNotesOpen}
      />

      {/* Google Slides Secondary Toolbar */}
      <GoogleSlidesToolbar
        currentSlideIndex={currentSlideIndex}
        totalSlides={slides.length}
        onPrevSlide={handlePrevSlide}
        onNextSlide={handleNextSlide}
        onToggleAnimationPanel={() => setIsAnimationPanelOpen(!isAnimationPanelOpen)}
        onStartSlideshow={() => setIsPlayingSlideshow(true)}
        isAnimationPanelOpen={isAnimationPanelOpen}
      />

      {/* Main Workspace: Filmstrip (Left) + Canvas & Speaker Notes (Center) + Motion Panel (Right) */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left: Filmstrip */}
        <SlideFilmstrip
          slides={slides}
          currentSlideIndex={currentSlideIndex}
          onSelectSlide={setCurrentSlideIndex}
        />

        {/* Center: Slide Stage & Speaker Notes */}
        <main className="flex-1 flex flex-col h-full overflow-hidden relative">
          <SlideCanvas
            slide={currentSlide}
            transitionType={selectedTransition}
            transitionDuration={transitionSpeed}
            animationKey={animationKey}
          />

          {/* Bottom: Collapsible Speaker Notes */}
          <PresenterNotes
            slide={currentSlide}
            isOpen={isSpeakerNotesOpen}
            onToggle={() => setIsSpeakerNotesOpen(!isSpeakerNotesOpen)}
          />
        </main>

        {/* Right: Motion & Animations Sidebar */}
        <AnimationPanel
          isOpen={isAnimationPanelOpen}
          onClose={() => setIsAnimationPanelOpen(false)}
          slide={currentSlide}
          selectedTransition={selectedTransition}
          onSelectTransition={setSelectedTransition}
          transitionSpeed={transitionSpeed}
          onSelectSpeed={setTransitionSpeed}
          onPlayPreview={handlePlayPreview}
          onApplyToAll={handleApplyTransitionToAll}
          autoPlayInterval={autoPlayInterval}
          onSelectAutoPlay={setAutoPlayInterval}
        />
      </div>

      {/* Fullscreen Slideshow Presentation Modal */}
      <SlideshowModal
        isOpen={isPlayingSlideshow}
        onClose={() => setIsPlayingSlideshow(false)}
        slides={slides}
        currentIndex={currentSlideIndex}
        onSelectIndex={setCurrentSlideIndex}
        transitionType={selectedTransition}
        transitionDuration={transitionSpeed}
        autoPlayInterval={autoPlayInterval}
      />

      {/* Export to Google Slides Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        slides={slides}
      />
    </div>

    {/* Print-Only Multi-Page 16:9 Presentation Deck */}
    <div className="hidden print:block print-only">
      {slides.map((s) => (
        <div key={s.id} className="print-slide-page">
          <SlideRenderer slide={s} isInteractive={false} isExportMode={true} />
        </div>
      ))}
    </div>
  </>
  );
}
