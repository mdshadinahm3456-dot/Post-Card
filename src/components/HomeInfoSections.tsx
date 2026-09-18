import React, { useState } from 'react';
import {
  Sparkles,
  Palette,
  PenTool,
  Sliders,
  Eye,
  Download,
  Share2,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Heart,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { APP_CONFIG } from '../config/appConfig';

interface HomeInfoSectionsProps {
  onStartCreate: () => void;
  onNavigate: (page: string) => void;
}

export const HomeInfoSections: React.FC<HomeInfoSectionsProps> = ({
  onStartCreate,
  onNavigate
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const steps = [
    {
      stepNumber: '১',
      title: 'পছন্দের কার্ড নির্বাচন করুন',
      desc: 'আমাদের সমৃদ্ধ ভিন্টেজ আর্ট আর্কাইভ থেকে আপনার ভালো লাগার পোস্টকার্ড বা ফ্রেম বেছে নিন।',
      icon: Palette
    },
    {
      stepNumber: '২',
      title: 'উক্তি নির্বাচন বা নিজের লেখা লিখুন',
      desc: 'হৃদয়ছোঁয়া বাংলা রোমান্টিক উক্তি সংগ্রহ থেকে বেছে নিন অথবা সরাসরি নিজের মনের কথা টাইপ করুন।',
      icon: PenTool
    },
    {
      stepNumber: '৩',
      title: 'লেখার স্টাইল ও অবস্থান সাজিয়ে নিন',
      desc: 'ফন্ট, সাইজ, অ্যালাইনমেন্ট, অবস্থান ও ফ্রেম স্টাইল ইচ্ছামতো পরিবর্তন করে নিখুঁত করে তুলুন।',
      icon: Sliders
    },
    {
      stepNumber: '৪',
      title: 'লাইভ Preview দেখুন',
      desc: 'কার্ড তৈরির সময় রিয়েল-টাইম প্রিভিউতে দেখে নিন আপনার চিঠি বা কার্ডটি দেখতে কেমন লাগছে।',
      icon: Eye
    },
    {
      stepNumber: '৫',
      title: 'HD Card তৈরি করুন',
      desc: 'এক ক্লিকে ফুল হাই-ডেফিনিশন (HD) কোয়ালিটিতে তৈরি করে ডিভাইসে ডাউনলোড করে নিন।',
      icon: Download
    },
    {
      stepNumber: '৬',
      title: 'চাইলে প্রিয়জনকে Share করুন',
      desc: 'ফেসবুক, হোয়াটসঅ্যাপ বা মেসেঞ্জারে সরাসরি শেয়ার করে প্রিয় মানুষকে চমকে দিন।',
      icon: Share2
    }
  ];

  const faqs = [
    {
      q: 'Magic Card কী?',
      a: 'Magic Card হলো একটি অনলাইন বাংলা ভিন্টেজ পোস্টকার্ড ও প্রেমের চিঠি তৈরির আধুনিক প্ল্যাটফর্ম। এখানে পুরনো দিনের ডাকটিকিট, জলছাপ ও নস্টালজিক ফ্রেমের সমন্বয়ে সুন্দর ডিজিটাল চিঠি ও শুভেচ্ছা কার্ড তৈরি করা যায়।'
    },
    {
      q: 'Magic Card দিয়ে কী তৈরি করা যায়?',
      a: 'Magic Card দিয়ে রোমান্টিক প্রেমের চিঠি, বৃষ্টিভেজা অনুভূতির পোস্টকার্ড, জন্মদিনের শুভেচ্ছা, বিবাহবার্ষিকীর স্মৃতিচিহ্ন, দূরত্বের চিঠি এবং বিশেষ ব্যক্তিগত অনুভূতির নান্দনিক ডিজিটাল কার্ড তৈরি করা যায়।'
    },
    {
      q: 'নিজের লেখা কি Card-এ যোগ করা যায়?',
      a: 'হ্যাঁ, অবশ্যই! প্রস্তুতকৃত বাংলা উক্তির পাশাপাশি আপনি কার্ডের টেক্সট বক্সে সরাসরি আপনার নিজের লেখা, প্রাপকের নাম এবং প্রেরকের নাম লিখে সম্পূর্ণ কাস্টমাইজ করতে পারবেন।'
    },
    {
      q: 'Card কি Download করা যায়?',
      a: 'হ্যাঁ! কার্ড সম্পাদনা শেষে জেনারেটর থেকে সরাসরি ফুল হাই-ডেফিনিশন (HD) কোয়ালিটিতে সম্পূর্ণ বিনামূল্যে কার্ডটি ডাউনলোড করে যেকোনো ডিভাইসে সংরক্ষণ করতে পারবেন।'
    },
    {
      q: 'কোন কোন format-এ Card Download করা যায়?',
      a: 'আমাদের সিস্টেম থেকে সুবিধাজনক ও সর্বজনীন PNG এবং JPG ফরম্যাটে কার্ড ডাউনলোড করা যায়, যা সামাজিক যোগাযোগ মাধ্যমে সহজে শেয়ারযোগ্য এবং স্পষ্ট প্রিন্টযোগ্য।'
    },
    {
      q: 'Magic Card কি মোবাইলে ব্যবহার করা যায়?',
      a: 'হ্যাঁ, Magic Card শতভাগ মোবাইল-রেসপনসিভ। যেকোনো স্মার্টফোন বা ট্যাবলেটের সাধারণ ব্রাউজার থেকেই কোনো অ্যাপ ইনস্টল ছাড়াই খুব স্বচ্ছন্দে কার্ড তৈরি ও ডাউনলোড করা যায়।'
    },
    {
      q: 'আমার তৈরি Card কি Save করা যায়?',
      a: 'হ্যাঁ, কার্ড তৈরির পর আপনি "Save Creation" বাটনে ক্লিক করলে তা আপনার ব্রাউজারের নিজস্ব মেমোরিতে (My Creations পেইজে) নিরাপদে সেভ থাকে। পরবর্তীতে আপনি যেকোনো সময় তা পুনরায় দেখতে ও এডিট করতে পারবেন।'
    },
    {
      q: 'Card কি Share করা যায়?',
      a: 'হ্যাঁ, প্রতিটি কাস্টমাইজড কার্ডের একটি সুরক্ষিত শেয়ার লিঙ্ক তৈরি হয়। আপনি "Share" অপশন ব্যবহার করে ফেসবুক, হোয়াটসঅ্যাপ, ইনস্টাগ্রাম বা সরাসরি লিঙ্ক কপি করে প্রিয়জনের কাছে পাঠাতে পারবেন।'
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* SECTION 1: Magic Card কী? */}
      <section className="bg-gradient-to-b from-[#181310] to-[#120e0b] border border-[#2e231c] rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#241a14] border border-[#d4af37]/30 text-xs text-[#d4af37] font-vintage-serif tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>DISCOVER THE EXPERIENCE</span>
          </div>
          <h2 className="font-bengali-serif text-2xl sm:text-4xl font-bold text-[#f7f0df]">
            Magic Card কী?
          </h2>
          <p className="font-bengali-body text-sm sm:text-base text-[#b8a791] leading-relaxed">
            {APP_CONFIG.appName} হলো একটি অনলাইন বাংলা ভিন্টেজ পোস্টকার্ড ও প্রেমের চিঠি তৈরির ডিজিটাল প্ল্যাটফর্ম। পুরনো দিনের হলদেটে খাম, ডাকটিকিট ও স্মৃতিকাতর নস্টালজিয়াকে আধুনিক রূপ দিতেই এর সৃষ্টি। এখানে আপনি সহজেই নান্দনিক ডিজাইন বেছে নিতে পারেন, পছন্দের সাহিত্যিক প্রেমের উক্তি বা একান্ত মনের কথা যুক্ত করতে পারেন, ফন্ট ও স্টাইল সাজিয়ে নিতে পারেন এবং মাত্র কয়েক সেকেন্ডেই তৈরি করতে পারেন ডাউনলোডযোগ্য আকর্ষণীয় HD কার্ড।
          </p>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#2a1f18]">
          <div className="bg-[#140f0c] border border-[#2e231c] rounded-2xl p-5 space-y-2 text-center sm:text-left">
            <div className="text-2xl mb-1">📜</div>
            <h3 className="font-bengali-serif text-base font-bold text-[#f7f0df]">
              ভিন্টেজ ও নান্দনিক ডিজাইন
            </h3>
            <p className="font-bengali-body text-xs text-[#a89882] leading-relaxed">
              চিরাচরিত ক্লাসিক ডাকটিকিট, খাঁটি বর্ডার ফ্রেম ও অ্যান্টিক কাগজের টেক্সচারে সজ্জিত বিশেষ পোস্টকার্ড সংগ্রহ।
            </p>
          </div>

          <div className="bg-[#140f0c] border border-[#2e231c] rounded-2xl p-5 space-y-2 text-center sm:text-left">
            <div className="text-2xl mb-1">✍️</div>
            <h3 className="font-bengali-serif text-base font-bold text-[#f7f0df]">
              বাংলা সাহিত্যের মাধুর্য
            </h3>
            <p className="font-bengali-body text-xs text-[#a89882] leading-relaxed">
              রবীন্দ্রনাথ, কাজী নজরুল ইসলাম, জীবনানন্দ দাশ থেকে শুরু করে মন ছুঁয়ে যাওয়া আধুনিক রোমান্টিক উক্তির অনন্য সংগ্রহ।
            </p>
          </div>

          <div className="bg-[#140f0c] border border-[#2e231c] rounded-2xl p-5 space-y-2 text-center sm:text-left">
            <div className="text-2xl mb-1">🔒</div>
            <h3 className="font-bengali-serif text-base font-bold text-[#f7f0df]">
              সম্পূর্ণ ক্লায়েন্ট-সাইড ও নিরাপদ
            </h3>
            <p className="font-bengali-body text-xs text-[#a89882] leading-relaxed">
              কার্ডে আপনার লেখা গোপন অনুভূতি সরাসরি ব্রাউজারে রেন্ডার হয়। কোনো ফটো আপলোড বা অ্যাকাউন্ট লগইনের ঝামেলা নেই।
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: কীভাবে Magic Card তৈরি করবেন? (How it works) */}
      <section className="space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#241a14] border border-[#d4af37]/30 text-xs text-[#d4af37] font-vintage-serif tracking-widest uppercase">
            <PenTool className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>STEP BY STEP GUIDE</span>
          </div>
          <h2 className="font-bengali-serif text-2xl sm:text-4xl font-bold text-[#f7f0df]">
            কীভাবে Magic Card তৈরি করবেন?
          </h2>
          <p className="font-bengali-body text-sm sm:text-base text-[#b8a791]">
            মাত্র ৬টি সহজ পদক্ষেপে তৈরি করুন আপনার নিজস্ব স্মৃতিবিজড়িত ভিন্টেজ কার্ড
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {steps.map((s, idx) => {
            const IconComp = s.icon;
            return (
              <div
                key={idx}
                className="bg-[#181310] border border-[#2e231c] hover:border-[#d4af37]/40 rounded-2xl p-6 relative flex flex-col justify-between space-y-4 transition-all duration-200 group shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="font-vintage-serif text-2xl font-bold text-[#d4af37]/40 group-hover:text-[#ffd166] transition-colors">
                    {s.stepNumber}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-[#241a14] border border-[#3b2d24] group-hover:border-[#d4af37]/40 flex items-center justify-center text-[#ffd166] transition-colors">
                    <IconComp className="w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-bengali-serif text-base sm:text-lg font-bold text-[#f7f0df]">
                    {s.title}
                  </h3>
                  <p className="font-bengali-body text-xs sm:text-sm text-[#a89882] leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="text-center pt-2">
          <button
            type="button"
            onClick={onStartCreate}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-[#7a1f26] hover:bg-[#91252d] text-[#f8edd6] border border-[#d4af37]/40 font-bengali-body font-bold text-sm sm:text-base shadow-xl transition-all active:scale-95 cursor-pointer"
          >
            <span>এখনই কার্ড তৈরি শুরু করুন</span>
            <ArrowRight className="w-4 h-4 text-[#ffd166]" />
          </button>
        </div>
      </section>

      {/* SECTION 3: FAQ SECTION */}
      <section id="faq" className="bg-[#140f0c] border border-[#2e231c] rounded-3xl p-6 sm:p-10 space-y-8 shadow-xl scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#241a14] border border-[#d4af37]/30 text-xs text-[#d4af37] font-vintage-serif tracking-widest uppercase">
            <HelpCircle className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h2 className="font-bengali-serif text-2xl sm:text-3xl font-bold text-[#f7f0df]">
            সাধারণ জিজ্ঞাসা (FAQ)
          </h2>
          <p className="font-bengali-body text-xs sm:text-sm text-[#a89882]">
            Magic Card সম্পর্কে সচরাচর জানতে চাওয়া প্রশ্নের স্পষ্ট ও নির্ভুল উত্তর
          </p>
        </div>

        <div className="space-y-3 max-w-3xl mx-auto">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className={`border rounded-2xl overflow-hidden transition-all duration-200 ${
                  isOpen
                    ? 'bg-[#1e1713] border-[#d4af37]/40 shadow-md'
                    : 'bg-[#181310] border-[#2e231c] hover:border-[#3d2f26]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left px-5 sm:px-6 py-4 flex items-center justify-between gap-4 cursor-pointer select-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-bengali-serif text-sm sm:text-base font-bold text-[#f7f0df]">
                    {faq.q}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-[#241a14] flex items-center justify-center flex-shrink-0 text-[#d4af37]">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 border-t border-[#2e231c]/60">
                    <p className="font-bengali-body text-xs sm:text-sm text-[#c8baa7] leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
