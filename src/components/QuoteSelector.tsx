import React, { useState } from 'react';
import { quotes } from '../data/quotes';
import { Quote } from '../types';
import { FavoriteButton } from './FavoriteButton';
import { quoteMatchesCategory } from '../data/categories';
import { bengaliIncludes } from '../utils/bengaliUtils';
import { Dices, Check, Search } from 'lucide-react';

interface QuoteSelectorProps {
  currentQuoteText: string;
  onSelectQuote: (quote: Quote) => void;
  onSurpriseMe: () => void;
  selectedOccasion?: string;
}

export const QuoteSelector: React.FC<QuoteSelectorProps> = ({
  currentQuoteText,
  onSelectQuote,
  onSurpriseMe,
  selectedOccasion
}) => {
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const quoteCategories = ['All', ...Array.from(new Set(quotes.map((q) => q.category)))];

  const filteredQuotes = quotes.filter((q) => {
    // If an occasion was selected in Step 1 and user hasn't explicitly picked a sub-category
    const matchesOccasion =
      !selectedOccasion || selectedOccasion === 'all'
        ? true
        : quoteMatchesCategory(q, selectedOccasion);

    const matchesCategory =
      activeCategoryFilter === 'All'
        ? matchesOccasion
        : q.category === activeCategoryFilter || quoteMatchesCategory(q, activeCategoryFilter);

    const matchesSearch =
      !searchQuery ||
      bengaliIncludes(q.text, searchQuery) ||
      bengaliIncludes(q.category, searchQuery) ||
      (q.author && bengaliIncludes(q.author, searchQuery));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-[#181310] border border-[#d4af37]/25 rounded-2xl p-5 md:p-6 space-y-5 shadow-xl text-[#f4eee0]">
      {/* Top Header & Surprise Me Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#31251e]">
        <div>
          <h3 className="font-bengali-serif text-xl font-bold text-[#f7f0df] flex items-center gap-2">
            <span>৩. উক্তি নির্বাচন করুন</span>
          </h3>
          <p className="text-xs text-[#a89882] font-bengali-body mt-0.5">
            হৃদয়স্পর্শী বাংলা উক্তি বেছে নিন অথবা নিজের লেখা লিখুন
          </p>
        </div>

        <button
          type="button"
          onClick={onSurpriseMe}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#7a1f26] to-[#9c2933] hover:from-[#9c2933] hover:to-[#b7323e] text-[#f8edd6] border border-[#d4af37]/50 font-bengali-body font-semibold text-sm shadow-md transition-all active:scale-95 cursor-pointer self-start sm:self-auto"
        >
          <Dices className="w-4 h-4 text-[#ffd166]" />
          <span>🎲 আমাকে চমকে দিন</span>
        </button>
      </div>

      {/* Search and Category Filter pills */}
      <div className="space-y-3">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#a89882] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="কার্ড বা উক্তি খুঁজুন..."
            className="w-full bg-[#120e0b] border border-[#3d2f26] rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#f7f0df] focus:border-[#d4af37] focus:outline-none placeholder-[#7a6b5a]"
          />
        </div>

        {/* Category horizontal scroll pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {quoteCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bengali-body whitespace-nowrap transition-colors cursor-pointer ${
                activeCategoryFilter === cat
                  ? 'bg-[#7a1f26] text-[#f8edd6] border border-[#d4af37]/60 font-semibold'
                  : 'bg-[#140f0c] text-[#a89882] border border-[#2e231c] hover:text-[#f4eee0] hover:border-[#d4af37]/30'
              }`}
            >
              {cat === 'All' ? 'সকল উক্তি' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Quote Cards List */}
      <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
        {filteredQuotes.length > 0 ? (
          filteredQuotes.map((q) => {
            const isCurrent = currentQuoteText === q.text;

            return (
              <div
                key={q.id}
                className={`group relative p-4 rounded-xl border transition-all duration-200 ${
                  isCurrent
                    ? 'bg-[#251717] border-[#d4af37] shadow-lg ring-1 ring-[#d4af37]/30'
                    : 'bg-[#120e0b] border-[#31251e] hover:border-[#d4af37]/40 hover:bg-[#1a1410]'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <p className="font-bengali-serif text-sm sm:text-base text-[#f4eee0] leading-relaxed">
                      “{q.text}”
                    </p>
                    <div className="mt-2 flex items-center gap-2 text-xs">
                      <span className="px-2 py-0.5 rounded bg-[#241a14] border border-[#3a2c22] text-[#d4af37] font-bengali-body">
                        {q.category}
                      </span>
                      {q.author && (
                        <span className="text-[#8e7e6c] font-bengali-body">
                          — {q.author}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions: Favorite and Select */}
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <FavoriteButton id={q.id} type="quotes" size="sm" />
                    <button
                      type="button"
                      onClick={() => onSelectQuote(q)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bengali-body font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                        isCurrent
                          ? 'bg-[#1b5e20] text-[#aef0bc] border border-[#4e8d58]'
                          : 'bg-[#7a1f26] hover:bg-[#91252d] text-[#f8edd6] border border-[#d4af37]/40 shadow-sm'
                      }`}
                    >
                      {isCurrent ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>ব্যবহৃত</span>
                        </>
                      ) : (
                        <span>ব্যবহার করুন</span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-8 text-[#8e7e6c] font-bengali-body text-sm">
            কোনো উক্তি খুঁজে পাওয়া যায়নি।
          </div>
        )}
      </div>
    </div>
  );
};
