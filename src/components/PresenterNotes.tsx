import React, { useState } from 'react';
import { MessageSquare, ChevronUp, ChevronDown, Sparkles, Copy, Check } from 'lucide-react';
import { SlideData } from '../types';

interface PresenterNotesProps {
  slide: SlideData;
  isOpen: boolean;
  onToggle: () => void;
}

export const PresenterNotes: React.FC<PresenterNotesProps> = ({
  slide,
  isOpen,
  onToggle,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyNotes = () => {
    navigator.clipboard.writeText(slide.speakerNotes);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white border-t border-gray-200 transition-all select-none">
      {/* Header bar */}
      <div 
        onClick={onToggle}
        className="px-4 py-2 bg-gray-50 hover:bg-gray-100 border-b border-gray-200 flex items-center justify-between cursor-pointer text-xs font-semibold text-gray-700"
      >
        <div className="flex items-center gap-2">
          <MessageSquare className="w-3.5 h-3.5 text-indigo-600" />
          <span>Speaker Notes (Slide {slide.id}: {slide.title})</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleCopyNotes();
            }}
            className="p-1 rounded hover:bg-gray-200 text-gray-500 transition flex items-center gap-1 text-[11px]"
            title="Copy notes to clipboard"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
          {isOpen ? <ChevronDown className="w-4 h-4 text-gray-500" /> : <ChevronUp className="w-4 h-4 text-gray-500" />}
        </div>
      </div>

      {/* Content */}
      {isOpen && (
        <div className="p-4 max-h-36 overflow-y-auto bg-white text-xs text-gray-800 leading-relaxed font-normal">
          <p className="max-w-4xl">{slide.speakerNotes}</p>
        </div>
      )}
    </div>
  );
};
