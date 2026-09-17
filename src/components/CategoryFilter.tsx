import React from 'react';
import { categories } from '../data/categories';

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  className?: string;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  className = ''
}) => {
  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          type="button"
          onClick={() => onSelectCategory('All')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bengali-body whitespace-nowrap transition-all duration-200 cursor-pointer ${
            selectedCategory === 'All'
              ? 'bg-[#7a1f26] text-[#f8edd6] border border-[#d4af37] shadow-md shadow-[#7a1f26]/20 font-semibold'
              : 'bg-[#181310] text-[#a89882] border border-[#31251e] hover:text-[#f4eee0] hover:border-[#d4af37]/40'
          }`}
        >
          ✨ সকল ক্যাটাগরি
        </button>

        {categories.map((cat) => {
          const isSelected =
            selectedCategory === cat.name ||
            selectedCategory === cat.id ||
            selectedCategory.includes(cat.name.replace(/[^\u0980-\u09FF]/g, '').trim());

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.name)}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bengali-body whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-[#7a1f26] text-[#f8edd6] border border-[#d4af37] shadow-md shadow-[#7a1f26]/20 font-semibold'
                  : 'bg-[#181310] text-[#a89882] border border-[#31251e] hover:text-[#f4eee0] hover:border-[#d4af37]/40'
              }`}
            >
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
