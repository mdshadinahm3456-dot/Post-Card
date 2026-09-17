import React, { forwardRef, useState } from 'react';
import { PostcardTemplate, CardCustomizationState } from '../types';
import { EXPORT_SIZE_CONFIGS } from '../utils/exportSizes';

interface CardPreviewProps {
  card: PostcardTemplate;
  customization: CardCustomizationState;
  isExporting?: boolean;
}

export const CardPreview = forwardRef<HTMLDivElement, CardPreviewProps>(
  ({ card, customization, isExporting = false }, ref) => {
    const [imageError, setImageError] = useState(false);

    const sizeConfig = EXPORT_SIZE_CONFIGS[customization.exportRatio] || EXPORT_SIZE_CONFIGS.postcard;

    // Font family mapping
    const getFontFamilyClass = () => {
      switch (customization.fontFamily) {
        case 'bengali-serif':
          return 'font-bengali-serif';
        case 'handwritten':
          return 'font-calligraphy italic';
        case 'vintage-serif':
          return 'font-vintage-serif';
        case 'typewriter':
          return 'font-typewriter';
        case 'calligraphy':
          return 'font-calligraphy';
        case 'newspaper':
          return 'font-typewriter';
        case 'classic':
        default:
          return 'font-bengali-body';
      }
    };

    // Text position alignment
    const getPositionClass = () => {
      switch (customization.textPosition) {
        case 'top':
          return 'justify-start pt-10 md:pt-14';
        case 'bottom':
          return 'justify-end pb-10 md:pb-14';
        case 'center':
        default:
          return 'justify-center';
      }
    };

    // Border style
    const getBorderDecor = () => {
      switch (customization.borderStyle) {
        case 'vintage-ornate':
          return 'border-2 border-[#d4af37]/60 shadow-[inset_0_0_20px_rgba(212,175,55,0.2)]';
        case 'minimal-gold':
          return 'border border-[#d4af37]/40';
        case 'postmark':
          return 'border-2 border-dashed border-[#b89b72]/50';
        case 'double-frame':
          return 'border-4 border-double border-[#d4af37]/50';
        case 'classic':
        default:
          return 'border border-[#d4af37]/30 shadow-md';
      }
    };

    return (
      <div
        className="w-full flex items-center justify-center p-2 sm:p-4 select-none"
        id="card-preview-wrapper"
      >
        {/* The exportable card container */}
        <div
          ref={ref}
          id="magic-card-render-target"
          className={`relative w-full max-w-2xl ${sizeConfig.aspectRatioClass} overflow-hidden rounded-lg bg-[#14100d] text-[#f4eee0] shadow-2xl transition-all ${getBorderDecor()} effect-${customization.effect}`}
          style={{
            boxShadow: isExporting
              ? 'none'
              : '0 20px 40px -15px rgba(0,0,0,0.8), 0 0 1px 1px rgba(212,175,55,0.2)'
          }}
        >
          {/* Background Artwork */}
          <div className="absolute inset-0 z-0">
            {!imageError ? (
              <img
                src={card.image}
                alt={card.title}
                onError={() => setImageError(true)}
                className="w-full h-full object-cover object-center opacity-85"
                crossOrigin="anonymous"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#241a14] via-[#16100c] to-[#0d0907] flex items-center justify-center p-6 text-center">
                <div className="border border-[#d4af37]/30 p-8 rounded-lg max-w-sm">
                  <div className="text-3xl mb-2">💌</div>
                  <h4 className="font-vintage-serif text-lg text-[#d4af37]">{card.title}</h4>
                  <p className="text-xs text-[#a89882] mt-1 font-bengali-body">
                    {card.category} • Vintage Postcard
                  </p>
                </div>
              </div>
            )}
            {/* Subtle paper grain & dark vintage vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-black/60 pointer-events-none" />
            <div className="absolute inset-0 bg-[#3a2012]/15 mix-blend-color-burn pointer-events-none" />
          </div>

          {/* Decorative Inner Postal Borders */}
          <div className="absolute inset-3 sm:inset-4 md:inset-5 border border-[#d4af37]/30 rounded pointer-events-none z-10">
            {/* Corner Filigrees */}
            <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-[#d4af37]/60" />
            <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-[#d4af37]/60" />
            <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-[#d4af37]/60" />
            <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-[#d4af37]/60" />
          </div>

          {/* Stamp and Postal Markings (Top Right) */}
          {customization.showStamp && (
            <div className="absolute top-5 right-5 sm:top-7 sm:right-7 z-20 pointer-events-none flex items-start gap-1">
              <div className="w-12 h-14 sm:w-14 sm:h-18 bg-[#18120e]/90 border border-[#d4af37]/70 p-1 rounded-sm shadow-md flex flex-col items-center justify-between text-center rotate-2">
                <div className="text-[8px] sm:text-[9px] font-vintage-serif text-[#d4af37] tracking-widest leading-none">
                  MAGIC
                </div>
                <div className="text-sm sm:text-base">💌</div>
                <div className="text-[7px] sm:text-[8px] font-typewriter text-[#eadecc] tracking-tighter leading-none">
                  1954 DHAKA
                </div>
              </div>
            </div>
          )}

          {/* Postcard Header Label (Top Left) */}
          <div className="absolute top-5 left-6 sm:top-7 sm:left-8 z-20 pointer-events-none">
            <span className="font-vintage-serif text-[10px] sm:text-xs tracking-[0.25em] text-[#d4af37]/80 uppercase block">
              POST CARD
            </span>
            <span className="font-bengali-body text-[9px] sm:text-[10px] text-[#bda78d]/70 tracking-wider">
              {card.category}
            </span>
          </div>

          {/* Main Card Content Layer */}
          <div
            className={`relative z-20 w-full h-full flex flex-col ${getPositionClass()} px-8 sm:px-12 md:px-14 py-8 text-center`}
          >
            {/* Recipient / প্রাপক */}
            {customization.recipient && (
              <div className="mb-2 sm:mb-4 text-left">
                <span className="font-calligraphy text-base sm:text-xl md:text-2xl text-[#d4af37]/90 block tracking-wide">
                  {customization.recipient},
                </span>
              </div>
            )}

            {/* Main Quote / Message */}
            <div
              className={`my-auto py-2 transition-all ${getFontFamilyClass()}`}
              style={{
                fontSize: `${customization.fontSize}px`,
                fontWeight: customization.isBold ? '700' : '400',
                fontStyle: customization.isItalic ? 'italic' : 'normal',
                textAlign: customization.textAlign,
                letterSpacing: `${customization.letterSpacing}px`,
                lineHeight: customization.lineHeight,
                color: customization.textColor || '#f7f0df',
                textShadow: '0 2px 10px rgba(0,0,0,0.85), 0 0 20px rgba(0,0,0,0.6)'
              }}
            >
              “{customization.message || card.defaultQuote}”
            </div>

            {/* Sender / প্রেরক & Date / তারিখ */}
            <div className="mt-3 sm:mt-5 flex flex-col sm:flex-row items-end justify-between text-right gap-1 pt-2 border-t border-[#d4af37]/20">
              {customization.date ? (
                <span className="text-[10px] sm:text-xs font-typewriter text-[#a89882] tracking-wider">
                  {customization.date}
                </span>
              ) : (
                <div />
              )}

              {customization.sender && (
                <span className="font-calligraphy text-base sm:text-xl text-[#e5c05d] tracking-wider">
                  {customization.sender}
                </span>
              )}
            </div>
          </div>

          {/* Bottom subtle watermark-free vintage archival note */}
          <div className="absolute bottom-2 left-0 right-0 z-20 text-center pointer-events-none">
            <span className="font-vintage-serif text-[8px] sm:text-[9px] text-[#d4af37]/40 tracking-[0.2em] uppercase">
              • MAGIC CARD ARCHIVE •
            </span>
          </div>
        </div>
      </div>
    );
  }
);

CardPreview.displayName = 'CardPreview';
