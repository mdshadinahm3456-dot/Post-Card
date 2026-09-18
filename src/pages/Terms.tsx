import React from 'react';
import { APP_CONFIG } from '../config/appConfig';
import { FileText, CheckCircle2, ShieldAlert, Download, Share2, Sparkles } from 'lucide-react';

interface TermsProps {
  onNavigate?: (page: string) => void;
}

export const Terms: React.FC<TermsProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10 text-[#f4eee0]">
      {/* Page Header */}
      <div className="space-y-3 border-b border-[#2e231c] pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#241a14] border border-[#d4af37]/30 text-xs text-[#d4af37] font-vintage-serif tracking-widest uppercase">
          <FileText className="w-4 h-4 text-[#d4af37]" />
          <span>TERMS OF SERVICE</span>
        </div>
        <h1 className="font-bengali-serif text-3xl sm:text-4xl font-bold text-[#f7f0df]">
          ব্যবহারের শর্তাবলী (Terms & Conditions)
        </h1>
        <p className="font-bengali-body text-xs sm:text-sm text-[#a89882]">
          কার্যকর তারিখ: সেপ্টেম্বর ২০২৬ | {APP_CONFIG.appName}
        </p>
      </div>

      {/* Terms Sections */}
      <div className="space-y-8 font-bengali-body text-sm sm:text-base text-[#c8baa7] leading-relaxed">
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="font-bengali-serif text-xl sm:text-2xl font-semibold text-[#ffd166] flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#d4af37]" />
            <span>১. সেবার উদ্দেশ্য ও সম্মতি</span>
          </h2>
          <p>
            {APP_CONFIG.appName}-এ আপনাকে স্বাগতম। এই প্ল্যাটফর্মটি ব্যবহার করে আপনি সুন্দর ভিন্টেজ পোস্টকার্ড তৈরি, ব্যক্তিগত শুভেচ্ছা বার্তা সংযোজন এবং তা ডাউনলোড ও শেয়ার করতে পারেন। আমাদের ওয়েবসাইট ব্রাউজ বা ব্যবহার করার মাধ্যমে আপনি এই শর্তাবলীতে সম্মত হচ্ছেন।
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="font-bengali-serif text-xl sm:text-2xl font-semibold text-[#ffd166] flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#d4af37]" />
            <span>২. টেমপ্লেট ও উক্তির ব্যবহার (Templates & Quotes)</span>
          </h2>
          <p>
            {APP_CONFIG.appName}-এ পরিবেশিত ভিন্টেজ ফ্রেম, ডাকটিকিট, জলছাপ ও আর্টওয়ার্ক উপাদানসমূহ ব্যক্তিগত ও অ-বাণিজ্যিক ব্যবহারের উদ্দেশ্যে উন্মুক্ত। প্রদর্শিত ক্লাসিক বাংলা সাহিত্যের উক্তি ও ভালোবাসার বার্তাগুলো সাংস্কৃতিক সম্মান ও সাহিত্যিক অনুপ্রেরণার অংশ হিসেবে প্রদর্শিত।
          </p>
          <ul className="list-disc list-inside space-y-2 pl-2 text-xs sm:text-sm text-[#b8a791]">
            <li>আমাদের প্রস্তুত টেমপ্লেটগুলো পরিবর্তন বা পুনর্গঠন করে বাণিজ্যিক পণ্য বা অন্য কোনো অনুরূপ সেবা হিসেবে বিক্রয় করা নিষিদ্ধ।</li>
            <li>ব্যক্তিগতভাবে প্রিয়জনকে পাঠানো, সোশ্যাল মিডিয়ায় প্রকাশ করা বা স্মৃতিচিহ্ন হিসেবে রাখা সম্পূর্ণ উন্মুক্ত।</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="font-bengali-serif text-xl sm:text-2xl font-semibold text-[#ffd166] flex items-center gap-2">
            <Download className="w-5 h-5 text-[#d4af37]" />
            <span>৩. কার্ড ডাউনলোড ও স্পনসর ব্যবস্থা (Downloads)</span>
          </h2>
          <p>
            ব্যবহারকারীরা বিনামূল্যে উচ্চমানের (HD PNG/JPG) ভিন্টেজ কার্ড ডাউনলোড করতে পারবেন। সাইটের অবকাঠামো ও বিনামূল্যে সেবা সচল রাখার সুবিধার্থে ডাউনলোড প্রক্রিয়ায় সংক্ষিপ্ত স্পনসর কাউন্টডাউন বা স্পনসর লিংক গেট অন্তর্ভুক্ত থাকতে পারে।
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="font-bengali-serif text-xl sm:text-2xl font-semibold text-[#ffd166] flex items-center gap-2">
            <Share2 className="w-5 h-5 text-[#d4af37]" />
            <span>৪. কার্ড শেয়ারিং ও ব্যবহারকারীর বার্তা (Generated Content)</span>
          </h2>
          <p>
            কার্ডে যুক্ত নিজস্ব লেখা, প্রাপকের নাম এবং প্রেরকের নামের জন্য ব্যবহারকারী নিজেই দায়িত্বশীল থাকবেন। ব্যবহারকারীরা এমন কোনো বার্তা লিখবেন না যা:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-2 text-xs sm:text-sm text-[#b8a791]">
            <li>আইনবিরোধী, মানহানিকর, ধর্মীয় বিদ্বেষমূলক বা কোনো ব্যক্তি বা গোষ্ঠীকে আঘাত করে।</li>
            <li>স্প্যাম, ফিশিং বা বিভ্রান্তিকর প্রচারণা তৈরি করে।</li>
            <li>কারো ব্যক্তিগত গোপনীয়তা বা বৌদ্ধিক সম্পদ লঙ্ঘন করে।</li>
          </ul>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="font-bengali-serif text-xl sm:text-2xl font-semibold text-[#ffd166] flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-[#d4af37]" />
            <span>৫. সেবার পরিবর্তন ও দায়বদ্ধতা সীমাবদ্ধতা</span>
          </h2>
          <p>
            {APP_CONFIG.appName} যেকোনো সময় প্ল্যাটফর্মের ফিচার, টেমপ্লেট বা শর্তাবলী পরিমার্জন করার অধিকার সংরক্ষণ করে। আমাদের সেবা 'যে অবস্থায় রয়েছে' (as is) ভিত্তিতে প্রদান করা হয় এবং কারিগরি ত্রুটি বা ইন্টারনেট সংযোগজনিত কোনো বিঘ্নের জন্য কোনো আর্থিক বা আইনি দায়ভার বর্তাবে না।
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-3 border-t border-[#2e231c] pt-6">
          <h2 className="font-bengali-serif text-xl sm:text-2xl font-semibold text-[#ffd166]">
            ৬. যোগাযোগ
          </h2>
          <p>
            শর্তাবলী বিষয়ে যেকোনো প্রশ্ন বা ব্যাখ্যার প্রয়োজনে আমাদের{' '}
            <a
              href="/contact"
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate('contact');
                }
              }}
              className="text-[#ffd166] underline hover:text-[#f8edd6] transition-colors cursor-pointer"
            >
              যোগাযোগ পৃষ্ঠার
            </a>{' '}
            ফর্ম ব্যবহার করে আমাদের সাথে যোগাযোগ করতে পারেন।
          </p>
        </section>
      </div>
    </div>
  );
};
