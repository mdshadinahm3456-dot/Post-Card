import React, { useState } from 'react';
import { quotes } from '../data/quotes';
import { Quote } from '../types';
import { FavoriteButton } from '../components/FavoriteButton';
import { quoteMatchesCategory } from '../data/categories';
import { bengaliIncludes, toBengaliNumber } from '../utils/bengaliUtils';
import { Search, Copy, Check, Sparkles, BookOpen } from 'lucide-react';

interface QuotesProps {
  onUseQuote: (quote: Quote) => void;
}

export const Quotes: React.FC<QuotesProps> = ({ onUseQuote }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ['All', ...Array.from(new Set(quotes.map((q) => q.category)))];

  const filteredQuotes = quotes.filter((q) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      q.category === selectedCategory ||
      quoteMatchesCategory(q, selectedCategory);

    const matchesSearch =
      !searchQuery ||
      bengaliIncludes(q.text, searchQuery) ||
      bengaliIncludes(q.category, searchQuery) ||
      (q.author && bengaliIncludes(q.author, searchQuery));

    return matchesCategory && matchesSearch;
  });

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#241a14] border border-[#d4af37]/30 text-xs text-[#d4af37] font-vintage-serif tracking-widest uppercase">
          <BookOpen className="w-3.5 h-3.5" />
          <span>BENGALI QUOTES & MESSAGES</span>
        </div>
        <h1 className="font-bengali-serif text-3xl sm:text-4xl font-bold text-[#f7f0df]">
          উক্তি ও বার্তা সংগ্রহ
        </h1>
        <p className="font-bengali-body text-sm sm:text-base text-[#b8a791] leading-relaxed">
          প্রেম, বিরহ, বন্ধুত্ব, জন্মদিন, পরিবার ও ঋতু—প্রতিটি আবেগ ও উপলক্ষের জন্য হৃদয়ছোঁয়া বাংলা উক্তি ও বার্তা।
        </p>
      </div>

      {/* Filter and Search */}
      <div className="space-y-4 bg-[#181310] border border-[#2e231c] rounded-2xl p-4 sm:p-6 shadow-xl">
        <div className="relative">
          <Search className="w-4 h-4 text-[#a89882] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="কার্ড বা উক্তি খুঁজুন..."
            className="w-full bg-[#120e0b] border border-[#3d2f26] rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#f7f0df] font-bengali-body placeholder-[#7a6b5a] focus:border-[#d4af37] focus:outline-none"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bengali-body whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#7a1f26] text-[#f8edd6] border border-[#d4af37]/60 font-semibold shadow-md'
                  : 'bg-[#140f0c] text-[#a89882] border border-[#2e231c] hover:text-[#f4eee0] hover:border-[#d4af37]/30'
              }`}
            >
              {cat === 'All' ? '✨ সকল উক্তি' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Quotes Count */}
      <div className="text-xs sm:text-sm font-bengali-body text-[#a89882] border-b border-[#251d17] pb-3">
        মোট উক্তি: <strong className="text-[#ffd166]">{toBengaliNumber(filteredQuotes.length)}টি</strong>
      </div>

      {/* Quotes Masonry / Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredQuotes.map((q) => (
          <div
            key={q.id}
            className="group relative bg-[#16110e] border border-[#2e231c] hover:border-[#d4af37]/50 rounded-2xl p-5 flex flex-col justify-between space-y-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl shadow-black/40"
          >
            {/* Top Bar: Category & Favorite */}
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bengali-body bg-[#241a14] border border-[#3b2d24] text-[#d4af37]">
                {q.category}
              </span>
              <FavoriteButton id={q.id} type="quotes" size="sm" />
            </div>

            {/* Quote Body */}
            <p className="font-bengali-serif text-base text-[#f4eee0] leading-relaxed italic">
              “{q.text}”
            </p>

            {/* Author */}
            {q.author && (
              <div className="text-right text-xs font-bengali-body text-[#b8a791]">
                — {q.author}
              </div>
            )}

            {/* Bottom Actions: Copy & Create Card */}
            <div className="pt-3 border-t border-[#2a1f18] flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => handleCopy(q.text, q.id)}
                className="px-3 py-1.5 rounded-lg bg-[#241a14] hover:bg-[#33241b] text-xs font-bengali-body text-[#c8baa7] hover:text-[#f4eee0] border border-[#3a2c22] flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedId === q.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#81c784]" />
                    <span className="text-[#aef0bc]">কপি হয়েছে</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>কপি করুন</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => onUseQuote(q)}
                className="px-3 py-1.5 rounded-lg bg-[#7a1f26] hover:bg-[#91252d] text-xs font-bengali-body font-semibold text-[#f8edd6] border border-[#d4af37]/40 flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#ffd166]" />
                <span>কার্ড তৈরি করুন</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
