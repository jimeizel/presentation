import React from 'react';
import { 
  Undo, 
  Redo, 
  Printer, 
  Paintbrush, 
  ZoomIn, 
  MousePointer, 
  Type, 
  Image as ImageIcon, 
  Square, 
  Minus, 
  Sparkles, 
  Layers, 
  Palette, 
  Play, 
  ChevronLeft, 
  ChevronRight,
  Maximize2
} from 'lucide-react';

interface GoogleSlidesToolbarProps {
  currentSlideIndex: number;
  totalSlides: number;
  onPrevSlide: () => void;
  onNextSlide: () => void;
  onToggleAnimationPanel: () => void;
  onStartSlideshow: () => void;
  isAnimationPanelOpen: boolean;
}

export const GoogleSlidesToolbar: React.FC<GoogleSlidesToolbarProps> = ({
  currentSlideIndex,
  totalSlides,
  onPrevSlide,
  onNextSlide,
  onToggleAnimationPanel,
  onStartSlideshow,
  isAnimationPanelOpen,
}) => {
  return (
    <div className="bg-gray-50 border-b border-gray-200 px-3 py-1 flex items-center justify-between text-gray-700 text-xs select-none">
      {/* Left tool actions */}
      <div className="flex items-center gap-1 overflow-x-auto">
        {/* Navigation arrows */}
        <div className="flex items-center bg-white border border-gray-200 rounded-md px-1 py-0.5 shadow-2xs mr-1">
          <button 
            onClick={onPrevSlide}
            disabled={currentSlideIndex === 0}
            className="p-1 rounded hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent transition"
            title="Previous Slide (Left Arrow)"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="px-2 font-medium text-gray-800 text-[11px] whitespace-nowrap">
            Slide {currentSlideIndex + 1} of {totalSlides}
          </span>
          <button 
            onClick={onNextSlide}
            disabled={currentSlideIndex === totalSlides - 1}
            className="p-1 rounded hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent transition"
            title="Next Slide (Right Arrow)"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="h-4 w-px bg-gray-300 mx-1" />

        {/* Standard toolbar icons */}
        <button 
          onClick={() => window.print()} 
          className="p-1.5 rounded hover:bg-gray-200 transition text-gray-600" 
          title="Print / Save PDF"
        >
          <Printer className="w-4 h-4" />
        </button>
        <button 
          className="p-1.5 rounded hover:bg-gray-200 transition text-gray-600" 
          title="Paint Format"
        >
          <Paintbrush className="w-4 h-4" />
        </button>
        <button 
          className="p-1.5 rounded hover:bg-gray-200 transition text-gray-600" 
          title="Zoom to 100%"
        >
          <ZoomIn className="w-4 h-4" />
        </button>

        <div className="h-4 w-px bg-gray-300 mx-1" />

        <button 
          className="p-1.5 rounded bg-gray-200 font-medium text-gray-900 transition" 
          title="Select Tool"
        >
          <MousePointer className="w-4 h-4" />
        </button>
        <button 
          className="p-1.5 rounded hover:bg-gray-200 transition text-gray-600" 
          title="Text Box"
        >
          <Type className="w-4 h-4" />
        </button>
        <button 
          className="p-1.5 rounded hover:bg-gray-200 transition text-gray-600" 
          title="Insert Image"
        >
          <ImageIcon className="w-4 h-4" />
        </button>
        <button 
          className="p-1.5 rounded hover:bg-gray-200 transition text-gray-600" 
          title="Insert Shape"
        >
          <Square className="w-4 h-4" />
        </button>
        <button 
          className="p-1.5 rounded hover:bg-gray-200 transition text-gray-600" 
          title="Insert Line"
        >
          <Minus className="w-4 h-4" />
        </button>

        <div className="h-4 w-px bg-gray-300 mx-1" />

        {/* Google Slides Slide Layout Controls */}
        <span className="text-[11px] text-gray-500 font-medium px-1">Layout:</span>
        <button className="px-2 py-0.5 rounded hover:bg-gray-200 transition text-[11px] font-medium text-gray-700">
          16:9 Widescreen
        </button>
        <button className="px-2 py-0.5 rounded hover:bg-gray-200 transition text-[11px] font-medium text-gray-700">
          Background
        </button>

        <div className="h-4 w-px bg-gray-300 mx-1" />

        {/* Transition / Motion Button */}
        <button
          onClick={onToggleAnimationPanel}
          className={`flex items-center gap-1 px-2.5 py-1 rounded font-semibold text-[11px] transition ${
            isAnimationPanelOpen 
              ? 'bg-amber-100 text-amber-900 border border-amber-300 shadow-2xs' 
              : 'hover:bg-gray-200 text-gray-700'
          }`}
          title="Configure animations and slide transitions"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Transition & Animations</span>
        </button>
      </div>

      {/* Right Quick Action: Fullscreen Present */}
      <div className="flex items-center gap-2">
        <button
          onClick={onStartSlideshow}
          className="flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-gray-100 border border-gray-300 rounded font-semibold text-gray-800 shadow-2xs transition"
          title="Launch Fullscreen Slideshow"
        >
          <Maximize2 className="w-3.5 h-3.5 text-gray-600" />
          <span>Present</span>
        </button>
      </div>
    </div>
  );
};
