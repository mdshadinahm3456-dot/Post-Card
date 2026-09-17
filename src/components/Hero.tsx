import React from 'react';
import { Sparkles, Image as ImageIcon, ArrowRight, Heart } from 'lucide-react';
import { APP_CONFIG } from '../config/appConfig';

interface HeroProps {
  onStartCreate: () => void;
  onExploreGallery: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartCreate, onExploreGallery }) => {
  return (
    <section className="relative overflow-hidden py-14 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#241a14]">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#7a1f26]/12 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#d4af37]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Headline & Action */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left z-10">
          {/* Logo badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#201712] border border-[#d4af37]/35 text-xs text-[#e5c05d] font-vintage-serif tracking-widest uppercase shadow-sm">
            <span>💌 {APP_CONFIG.appName} ARCHIVE</span>
          </div>

          {/* Headline */}
          <h1 className="font-bengali-serif text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-bold text-[#f7f0df] leading-[1.25] tracking-tight">
            পুরনো দিনের অনুভূতি, <br className="hidden sm:inline" />
            <span className="text-[#ffd166] drop-shadow-sm">আজকের ভালোবাসার জন্য।</span>
          </h1>

          {/* Subheadline */}
          <p className="font-bengali-body text-base sm:text-lg text-[#b8a791] max-w-xl mx-auto lg:mx-0 leading-relaxed">
            অনলাইনে তৈরি করুন আপনার মনের মতো <span className="text-[#f4eee0]">Vintage Card</span>। পছন্দের ক্লাসিক পোস্টকার্ড ও গভীর অনুভূতির <span className="text-[#f4eee0]">প্রেমের উক্তি</span> নির্বাচন করুন অথবা যোগ করুন <span className="text-[#f4eee0]">নিজের লেখা</span>। এক ক্লিকেই তৈরি করুন প্রিয়জনের জন্য বিশেষ <span className="text-[#f4eee0]">Bengali romantic cards</span> এবং করুন ঝকঝকে <span className="text-[#ffd166]">HD Download</span>।
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
            <button
              id="btn-hero-create-card"
              type="button"
              onClick={onStartCreate}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#7a1f26] hover:bg-[#96252f] text-[#f8edd6] border border-[#d4af37]/50 font-bengali-body font-bold text-base shadow-xl shadow-[#7a1f26]/30 transition-all duration-200 transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-[#ffd166]" />
              <span>✨ কার্ড তৈরি করুন</span>
            </button>

            <button
              id="btn-hero-gallery"
              type="button"
              onClick={onExploreGallery}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#1b140f] hover:bg-[#281e17] text-[#e0d4c1] border border-[#3d2f26] hover:border-[#d4af37]/40 font-bengali-body font-semibold text-base transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              <ImageIcon className="w-5 h-5 text-[#d4af37]" />
              <span>🖼️ Vintage Gallery দেখুন</span>
            </button>
          </div>

          {/* Highlights */}
          <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-[#8e7e6c] font-bengali-body">
            <div className="flex items-center gap-1.5">
              <span className="text-[#d4af37]">✓</span>
              <span>ফ্রি ও ১০০% ক্লাসিক ডিজাইন</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[#d4af37]">✓</span>
              <span>লগইন ছাড়াই ফেভারিট সংরক্ষণ</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[#d4af37]">✓</span>
              <span>সোশ্যাল মিডিয়া উপযোগী HD এক্সপোর্ট</span>
            </div>
          </div>
        </div>

        {/* Right Column: Realistic Postcard Visual Demo */}
        <div className="lg:col-span-5 flex justify-center z-10">
          <div className="relative w-full max-w-md transform hover:rotate-1 transition-transform duration-500">
            {/* Background layered shadow card */}
            <div className="absolute inset-0 bg-[#251b14] rounded-xl transform rotate-3 scale-98 opacity-50 border border-[#3b2d24]" />

            {/* Main realistic demo postcard */}
            <div className="relative bg-[#16110e] border-2 border-[#d4af37]/40 rounded-xl overflow-hidden shadow-2xl p-4 sm:p-5 text-[#f4eee0]">
              {/* Corner postal accents */}
              <div className="absolute top-2 left-2 text-[10px] text-[#d4af37]/60">✦</div>
              <div className="absolute top-2 right-2 text-[10px] text-[#d4af37]/60">✦</div>
              <div className="absolute bottom-2 left-2 text-[10px] text-[#d4af37]/60">✦</div>
              <div className="absolute bottom-2 right-2 text-[10px] text-[#d4af37]/60">✦</div>

              {/* Artwork preview inside */}
              <div className="relative aspect-[16/10] rounded-lg overflow-hidden border border-[#3d2f25] mb-4 bg-[#100d0a]">
                <img
                  src="/assets/postcards/rainy-dhaka-vintage-card.svg"
                  alt="বৃষ্টির দিনে Vintage Love Postcard – Rainy Dhaka"
                  width={900}
                  height={600}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-full object-cover opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-center">
                  <p className="font-bengali-serif text-sm sm:text-base text-[#f7f0df] drop-shadow-md">
                    “তোমার কথা মনে পড়লে বৃষ্টিও যেন পুরনো চিঠি হয়ে যায়।”
                  </p>
                </div>
              </div>

              {/* Postcard Footer details */}
              <div className="flex items-center justify-between text-xs pt-1 border-t border-[#31251e]">
                <div>
                  <span className="font-calligraphy text-base text-[#d4af37]">
                    প্রিয়তমা,
                  </span>
                  <div className="text-[10px] text-[#8e7e6c] font-bengali-body">
                    ইতি, তোমার নীরব কবি...
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <div className="w-9 h-11 bg-[#201812] border border-[#d4af37]/60 rounded-xs flex flex-col items-center justify-center text-[7px] font-vintage-serif text-[#d4af37] rotate-2">
                    <span>DHAKA</span>
                    <span className="text-xs">💌</span>
                    <span>1954</span>
                  </div>
                </div>
              </div>

              {/* Interactive sticker */}
              <div
                onClick={onStartCreate}
                className="mt-3 py-2 px-3 rounded-lg bg-[#271d17] hover:bg-[#7a1f26] border border-[#d4af37]/30 text-center text-xs font-bengali-body text-[#ffd166] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>এই কার্ডটি দিয়ে শুরু করুন</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
