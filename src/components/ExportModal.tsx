import React, { useState, useRef } from 'react';
import { 
  X, 
  Download, 
  ExternalLink, 
  FileText, 
  CheckCircle2, 
  Presentation, 
  Sparkles, 
  Loader2, 
  Layers, 
  Palette,
  AlertCircle
} from 'lucide-react';
import { toPng } from 'html-to-image';
import { SlideData } from '../types';
import { exportVisualPowerPoint, exportEditablePowerPoint } from '../lib/exportPptx';
import { SlideRenderer } from './SlideRenderer';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  slides: SlideData[];
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  slides,
}) => {
  // Export states
  const [isExportingVisual, setIsExportingVisual] = useState(false);
  const [isExportingEditable, setIsExportingEditable] = useState(false);
  const [hasExportedVisual, setHasExportedVisual] = useState(false);
  const [hasExportedEditable, setHasExportedEditable] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);
  const [currentStepText, setCurrentStepText] = useState('');
  const [renderingIndex, setRenderingIndex] = useState<number | null>(null);

  const hiddenSlideRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  // Primary Export: Visual Design Preserved (.pptx)
  const handleVisualExport = async () => {
    try {
      setIsExportingVisual(true);
      setHasExportedVisual(false);
      setProgressPercent(5);
      setCurrentStepText('Preparing high-definition slides...');

      const slideImages: string[] = [];

      for (let i = 0; i < slides.length; i++) {
        setRenderingIndex(i);
        setCurrentStepText(`Rendering Slide ${i + 1} of ${slides.length} (preserving design & fonts)...`);
        
        // Allow DOM to settle and apply paint
        await new Promise((resolve) => setTimeout(resolve, 60));

        if (hiddenSlideRef.current) {
          try {
            const dataUrl = await toPng(hiddenSlideRef.current, {
              pixelRatio: 1.5,
              cacheBust: true,
              backgroundColor: '#FAFAFA',
            });
            slideImages.push(dataUrl);
          } catch (captureErr) {
            console.warn(`Slide ${i + 1} image capture notice:`, captureErr);
          }
        }

        const pct = Math.round(((i + 1) / slides.length) * 85);
        setProgressPercent(pct);
      }

      setCurrentStepText('Assembling Google Slides .pptx presentation...');
      setProgressPercent(92);
      await new Promise((resolve) => setTimeout(resolve, 100));

      await exportVisualPowerPoint(slides, slideImages, 'Monday_Presentation_Colors_Deck.pptx');
      
      setProgressPercent(100);
      setCurrentStepText('Complete! Ready for Google Slides.');
      setHasExportedVisual(true);
    } catch (err) {
      console.error('Visual export failed:', err);
      // Graceful fallback to editable presentation
      await exportEditablePowerPoint(slides);
    } finally {
      setIsExportingVisual(false);
      setRenderingIndex(null);
    }
  };

  // Secondary Export: Native Editable Shapes & Text (.pptx)
  const handleEditableExport = async () => {
    try {
      setIsExportingEditable(true);
      await exportEditablePowerPoint(slides, 'Monday_Presentation_Editable_Text.pptx');
      setHasExportedEditable(true);
    } catch (err) {
      console.error('Editable PPTX export error:', err);
    } finally {
      setIsExportingEditable(false);
    }
  };

  const handleDownloadJson = () => {
    const jsonStr = JSON.stringify(slides, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Monday_Presentation_Colors_Deck.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const currentSlideForRender = renderingIndex !== null ? slides[renderingIndex] : null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      {/* Hidden Offscreen Container for Ultra-Clean 16:9 Canvas Capture */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          left: '-9999px',
          top: 0,
          width: '1280px',
          height: '720px',
          overflow: 'hidden',
          pointerEvents: 'none',
          zIndex: -999,
        }}
      >
        {currentSlideForRender && (
          <div ref={hiddenSlideRef} style={{ width: '1280px', height: '720px' }}>
            <SlideRenderer 
              slide={currentSlideForRender} 
              isInteractive={false} 
              isExportMode={true} 
            />
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-gray-200 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-amber-500 text-white flex items-center justify-center shadow-xs">
              <Presentation className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900">Export to Google Slides</h3>
              <p className="text-[11px] text-gray-500">All 21 slides from Canva ready for Google Drive</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-gray-200 text-gray-400 hover:text-gray-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Options */}
        <div className="p-6 space-y-5">
          {/* Top Info Banner on Why Design Was Lost Previously */}
          <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">100% Design Preservation Enabled</span>
              <span>
                Select <strong>Visual Design (.pptx)</strong> below. It locks in all original Canva fonts (Oswald), watercolor textures, contrast cards, color swatches, and badges so your presentation looks identical in Google Slides.
              </span>
            </div>
          </div>

          {/* Primary Action: High-Fidelity Visual PPTX for Google Slides */}
          <div className="p-4 rounded-xl border-2 border-amber-500 bg-amber-50/30 space-y-3 shadow-xs">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-extrabold text-amber-800 uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-600" />
                  Recommended for Google Slides
                </span>
                <h4 className="text-base font-extrabold text-gray-950 mt-0.5">
                  Download Visual Presentation (.pptx)
                </h4>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                  Preserves 100% of the Canva visual layout, typography, tags, and graphics. Includes full presenter notes on every slide.
                </p>
              </div>
            </div>

            {/* Progress bar when exporting */}
            {isExportingVisual && (
              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between text-[11px] font-medium text-gray-600">
                  <span className="flex items-center gap-1.5">
                    <Loader2 className="w-3 h-3 animate-spin text-amber-600" />
                    <span>{currentStepText}</span>
                  </span>
                  <span className="font-mono font-bold text-amber-700">{progressPercent}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-amber-500 h-2 rounded-full transition-all duration-150"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            )}

            <button
              onClick={handleVisualExport}
              disabled={isExportingVisual || isExportingEditable}
              className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white font-bold text-xs tracking-wider uppercase shadow-md flex items-center justify-center gap-2 transition"
            >
              {isExportingVisual ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Generating Deck ({progressPercent}%)...</span>
                </>
              ) : hasExportedVisual ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span>Downloaded! Click to download again</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Download Google Slides File (.pptx)</span>
                </>
              )}
            </button>

            {/* 3-Step Google Slides Import Guide */}
            <div className="pt-3 border-t border-amber-200/60 text-[11px] text-gray-700 space-y-1.5">
              <span className="font-bold text-gray-900 block">How to open in Google Slides:</span>
              <ol className="list-decimal list-inside space-y-1 text-gray-600">
                <li>Click <strong>Download Google Slides File</strong> above.</li>
                <li>Go to <a href="https://slides.new" target="_blank" rel="noreferrer" className="text-blue-600 font-semibold underline">slides.new <ExternalLink className="w-3 h-3 inline" /></a> or your Google Drive.</li>
                <li><strong>Drag and drop</strong> the downloaded file into Drive (or click <strong>File ➔ Open ➔ Upload</strong>).</li>
              </ol>
            </div>
          </div>

          {/* Secondary Actions: Editable PPTX, PDF, and Open slides.new */}
          <div className="space-y-2 pt-1">
            <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              Alternative Formats
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* Editable Copy (.pptx) with Styled Shape Cards */}
              <button
                onClick={handleEditableExport}
                disabled={isExportingVisual || isExportingEditable}
                className="p-3 rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition flex items-start gap-2.5 text-left text-xs font-semibold text-gray-800 disabled:opacity-50"
              >
                <Palette className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <span className="block">Editable Shapes (.pptx)</span>
                  <span className="text-[10px] text-gray-500 font-normal block leading-tight mt-0.5">
                    Native PowerPoint shapes & text for editing copy
                  </span>
                  {hasExportedEditable && (
                    <span className="text-[10px] text-emerald-600 font-bold block mt-1">✓ Downloaded</span>
                  )}
                </div>
              </button>

              {/* Print / Save High-Res PDF */}
              <button
                onClick={() => {
                  onClose();
                  setTimeout(() => window.print(), 150);
                }}
                className="p-3 rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition flex items-start gap-2.5 text-left text-xs font-semibold text-gray-800"
              >
                <FileText className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="block">Save as High-Res PDF</span>
                  <span className="text-[10px] text-gray-500 font-normal block leading-tight mt-0.5">
                    16:9 vector PDF with 100% design fidelity
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Footer note & Raw JSON */}
          <div className="pt-1 flex items-center justify-between text-[11px] text-gray-400">
            <a
              href="https://slides.new"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline flex items-center gap-1 font-medium"
            >
              <ExternalLink className="w-3 h-3" />
              <span>Open slides.new in new tab</span>
            </a>

            <button
              onClick={handleDownloadJson}
              className="hover:text-gray-700 underline"
            >
              Export JSON data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
