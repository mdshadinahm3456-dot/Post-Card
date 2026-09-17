import React from 'react';
import { VintageEffect, BorderStyle } from '../types';
import { Sparkles, Frame, Stamp } from 'lucide-react';

interface EffectsPanelProps {
  currentEffect: VintageEffect;
  onEffectChange: (effect: VintageEffect) => void;
  borderStyle: BorderStyle;
  onBorderStyleChange: (border: BorderStyle) => void;
  showStamp: boolean;
  onToggleStamp: (show: boolean) => void;
}

const EFFECTS: { id: VintageEffect; label: string; desc: string }[] = [
  { id: 'original', label: 'মূল রূপ (Original)', desc: 'কোনো ফিল্টার ছাড়া প্রাকৃতিক রূপ' },
  { id: 'sepia', label: 'সিপিয়া (Sepia)', desc: 'ক্লাসিক স্বর্ণালি ও বাদামী ভিন্টেজ আভা' },
  { id: 'old-paper', label: 'পুরনো কাগজ (Old Paper)', desc: 'নস্টালজিক হলুদ ডাককাগজের অনুভূতি' },
  { id: 'warm-vintage', label: 'উষ্ণ ভিন্টেজ (Warm Vintage)', desc: 'স্নিগ্ধ গোধূলি রোদের মতো আভা' },
  { id: 'bw', label: 'সাদা-কালো (B & W)', desc: 'চিরন্তন ব্ল্যাক অ্যান্ড হোয়াইট ক্লাসিক' },
  { id: 'faded', label: 'মলিন রূপ (Faded)', desc: 'স্মৃতির মতো কিছুটা মলিন ও মায়াবী' },
  { id: 'film-grain', label: 'ফিল্ম গ্রেইন (Film Grain)', desc: 'পুরনো ৩৫মিমি ফিল্ম ক্যামেরার টেক্সচার' },
  { id: 'dust', label: 'ভিন্টেজ ডাস্ট (Dust)', desc: 'পুরনো আর্কাইভাল রেকর্ডের রূপ' },
  { id: 'scratch', label: 'নস্টালজিক স্ক্র্যাচ', desc: 'আর্কাইভাল চিঠির সূক্ষ্ম ছাপ' },
  { id: 'coffee-stain', label: 'কফি স্টেইন (Coffee Stain)', desc: 'ক্যাফের চায়ের কাপের দাগের পরশ' },
];

const BORDER_OPTIONS: { id: BorderStyle; label: string }[] = [
  { id: 'classic', label: 'Classic Border' },
  { id: 'vintage-ornate', label: 'Vintage Ornate' },
  { id: 'minimal-gold', label: 'Minimal Gold' },
  { id: 'postmark', label: 'Postmark Dashed' },
  { id: 'double-frame', label: 'Double Frame' },
];

export const EffectsPanel: React.FC<EffectsPanelProps> = ({
  currentEffect,
  onEffectChange,
  borderStyle,
  onBorderStyleChange,
  showStamp,
  onToggleStamp
}) => {
  return (
    <div className="bg-[#181310] border border-[#d4af37]/25 rounded-2xl p-5 md:p-6 space-y-6 shadow-xl text-[#f4eee0]">
      {/* Title */}
      <div className="flex items-center gap-2 pb-3 border-b border-[#31251e]">
        <Sparkles className="w-5 h-5 text-[#d4af37]" />
        <h3 className="font-bengali-serif text-lg font-semibold text-[#f7f0df]">
          ভিন্টেজ এফেক্টস ও ফ্রেম (Vintage Effects)
        </h3>
      </div>

      {/* Effects Grid */}
      <div className="space-y-3">
        <label className="text-xs font-bengali-body text-[#b8a791] block">
          ফিল্টার নির্বাচন করুন (Select Vintage Mood)
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {EFFECTS.map((eff) => (
            <button
              key={eff.id}
              type="button"
              onClick={() => onEffectChange(eff.id)}
              className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                currentEffect === eff.id
                  ? 'bg-[#7a1f26]/40 border-[#d4af37] text-[#f7f0df] shadow-md ring-1 ring-[#d4af37]/30'
                  : 'bg-[#120e0b] border-[#31251e] text-[#a89882] hover:border-[#d4af37]/40 hover:text-[#f4eee0]'
              }`}
            >
              <div className="text-xs font-semibold font-bengali-body text-[#eadecc]">
                {eff.label}
              </div>
              <div className="text-[10px] text-[#8e7e6c] mt-0.5 line-clamp-1">
                {eff.desc}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Decorative Border & Stamp Options */}
      <div className="pt-2 border-t border-[#2a1f18] grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Border Style */}
        <div>
          <label className="text-xs font-bengali-body text-[#b8a791] flex items-center gap-1.5 mb-2">
            <Frame className="w-4 h-4 text-[#d4af37]" />
            <span>বর্ডার স্টাইল (Border Frame)</span>
          </label>
          <select
            value={borderStyle}
            onChange={(e) => onBorderStyleChange(e.target.value as BorderStyle)}
            className="w-full bg-[#120e0b] border border-[#3d2f26] rounded-xl px-3 py-2 text-sm text-[#f7f0df] focus:border-[#d4af37] focus:outline-none cursor-pointer"
          >
            {BORDER_OPTIONS.map((b) => (
              <option key={b.id} value={b.id}>
                {b.label}
              </option>
            ))}
          </select>
        </div>

        {/* Vintage Postmark Stamp Toggle */}
        <div>
          <label className="text-xs font-bengali-body text-[#b8a791] flex items-center gap-1.5 mb-2">
            <Stamp className="w-4 h-4 text-[#d4af37]" />
            <span>ডাকটিকিট ও সীলমোহর (Postal Stamp)</span>
          </label>
          <button
            type="button"
            onClick={() => onToggleStamp(!showStamp)}
            className={`w-full py-2 px-3 rounded-xl border text-sm font-bengali-body transition-all flex items-center justify-between cursor-pointer ${
              showStamp
                ? 'bg-[#7a1f26]/30 border-[#d4af37] text-[#f7f0df]'
                : 'bg-[#120e0b] border-[#31251e] text-[#8e7e6c]'
            }`}
          >
            <span>{showStamp ? 'ডাকটিকিট দৃশ্যমান' : 'ডাকটিকিট লুকানো'}</span>
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                showStamp ? 'bg-[#d4af37]' : 'bg-[#503f33]'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};
