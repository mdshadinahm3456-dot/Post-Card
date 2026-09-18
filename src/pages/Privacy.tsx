import React from 'react';
import { APP_CONFIG } from '../config/appConfig';
import { ShieldCheck, Lock, Database, Eye, Globe, Bell, UserCheck } from 'lucide-react';

interface PrivacyProps {
  onNavigate?: (page: string) => void;
}

export const Privacy: React.FC<PrivacyProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10 text-[#f4eee0]">
      {/* Page Header */}
      <div className="space-y-3 border-b border-[#2e231c] pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#241a14] border border-[#d4af37]/30 text-xs text-[#d4af37] font-vintage-serif tracking-widest uppercase">
          <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
          <span>LEGAL & PRIVACY</span>
        </div>
        <h1 className="font-bengali-serif text-3xl sm:text-4xl font-bold text-[#f7f0df]">
          গোপনীয়তা নীতি (Privacy Policy)
        </h1>
        <p className="font-bengali-body text-xs sm:text-sm text-[#a89882]">
          সর্বশেষ হালনাগাদ: সেপ্টেম্বর ২০২৬ | {APP_CONFIG.appName}
        </p>
      </div>

      {/* Content Sections */}
      <div className="space-y-8 font-bengali-body text-sm sm:text-base text-[#c8baa7] leading-relaxed">
        {/* Intro */}
        <section className="space-y-3">
          <h2 className="font-bengali-serif text-xl sm:text-2xl font-semibold text-[#ffd166] flex items-center gap-2">
            <Lock className="w-5 h-5 text-[#d4af37]" />
            <span>১. ভূমিকা ও গোপনীয়তার অঙ্গীকার</span>
          </h2>
          <p>
            {APP_CONFIG.appName} ("আমরা", "আমাদের" বা "প্ল্যাটফর্ম") ব্যবহারকারীদের ব্যক্তিগত তথ্যের গোপনীয়তাকে অত্যন্ত গুরুত্ব দেয়। এই গোপনীয়তা নীতিমালায় আমরা স্পষ্ট ও বিশদভাবে তুলে ধরেছি আমাদের ওয়েবসাইটে কী ধরনের তথ্য সংরক্ষিত হয়, কীভাবে তা ব্যবহৃত হয় এবং আপনার ব্যক্তিগত নিয়ন্ত্রণাধিকার কী কী।
          </p>
        </section>

        {/* What Information is collected & LocalStorage */}
        <section className="space-y-3">
          <h2 className="font-bengali-serif text-xl sm:text-2xl font-semibold text-[#ffd166] flex items-center gap-2">
            <Database className="w-5 h-5 text-[#d4af37]" />
            <span>২. তথ্য সংগ্রহ ও লোকাল স্টোরেজ (LocalStorage)-এর ব্যবহার</span>
          </h2>
          <p>
            {APP_CONFIG.appName} প্ল্যাটফর্মটি ব্যবহারের জন্য কোনো ব্যবহারকারীর নাম, পাসওয়ার্ড বা অ্যাকাউন্ট খোলার বাধ্যবাধকতা নেই। কার্ড তৈরি বা ব্রাউজ করার সময় আমরা কোনো ব্যক্তিগত প্রোফাইল তথ্য দূরবর্তী ডেটাবেজে সংরক্ষণ করি না। তবে উন্নত ইউজার এক্সপেরিয়েন্স প্রদানের জন্য ব্যবহারকারীর নিজস্ব ব্রাউজারের <strong>LocalStorage</strong> মেমোরি ব্যবহৃত হয়:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-2 text-xs sm:text-sm text-[#b8a791]">
            <li>
              <strong className="text-[#f7f0df]">পছন্দের তালিকা (Favorites):</strong> আপনি যখন কোনো পোস্টকার্ড, উক্তি বা গ্যালারি শিল্পে হার্ট আইকন ক্লিক করেন, সেই পছন্দের তালিকাটি শুধুমাত্র আপনার ডিভাইসের ব্রাউজারে স্থানীয়ভাবে সেভ থাকে।
            </li>
            <li>
              <strong className="text-[#f7f0df]">আমার তৈরি কার্ড (My Creations):</strong> আপনি জেনারেটরে যে কার্ড তৈরি বা এডিট করে সেভ করেন, তার টেক্সট ও সেটিংস সরাসরি আপনার ব্রাউজারের মেমোরিতে রক্ষিত থাকে যেন পরবর্তী সময়ে আপনি পুনরায় তা সম্পাদনা করতে পারেন।
            </li>
            <li>
              <strong className="text-[#f7f0df]">সম্প্রতি ব্যবহৃত কার্ড (Recently Used):</strong> দ্রুত অ্যাক্সেসের জন্য আপনি সম্প্রতি যে কার্ডগুলো নিয়ে কাজ করেছেন, তার রেকর্ড আপনার লোকাল ডিভাইসেই সংরক্ষিত থাকে।
            </li>
          </ul>
        </section>

        {/* Client-Side Processing */}
        <section className="space-y-3">
          <h2 className="font-bengali-serif text-xl sm:text-2xl font-semibold text-[#ffd166] flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-[#d4af37]" />
            <span>৩. কার্ডের লেখার গোপনীয়তা</span>
          </h2>
          <p>
            পোস্টকার্ডে আপনি যে প্রাপকের নাম, ব্যক্তিগত ভালোবাসার চিঠি, অনুভূতি বা প্রেরকের নাম লেখেন, কার্ড রেন্ডারিং ও ইমেজ জেনারেশনের সম্পূর্ণ প্রক্রিয়াটি সরাসরি আপনার ব্রাউজারে (Client-Side Canvas/SVG) সম্পন্ন হয়। আপনার ব্যক্তিগত মনের কথা কোনো সার্ভারে সংরক্ষিত বা পর্যবেক্ষণ করা হয় না।
          </p>
        </section>

        {/* Cookies & Advertising */}
        <section className="space-y-3">
          <h2 className="font-bengali-serif text-xl sm:text-2xl font-semibold text-[#ffd166] flex items-center gap-2">
            <Eye className="w-5 h-5 text-[#d4af37]" />
            <span>৪. কুকিজ (Cookies) ও অনলাইন বিজ্ঞাপন (Advertising)</span>
          </h2>
          <p>
            আমাদের ওয়েবসাইটটি পরিচালনায় এবং বিনামূল্যে সেবা সচল রাখার জন্য ভবিষ্যতে অনুমোদিত তৃতীয় পক্ষের বিজ্ঞাপন নেটওয়ার্ক (যেমন Google AdSense) বা স্পনসর সিস্টেম ব্যবহৃত হতে পারে:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-2 text-xs sm:text-sm text-[#b8a791]">
            <li>
              বিজ্ঞাপনদাতারা (যেমন গুগল) ব্যবহারকারীদের প্রাসঙ্গিক বিজ্ঞাপন প্রদর্শনের জন্য কুকিজ (Cookies) এবং ওয়েব বীকন ব্যবহার করতে পারে।
            </li>
            <li>
              গুগল তার অংশীদার ওয়েবসাইট ও সার্চ ফলাফলে ব্যবহারকারীর পূর্ববর্তী ভিজিটের ওপর ভিত্তি করে ডাবলক্লিক বা সংশ্লিষ্ট বিজ্ঞাপন কুকি ব্যবহার করতে পারে।
            </li>
            <li>
              ব্যবহারকারী চাইলে গুগলের বিজ্ঞাপন সেটিংস (<a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-[#ffd166] underline">Google Ads Settings</a>) অথবা ব্রাউজার সেটিংস থেকে ব্যক্তিগতকৃত বিজ্ঞাপন নিয়ন্ত্রণ করতে পারেন।
            </li>
          </ul>
        </section>

        {/* Analytics & Third Party Services */}
        <section className="space-y-3">
          <h2 className="font-bengali-serif text-xl sm:text-2xl font-semibold text-[#ffd166] flex items-center gap-2">
            <Globe className="w-5 h-5 text-[#d4af37]" />
            <span>৫. বিশ্লেষণ ও তৃতীয় পক্ষের সেবা (Analytics & Third-Party Services)</span>
          </h2>
          <p>
            সাইটের কার্যকারিতা ও লোডিং গতি বিশ্লেষণ করার জন্য স্ট্যান্ডার্ড ট্র্যাফিক অ্যানালিটিক্স টুলস (যেমন গুগল অ্যানালিটিক্স বা ক্লাউড হোস্টিং অ্যানালিটিক্স) ব্রাউজারের ধরন, ভিজিট করা পৃষ্ঠা এবং সময়কাল সংক্রান্ত সাধারণ পরিসংখ্যানগত অ-ব্যক্তিগত ডেটা পর্যবেক্ষণ করতে পারে। এছাড়াও ফন্ট রেন্ডারিংয়ের জন্য বিশ্বস্ত CDN (যেমন Google Fonts) ব্যবহৃত হতে পারে।
          </p>
        </section>

        {/* User Rights & Controls */}
        <section className="space-y-3">
          <h2 className="font-bengali-serif text-xl sm:text-2xl font-semibold text-[#ffd166] flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#d4af37]" />
            <span>৬. ব্যবহারকারীর পছন্দ ও নিয়ন্ত্রণাধিকার (User Choices)</span>
          </h2>
          <p>
            আপনার ব্রাউজারের সেটিংস থেকে আপনি যেকোনো সময় কুকিজ ও LocalStorage ডেটা মুছে ফেলতে (Clear Browsing Data) পারেন। এতে আপনার সংরক্ষিত My Creations ও Favorites মেমোরি রিসেট হয়ে যাবে। এছাড়াও আপনি ব্রাউজারের Do Not Track ফিচার চালু রাখতে পারেন।
          </p>
        </section>

        {/* Contact Information */}
        <section className="space-y-3 border-t border-[#2e231c] pt-6">
          <h2 className="font-bengali-serif text-xl sm:text-2xl font-semibold text-[#ffd166]">
            ৭. যোগাযোগ
          </h2>
          <p>
            এই গোপনীয়তা নীতি সম্পর্কে আপনার কোনো জিজ্ঞাসা, মতামত বা সহায়তা প্রয়োজন হলে আমাদের অফিসিয়াল{' '}
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
            মাধ্যমে আমাদের সাথে যোগাযোগ করতে পারেন।
          </p>
        </section>
      </div>
    </div>
  );
};
