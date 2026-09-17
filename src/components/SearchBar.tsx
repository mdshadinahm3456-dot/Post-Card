import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Sparkles, BookOpen, Image as ImageIcon, Layers } from 'lucide-react';
import { performGlobalSearch, GlobalSearchResult } from '../utils/search';
import { PostcardTemplate, Quote, GalleryItem } from '../types';

interface SearchBarProps {
  onSelectCard?: (card: PostcardTemplate) => void;
  onSelectQuote?: (quote: Quote) => void;
  onSelectGallery?: (item: GalleryItem) => void;
  onSelectCategory?: (categoryName: string) => void;
  className?: string;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSelectCard,
  onSelectQuote,
  onSelectGallery,
  onSelectCategory,
  className = '',
  placeholder = 'উক্তি বা পোস্টকার্ড খুঁজুন...'
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<GlobalSearchResult>({
    cards: [],
    quotes: [],
    gallery: [],
    categories: [],
    totalMatches: 0
  });

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.trim().length > 0) {
      const searchRes = performGlobalSearch(query);
      setResults(searchRes);
      setIsOpen(true);
    } else {
      setResults({ cards: [], quotes: [], gallery: [], categories: [], totalMatches: 0 });
      setIsOpen(false);
    }
  }, [query]);

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className={`relative w-full ${className}`}>
      <div className="relative flex items-center">
        <Search className="w-4 h-4 text-[#d4af37] absolute left-3.5 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            if (query.trim()) setIsOpen(true);
          }}
          placeholder={placeholder}
          className="w-full bg-[#181310] border border-[#3d2f26] rounded-xl pl-10 pr-9 py-2.5 text-sm text-[#f7f0df] font-bengali-body placeholder-[#7a6b5a] focus:border-[#d4af37] focus:outline-none focus:ring-1 focus:ring-[#d4af37]/40 shadow-inner transition-all"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setIsOpen(false);
            }}
            className="absolute right-3 text-[#a89882] hover:text-[#f4eee0] p-1 rounded-full cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Dropdown Results */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-[#16110e] border border-[#d4af37]/35 rounded-2xl shadow-2xl max-h-[480px] overflow-y-auto p-3 text-[#f4eee0] backdrop-blur-md">
          {results.totalMatches === 0 ? (
            <div className="py-6 text-center text-sm font-bengali-body text-[#8e7e6c]">
              “{query}” দিয়ে কিছু পাওয়া যায়নি।
            </div>
          ) : (
            <div className="space-y-4">
              {/* Categories */}
              {results.categories.length > 0 && (
                <div>
                  <div className="text-[11px] font-vintage-serif tracking-widest text-[#d4af37] uppercase mb-2 flex items-center gap-1.5 px-2">
                    <Layers className="w-3.5 h-3.5" />
                    <span>ক্যাটাগরি ({results.categories.length})</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 px-2">
                    {results.categories.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => {
                          onSelectCategory?.(c.name);
                          setIsOpen(false);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-[#221a15] hover:bg-[#7a1f26] text-xs font-bengali-body border border-[#3b2d24] text-[#e0d4c1] hover:text-white transition-colors cursor-pointer"
                      >
                        {c.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Cards */}
              {results.cards.length > 0 && (
                <div>
                  <div className="text-[11px] font-vintage-serif tracking-widest text-[#d4af37] uppercase mb-2 flex items-center gap-1.5 px-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>পোস্টকার্ড ({results.cards.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {results.cards.slice(0, 4).map((c) => (
                      <div
                        key={c.id}
                        onClick={() => {
                          onSelectCard?.(c);
                          setIsOpen(false);
                        }}
                        className="p-2 rounded-xl bg-[#1c1511] hover:bg-[#281e18] border border-[#2f231b] flex items-center gap-3 cursor-pointer transition-colors"
                      >
                        <img
                          src={c.image}
                          alt={c.title}
                          className="w-10 h-8 rounded object-cover border border-[#423226]"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-bold font-bengali-serif text-[#f7f0df] truncate">
                            {c.title}
                          </div>
                          <div className="text-[11px] font-bengali-body text-[#a89882] truncate">
                            {c.category} • “{c.defaultQuote}”
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Quotes */}
              {results.quotes.length > 0 && (
                <div>
                  <div className="text-[11px] font-vintage-serif tracking-widest text-[#d4af37] uppercase mb-2 flex items-center gap-1.5 px-2">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>উক্তি ({results.quotes.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {results.quotes.slice(0, 4).map((q) => (
                      <div
                        key={q.id}
                        onClick={() => {
                          onSelectQuote?.(q);
                          setIsOpen(false);
                        }}
                        className="p-2.5 rounded-xl bg-[#1c1511] hover:bg-[#281e18] border border-[#2f231b] cursor-pointer transition-colors"
                      >
                        <p className="text-xs font-bengali-serif text-[#eadecc] line-clamp-2">
                          “{q.text}”
                        </p>
                        <div className="text-[10px] text-[#d4af37] mt-1 font-bengali-body">
                          {q.category}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Gallery */}
              {results.gallery.length > 0 && (
                <div>
                  <div className="text-[11px] font-vintage-serif tracking-widest text-[#d4af37] uppercase mb-2 flex items-center gap-1.5 px-2">
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>ভিন্টেজ গ্যালারি ({results.gallery.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {results.gallery.slice(0, 3).map((g) => (
                      <div
                        key={g.id}
                        onClick={() => {
                          onSelectGallery?.(g);
                          setIsOpen(false);
                        }}
                        className="p-2 rounded-xl bg-[#1c1511] hover:bg-[#281e18] border border-[#2f231b] flex items-center gap-3 cursor-pointer transition-colors"
                      >
                        <img
                          src={g.image}
                          alt={g.title}
                          className="w-10 h-8 rounded object-cover border border-[#423226]"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-semibold text-[#f7f0df] truncate">
                            {g.title}
                          </div>
                          <div className="text-[10px] text-[#a89882] truncate">
                            {g.category}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
