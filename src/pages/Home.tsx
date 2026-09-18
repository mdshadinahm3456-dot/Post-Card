import React, { useState, useEffect } from 'react';
import { Hero } from '../components/Hero';
import { CardGrid } from '../components/CardGrid';
import { SearchBar } from '../components/SearchBar';
import { RecentlyUsed } from '../components/RecentlyUsed';
import { HomeInfoSections } from '../components/HomeInfoSections';
import { AdSenseAd } from '../components/AdSenseAd';
import { postcards } from '../data/postcards';
import { quotes } from '../data/quotes';
import { gallery } from '../data/gallery';
import { POPULAR_CATEGORIES, cardMatchesCategory, getCategoryById } from '../data/categories';
import { PostcardTemplate, Quote, SavedCreation } from '../types';
import { getMyCreations } from '../utils/myCreations';
import { toBengaliNumber } from '../utils/bengaliUtils';
import {
  Sparkles,
  Heart,
  CloudRain,
  Mail,
  Flame,
  ArrowRight,
  Image as ImageIcon,
  Compass,
  Bookmark
} from 'lucide-react';

interface HomeProps {
  onSelectCardToCreate: (card: PostcardTemplate) => void;
  onNavigate: (page: string) => void;
  onSelectQuoteToCreate?: (quote: Quote) => void;
  onSelectOccasionToCreate?: (occasionId: string) => void;
  onEditCreation?: (creation: SavedCreation) => void;
}

export const Home: React.FC<HomeProps> = ({
  onSelectCardToCreate,
  onNavigate,
  onSelectQuoteToCreate,
  onSelectOccasionToCreate,
  onEditCreation
}) => {
  const [selectedOccasion, setSelectedOccasion] = useState<string>('all');
  const [savedCreationsCount, setSavedCreationsCount] = useState<number>(0);

  useEffect(() => {
    const updateCount = () => {
      const items = getMyCreations();
      setSavedCreationsCount(items.length);
    };
    updateCount();
    window.addEventListener('magic_card_creations_updated', updateCount);
    return () => {
      window.removeEventListener('magic_card_creations_updated', updateCount);
    };
  }, []);

  // Filtered cards by selected occasion/category
  const filteredCards =
    selectedOccasion === 'all'
      ? postcards
      : postcards.filter((card) => cardMatchesCategory(card, selectedOccasion));

  // Curated collections
  const popularCards = postcards.filter((c) => c.collection === 'popular' || c.featured).slice(0, 4);
  const newCards = postcards.filter((c) => c.isNew || c.collection === 'new').slice(0, 4);
  const romanticCards = postcards.filter((c) => c.collection === 'romantic').slice(0, 4);
  const rainyCards = postcards.filter((c) => c.collection === 'rainy').slice(0, 4);
  const vintageLetterCards = postcards.filter((c) => c.collection === 'vintage_letter').slice(0, 4);

  const activeOccasionMeta = selectedOccasion !== 'all' ? getCategoryById(selectedOccasion) : null;

  return (
    <div className="space-y-14 sm:space-y-20">
      {/* Hero Section */}
      <Hero
        onStartCreate={() => onNavigate('generator')}
        onExploreGallery={() => onNavigate('gallery')}
      />

      {/* Ad Unit 1: Magic Card - Home Featured Bottom */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdSenseAd adSlot="2613513985" />
      </div>

      {/* Global Search Bar Banner */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-[#181310] border border-[#d4af37]/30 rounded-2xl p-4 sm:p-6 shadow-xl">
          <div className="text-center mb-3">
            <span className="font-bengali-serif text-base sm:text-lg font-bold text-[#f7f0df]">
              💌 কার্ড বা উক্তি খুঁজুন...
            </span>
          </div>
          <SearchBar
            onSelectCard={(c) => onSelectCardToCreate(c)}
            onSelectQuote={(q) => {
              if (onSelectQuoteToCreate) onSelectQuoteToCreate(q);
              onNavigate('generator');
            }}
            onSelectGallery={() => onNavigate('gallery')}
            onSelectCategory={(catId) => {
              setSelectedOccasion(catId);
              const el = document.getElementById('occasion-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        </div>
      </div>

      {/* FEATURE: কোন উপলক্ষের জন্য কার্ড? (Which Occasion?) */}
      <section id="occasion-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#2a1f18] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#d4af37]" />
              <span className="text-xs font-vintage-serif tracking-widest text-[#d4af37] uppercase">
                OCCASIONS & MOMENTS
              </span>
            </div>
            <h2 className="font-bengali-serif text-2xl sm:text-3xl font-bold text-[#f7f0df] mt-1">
              কোন উপলক্ষের জন্য কার্ড?
            </h2>
            <p className="font-bengali-body text-xs sm:text-sm text-[#a89882] mt-0.5">
              উপলক্ষ বেছে নিন এবং মনের মতো ভিন্টেজ কার্ড তৈরি করুন
            </p>
          </div>

          <a
            href="/categories"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('categories');
            }}
            className="self-start sm:self-auto text-xs sm:text-sm font-bengali-body text-[#ffd166] hover:text-[#f8edd6] flex items-center gap-1.5 cursor-pointer transition-colors group"
            title="সব উপলক্ষের ক্যাটাগরি দেখুন"
          >
            <span>সব ক্যাটাগরি দেখুন</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

        {/* Popular Occasions Grid & Mobile Horizontal Scroll */}
        <div className="flex sm:grid sm:grid-cols-3 md:grid-cols-5 gap-3 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
          {/* All Cards Pill */}
          <button
            type="button"
            onClick={() => setSelectedOccasion('all')}
            className={`flex-shrink-0 sm:flex-shrink p-3.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer min-w-[140px] sm:min-w-0 ${
              selectedOccasion === 'all'
                ? 'bg-[#241717] border-[#d4af37] shadow-lg shadow-[#7a1f26]/20 ring-1 ring-[#d4af37]/40'
                : 'bg-[#181310] border-[#2e231c] hover:border-[#d4af37]/40 hover:bg-[#1f1712]'
            }`}
          >
            <div className="text-xl mb-1.5">✨</div>
            <div className="font-bengali-serif text-sm font-bold text-[#f7f0df]">
              সব কার্ড
            </div>
            <div className="text-[11px] font-bengali-body text-[#a89882]">
              {toBengaliNumber(postcards.length)}টি টেমপ্লেট
            </div>
          </button>

          {/* Popular Occasion Cards */}
          {POPULAR_CATEGORIES.map((cat) => {
            const isSelected = selectedOccasion === cat.id;
            const count = postcards.filter((c) => cardMatchesCategory(c, cat.id)).length;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedOccasion(cat.id)}
                className={`flex-shrink-0 sm:flex-shrink p-3.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer min-w-[140px] sm:min-w-0 ${
                  isSelected
                    ? 'bg-[#241717] border-[#d4af37] shadow-lg shadow-[#7a1f26]/20 ring-1 ring-[#d4af37]/40'
                    : 'bg-[#181310] border-[#2e231c] hover:border-[#d4af37]/40 hover:bg-[#1f1712]'
                }`}
              >
                <div className="text-xl mb-1.5">{cat.icon}</div>
                <div className="font-bengali-serif text-sm font-bold text-[#f7f0df] truncate">
                  {cat.name.replace(/[^\u0980-\u09FF\s]/g, '').trim()}
                </div>
                <div className="text-[11px] font-bengali-body text-[#a89882] flex items-center justify-between">
                  <span>{toBengaliNumber(count)}টি কার্ড</span>
                  {isSelected && <span className="text-[#ffd166] text-xs">●</span>}
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Filter Results or Quick CTA for Selected Occasion */}
        {selectedOccasion !== 'all' && (
          <div className="pt-2 space-y-4">
            <div className="bg-[#1c1511] border border-[#d4af37]/30 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{activeOccasionMeta?.icon || '💌'}</span>
                <div>
                  <h3 className="font-bengali-serif text-lg font-bold text-[#ffd166]">
                    “{activeOccasionMeta?.name}” কার্ড ({toBengaliNumber(filteredCards.length)}টি)
                  </h3>
                  <p className="text-xs text-[#a89882] font-bengali-body">
                    {activeOccasionMeta?.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                {onSelectOccasionToCreate && (
                  <button
                    type="button"
                    onClick={() => onSelectOccasionToCreate(selectedOccasion)}
                    className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-[#7a1f26] hover:bg-[#91252d] text-[#f8edd6] border border-[#d4af37]/40 text-xs font-bengali-body font-semibold flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#ffd166]" />
                    <span>কার্ড তৈরি করুন</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setSelectedOccasion('all')}
                  className="px-3 py-2 rounded-xl bg-[#241a14] text-[#a89882] hover:text-[#f7f0df] text-xs font-bengali-body border border-[#3b2d24] cursor-pointer"
                >
                  সবগুলো দেখুন
                </button>
              </div>
            </div>

            <CardGrid cards={filteredCards} onSelectCard={onSelectCardToCreate} />
          </div>
        )}
      </section>

      {/* Featured Curated Collections & User Workspace */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Recently Used Templates */}
        <RecentlyUsed onSelectCard={onSelectCardToCreate} />

        {/* Saved Creations Shortcut Banner (if any creations exist) */}
        {savedCreationsCount > 0 && (
          <section className="bg-gradient-to-r from-[#241a14] via-[#2f1f17] to-[#1e1510] border border-[#d4af37]/30 rounded-2xl p-4 sm:p-6 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-[#7a1f26]/40 border border-[#d4af37]/40 text-[#ffd166]">
                <Bookmark className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bengali-serif text-lg font-bold text-[#f7f0df]">
                  আপনার কাছে {toBengaliNumber(savedCreationsCount)}টি সংরক্ষিত কার্ড রয়েছে
                </h4>
                <p className="font-bengali-body text-xs text-[#a89882]">
                  যেকোনো সময় এডিট, রি-ডাউনলোড বা শেয়ার করুন আপনার তৈরিকৃত কার্ডসমূহ।
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('my-creations')}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#7a1f26] hover:bg-[#91252d] text-[#f8edd6] border border-[#d4af37]/40 font-bengali-body font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 shadow-md flex-shrink-0"
            >
              <span>আমার তৈরি কার্ড দেখুন</span>
              <ArrowRight className="w-4 h-4 text-[#ffd166]" />
            </button>
          </section>
        )}

        {/* Popular Cards */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#2a1f18] pb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-[#7a1f26]/30 border border-[#d4af37]/30 text-[#ffd166]">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-bengali-serif text-xl sm:text-2xl font-bold text-[#f7f0df]">
                  🔥 জনপ্রিয় কার্ড (Popular Collection)
                </h2>
                <p className="font-bengali-body text-xs text-[#a89882]">
                  ব্যবহারকারীদের সর্বাধিক পছন্দের ভিন্টেজ প্রেমপত্র ও শুভেচ্ছা কার্ড
                </p>
              </div>
            </div>
            <a
              href="/postcards"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('postcards');
              }}
              className="text-xs sm:text-sm font-bengali-body text-[#d4af37] hover:text-[#ffd166] flex items-center gap-1 cursor-pointer transition-colors"
              title="জনপ্রিয় ভিন্টেজ কার্ড সবগুলো দেখুন"
            >
              <span>সবগুলো দেখুন</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <CardGrid cards={popularCards} onSelectCard={onSelectCardToCreate} />
        </section>

        {/* Ad Unit 2: Magic Card - Home Popular Bottom */}
        <AdSenseAd adSlot="7374886078" />

        {/* Romantic Collection */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#2a1f18] pb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-[#7a1f26]/30 border border-[#d4af37]/30 text-[#ff7582]">
                <Heart className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-bengali-serif text-xl sm:text-2xl font-bold text-[#f7f0df]">
                  ❤️ Romantic Collection (রোমান্টিক সংগ্রহ)
                </h2>
                <p className="font-bengali-body text-xs text-[#a89882]">
                  চিরন্তন প্রেম ও গভীর অনুরাগে সিক্ত ভিন্টেজ ডিজাইন
                </p>
              </div>
            </div>
            <a
              href="/postcards"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('postcards');
              }}
              className="text-xs sm:text-sm font-bengali-body text-[#d4af37] hover:text-[#ffd166] flex items-center gap-1 cursor-pointer transition-colors"
              title="রোমান্টিক ভিন্টেজ কার্ড সবগুলো দেখুন"
            >
              <span>সবগুলো দেখুন</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <CardGrid cards={romanticCards} onSelectCard={onSelectCardToCreate} />
        </section>

        {/* Rainy Love Collection */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#2a1f18] pb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-[#1a2930] border border-[#4e8d7c]/40 text-[#4e8d7c]">
                <CloudRain className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-bengali-serif text-xl sm:text-2xl font-bold text-[#f7f0df]">
                  🌧️ Rainy Love Collection (বৃষ্টিভেজা প্রেম)
                </h2>
                <p className="font-bengali-body text-xs text-[#a89882]">
                  আষাঢ়ের মেঘ, কদম ফুল আর ভিজে যাওয়া অনুভূতির পোস্টকার্ড
                </p>
              </div>
            </div>
            <a
              href="/postcards"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('postcards');
              }}
              className="text-xs sm:text-sm font-bengali-body text-[#d4af37] hover:text-[#ffd166] flex items-center gap-1 cursor-pointer transition-colors"
              title="বৃষ্টিভেজা প্রেমের কার্ড সবগুলো দেখুন"
            >
              <span>সবগুলো দেখুন</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <CardGrid cards={rainyCards} onSelectCard={onSelectCardToCreate} />
        </section>

        {/* Vintage Letter Collection */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#2a1f18] pb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-[#2b2118] border border-[#d4af37]/30 text-[#e5c05d]">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-bengali-serif text-xl sm:text-2xl font-bold text-[#f7f0df]">
                  💌 Vintage Letter Collection (পুরনো চিঠির পোস্টকার্ড)
                </h2>
                <p className="font-bengali-body text-xs text-[#a89882]">
                  ডাকটিকিট, টাইপরাইটার ও লাল মোমের সীলমোহর যুক্ত চিঠি
                </p>
              </div>
            </div>
            <a
              href="/postcards"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('postcards');
              }}
              className="text-xs sm:text-sm font-bengali-body text-[#d4af37] hover:text-[#ffd166] flex items-center gap-1 cursor-pointer transition-colors"
              title="পুরনো চিঠির পোস্টকার্ড সবগুলো দেখুন"
            >
              <span>সবগুলো দেখুন</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <CardGrid cards={vintageLetterCards} onSelectCard={onSelectCardToCreate} />
        </section>

        {/* New Cards */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#2a1f18] pb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-[#27171e] border border-[#f28482]/40 text-[#f28482]">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-bengali-serif text-xl sm:text-2xl font-bold text-[#f7f0df]">
                  ✨ নতুন কার্ড (New Additions)
                </h2>
                <p className="font-bengali-body text-xs text-[#a89882]">
                  সম্প্রতি যুক্ত হওয়া বিশেষ ভিন্টেজ আর্টওয়ার্ক ও শুভেচ্ছা কার্ড
                </p>
              </div>
            </div>
            <a
              href="/postcards"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('postcards');
              }}
              className="text-xs sm:text-sm font-bengali-body text-[#d4af37] hover:text-[#ffd166] flex items-center gap-1 cursor-pointer transition-colors"
              title="নতুন ভিন্টেজ কার্ড সবগুলো দেখুন"
            >
              <span>সবগুলো দেখুন</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <CardGrid cards={newCards} onSelectCard={onSelectCardToCreate} />
        </section>

        {/* Bengali Love Quotes Section - Internal Linking: Homepage → Quotes & Generator */}
        <section className="bg-[#181310] border border-[#2e231c] rounded-3xl p-6 sm:p-10 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#2e231c] pb-4">
            <div className="space-y-1">
              <span className="text-xs font-vintage-serif tracking-widest text-[#d4af37] uppercase">
                BENGALI LOVE QUOTES
              </span>
              <h2 className="font-bengali-serif text-2xl sm:text-3xl font-bold text-[#f7f0df]">
                বাংলা প্রেমের উক্তি ও বার্তা
              </h2>
              <p className="font-bengali-body text-xs sm:text-sm text-[#b8a791]">
                প্রিয় মানুষকে পাঠানোর জন্য সুন্দর বাংলা প্রেমের উক্তি ও রোমান্টিক বার্তা থেকে বেছে নিন।
              </p>
            </div>
            <a
              href="/quotes"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('quotes');
              }}
              className="text-xs sm:text-sm font-bengali-body text-[#d4af37] hover:text-[#ffd166] flex items-center gap-1 cursor-pointer transition-colors"
              title="সকল বাংলা প্রেমের উক্তি ও Romantic Quotes দেখুন"
            >
              <span>সকল উক্তি দেখুন</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quotes.slice(0, 3).map((q) => (
              <div
                key={q.id}
                className="bg-[#1f1712] border border-[#36271e] hover:border-[#d4af37]/40 rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-md transition-all"
              >
                <div className="space-y-2">
                  <span className="text-[11px] font-bengali-body px-2.5 py-0.5 rounded-full bg-[#2a1d16] text-[#ffd166] border border-[#422e22]">
                    {q.category}
                  </span>
                  <p className="font-bengali-body text-sm text-[#ece4d0] leading-relaxed italic">
                    "{q.text}"
                  </p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-[#2e231c]">
                  <span className="text-[11px] font-bengali-body text-[#8e7e6c]">
                    — {q.author || 'অজ্ঞাত'}
                  </span>
                  <a
                    href="/generator"
                    onClick={(e) => {
                      e.preventDefault();
                      if (onSelectQuoteToCreate) {
                        onSelectQuoteToCreate(q);
                      } else {
                        onNavigate('generator');
                      }
                    }}
                    className="text-xs font-bengali-body text-[#ffd166] hover:underline flex items-center gap-1 cursor-pointer"
                    title="এই উক্তি দিয়ে কার্ড তৈরি করুন"
                  >
                    <span>কার্ড তৈরি করুন</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Ready-made Art Gallery */}
        <section className="bg-gradient-to-r from-[#1c1511] via-[#241a14] to-[#16100c] border border-[#d4af37]/35 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs font-vintage-serif tracking-widest text-[#d4af37] uppercase">
                READY-MADE ARTWORKS
              </span>
              <h2 className="font-bengali-serif text-2xl sm:text-3xl font-bold text-[#f7f0df]">
                🖼️ Vintage Quote Gallery (রেডিমেড আর্ট গ্যালারি)
              </h2>
              <p className="font-bengali-body text-sm text-[#b8a791] max-w-xl">
                যদি কাস্টমাইজেশন ছাড়া সরাসরি তৈরি করা ভিন্টেজ উক্তি কার্ড চান, তবে আমাদের প্রি-ডিজাইনড
                গ্যালারি থেকে সরাসরি HD ডাউনলোড করে নিন।
              </p>
            </div>
            <a
              href="/vintage-gallery"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('gallery');
              }}
              className="px-6 py-3 rounded-xl bg-[#7a1f26] hover:bg-[#91252d] text-[#f8edd6] border border-[#d4af37]/40 font-bengali-body font-semibold text-sm shadow-lg flex items-center gap-2 cursor-pointer transition-all active:scale-95"
              title="সম্পূর্ণ ভিন্টেজ গ্যালারি এক্সপ্লোর করুন"
            >
              <ImageIcon className="w-4 h-4 text-[#ffd166]" />
              <span>গ্যালারি এক্সপ্লোর করুন</span>
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            {gallery.slice(0, 4).map((item) => (
              <a
                key={item.id}
                href="/vintage-gallery"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('gallery');
                }}
                className="group relative aspect-[4/3] rounded-xl overflow-hidden border border-[#3b2c22] hover:border-[#d4af37] cursor-pointer transition-all shadow-md block"
                title={`${item.title} – ভিন্টেজ আর্টওয়ার্ক দেখুন`}
              >
                <img
                  src={item.image}
                  alt={item.alt || `${item.title} – ভিন্টেজ প্রেমের পোস্টকার্ড আর্ট`}
                  width={item.width || 800}
                  height={item.height || 600}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2.5">
                  <span className="text-[11px] font-bengali-serif text-[#f4eee0] truncate">
                    {item.title}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Informational, How It Works & FAQ Sections */}
        <HomeInfoSections
          onStartCreate={() => onNavigate('generator')}
          onNavigate={onNavigate}
        />
      </div>
    </div>
  );
};
