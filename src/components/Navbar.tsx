import React, { useState, useEffect } from 'react';
import { APP_CONFIG } from '../config/appConfig';
import { getFavorites } from '../utils/favorites';
import { getMyCreations } from '../utils/myCreations';
import { toBengaliNumber } from '../utils/bengaliUtils';
import { Menu, X, Sparkles } from 'lucide-react';

interface NavbarProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activePage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [favCount, setFavCount] = useState(0);
  const [creationsCount, setCreationsCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      const favs = getFavorites();
      setFavCount(favs.cards.length + favs.quotes.length + favs.gallery.length);
      const creations = getMyCreations();
      setCreationsCount(creations.length);
    };

    updateCount();
    window.addEventListener('magic_card_favorites_updated', updateCount);
    window.addEventListener('magic_card_creations_updated', updateCount);
    return () => {
      window.removeEventListener('magic_card_favorites_updated', updateCount);
      window.removeEventListener('magic_card_creations_updated', updateCount);
    };
  }, []);

  const navLinks = [
    { id: 'home', label: 'হোম' },
    { id: 'postcards', label: 'কার্ডসমূহ' },
    { id: 'quotes', label: 'উক্তি' },
    { id: 'gallery', label: 'ভিনটেজ গ্যালারি' },
    { id: 'categories', label: 'ক্যাটাগরি' },
    {
      id: 'favorites',
      label: 'আমার পছন্দ',
      badge: favCount > 0 ? toBengaliNumber(favCount) : null
    },
    {
      id: 'my-creations',
      label: 'আমার তৈরি কার্ড',
      badge: creationsCount > 0 ? toBengaliNumber(creationsCount) : null
    },
  ];

  const handleLinkClick = (pageId: string) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#120e0b]/95 backdrop-blur-md border-b border-[#d4af37]/20 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('home');
          }}
          className="flex items-center gap-3 cursor-pointer group select-none"
          title={`${APP_CONFIG.appName} – ${APP_CONFIG.tagline}`}
        >
          <div className="w-10 h-10 rounded-xl bg-[#7a1f26] border border-[#d4af37]/40 flex items-center justify-center text-xl shadow-md shadow-[#7a1f26]/30 group-hover:scale-105 transition-transform">
            💌
          </div>
          <div>
            <span className="font-vintage-serif text-xl sm:text-2xl font-bold tracking-wide text-[#f7f0df] group-hover:text-[#d4af37] transition-colors">
              {APP_CONFIG.appName}
            </span>
            <span className="hidden sm:block text-[11px] font-bengali-body text-[#d4af37]/80 tracking-wider">
              {APP_CONFIG.tagline}
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav aria-label="প্রধান নেভিগেশন" className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activePage === link.id;
            const linkHref = link.id === 'home' ? '/' : (link.id === 'gallery' ? '/vintage-gallery' : `/${link.id}`);

            return (
              <a
                key={link.id}
                href={linkHref}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.id);
                }}
                className={`relative px-3.5 py-2 rounded-xl text-sm font-bengali-body font-medium transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'text-[#d4af37] bg-[#241a14] border border-[#d4af37]/30 shadow-inner font-semibold'
                    : 'text-[#c8baa7] hover:text-[#f7f0df] hover:bg-[#1a1410]'
                }`}
              >
                <span>{link.label}</span>
                {link.badge !== null && (
                  <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-[#7a1f26] text-[#ffd166] border border-[#d4af37]/40">
                    {link.badge}
                  </span>
                )}
              </a>
            );
          })}
        </nav>

        {/* Right CTA Button */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="/generator"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('generator');
            }}
            className="px-4.5 py-2.5 rounded-xl bg-[#7a1f26] hover:bg-[#91252d] text-[#f8edd6] border border-[#d4af37]/50 font-bengali-body font-semibold text-sm shadow-md shadow-[#7a1f26]/25 transition-all duration-200 active:scale-95 flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#ffd166]" />
            <span>✨ কার্ড তৈরি করুন</span>
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <a
            href="/generator"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('generator');
            }}
            className="sm:hidden px-3 py-1.5 rounded-xl bg-[#7a1f26] text-[#f8edd6] text-xs font-bengali-body font-semibold flex items-center gap-1 border border-[#d4af37]/40"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#ffd166]" />
            <span>কার্ড তৈরি করুন</span>
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-[#1c1511] text-[#c8baa7] hover:text-[#f4eee0] border border-[#3b2d24] cursor-pointer"
            aria-label="মেনু খুলুন বা বন্ধ করুন"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <nav aria-label="মোবাইল নেভিগেশন" className="lg:hidden border-t border-[#31251e] bg-[#140f0c] px-4 pt-3 pb-6 space-y-2 shadow-2xl">
          {navLinks.map((link) => {
            const isActive = activePage === link.id;
            const linkHref = link.id === 'home' ? '/' : (link.id === 'gallery' ? '/vintage-gallery' : `/${link.id}`);

            return (
              <a
                key={link.id}
                href={linkHref}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.id);
                }}
                className={`w-full text-left px-4 py-3 rounded-xl text-base font-bengali-body font-medium transition-colors flex items-center justify-between ${
                  isActive
                    ? 'text-[#d4af37] bg-[#241a14] border border-[#d4af37]/30 font-semibold'
                    : 'text-[#c8baa7] hover:text-[#f7f0df] hover:bg-[#1a1410]'
                }`}
              >
                <span>{link.label}</span>
                {link.badge !== null && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-[#7a1f26] text-[#ffd166]">
                    {link.badge}
                  </span>
                )}
              </a>
            );
          })}

          <div className="pt-2">
            <a
              href="/?page=generator"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('generator');
              }}
              className="w-full py-3.5 px-4 rounded-xl bg-[#7a1f26] text-[#f8edd6] border border-[#d4af37]/50 font-bengali-body font-bold text-base shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#ffd166]" />
              <span>✨ কার্ড তৈরি করুন</span>
            </a>
          </div>
        </nav>
      )}
    </header>
  );
};
