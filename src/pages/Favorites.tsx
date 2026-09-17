import React, { useState, useEffect } from 'react';
import { getFavorites, clearAllFavorites } from '../utils/favorites';
import { postcards } from '../data/postcards';
import { quotes } from '../data/quotes';
import { gallery } from '../data/gallery';
import { PostcardTemplate, Quote, GalleryItem } from '../types';
import { CardGrid } from '../components/CardGrid';
import { FavoriteButton } from '../components/FavoriteButton';
import { toBengaliNumber } from '../utils/bengaliUtils';
import { Heart, Trash2, Sparkles, BookOpen, Image as ImageIcon } from 'lucide-react';

interface FavoritesProps {
  onSelectCard: (card: PostcardTemplate) => void;
  onSelectQuote: (quote: Quote) => void;
  onSelectGallery: (item: GalleryItem) => void;
  onNavigate: (page: string) => void;
}

export const Favorites: React.FC<FavoritesProps> = ({
  onSelectCard,
  onSelectQuote,
  onSelectGallery,
  onNavigate
}) => {
  const [activeTab, setActiveTab] = useState<'cards' | 'quotes' | 'gallery'>('cards');
  const [favCards, setFavCards] = useState<PostcardTemplate[]>([]);
  const [favQuotes, setFavQuotes] = useState<Quote[]>([]);
  const [favGallery, setFavGallery] = useState<GalleryItem[]>([]);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const loadData = () => {
    const favs = getFavorites();
    setFavCards(postcards.filter((c) => favs.cards.includes(c.id)));
    setFavQuotes(quotes.filter((q) => favs.quotes.includes(q.id)));
    setFavGallery(gallery.filter((g) => favs.gallery.includes(g.id)));
  };

  useEffect(() => {
    loadData();
    window.addEventListener('magic_card_favorites_updated', loadData);
    return () => {
      window.removeEventListener('magic_card_favorites_updated', loadData);
    };
  }, []);

  const handleClear = () => {
    clearAllFavorites();
    setShowClearConfirm(false);
    loadData();
  };

  const totalFavs = favCards.length + favQuotes.length + favGallery.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#2e231c] pb-6">
        <div className="text-center sm:text-left space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-vintage-serif tracking-widest text-[#d4af37] uppercase">
            <Heart className="w-3.5 h-3.5 fill-[#7a1f26] text-[#7a1f26]" />
            <span>SAVED LOCALLY (NO LOGIN REQUIRED)</span>
          </div>
          <h1 className="font-bengali-serif text-3xl font-bold text-[#f7f0df]">
            ♡ আমার পছন্দ
          </h1>
          <p className="font-bengali-body text-xs sm:text-sm text-[#a89882]">
            আপনার বুকমার্ক করা সকল প্রিয় পোস্টকার্ড, উক্তি ও ভিন্টেজ আর্টওয়ার্ক।
          </p>
        </div>

        {totalFavs > 0 && (
          <button
            type="button"
            onClick={() => setShowClearConfirm(true)}
            className="px-4 py-2 rounded-xl bg-[#241a14] hover:bg-[#381216] border border-[#3b2d24] hover:border-[#c93b48] text-xs font-bengali-body text-[#a89882] hover:text-[#ff808d] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>পছন্দের তালিকা খালি করুন</span>
          </button>
        )}
      </div>

      {/* Clear Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#181310] border border-[#c93b48]/50 p-6 rounded-2xl max-w-sm w-full space-y-4 shadow-2xl text-center">
            <div className="w-12 h-12 rounded-full bg-[#381216] text-[#ff808d] flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="font-bengali-serif text-lg font-bold text-[#f7f0df]">
              সব পছন্দ মুছে ফেলবেন?
            </h3>
            <p className="font-bengali-body text-xs text-[#a89882]">
              এই কাজটি পূর্বাবস্থায় ফেরানো যাবে না। সংরক্ষিত সকল কার্ড ও উক্তি মুছে যাবে।
            </p>
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowClearConfirm(false)}
                className="flex-1 py-2.5 rounded-xl bg-[#241a14] text-xs font-bengali-body text-[#f7f0df] hover:bg-[#312319] cursor-pointer"
              >
                বাতিল করুন
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="flex-1 py-2.5 rounded-xl bg-[#7a1f26] text-xs font-bengali-body font-bold text-white hover:bg-[#96252f] cursor-pointer"
              >
                হ্যাঁ, মুছুন
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#251d17] pb-3">
        <button
          type="button"
          onClick={() => setActiveTab('cards')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bengali-body font-medium transition-colors flex items-center gap-2 cursor-pointer ${
            activeTab === 'cards'
              ? 'bg-[#7a1f26] text-[#f8edd6] border border-[#d4af37]/40 shadow-sm'
              : 'text-[#a89882] hover:text-[#f4eee0] hover:bg-[#1f1712]'
          }`}
        >
          <Sparkles className="w-4 h-4 text-[#d4af37]" />
          <span>কার্ডসমূহ ({toBengaliNumber(favCards.length)})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('quotes')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bengali-body font-medium transition-colors flex items-center gap-2 cursor-pointer ${
            activeTab === 'quotes'
              ? 'bg-[#7a1f26] text-[#f8edd6] border border-[#d4af37]/40 shadow-sm'
              : 'text-[#a89882] hover:text-[#f4eee0] hover:bg-[#1f1712]'
          }`}
        >
          <BookOpen className="w-4 h-4 text-[#d4af37]" />
          <span>উক্তি ({toBengaliNumber(favQuotes.length)})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('gallery')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bengali-body font-medium transition-colors flex items-center gap-2 cursor-pointer ${
            activeTab === 'gallery'
              ? 'bg-[#7a1f26] text-[#f8edd6] border border-[#d4af37]/40 shadow-sm'
              : 'text-[#a89882] hover:text-[#f4eee0] hover:bg-[#1f1712]'
          }`}
        >
          <ImageIcon className="w-4 h-4 text-[#d4af37]" />
          <span>ভিন্টেজ গ্যালারি ({toBengaliNumber(favGallery.length)})</span>
        </button>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'cards' && (
          <div>
            {favCards.length > 0 ? (
              <CardGrid cards={favCards} onSelectCard={onSelectCard} />
            ) : (
              <div className="text-center py-16 px-4 bg-[#16110e] border border-[#2e231c] rounded-2xl space-y-3">
                <div className="text-4xl">💌</div>
                <h3 className="font-bengali-serif text-lg font-bold text-[#f7f0df]">
                  কোনো কার্ড পছন্দ তালিকায় যোগ করা হয়নি
                </h3>
                <p className="font-bengali-body text-xs text-[#a89882]">
                  লাইব্রেরি থেকে আপনার পছন্দের কার্ডের হার্ট আইকনে ক্লিক করে সংরক্ষণ করুন।
                </p>
                <button
                  type="button"
                  onClick={() => onNavigate('postcards')}
                  className="mt-2 px-5 py-2.5 rounded-xl bg-[#7a1f26] text-[#f8edd6] text-xs font-bengali-body font-semibold cursor-pointer"
                >
                  কার্ডসমূহ খুঁজুন
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'quotes' && (
          <div>
            {favQuotes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {favQuotes.map((q) => (
                  <div
                    key={q.id}
                    className="bg-[#16110e] border border-[#2e231c] rounded-2xl p-5 flex flex-col justify-between space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bengali-body bg-[#241a14] border border-[#3b2d24] text-[#d4af37]">
                        {q.category}
                      </span>
                      <FavoriteButton id={q.id} type="quotes" size="sm" />
                    </div>

                    <blockquote className="font-bengali-serif text-base text-[#f7f0df] italic">
                      “{q.text}”
                    </blockquote>

                    {q.author && (
                      <div className="text-right text-xs text-[#a89882] font-bengali-body">
                        — {q.author}
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() => onSelectQuote(q)}
                      className="w-full py-2.5 rounded-xl bg-[#7a1f26] hover:bg-[#91252d] text-[#f8edd6] text-xs font-bengali-body font-semibold flex items-center justify-center gap-1.5 cursor-pointer shadow-sm transition-all"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#ffd166]" />
                      <span>এই উক্তি দিয়ে কার্ড তৈরি করুন</span>
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 px-4 bg-[#16110e] border border-[#2e231c] rounded-2xl space-y-3">
                <div className="text-4xl">📖</div>
                <h3 className="font-bengali-serif text-lg font-bold text-[#f7f0df]">
                  কোনো উক্তি পছন্দ তালিকায় যোগ করা হয়নি
                </h3>
                <p className="font-bengali-body text-xs text-[#a89882]">
                  উক্তি সংগ্রহ থেকে প্রিয় পঙক্তিগুলো বুকমার্ক করে রাখুন।
                </p>
                <button
                  type="button"
                  onClick={() => onNavigate('quotes')}
                  className="mt-2 px-5 py-2.5 rounded-xl bg-[#7a1f26] text-[#f8edd6] text-xs font-bengali-body font-semibold cursor-pointer"
                >
                  উক্তি সংগ্রহ দেখুন
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'gallery' && (
          <div>
            {favGallery.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {favGallery.map((item) => (
                  <div
                    key={item.id}
                    className="bg-[#16110e] border border-[#2e231c] rounded-2xl overflow-hidden p-4 space-y-3"
                  >
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.alt || `${item.title} – ভিন্টেজ প্রেমের পোস্টকার্ড আর্ট`}
                        width={item.width || 800}
                        height={item.height || 600}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <FavoriteButton id={item.id} type="gallery" size="sm" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bengali-serif text-sm font-bold text-[#f7f0df]">
                        {item.title}
                      </h4>
                      <p className="font-bengali-body text-xs text-[#a89882] line-clamp-2 mt-1 italic">
                        “{item.quoteBengali || item.quote || item.quoteEnglish}”
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onSelectGallery(item)}
                      className="w-full py-2 rounded-xl bg-[#7a1f26] text-[#f8edd6] text-xs font-bengali-body font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#ffd166]" />
                      <span>Customize করুন</span>
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 px-4 bg-[#16110e] border border-[#2e231c] rounded-2xl space-y-3">
                <div className="text-4xl">🖼️</div>
                <h3 className="font-bengali-serif text-lg font-bold text-[#f7f0df]">
                  কোনো গ্যালারি আর্ট পছন্দ তালিকায় যোগ করা হয়নি
                </h3>
                <p className="font-bengali-body text-xs text-[#a89882]">
                  ভিন্টেজ গ্যালারি থেকে পছন্দের আর্টওয়ার্ক বুকমার্ক করুন।
                </p>
                <button
                  type="button"
                  onClick={() => onNavigate('gallery')}
                  className="mt-2 px-5 py-2.5 rounded-xl bg-[#7a1f26] text-[#f8edd6] text-xs font-bengali-body font-semibold cursor-pointer"
                >
                  গ্যালারি দেখুন
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
