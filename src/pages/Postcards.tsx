import React, { useState } from 'react';
import { postcards } from '../data/postcards';
import { CardGrid } from '../components/CardGrid';
import { CategoryFilter } from '../components/CategoryFilter';
import { SearchBar } from '../components/SearchBar';
import { cardMatchesCategory } from '../data/categories';
import { bengaliIncludes, toBengaliNumber } from '../utils/bengaliUtils';
import { PostcardTemplate } from '../types';
import { Sparkles } from 'lucide-react';

interface PostcardsProps {
  onSelectCard: (card: PostcardTemplate) => void;
  onNavigate: (page: string) => void;
}

export const Postcards: React.FC<PostcardsProps> = ({ onSelectCard, onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredCards = postcards.filter((card) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      cardMatchesCategory(card, selectedCategory) ||
      bengaliIncludes(card.category, selectedCategory);

    const matchesSearch =
      !searchQuery ||
      bengaliIncludes(card.title, searchQuery) ||
      bengaliIncludes(card.defaultQuote, searchQuery) ||
      bengaliIncludes(card.category, searchQuery) ||
      (card.mood && bengaliIncludes(card.mood, searchQuery));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#241a14] border border-[#d4af37]/30 text-xs text-[#d4af37] font-vintage-serif tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>VINTAGE TEMPLATE ARCHIVE</span>
        </div>
        <h1 className="font-bengali-serif text-3xl sm:text-4xl font-bold text-[#f7f0df]">
          কার্ডসমূহ
        </h1>
        <p className="font-bengali-body text-sm sm:text-base text-[#b8a791] leading-relaxed">
          আপনার মনের অনুভূতির সাথে মানানসই ক্লাসিক পোস্টকার্ড টেমপ্লেট নির্বাচন করুন।
          প্রতিটি কার্ডের সাথে রয়েছে নিজস্ব ভিন্টেজ ফ্রেম, ব্যাকগ্রাউন্ড ও নান্দনিক ফন্ট।
        </p>
      </div>

      {/* Search and Category Filter */}
      <div className="space-y-4 bg-[#181310] border border-[#2e231b] rounded-2xl p-4 sm:p-6 shadow-xl">
        <SearchBar
          placeholder="কার্ড বা উক্তি খুঁজুন..."
          onSelectCard={(card) => onSelectCard(card)}
        />
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
        />
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs sm:text-sm font-bengali-body text-[#a89882] border-b border-[#251d17] pb-3">
        <span>
          মোট কার্ড: <strong className="text-[#ffd166]">{toBengaliNumber(filteredCards.length)}টি</strong>
        </span>
        {selectedCategory !== 'All' && (
          <button
            type="button"
            onClick={() => setSelectedCategory('All')}
            className="text-[#d4af37] hover:underline cursor-pointer"
          >
            ফিল্টার মুছুন
          </button>
        )}
      </div>

      {/* Cards Grid */}
      <CardGrid cards={filteredCards} onSelectCard={onSelectCard} />
    </div>
  );
};
