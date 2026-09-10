import React from 'react';
import { 
  Sparkles, 
  Play, 
  X, 
  Check, 
  Clock, 
  Sliders, 
  Film, 
  Layers,
  ArrowRight,
  RotateCcw
} from 'lucide-react';
import { SlideData, TransitionType } from '../types';

interface AnimationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  slide: SlideData;
  selectedTransition: TransitionType;
  onSelectTransition: (transition: TransitionType) => void;
  transitionSpeed: number;
  onSelectSpeed: (speed: number) => void;
  onPlayPreview: () => void;
  onApplyToAll: () => void;
  autoPlayInterval: number;
  onSelectAutoPlay: (interval: number) => void;
}

export const AnimationPanel: React.FC<AnimationPanelProps> = ({
  isOpen,
  onClose,
  slide,
  selectedTransition,
  onSelectTransition,
  transitionSpeed,
  onSelectSpeed,
  onPlayPreview,
  onApplyToAll,
  autoPlayInterval,
  onSelectAutoPlay,
}) => {
  if (!isOpen) return null;

  const transitions: { id: TransitionType; label: string; desc: string }[] = [
    { id: 'fade', label: 'Fade / Dissolve', desc: 'Soft opacity blend' },
    { id: 'slide-left', label: 'Slide from Right', desc: 'Horizontal push' },
    { id: 'slide-right', label: 'Slide from Left', desc: 'Reverse horizontal' },
    { id: 'zoom', label: 'Zoom In', desc: 'Dynamic scale emphasis' },
    { id: 'flip', label: '3D Flip', desc: '3D axis flip rotation' },
    { id: 'none', label: 'None', desc: 'Instant cut' },
  ];

  return (
    <aside className="w-80 bg-white border-l border-gray-200 flex flex-col h-full shadow-lg z-20 select-none">
      {/* Header */}
      <div className="p-3.5 border-b border-gray-200 flex items-center justify-between bg-gray-50">
        <div className="flex items-center gap-2 text-sm font-bold text-gray-800">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Motion & Animations</span>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded hover:bg-gray-200 text-gray-500 transition"
          title="Close Motion Panel"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Play Preview Button */}
        <div>
          <button
            onClick={onPlayPreview}
            className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-98 text-white font-bold text-xs tracking-wider uppercase shadow-sm flex items-center justify-center gap-2 transition"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Play Animation Preview</span>
          </button>
          <p className="text-[11px] text-gray-500 text-center mt-1.5">
            Preview current slide transition and element entrances
          </p>
        </div>

        {/* Slide Transition Selector */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
              <Film className="w-3.5 h-3.5 text-gray-600" />
              <span>Slide Transition</span>
            </label>
            <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
              Active
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {transitions.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  onSelectTransition(t.id);
                  onPlayPreview();
                }}
                className={`p-2.5 rounded-xl border text-left transition flex flex-col justify-between ${
                  selectedTransition === t.id
                    ? 'border-amber-500 bg-amber-50/70 text-amber-900 font-bold shadow-2xs'
                    : 'border-gray-200 hover:border-gray-300 bg-white text-gray-700'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-xs font-semibold">{t.label}</span>
                  {selectedTransition === t.id && (
                    <Check className="w-3 h-3 text-amber-600" />
                  )}
                </div>
                <span className="text-[10px] text-gray-500 font-normal mt-0.5">{t.desc}</span>
              </button>
            ))}
          </div>

          {/* Transition Speed Slider */}
          <div className="pt-2">
            <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
              <span>Transition Speed:</span>
              <span className="font-semibold text-gray-800 font-mono">{transitionSpeed}s</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-gray-400">Fast (0.2s)</span>
              <input
                type="range"
                min="0.2"
                max="1.2"
                step="0.1"
                value={transitionSpeed}
                onChange={(e) => onSelectSpeed(parseFloat(e.target.value))}
                className="flex-1 accent-amber-500 cursor-pointer"
              />
              <span className="text-[10px] text-gray-400">Slow (1.2s)</span>
            </div>
          </div>

          <button
            onClick={onApplyToAll}
            className="w-full mt-2 py-1.5 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
          >
            Apply Transition to All Slides
          </button>
        </div>

        {/* Active Slide Element Animations */}
        <div className="space-y-3 pt-3 border-t border-gray-200">
          <label className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-gray-600" />
            <span>Object Animations (Slide {slide.id})</span>
          </label>

          <div className="space-y-2">
            {slide.animations.map((anim, idx) => (
              <div 
                key={idx}
                className="p-2.5 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <div>
                    <span className="font-semibold text-gray-800 capitalize">
                      {anim.type.replace(/-/g, ' ')}
                    </span>
                    <span className="text-[10px] text-gray-500 block font-mono">
                      target: #{anim.targetId}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-mono text-gray-500">
                    delay {anim.delay}s
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Auto-Play Slideshow Timer */}
        <div className="space-y-3 pt-3 border-t border-gray-200">
          <label className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-gray-600" />
            <span>Auto-Advance Slides</span>
          </label>

          <div className="grid grid-cols-4 gap-1.5">
            {[
              { val: 0, label: 'Off' },
              { val: 3, label: '3s' },
              { val: 5, label: '5s' },
              { val: 8, label: '8s' },
            ].map((timer) => (
              <button
                key={timer.val}
                onClick={() => onSelectAutoPlay(timer.val)}
                className={`py-1.5 rounded-lg text-xs font-semibold transition ${
                  autoPlayInterval === timer.val
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {timer.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};
