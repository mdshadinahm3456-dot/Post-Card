import React from 'react';
import { APP_CONFIG } from '../config/appConfig';
import { ShieldCheck } from 'lucide-react';

export const Privacy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-[#f4eee0]">
      <div className="space-y-3 border-b border-[#2e231c] pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#241a14] border border-[#d4af37]/30 text-xs text-[#d4af37] font-vintage-serif tracking-widest uppercase">
          <ShieldCheck className="w-4 h-4" />
          <span>LEGAL & PRIVACY</span>
        </div>
        <h1 className="font-bengali-serif text-3xl sm:text-4xl font-bold">
          গোপনীয়তা নীতি (Privacy Policy)
        </h1>
        <p className="font-bengali-body text-xs text-[#a89882]">
          সর্বশেষ হালনাগাদ: {new Date().toLocaleDateString('bn-BD')}
        </p>
      </div>

      <div className="space-y-6 font-bengali-body text-sm sm:text-base text-[#c8baa7] leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-bengali-serif text-xl font-semibold text-[#ffd166]">
            ১. আমাদের মূল দর্শন
          </h2>
          <p>
            {APP_CONFIG.appName}-এ আমরা আপনার গোপনীয়তাকে সর্বোচ্চ সম্মান জানাই। আমাদের সাইটটি ব্যবহার
            করার জন্য কোনো ব্যক্তিগত অ্যাকাউন্ট তৈরি বা লগইন করার প্রয়োজন হয় না।
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-bengali-serif text-xl font-semibold text-[#ffd166]">
            ২. স্থানীয় স্টোরেজ (Local Storage)
          </h2>
          <p>
            আপনি যে পোস্টকার্ড, উক্তি বা গ্যালারি আইটেম ফেভারিট (পছন্দ) তালিকায় যুক্ত করেন, তা শুধুমাত্র
            আপনার নিজস্ব ব্রাউজারের LocalStorage-এ সংরক্ষিত থাকে। কোনো তথ্য আমাদের সেন্ট্রাল সার্ভারে
            সংরক্ষণ করা হয় না।
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-bengali-serif text-xl font-semibold text-[#ffd166]">
            ৩. আপনার কার্ডের লেখার সুরক্ষা
          </h2>
          <p>
            পোস্টকার্ডে আপনি যে প্রাপক, মূল বার্তা বা প্রেরকের নাম লেখেন, কার্ড তৈরির প্রসেসটি সম্পূর্ণরূপে
            আপনার ব্রাউজারের ভেতরে ক্লায়েন্ট-সাইডে সম্পন্ন হয়। আপনার প্রিয় মানুষের প্রতি লেখা বার্তা
            কখনোই সার্ভারে প্রেরণ বা সঞ্চয় করা হয় না।
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-bengali-serif text-xl font-semibold text-[#ffd166]">
            ৪. স্পনসর লিঙ্ক ও এক্সটার্নাল বিজ্ঞাপন
          </h2>
          <p>
            সাইটটির রক্ষণাবেক্ষণ এবং উন্মুক্ত সেবা বিনামূল্যে বজায় রাখার জন্য ডাউনলোড প্রক্রিয়ায় স্পনসর লিংক
            অন্তর্ভুক্ত থাকতে পারে। তৃতীয় পক্ষের ওয়েবসাইটের নিজস্ব নীতিমালা প্রযোজ্য।
          </p>
        </section>
      </div>
    </div>
  );
};
