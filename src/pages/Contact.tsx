import React, { useState } from 'react';
import { APP_CONFIG } from '../config/appConfig';
import { Mail, MessageSquare, Send, CheckCircle2, Clock, Info } from 'lucide-react';

export const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10 text-[#f4eee0]">
      {/* Header */}
      <div className="space-y-3 border-b border-[#2e231c] pb-6 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#241a14] border border-[#d4af37]/30 text-xs text-[#d4af37] font-vintage-serif tracking-widest uppercase">
          <Mail className="w-4 h-4 text-[#d4af37]" />
          <span>GET IN TOUCH</span>
        </div>
        <h1 className="font-bengali-serif text-3xl sm:text-4xl font-bold text-[#f7f0df]">
          যোগাযোগ ও সহায়তা (Contact Us)
        </h1>
        <p className="font-bengali-body text-sm sm:text-base text-[#b8a791] leading-relaxed max-w-2xl">
          {APP_CONFIG.appName} সম্পর্কে আপনার মূল্যবান মতামত, কোনো নতুন পোস্টকার্ড ডিজাইনের পরামর্শ, অথবা কোনো কারিগরি সহায়তার প্রয়োজন হলে নিচের ফর্মটির মাধ্যমে আমাদের জানাতে পারেন।
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Contact Form */}
        <div className="md:col-span-2 bg-[#181310] border border-[#2e231c] rounded-3xl p-6 sm:p-8 shadow-xl">
          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#1b5e20]/40 border border-[#4caf50]/40 text-[#aef0bc] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-bengali-serif text-2xl font-bold text-[#f7f0df]">
                আপনার বার্তাটি গ্রহণ করা হয়েছে!
              </h3>
              <p className="font-bengali-body text-sm text-[#a89882] max-w-sm mx-auto leading-relaxed">
                {APP_CONFIG.appName}-এর সাথে থাকার জন্য ধন্যবাদ। আপনার পাঠানো বিষয়টি আমরা দ্রুত পর্যালোচনা করব।
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', message: '' });
                }}
                className="px-6 py-2.5 rounded-xl bg-[#241a14] text-xs font-bengali-body text-[#ffd166] border border-[#3b2d24] hover:border-[#d4af37]/40 cursor-pointer transition-colors"
              >
                আরেকটি বার্তা পাঠান
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 font-bengali-body">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="w-4 h-4 text-[#d4af37]" />
                <h2 className="text-base font-bold text-[#f7f0df]">আমাদের বার্তা পাঠান</h2>
              </div>

              <div>
                <label className="block text-xs text-[#b8a791] mb-1.5 font-medium">
                  আপনার পূর্ণ নাম <span className="text-[#e63946]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="যেমন: অনিক চৌধুরী"
                  className="w-full bg-[#120e0b] border border-[#3d2f26] rounded-xl px-4 py-2.5 text-sm text-[#f7f0df] placeholder-[#6d5b4d] focus:border-[#d4af37] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs text-[#b8a791] mb-1.5 font-medium">
                  আপনার ইমেইল ঠিকানা <span className="text-[#e63946]">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full bg-[#120e0b] border border-[#3d2f26] rounded-xl px-4 py-2.5 text-sm text-[#f7f0df] placeholder-[#6d5b4d] focus:border-[#d4af37] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs text-[#b8a791] mb-1.5 font-medium">
                  আপনার বার্তা বা অনুসন্ধানের বিবরণ <span className="text-[#e63946]">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="আপনার বার্তা বা পরামর্শ এখানে বিস্তারিত লিখুন..."
                  className="w-full bg-[#120e0b] border border-[#3d2f26] rounded-xl px-4 py-2.5 text-sm text-[#f7f0df] placeholder-[#6d5b4d] focus:border-[#d4af37] focus:outline-none transition-colors resize-y"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#7a1f26] hover:bg-[#91252d] text-[#f8edd6] border border-[#d4af37]/40 font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all active:scale-98 cursor-pointer"
              >
                <Send className="w-4 h-4 text-[#ffd166]" />
                <span>বার্তা প্রেরণ করুন</span>
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Information & Guidelines */}
        <div className="space-y-4">
          <div className="bg-[#181310] border border-[#2e231c] rounded-2xl p-5 space-y-3 font-bengali-body">
            <div className="flex items-center gap-2 text-[#d4af37]">
              <Clock className="w-4 h-4" />
              <h3 className="text-sm font-bold text-[#f7f0df]">সাড়াদানের সময়</h3>
            </div>
            <p className="text-xs text-[#a89882] leading-relaxed">
              আমরা সাধারণত কার্যদিবসের ২৪ থেকে ৪৮ ঘণ্টার মধ্যে প্রতিটি ব্যবহারকারী বার্তার অনুসন্ধান ও ফিডব্যাক পর্যালোচনা করি।
            </p>
          </div>

          <div className="bg-[#181310] border border-[#2e231c] rounded-2xl p-5 space-y-3 font-bengali-body">
            <div className="flex items-center gap-2 text-[#d4af37]">
              <Info className="w-4 h-4" />
              <h3 className="text-sm font-bold text-[#f7f0df]">যোগাযোগের মাধ্যম</h3>
            </div>
            <p className="text-xs text-[#a89882] leading-relaxed">
              Magic Card একটি অনলাইন ডিজিটাল কার্ড প্রস্তুতকরণ সেবা। সব ধরনের সহায়তা ও যোগাযোগের জন্য এই ফর্মটি আমাদের প্রধান মাধ্যম।
            </p>
            <div className="pt-2 border-t border-[#2e231c] text-[11px] text-[#706253]">
              অফিসিয়াল ওয়েবসাইট: <span className="text-[#ffd166]">{APP_CONFIG.siteUrl}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
