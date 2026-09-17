import React, { useState } from 'react';
import { categories, CATEGORY_GROUPS_CONFIG, getCategoriesByGroup, cardMatchesCategory } from '../data/categories';
import { postcards } from '../data/postcards';
import { PostcardTemplate, CategoryGroup } from '../types';
import { CardGrid } from '../components/CardGrid';
import { toBengaliNumber } from '../utils/bengaliUtils';
import { ArrowRight, Layers, Sparkles } from 'lucide-react';

interface CategoriesProps {
  onSelectCard: (card: PostcardTemplate) => void;
  onSelectCategoryFilter: (categoryName: string) => void;
}

export const Categories: React.FC<CategoriesProps> = ({
  onSelectCard,
  onSelectCategoryFilter
}) => {
  const [activeGroup, setActiveGroup] = useState<CategoryGroup | 'all'>('all');

  const groups = Object.keys(CATEGORY_GROUPS_CONFIG) as CategoryGroup[];

  const displayedCategories =
    activeGroup === 'all'
      ? categories
      : getCategoriesByGroup(activeGroup);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#241a14] border border-[#d4af37]/30 text-xs text-[#d4af37] font-vintage-serif tracking-widest uppercase">
          <Layers className="w-3.5 h-3.5" />
          <span>OCCASIONS & CATEGORIES</span>
        </div>
        <h1 className="font-bengali-serif text-3xl sm:text-4xl font-bold text-[#f7f0df]">
          সকল উপলক্ষ ও ক্যাটাগরি
        </h1>
        <p className="font-bengali-body text-sm sm:text-base text-[#b8a791] leading-relaxed">
          প্রেম, পরিবার, বন্ধুত্ব, উৎসব কিংবা ঋতু—প্রতিটি বিশেষ মুহূর্তের জন্য রয়েছে ভিন্টেজ কার্ড সংগ্রহ।
        </p>
      </div>

      {/* Group Navigation Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start md:justify-center">
        <button
          type="button"
          onClick={() => setActiveGroup('all')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bengali-body whitespace-nowrap transition-all cursor-pointer ${
            activeGroup === 'all'
              ? 'bg-[#7a1f26] text-[#f8edd6] border border-[#d4af37] shadow-md font-semibold'
              : 'bg-[#181310] text-[#a89882] border border-[#2e231c] hover:text-[#f7f0df]'
          }`}
        >
          ✨ সকল উপলক্ষ ({toBengaliNumber(categories.length)})
        </button>

        {groups.map((groupKey) => {
          const groupMeta = CATEGORY_GROUPS_CONFIG[groupKey];
          const isSelected = activeGroup === groupKey;

          return (
            <button
              key={groupKey}
              type="button"
              onClick={() => setActiveGroup(groupKey)}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bengali-body whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-[#7a1f26] text-[#f8edd6] border border-[#d4af37] shadow-md font-semibold'
                  : 'bg-[#181310] text-[#a89882] border border-[#2e231c] hover:text-[#f7f0df] hover:border-[#d4af37]/30'
              }`}
            >
              <span>{groupMeta.icon}</span>
              <span>{groupMeta.titleBengali}</span>
            </button>
          );
        })}
      </div>

      {/* Category Sections */}
      <div className="space-y-10">
        {displayedCategories.map((cat) => {
          const matchingCards = postcards.filter((c) => cardMatchesCategory(c, cat.id));

          return (
            <section
              key={cat.id}
              className="bg-[#181310] border border-[#2e231c] rounded-3xl p-5 sm:p-7 space-y-5 shadow-xl transition-all hover:border-[#d4af37]/30"
            >
              {/* Category Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#2e231c] pb-4">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{cat.icon}</span>
                    <h2 className="font-bengali-serif text-xl sm:text-2xl font-bold text-[#f7f0df]">
                      {cat.name}
                    </h2>
                  </div>
                  <p className="font-bengali-body text-xs sm:text-sm text-[#a89882] mt-1">
                    {cat.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <button
                    type="button"
                    onClick={() => onSelectCategoryFilter(cat.id)}
                    className="px-4 py-2 rounded-xl bg-[#7a1f26] hover:bg-[#91252d] text-[#f8edd6] border border-[#d4af37]/40 text-xs font-bengali-body font-semibold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#ffd166]" />
                    <span>কার্ড তৈরি করুন</span>
                  </button>
                </div>
              </div>

              {/* Cards Grid for this category */}
              {matchingCards.length > 0 ? (
                <CardGrid
                  cards={matchingCards.slice(0, 4)}
                  onSelectCard={onSelectCard}
                />
              ) : (
                <div className="py-6 text-center text-xs text-[#8e7e6c] font-bengali-body">
                  এই ক্যাটাগরির জন্য কাস্টম কার্ড তৈরি করতে "কার্ড তৈরি করুন" বাটনে ক্লিক করুন।
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
};
