import React from 'react';
import { APP_CONFIG } from '../config/appConfig';
import { FileText } from 'lucide-react';

export const Terms: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-[#f4eee0]">
      <div className="space-y-3 border-b border-[#2e231c] pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#241a14] border border-[#d4af37]/30 text-xs text-[#d4af37] font-vintage-serif tracking-widest uppercase">
          <FileText className="w-4 h-4" />
          <span>TERMS OF SERVICE</span>
        </div>
        <h1 className="font-bengali-serif text-3xl sm:text-4xl font-bold">
          Terms & Conditions | Magic Card
        </h1>
        <p className="font-bengali-body text-xs text-[#a89882]">
          কার্যকর তারিখ: {new Date().toLocaleDateString('bn-BD')}
        </p>
      </div>

      <div className="space-y-6 font-bengali-body text-sm sm:text-base text-[#c8baa7] leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-bengali-serif text-xl font-semibold text-[#ffd166]">
            ১. সেবার সাধারণ শর্তাবলী
          </h2>
          <p>
            {APP_CONFIG.appName} প্ল্যাটফর্মটি ব্যক্তিগত ও অ-বাণিজ্যিক উদ্দেশ্যে ডিজিটাল পোস্টকার্ড তৈরি,
            কাস্টমাইজ এবং ডাউনলোড করার উন্মুক্ত সুযোগ প্রদান করে।
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-bengali-serif text-xl font-semibold text-[#ffd166]">
            ২. কপিরাইট ও ইন্টেলেকচুয়াল প্রপার্টি
          </h2>
          <p>
            আমাদের প্ল্যাটফর্মের ভিন্টেজ আর্টওয়ার্ক, পোস্টকার্ড ফ্রেম এবং ডিজাইনসমূহ {APP_CONFIG.appName}-এর
            কাস্টম ডিজাইন আর্ট দ্বারা সজ্জিত। ব্যবহারকারীরা তাদের ব্যক্তিগত শুভেচ্ছা ও রোমান্টিক পত্র হিসেবে
            সোশ্যাল মিডিয়ায় শেয়ার বা প্রিন্ট করতে পারবেন।
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-bengali-serif text-xl font-semibold text-[#ffd166]">
            ৩. গ্রহণযোগ্য ব্যবহার
          </h2>
          <p>
            কোনো বিদ্বেষমূলক, আপত্তিকর বা আইনবিরোধী বার্তা তৈরিতে পোস্টকার্ড ব্যবহার করা নিষিদ্ধ।
          </p>
        </section>
      </div>
    </div>
  );
};
