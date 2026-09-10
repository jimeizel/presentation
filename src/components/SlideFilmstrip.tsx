import React, { useRef, useEffect } from 'react';
import { SlideData } from '../types';
import { Sparkles, BookOpen, Layers, HelpCircle, CheckCircle2, Award } from 'lucide-react';

interface SlideFilmstripProps {
  slides: SlideData[];
  currentSlideIndex: number;
  onSelectSlide: (index: number) => void;
}

export const SlideFilmstrip: React.FC<SlideFilmstripProps> = ({
  slides,
  currentSlideIndex,
  onSelectSlide,
}) => {
  const activeRef = useRef<HTMLDivElement>(null);

  // Auto-scroll filmstrip to keep active slide visible
  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [currentSlideIndex]);

  const getCategoryBadge = (slide: SlideData, isDark: boolean) => {
    if (slide.id === 1) {
      return <span className="text-[8px] font-extrabold text-slate-700 bg-slate-200 px-1.5 py-0.5 rounded">B&W</span>;
    }
    if (slide.id === 2) {
      return <span className="text-[8px] font-extrabold text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded">COLOR</span>;
    }
    switch (slide.category) {
      case 'cover':
        return <span className="text-[8px] font-extrabold text-amber-300 bg-amber-950/80 border border-amber-800/60 px-1.5 py-0.5 rounded">KEYNOTE</span>;
      case 'agenda':
        return <span className="text-[8px] font-extrabold text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded">OUTLINE</span>;
      case 'section':
        return <span className="text-[8px] font-extrabold text-purple-300 bg-purple-950/80 border border-purple-800/60 px-1.5 py-0.5 rounded">CHAPTER</span>;
      case 'primary-detail':
        return <span className="text-[8px] font-extrabold text-rose-700 bg-rose-100 px-1.5 py-0.5 rounded">COLOR</span>;
      case 'culture-compare':
        return <span className="text-[8px] font-extrabold text-indigo-700 bg-indigo-100 px-1.5 py-0.5 rounded">CULTURE</span>;
      case 'quiz-question':
        return <span className="text-[8px] font-extrabold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">QUIZ</span>;
      case 'quiz-answer':
        return <span className="text-[8px] font-extrabold text-teal-700 bg-teal-100 px-1.5 py-0.5 rounded">PROOF</span>;
      case 'conclusion':
        return <span className="text-[8px] font-extrabold text-slate-800 bg-slate-200 px-1.5 py-0.5 rounded">MATRIX</span>;
      default:
        return null;
    }
  };

  return (
    <aside className="w-56 lg:w-64 bg-slate-100/90 border-r border-slate-200 flex flex-col h-full select-none shadow-inner">
      {/* Header info */}
      <div className="px-3.5 py-2.5 border-b border-slate-200 bg-white/70 backdrop-blur-xs flex items-center justify-between text-xs text-slate-700 font-semibold">
        <span className="flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-blue-600" />
          <span>Filmstrip ({slides.length})</span>
        </span>
        <span className="text-[10px] font-mono px-1.5 py-0.5 bg-slate-200 text-slate-600 rounded">16:9 HD</span>
      </div>

      {/* Thumbnails list */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {slides.map((slide, idx) => {
          const isActive = idx === currentSlideIndex;
          const isDarkSlide = slide.category === 'cover' || slide.category === 'section';

          return (
            <div
              key={slide.id}
              ref={isActive ? activeRef : null}
              onClick={() => onSelectSlide(idx)}
              className="flex items-start gap-2 cursor-pointer group"
            >
              {/* Slide Number */}
              <span 
                className={`text-xs font-semibold w-5 text-right pt-2 transition ${
                  isActive ? 'text-blue-600 font-black scale-110' : 'text-slate-400 group-hover:text-slate-600'
                }`}
              >
                {slide.id}
              </span>

              {/* Slide Miniature Card */}
              <div
                className={`flex-1 rounded-xl border-2 transition-all relative overflow-hidden aspect-video flex flex-col justify-between p-2 shadow-2xs group-hover:shadow-md ${
                  isDarkSlide 
                    ? 'bg-slate-950 text-white' 
                    : 'bg-white text-slate-900'
                } ${
                  isActive
                    ? 'border-blue-500 ring-4 ring-blue-500/20 shadow-lg scale-[1.02]'
                    : 'border-slate-200/90 group-hover:border-slate-300'
                }`}
              >
                {/* Top mini banner */}
                <div className="flex items-center justify-between gap-1">
                  {getCategoryBadge(slide, isDarkSlide)}
                  <span 
                    className="w-2 h-2 rounded-full shadow-xs" 
                    style={{ backgroundColor: slide.colorHex || (isDarkSlide ? '#F59E0B' : '#3B82F6') }} 
                  />
                </div>

                {/* Content preview: Canva image preview or styled title */}
                {slide.id === 1 ? (
                  <div className="my-auto w-full h-full flex items-center justify-center overflow-hidden py-1 px-1.5">
                    <div className="w-full h-9 rounded-lg overflow-hidden flex border border-slate-300 shadow-2xs">
                      <div className="w-1/2 h-full bg-[#676767]" />
                      <div className="w-1/2 h-full bg-[#4B4B4B]" />
                    </div>
                  </div>
                ) : slide.id === 2 ? (
                  <div className="my-auto w-full h-full flex items-center justify-center overflow-hidden py-1 px-1.5">
                    <div className="w-full h-9 rounded-lg overflow-hidden flex border border-slate-300 shadow-2xs">
                      <div className="w-1/2 h-full bg-[#FF1616]" />
                      <div className="w-1/2 h-full bg-[#004AAD]" />
                    </div>
                  </div>
                ) : slide.canvaImage ? (
                  <div className="my-auto w-full h-full flex items-center justify-center overflow-hidden py-0.5">
                    <img 
                      src={slide.canvaImage} 
                      alt={slide.title} 
                      className="max-h-full max-w-full object-contain rounded"
                    />
                  </div>
                ) : (
                  <div className="my-auto text-center px-1">
                    <div 
                      className="font-black text-[10px] leading-tight line-clamp-2 font-canva-serif uppercase tracking-tight text-slate-900"
                      style={slide.colorHex && slide.category === 'primary-detail' ? { color: slide.colorHex } : undefined}
                    >
                      {slide.title}
                    </div>
                    {slide.subtitle && (
                      <div className="text-[8px] line-clamp-1 mt-0.5 text-slate-500 font-canva-serif">
                        {slide.subtitle}
                      </div>
                    )}
                  </div>
                )}

                {/* Bottom mini decor indicator */}
                <div 
                  className="h-1 w-full rounded-full mt-1 opacity-80" 
                  style={{ backgroundColor: slide.colorHex || '#E2E8F0' }} 
                />
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
};
