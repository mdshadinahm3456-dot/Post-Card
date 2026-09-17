import React from 'react';
import { APP_CONFIG } from '../config/appConfig';
import { Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-[#0b0807] border-t border-[#2e231b] text-[#a89882] py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
        {/* Brand Col */}
        <div className="md:col-span-2 space-y-3">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">💌</span>
            <span className="font-vintage-serif text-2xl font-bold text-[#f7f0df]">
              {APP_CONFIG.appName}
            </span>
          </div>
          <p className="font-bengali-serif text-base text-[#d4af37] italic">
            “{APP_CONFIG.tagline}”
          </p>
          <p className="font-bengali-body text-xs text-[#8e7e6c] max-w-md leading-relaxed">
            পুরনো দিনের চিঠি ও ভিন্টেজ পোস্টকার্ডের নস্টালজিক অনুভূতি ফিরিয়ে আনুন আধুনিক ডিজিটাল রূপে।
            পছন্দের রোমান্টিক উক্তি দিয়ে সাজিয়ে তৈরি করুন অমূল্য এক প্রেমের স্মৃতি।
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-3">
          <h4 className="font-vintage-serif text-xs uppercase tracking-widest text-[#d4af37]">
            EXPLORE
          </h4>
          <ul className="space-y-2 text-sm font-bengali-body">
            <li>
              <button
                type="button"
                onClick={() => onNavigate('home')}
                className="hover:text-[#f7f0df] transition-colors cursor-pointer"
              >
                হোম (Home)
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigate('postcards')}
                className="hover:text-[#f7f0df] transition-colors cursor-pointer"
              >
                পোস্টকার্ড লাইব্রেরি (Postcards)
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigate('quotes')}
                className="hover:text-[#f7f0df] transition-colors cursor-pointer"
              >
                প্রেমের উক্তি (Quotes)
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigate('gallery')}
                className="hover:text-[#f7f0df] transition-colors cursor-pointer"
              >
                ভিন্টেজ গ্যালারি (Gallery)
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigate('categories')}
                className="hover:text-[#f7f0df] transition-colors cursor-pointer"
              >
                ক্যাটাগরি সমূহ (Categories)
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigate('my-creations')}
                className="text-[#ffd166] hover:text-white transition-colors cursor-pointer flex items-center gap-1"
              >
                <span>💾 আমার তৈরি কার্ড</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigate('favorites')}
                className="hover:text-[#f7f0df] transition-colors cursor-pointer"
              >
                আমার পছন্দ (Favorites)
              </button>
            </li>
          </ul>
        </div>

        {/* Legal & Info */}
        <div className="space-y-3">
          <h4 className="font-vintage-serif text-xs uppercase tracking-widest text-[#d4af37]">
            INFORMATION
          </h4>
          <ul className="space-y-2 text-sm font-bengali-body">
            <li>
              <button
                type="button"
                onClick={() => onNavigate('privacy')}
                className="hover:text-[#f7f0df] transition-colors cursor-pointer"
              >
                গোপনীয়তা নীতি (Privacy Policy)
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigate('terms')}
                className="hover:text-[#f7f0df] transition-colors cursor-pointer"
              >
                ব্যবহারের শর্তাবলী (Terms)
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="hover:text-[#f7f0df] transition-colors cursor-pointer"
              >
                যোগাযোগ (Contact)
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigate('generator')}
                className="text-[#d4af37] hover:text-[#ffd166] transition-colors cursor-pointer font-semibold"
              >
                ✨ কার্ড জেনারেটর
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-6 border-t border-[#1e1713] flex flex-col sm:flex-row items-center justify-between text-xs text-[#706253] gap-3">
        <p>© {new Date().getFullYear()} {APP_CONFIG.appName}. সর্বস্বত্ব সংরক্ষিত।</p>
        <p className="flex items-center gap-1 font-bengali-body">
          ভালোবাসা ও নস্টালজিয়া নিয়ে তৈরি <Heart className="w-3.5 h-3.5 text-[#7a1f26] fill-[#7a1f26]" />
        </p>
      </div>
    </footer>
  );
};
