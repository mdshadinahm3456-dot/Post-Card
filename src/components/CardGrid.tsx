import React from 'react';
import { PostcardTemplate } from '../types';
import { FavoriteButton } from './FavoriteButton';
import { Sparkles, ArrowRight, Check } from 'lucide-react';

interface CardGridProps {
  cards: PostcardTemplate[];
  selectedCardId?: string;
  onSelectCard: (card: PostcardTemplate) => void;
  showActions?: boolean;
}

export const CardGrid: React.FC<CardGridProps> = ({
  cards,
  selectedCardId,
  onSelectCard,
  showActions = true
}) => {
  if (cards.length === 0) {
    return (
      <div className="text-center py-12 px-4 bg-[#14100d] border border-[#2e231c] rounded-2xl">
        <p className="text-[#a89882] font-bengali-body text-base">
          কোনো পোস্টকার্ড পাওয়া যায়নি।
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
      {cards.map((card, index) => {
        const isSelected = selectedCardId === card.id;

        return (
          <div
            key={card.id}
            id={`card-item-${card.id}`}
            onClick={() => onSelectCard(card)}
            className={`group relative flex flex-col bg-[#16110e] rounded-2xl overflow-hidden border transition-all duration-300 cursor-pointer ${
              isSelected
                ? 'border-[#d4af37] ring-2 ring-[#d4af37]/40 shadow-xl shadow-[#d4af37]/10 -translate-y-1'
                : 'border-[#2f241d] hover:border-[#d4af37]/50 hover:shadow-xl hover:shadow-black/50 hover:-translate-y-1'
            }`}
          >
            {/* Card Thumbnail / Preview */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#1f1712]">
              <img
                src={card.image}
                alt={card.alt || `${card.title} - Vintage Love Postcard`}
                width={card.width || 900}
                height={card.height || 600}
                loading={index < 2 ? 'eager' : 'lazy'}
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#16110e] via-transparent to-black/30 pointer-events-none" />

              {/* Category Pill */}
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded-full text-[11px] font-bengali-body font-medium bg-black/60 backdrop-blur-md text-[#d4af37] border border-[#d4af37]/30">
                  {card.category}
                </span>
              </div>

              {/* Favorite Button */}
              <div className="absolute top-3 right-3 z-10">
                <FavoriteButton id={card.id} type="cards" size="sm" />
              </div>

              {/* New/Featured Badge */}
              {card.isNew && (
                <div className="absolute bottom-3 right-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#7a1f26] text-[#ffd166] border border-[#ffd166]/30">
                    NEW
                  </span>
                </div>
              )}
            </div>

            {/* Content Details */}
            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h4 className="font-bengali-serif text-base font-bold text-[#f7f0df] group-hover:text-[#ffd166] transition-colors line-clamp-1">
                  {card.title}
                </h4>
                <p className="font-bengali-body text-xs text-[#a89882] mt-1 line-clamp-2 italic leading-relaxed">
                  “{card.defaultQuote}”
                </p>
              </div>

              {/* Action Button */}
              {showActions && (
                <div className="pt-2 border-t border-[#261d17] flex items-center justify-between">
                  <span className="text-[10px] font-typewriter text-[#8e7e6c] tracking-wider uppercase">
                    {card.id.toUpperCase()}
                  </span>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectCard(card);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bengali-body font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? 'bg-[#1b5e20] text-[#aef0bc] border border-[#4e8d58]'
                        : 'bg-[#7a1f26] hover:bg-[#91252d] text-[#f8edd6] border border-[#d4af37]/40 shadow-sm'
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>নির্বাচিত</span>
                      </>
                    ) : (
                      <>
                        <span>ব্যবহার করুন</span>
                        <ArrowRight className="w-3 h-3 text-[#d4af37]" />
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
