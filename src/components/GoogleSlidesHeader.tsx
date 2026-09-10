import React, { useState } from 'react';
import { 
  Play, 
  Share2, 
  Cloud,
  Check, 
  Download, 
  FileText, 
  Presentation, 
  Sparkles,
  ExternalLink,
  MessageSquare,
  ChevronDown
} from 'lucide-react';

interface GoogleSlidesHeaderProps {
  title: string;
  onTitleChange: (newTitle: string) => void;
  onStartSlideshow: () => void;
  onOpenExport: () => void;
  onToggleAnimationPanel: () => void;
  onToggleSpeakerNotes: () => void;
  isAnimationPanelOpen: boolean;
  isSpeakerNotesOpen: boolean;
}

export const GoogleSlidesHeader: React.FC<GoogleSlidesHeaderProps> = ({
  title,
  onTitleChange,
  onStartSlideshow,
  onOpenExport,
  onToggleAnimationPanel,
  onToggleSpeakerNotes,
  isAnimationPanelOpen,
  isSpeakerNotesOpen,
}) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const menuItems: Record<string, { label: string; action?: () => void; icon?: React.ReactNode; shortcut?: string }[]> = {
    File: [
      { label: 'Export to Google Slides (.pptx)', action: onOpenExport, icon: <Download className="w-4 h-4 text-amber-600" />, shortcut: 'Ctrl+E' },
      { label: 'Open Google Slides in New Tab', action: () => window.open('https://slides.new', '_blank'), icon: <ExternalLink className="w-4 h-4 text-blue-600" /> },
      { label: 'Print / Save as PDF', action: () => window.print(), icon: <FileText className="w-4 h-4 text-gray-600" />, shortcut: 'Ctrl+P' },
    ],
    View: [
      { label: 'Start Slideshow', action: onStartSlideshow, icon: <Play className="w-4 h-4 text-emerald-600" />, shortcut: 'Ctrl+Enter' },
      { label: isAnimationPanelOpen ? 'Hide Motion Panel' : 'Show Motion & Animations', action: onToggleAnimationPanel, icon: <Sparkles className="w-4 h-4 text-amber-500" /> },
      { label: isSpeakerNotesOpen ? 'Hide Speaker Notes' : 'Show Speaker Notes', action: onToggleSpeakerNotes, icon: <MessageSquare className="w-4 h-4 text-indigo-500" /> },
    ],
    Slide: [
      { label: 'Start Slideshow from Current', action: onStartSlideshow, icon: <Play className="w-4 h-4 text-emerald-600" /> },
      { label: 'Motion & Transition Settings', action: onToggleAnimationPanel, icon: <Sparkles className="w-4 h-4 text-amber-500" /> },
    ],
    Help: [
      { label: 'Converted from Canva: Monday Presentation', action: () => {} },
      { label: 'Keyboard Shortcuts: Left/Right to Navigate, Space, Esc', action: () => {} },
    ]
  };

  return (
    <header className="bg-white border-b border-gray-200 px-3 py-1.5 flex items-center justify-between z-30 select-none shadow-xs">
      {/* Left: Google Slides Icon + Title & Menu */}
      <div className="flex items-center gap-3">
        {/* Google Slides Brand Icon */}
        <div 
          className="w-10 h-10 rounded-lg bg-amber-500 flex items-center justify-center text-white shadow-xs cursor-pointer hover:bg-amber-600 transition"
          title="Google Slides Presentation"
          onClick={onStartSlideshow}
        >
          <Presentation className="w-6 h-6" />
        </div>

        <div>
          {/* Presentation Title and Cloud Status */}
          <div className="flex items-center gap-2">
            {isEditingTitle ? (
              <input
                type="text"
                value={title}
                onChange={(e) => onTitleChange(e.target.value)}
                onBlur={() => setIsEditingTitle(false)}
                onKeyDown={(e) => e.key === 'Enter' && setIsEditingTitle(false)}
                autoFocus
                className="text-base font-semibold text-gray-800 border border-blue-500 rounded px-1.5 py-0.5 outline-hidden"
              />
            ) : (
              <span
                onClick={() => setIsEditingTitle(true)}
                className="text-base font-semibold text-gray-800 hover:bg-gray-100 px-1.5 py-0.5 rounded cursor-pointer transition flex items-center gap-1.5"
                title="Click to rename presentation"
              >
                {title}
              </span>
            )}

            <span className="flex items-center text-xs text-gray-500 gap-1 bg-gray-50 border border-gray-200 px-1.5 py-0.5 rounded" title="All edits saved">
              <span className="relative flex items-center">
                <Cloud className="w-3.5 h-3.5 text-gray-400" />
                <Check className="w-2 h-2 text-emerald-600 absolute -bottom-0.5 -right-0.5 stroke-[3]" />
              </span>
              <span>Drive Saved</span>
            </span>

            <span className="text-xs font-semibold px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full border border-amber-200">
              Canva ➔ Google Slides
            </span>
          </div>

          {/* Google Slides Menus */}
          <div className="relative flex items-center gap-0.5 text-xs text-gray-700 mt-0.5">
            {['File', 'Edit', 'View', 'Insert', 'Format', 'Slide', 'Tools', 'Help'].map((menu) => (
              <div key={menu} className="relative">
                <button
                  onClick={() => setActiveMenu(activeMenu === menu ? null : menu)}
                  className={`px-2 py-0.5 rounded hover:bg-gray-100 transition ${
                    activeMenu === menu ? 'bg-gray-200 font-semibold text-gray-900' : ''
                  }`}
                >
                  {menu}
                </button>

                {activeMenu === menu && menuItems[menu] && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setActiveMenu(null)} 
                    />
                    <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-50">
                      {menuItems[menu].map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            if (item.action) item.action();
                            setActiveMenu(null);
                          }}
                          className="w-full text-left px-3 py-1.5 hover:bg-amber-50 flex items-center justify-between text-xs text-gray-700 transition"
                        >
                          <span className="flex items-center gap-2">
                            {item.icon}
                            <span>{item.label}</span>
                          </span>
                          {item.shortcut && (
                            <span className="text-[10px] text-gray-400 font-mono">{item.shortcut}</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Controls: Motion toggle, Export, Present Slideshow, Share */}
      <div className="flex items-center gap-2">
        {/* Toggle Animations Panel */}
        <button
          onClick={onToggleAnimationPanel}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition ${
            isAnimationPanelOpen 
              ? 'bg-amber-50 text-amber-700 border-amber-300 shadow-inner' 
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
          }`}
          title="Configure slide motion and element animations"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Motion & FX</span>
        </button>

        {/* Download for Google Slides Button */}
        <button
          onClick={onOpenExport}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white rounded-lg shadow-xs transition"
          title="Download Google Slides Presentation file (.pptx)"
        >
          <Download className="w-3.5 h-3.5 text-white" />
          <span>Download Google Slides</span>
        </button>

        {/* Slideshow Button (Google Slides style) */}
        <div className="flex items-center rounded-lg bg-amber-500 text-white hover:bg-amber-600 shadow-xs transition overflow-hidden">
          <button
            onClick={onStartSlideshow}
            className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold tracking-wide"
            title="Start Slideshow (Full Screen)"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Slideshow</span>
          </button>
          <button
            onClick={onStartSlideshow}
            className="px-1.5 py-1.5 border-l border-amber-600/40 hover:bg-amber-600 transition"
            title="Slideshow options"
          >
            <ChevronDown className="w-3 h-3" />
          </button>
        </div>

        {/* Share Button */}
        <button
          onClick={onOpenExport}
          className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-xs transition"
          title="Share presentation"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Share</span>
        </button>
      </div>
    </header>
  );
};
