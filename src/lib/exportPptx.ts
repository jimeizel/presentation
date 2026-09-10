import PptxGenJS from 'pptxgenjs';
import { SlideData } from '../types';

/**
 * High-Fidelity Visual Deck Export:
 * Embeds ultra-crisp 16:9 widescreen rendered slides into PowerPoint.
 * When imported into Google Slides or opened in PowerPoint, 100% of the Canva
 * visual styling, typography, cards, badges, watercolor accents, and colors are preserved.
 * Presenter speaker notes are attached to every slide.
 */
export async function exportVisualPowerPoint(
  slides: SlideData[],
  slideImages: string[],
  fileName = 'Monday_Presentation_Colors_Deck.pptx'
): Promise<void> {
  const pptx = new PptxGenJS();
  pptx.layout = 'LAYOUT_16x9';
  pptx.author = 'Google AI Studio';
  pptx.company = 'Monday Presentation - Psychology of Colors';
  pptx.title = 'Monday Presentation - Psychology of Colors';

  for (let i = 0; i < slides.length; i++) {
    const s = slides[i];
    const imgData = slideImages[i];
    const slide = pptx.addSlide();

    // Attach high-res slide graphic
    if (imgData) {
      slide.addImage({
        data: imgData,
        x: 0,
        y: 0,
        w: '100%',
        h: '100%',
      });
    }

    // Attach speaker notes for Google Slides notes pane
    if (s.speakerNotes) {
      slide.addNotes(s.speakerNotes);
    }
  }

  await pptx.writeFile({ fileName });
}

/**
 * Native Editable Shapes & Text Deck Export:
 * Creates native PowerPoint shape cards, colored headers, tags, and editable text boxes.
 */
export async function exportEditablePowerPoint(
  slides: SlideData[],
  fileName = 'Monday_Presentation_Editable_Text.pptx'
): Promise<void> {
  const pptx = new PptxGenJS();
  pptx.layout = 'LAYOUT_16x9';
  pptx.author = 'Google AI Studio';
  pptx.company = 'Monday Presentation';
  pptx.title = 'Monday Presentation - Psychology of Colors';

  for (const s of slides) {
    const slide = pptx.addSlide();
    slide.bkgd = 'F8FAFC'; // Soft clean canvas

    if (s.speakerNotes) {
      slide.addNotes(s.speakerNotes);
    }

    const themeColor = s.colorHex ? s.colorHex.replace('#', '') : '0F172A';

    // Slide Accent Top Header Bar
    slide.addShape(pptx.ShapeType.rect, {
      x: 0,
      y: 0,
      w: '100%',
      h: 0.18,
      fill: { color: themeColor },
    });

    // Outer Presentation Frame Card
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.5,
      y: 0.45,
      w: 12.33,
      h: 6.6,
      fill: { color: 'FFFFFF' },
      line: { color: 'E2E8F0', width: 1 },
    });

    // Top Header Badge
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 0.8,
      y: 0.65,
      w: 2.8,
      h: 0.35,
      fill: { color: 'F1F5F9' },
      line: { color: 'CBD5E1', width: 1 },
    });
    slide.addText(`SLIDE ${s.id} • COLOR PSYCHOLOGY`, {
      x: 0.8,
      y: 0.65,
      w: 2.8,
      h: 0.35,
      fontSize: 9,
      bold: true,
      color: '475569',
      align: 'center',
    });

    if (s.category === 'cover') {
      // Cover Slide
      slide.addText(s.title, {
        x: 1.0,
        y: 1.8,
        w: 11.33,
        h: 1.8,
        fontSize: 46,
        bold: true,
        color: '0F172A',
        align: 'center',
      });

      if (s.subtitle) {
        slide.addText(s.subtitle, {
          x: 1.0,
          y: 3.8,
          w: 11.33,
          h: 0.8,
          fontSize: 22,
          bold: true,
          color: '475569',
          align: 'center',
        });
      }

      slide.addText('Converted for Google Slides • 21 Animated Slides', {
        x: 1.0,
        y: 5.6,
        w: 11.33,
        h: 0.5,
        fontSize: 12,
        color: '94A3B8',
        align: 'center',
      });
    } else if (s.category === 'primary-detail') {
      // Color Detail Slide
      slide.addText(s.title, {
        x: 1.0,
        y: 1.2,
        w: 6.0,
        h: 1.0,
        fontSize: 42,
        bold: true,
        color: themeColor,
      });

      if (s.keywords && s.keywords.length > 0) {
        slide.addText(s.keywords.join('  •  '), {
          x: 6.5,
          y: 1.4,
          w: 5.8,
          h: 0.6,
          fontSize: 18,
          bold: true,
          color: '334155',
          align: 'right',
        });
      }

      // Bullets as structured cards
      if (s.bullets) {
        s.bullets.forEach((bullet, idx) => {
          slide.addShape(pptx.ShapeType.rect, {
            x: 1.0,
            y: 2.4 + idx * 0.95,
            w: 11.33,
            h: 0.75,
            fill: { color: 'F8FAFC' },
            line: { color: 'E2E8F0', width: 1 },
          });

          slide.addShape(pptx.ShapeType.ellipse, {
            x: 1.2,
            y: 2.65 + idx * 0.95,
            w: 0.25,
            h: 0.25,
            fill: { color: themeColor },
          });

          slide.addText(bullet, {
            x: 1.6,
            y: 2.4 + idx * 0.95,
            w: 10.5,
            h: 0.75,
            fontSize: 14,
            color: '1E293B',
            align: 'left',
          });
        });
      }
    } else if (s.category === 'culture-compare') {
      // Cultural Comparison Slide
      slide.addText(s.title, {
        x: 1.0,
        y: 1.2,
        w: 11.33,
        h: 0.8,
        fontSize: 34,
        bold: true,
        color: themeColor,
        align: 'center',
      });

      if (s.cultureItems) {
        s.cultureItems.forEach((item, idx) => {
          const cardX = idx === 0 ? 1.2 : 6.8;
          slide.addShape(pptx.ShapeType.rect, {
            x: cardX,
            y: 2.2,
            w: 5.3,
            h: 4.2,
            fill: { color: 'F8FAFC' },
            line: { color: 'CBD5E1', width: 1.5 },
          });

          slide.addText(item.region.toUpperCase(), {
            x: cardX + 0.3,
            y: 2.5,
            w: 4.7,
            h: 0.5,
            fontSize: 18,
            bold: true,
            color: '0F172A',
          });

          slide.addText(item.meaning, {
            x: cardX + 0.3,
            y: 3.1,
            w: 4.7,
            h: 0.6,
            fontSize: 20,
            bold: true,
            color: themeColor,
          });

          slide.addText(item.details, {
            x: cardX + 0.3,
            y: 3.8,
            w: 4.7,
            h: 2.2,
            fontSize: 13,
            color: '475569',
          });
        });
      }
    } else if (s.category === 'quiz-question') {
      // Quiz Question Slide
      slide.addText(`QUESTION ${s.quiz?.questionNumber || ''}`, {
        x: 1.0,
        y: 1.2,
        w: 11.33,
        h: 0.6,
        fontSize: 22,
        bold: true,
        color: '0F172A',
        align: 'center',
      });

      slide.addShape(pptx.ShapeType.rect, {
        x: 1.5,
        y: 2.0,
        w: 10.33,
        h: 2.2,
        fill: { color: 'F8FAFC' },
        line: { color: 'E2E8F0', width: 1 },
      });

      slide.addText(`"${s.quiz?.statement || ''}"`, {
        x: 1.8,
        y: 2.2,
        w: 9.73,
        h: 1.8,
        fontSize: 24,
        bold: true,
        color: '0F172A',
        align: 'center',
      });

      // Choices
      slide.addShape(pptx.ShapeType.roundRect, {
        x: 3.0,
        y: 4.6,
        w: 3.2,
        h: 0.8,
        fill: { color: 'ECFDF5' },
        line: { color: '10B981', width: 2 },
      });
      slide.addText('OPTION A: REAL', {
        x: 3.0,
        y: 4.6,
        w: 3.2,
        h: 0.8,
        fontSize: 15,
        bold: true,
        color: '047857',
        align: 'center',
      });

      slide.addShape(pptx.ShapeType.roundRect, {
        x: 7.1,
        y: 4.6,
        w: 3.2,
        h: 0.8,
        fill: { color: 'FEF2F2' },
        line: { color: 'EF4444', width: 2 },
      });
      slide.addText('OPTION B: FAKE', {
        x: 7.1,
        y: 4.6,
        w: 3.2,
        h: 0.8,
        fontSize: 15,
        bold: true,
        color: 'B91C1C',
        align: 'center',
      });
    } else {
      // General Slides (agenda, section, quiz-intro, quiz-answer, conclusion)
      slide.addText(s.title, {
        x: 1.0,
        y: 1.2,
        w: 11.33,
        h: 1.0,
        fontSize: 32,
        bold: true,
        color: '0F172A',
        align: s.category === 'section' || s.category === 'conclusion' ? 'center' : 'left',
      });

      if (s.subtitle) {
        slide.addText(s.subtitle, {
          x: 1.0,
          y: 2.2,
          w: 11.33,
          h: 0.6,
          fontSize: 16,
          color: '64748B',
          align: s.category === 'section' || s.category === 'conclusion' ? 'center' : 'left',
        });
      }

      if (s.bullets) {
        s.bullets.forEach((bullet, idx) => {
          slide.addShape(pptx.ShapeType.rect, {
            x: 1.0,
            y: 3.0 + idx * 0.9,
            w: 11.33,
            h: 0.75,
            fill: { color: 'F8FAFC' },
            line: { color: 'E2E8F0', width: 1 },
          });

          slide.addText(bullet, {
            x: 1.4,
            y: 3.0 + idx * 0.9,
            w: 10.7,
            h: 0.75,
            fontSize: 14,
            color: '1E293B',
          });
        });
      }
    }

    // Footer with Page numbering
    slide.addText(`Monday Presentation • Slide ${s.id} of ${slides.length}`, {
      x: 1.0,
      y: 6.65,
      w: 11.33,
      h: 0.35,
      fontSize: 10,
      color: '94A3B8',
      align: 'right',
    });
  }

  await pptx.writeFile({ fileName });
}

// Default export alias for backwards compatibility
export const exportToPowerPoint = exportEditablePowerPoint;
