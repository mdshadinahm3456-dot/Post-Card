import React, { useState, useEffect } from 'react';
import { RecentlyUsedItem, PostcardTemplate } from '../types';
import { getRecentlyUsed, clearRecentlyUsed } from '../utils/myCreations';
import { postcards } from '../data/postcards';
import { Clock, Sparkles, Trash2, ArrowRight } from 'lucide-react';
import { formatBengaliDate } from '../utils/bengaliUtils';

interface RecentlyUsedProps {
  onSelectCard: (card: PostcardTemplate) => void;
  className?: string;
  limit?: number;
}

export const RecentlyUsed: React.FC<RecentlyUsedProps> = ({
  onSelectCard,
  className = '',
  limit = 8
}) => {
  const [items, setItems] = useState<RecentlyUsedItem[]>([]);

  const loadItems = () => {
    setItems(getRecentlyUsed());
  };

  useEffect(() => {
    loadItems();
    window.addEventListener('magic_card_recently_used_updated', loadItems);
    return () => {
      window.removeEventListener('magic_card_recently_used_updated', loadItems);
    };
  }, []);

  if (items.length === 0) {
    return null;
  }

  const displayedItems = items.slice(0, limit);

  return (
    <div
      id="recently-used-section"
      className={`bg-[#181310] border border-[#d4af37]/25 rounded-2xl p-4 sm:p-5 shadow-xl space-y-3.5 ${className}`}
    >
      <div className="flex items-center justify-between border-b border-[#2e231c] pb-2.5">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#ffd166]" />
          <h3 className="font-bengali-serif text-base sm:text-lg font-bold text-[#f7f0df]">
            🕘 সম্প্রতি ব্যবহৃত কার্ড (Recently Used)
          </h3>
        </div>

        <button
          type="button"
          onClick={() => clearRecentlyUsed()}
          className="text-xs text-[#a89882] hover:text-[#ff808d] transition-colors flex items-center gap-1 cursor-pointer font-bengali-body"
          title="মুছে ফেলুন"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">লিস্ট মুছুন</span>
        </button>
      </div>

      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
        {displayedItems.map((item) => {
          const cardObj = postcards.find((c) => c.id === item.cardId);
          const imageSrc = cardObj ? cardObj.image : item.image;
          const title = cardObj ? cardObj.title : item.title;

          return (
            <button
              key={`${item.cardId}-${item.lastUsedAt}`}
              type="button"
              onClick={() => {
                if (cardObj) {
                  onSelectCard(cardObj);
                } else {
                  // Fallback card structure if not found
                  onSelectCard({
                    id: item.cardId,
                    title: item.title,
                    image: item.image,
                    category: 'রোমান্টিক',
                    defaultQuote: 'তুমি আমার চাঁদের আলো...',
                    textPosition: 'center',
                    typography: 'bengali-serif',
                    borderStyle: 'classic'
                  });
                }
              }}
              className="group flex-shrink-0 w-32 sm:w-36 bg-[#120e0b] hover:bg-[#201813] border border-[#382b21] hover:border-[#d4af37]/60 rounded-xl p-2 text-left transition-all cursor-pointer shadow-md hover:-translate-y-0.5"
            >
              <div className="relative w-full h-20 sm:h-22 rounded-lg overflow-hidden border border-[#2d221a] mb-1.5">
                <img
                  src={imageSrc}
                  alt={title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-1 right-1">
                  <Sparkles className="w-3 h-3 text-[#ffd166] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
              <p className="font-bengali-serif text-xs font-semibold text-[#f7f0df] truncate group-hover:text-[#ffd166] transition-colors">
                {title}
              </p>
              <span className="text-[10px] text-[#91816e] font-bengali-body block mt-0.5">
                {formatBengaliDate(new Date(item.lastUsedAt))}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
