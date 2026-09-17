import React, { useState } from 'react';
import { APP_CONFIG } from '../config/appConfig';
import { Mail, MessageSquare, Send, Check } from 'lucide-react';

export const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-[#f4eee0]">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#241a14] border border-[#d4af37]/30 text-xs text-[#d4af37] font-vintage-serif tracking-widest uppercase">
          <Mail className="w-4 h-4" />
          <span>GET IN TOUCH</span>
        </div>
        <h1 className="font-bengali-serif text-3xl sm:text-4xl font-bold">
          Contact Magic Card
        </h1>
        <p className="font-bengali-body text-sm text-[#b8a791]">
          Magic Card সম্পর্কে যোগাযোগের তথ্য এবং সহায়তা এখানে দেখুন। আপনার কোনো মতামত, নতুন পোস্টকার্ডের আইডিয়া বা পরামর্শ থাকলে আমাদের জানাতে পারেন।
        </p>
      </div>

      <div className="bg-[#181310] border border-[#2e231c] rounded-3xl p-6 sm:p-8 shadow-xl">
        {submitted ? (
          <div className="text-center py-10 space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#1b5e20] text-[#aef0bc] flex items-center justify-center mx-auto">
              <Check className="w-7 h-7" />
            </div>
            <h3 className="font-bengali-serif text-xl font-bold text-[#f7f0df]">
              আপনার বার্তাটি পৌঁছেছে!
            </h3>
            <p className="font-bengali-body text-xs sm:text-sm text-[#a89882] max-w-sm mx-auto">
              {APP_CONFIG.appName}-এর সাথে থাকার জন্য ধন্যবাদ। আমরা দ্রুত আপনার সাথে যোগাযোগ করব।
            </p>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setFormData({ name: '', email: '', message: '' });
              }}
              className="px-5 py-2 rounded-xl bg-[#241a14] text-xs font-bengali-body text-[#ffd166] border border-[#3b2d24] cursor-pointer"
            >
              আরেকটি বার্তা পাঠান
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bengali-body text-[#b8a791] mb-1">
                আপনার নাম
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="যেমন: অনিক চৌধুরী"
                className="w-full bg-[#120e0b] border border-[#3d2f26] rounded-xl px-4 py-2.5 text-sm text-[#f7f0df] focus:border-[#d4af37] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bengali-body text-[#b8a791] mb-1">
                ইমেইল ঠিকানা
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="example@mail.com"
                className="w-full bg-[#120e0b] border border-[#3d2f26] rounded-xl px-4 py-2.5 text-sm text-[#f7f0df] focus:border-[#d4af37] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bengali-body text-[#b8a791] mb-1">
                বার্তা
              </label>
              <textarea
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="আপনার বার্তা বা পরামর্শ এখানে লিখুন..."
                className="w-full bg-[#120e0b] border border-[#3d2f26] rounded-xl px-4 py-2.5 text-sm text-[#f7f0df] focus:border-[#d4af37] focus:outline-none resize-y"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#7a1f26] hover:bg-[#91252d] text-[#f8edd6] border border-[#d4af37]/40 font-bengali-body font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 cursor-pointer"
            >
              <Send className="w-4 h-4 text-[#ffd166]" />
              <span>বার্তা প্রেরণ করুন</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
