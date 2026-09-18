import React from 'react';
import { APP_CONFIG } from '../config/appConfig';
import { Heart, Sparkles, BookOpen, ShieldCheck, Feather, Layers, ArrowRight } from 'lucide-react';

interface AboutProps {
  onNavigate?: (page: string) => void;
}

export const About: React.FC<AboutProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12 text-[#f4eee0]">
      {/* Header */}
      <div className="space-y-4 border-b border-[#2e231c] pb-8 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#241a14] border border-[#d4af37]/30 text-xs text-[#d4af37] font-vintage-serif tracking-widest uppercase">
          <Feather className="w-3.5 h-3.5" />
          <span>ABOUT MAGIC CARD</span>
        </div>
        <h1 className="font-bengali-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f7f0df]">
          আমাদের সম্পর্কে (About Us)
        </h1>
        <p className="font-bengali-body text-base text-[#b8a791] leading-relaxed max-w-2xl">
          {APP_CONFIG.appName} হলো একটি বাংলাদেশ-কেন্দ্রিক ডিজিটাল প্ল্যাটফর্ম, যা পুরনো দিনের চিঠি, ডাকটিকিট ও ভিন্টেজ পোস্টকার্ডের নস্টালজিক ভালোবাসাকে আধুনিক ডিজিটাল রূপে উপস্থাপন করে।
        </p>
      </div>

      {/* Main Philosophy & Mission */}
      <section className="space-y-4 font-bengali-body text-sm sm:text-base text-[#c8baa7] leading-relaxed">
        <h2 className="font-bengali-serif text-2xl font-bold text-[#ffd166] flex items-center gap-2">
          <Heart className="w-5 h-5 text-[#d4af37]" />
          <span>Magic Card-এর উদ্দেশ্য</span>
        </h2>
        <p>
          ডিজিটাল বার্তার দ্রুততম সময়ে চিঠির আবেগময় অপেক্ষা আর হলুদ খামের স্পর্শ হারিয়ে যেতে বসেছে। {APP_CONFIG.appName}-এর মূল উদ্দেশ্য হলো সেই হারিয়ে যাওয়া চিঠির মাধুর্য ও অনুভূতিকে পুনরুজ্জীবিত করা। এখানে যে কেউ নিজের মনের না-বলা কথা, রোমান্টিক উক্তি বা বিশেষ দিনের শুভকামনা ভিন্টেজ পোস্টকার্ডের ফ্রেমে সহজে সাজিয়ে প্রিয় মানুষের কাছে পাঠাতে পারেন।
        </p>
      </section>

      {/* Key Aspects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Aspect 1 */}
        <div className="bg-[#181310] border border-[#2e231c] rounded-2xl p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#241a14] border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37]">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="font-bengali-serif text-lg font-semibold text-[#f7f0df]">
            বাংলাদেশ-কেন্দ্রিক সাংস্কৃতিক আবহ
          </h3>
          <p className="font-bengali-body text-xs sm:text-sm text-[#a89882] leading-relaxed">
            বৃষ্টিভেজা ঢাকার রাজপথ, রিকশার মায়াবী আলো, ঐতিহাসিক জমিদার বাড়ির আঙ্গিনা, শীতের কুয়াশায় মাটির ভাঁড়ের চা এবং পদ্মার পাড়ের কাশফুলের মতো আমাদের নিজস্ব ঐতিহ্য ও অনুভূতিকে কেন্দ্র করে প্রতিটি ডিজাইন তৈরি।
          </p>
        </div>

        {/* Aspect 2 */}
        <div className="bg-[#181310] border border-[#2e231c] rounded-2xl p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#241a14] border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37]">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="font-bengali-serif text-lg font-semibold text-[#f7f0df]">
            ভিন্টেজ পোস্টকার্ড ও নিখুঁত কাস্টমাইজেশন
          </h3>
          <p className="font-bengali-body text-xs sm:text-sm text-[#a89882] leading-relaxed">
            ব্যবহারকারীরা তাদের পছন্দের পোস্টকার্ড টেমপ্লেট নির্বাচন করতে পারেন, প্রস্তুত বাংলা উক্তি বেছে নিতে পারেন অথবা সম্পূর্ণ নিজস্ব বার্তা ও প্রাপক-প্রেরকের নাম লিখে ফন্ট, পজিশন ও এফেক্ট ইচ্ছামতো সাজিয়ে নিতে পারেন।
          </p>
        </div>

        {/* Aspect 3 */}
        <div className="bg-[#181310] border border-[#2e231c] rounded-2xl p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#241a14] border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37]">
            <BookOpen className="w-5 h-5" />
          </div>
          <h3 className="font-bengali-serif text-lg font-semibold text-[#f7f0df]">
            ফটোগ্রাফ মুক্ত নান্দনিক টাইপোগ্রাফি
          </h3>
          <p className="font-bengali-body text-xs sm:text-sm text-[#a89882] leading-relaxed">
            আমাদের প্ল্যাটফর্মে ব্যবহারকারীর কোনো ব্যক্তিগত ছবি আপলোড করার জটিলতা নেই। এটি ক্লাসিক সাহিত্যের চিঠি ও ভিন্টেজ আর্টওয়ার্কের শৈল্পিক মান অক্ষুণ্ণ রাখে এবং সম্পূর্ণ নিরাপদ ব্রাউজিং অভিজ্ঞতা নিশ্চিত করে।
          </p>
        </div>

        {/* Aspect 4 */}
        <div className="bg-[#181310] border border-[#2e231c] rounded-2xl p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#241a14] border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37]">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bengali-serif text-lg font-semibold text-[#f7f0df]">
            গোপনীয়তা-বান্ধব লোকাল প্রযুক্তি
          </h3>
          <p className="font-bengali-body text-xs sm:text-sm text-[#a89882] leading-relaxed">
            ব্যবহারকারীর তৈরি করা কার্ড ও প্রিয় তালিকা (Favorites ও My Creations) ব্রাউজারের নিজস্ব LocalStorage-এ নিরাপদে থাকে। কার্ড তৈরির জন্য কোনো বাধ্যতামূলক অ্যাকাউন্ট রেজিস্ট্রেশন বা ব্যক্তিগত তথ্য দিতে হয় না।
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-[#1c1511] via-[#241a14] to-[#16100c] border border-[#d4af37]/30 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="font-bengali-serif text-lg sm:text-xl font-bold text-[#f7f0df]">
            নিজের একটি ভিন্টেজ কার্ড তৈরি করতে চান?
          </h4>
          <p className="font-bengali-body text-xs sm:text-sm text-[#a89882]">
            কয়েকটি ক্লিকেই আপনার প্রিয় উক্তি বা ব্যক্তিগত বার্তা দিয়ে HD কার্ড ডাউনলোড করুন।
          </p>
        </div>
        {onNavigate && (
          <button
            type="button"
            onClick={() => onNavigate('generator')}
            className="px-6 py-3 rounded-xl bg-[#7a1f26] hover:bg-[#91252d] text-[#f8edd6] border border-[#d4af37]/40 font-bengali-body font-semibold text-sm flex items-center gap-2 shadow-lg transition-all cursor-pointer whitespace-nowrap"
          >
            <span>কার্ড তৈরি শুরু করুন</span>
            <ArrowRight className="w-4 h-4 text-[#ffd166]" />
          </button>
        )}
      </div>
    </div>
  );
};
