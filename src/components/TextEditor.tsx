import React from 'react';
import { CardCustomizationState, TypographyStyle, TextPosition } from '../types';
import { formatBengaliDate } from '../utils/bengaliUtils';
import {
  Bold,
  Italic,
  AlignLeft,
  AlignCenter,
  AlignRight,
  RotateCcw,
  Sliders,
  Type,
  User,
  Calendar,
  Sparkles
} from 'lucide-react';

interface TextEditorProps {
  customization: CardCustomizationState;
  onChange: (updates: Partial<CardCustomizationState>) => void;
  onReset: () => void;
}

const FONT_OPTIONS: { id: TypographyStyle; label: string; preview: string }[] = [
  { id: 'bengali-serif', label: 'মার্জিত বাংলা সেরিফ (Elegant Serif)', preview: 'ভালোবাসা' },
  { id: 'handwritten', label: 'হাতের লেখা শৈলী (Handwritten Bengali)', preview: 'স্মৃতি' },
  { id: 'vintage-serif', label: 'ভিন্টেজ ক্লাসিক (Vintage Serif)', preview: 'অনন্তকাল' },
  { id: 'classic', label: 'ঐতিহ্যবাহী বাংলা (Classic Bengali)', preview: 'অনুভূতি' },
  { id: 'typewriter', label: 'টাইপরাইটার হরফ (Typewriter)', preview: '১৯৫৪' },
  { id: 'calligraphy', label: 'ক্যালিগ্রাফি (Calligraphy)', preview: 'Romance' },
  { id: 'newspaper', label: 'সংবাদপত্র আর্কাইভ (Newspaper)', preview: 'ডাকঘর' },
];

const COLOR_PRESETS = [
  { label: 'Warm Cream', value: '#f7f0df' },
  { label: 'Antique Gold', value: '#e5c05d' },
  { label: 'Rose Gold', value: '#e8b4b8' },
  { label: 'Parchment', value: '#eadecc' },
  { label: 'Pure Ivory', value: '#fffdfa' },
  { label: 'Muted Amber', value: '#d4a373' },
  { label: 'Ruby Tint', value: '#f28482' },
];

export const TextEditor: React.FC<TextEditorProps> = ({
  customization,
  onChange,
  onReset
}) => {
  const handleInsertTodayDate = () => {
    onChange({ date: formatBengaliDate(new Date()) });
  };

  return (
    <div className="bg-[#181310] border border-[#d4af37]/25 rounded-2xl p-5 md:p-6 space-y-6 shadow-xl text-[#f4eee0]">
      {/* Header with Reset */}
      <div className="flex items-center justify-between pb-3 border-b border-[#31251e]">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#d4af37]" />
          <h3 className="font-bengali-serif text-lg font-bold text-[#f7f0df]">
            ৪. নিজের লেখা লিখুন ও সাজান
          </h3>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="text-xs font-bengali-body flex items-center gap-1.5 text-[#a89882] hover:text-[#d4af37] px-2.5 py-1.5 rounded-xl bg-[#241a14] border border-[#3b2c22] transition-colors cursor-pointer"
          title="ডিফল্ট স্টাইলে ফিরিয়ে আনুন"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>স্টাইল রিসেট করুন</span>
        </button>
      </div>

      {/* Recipient, Sender, Date fields */}
      <div className="space-y-4">
        <h4 className="font-bengali-serif text-sm text-[#d4af37] font-medium flex items-center gap-1.5">
          <User className="w-4 h-4" />
          <span>প্রাপক ও প্রেরকের তথ্য</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-[#b8a791] font-bengali-body mb-1">
              প্রাপক (To)
            </label>
            <input
              type="text"
              value={customization.recipient}
              onChange={(e) => onChange({ recipient: e.target.value })}
              placeholder="যেমন: প্রিয়তমা / প্রিয় বন্ধু / মা"
              className="w-full bg-[#120e0b] border border-[#3d2f26] rounded-xl px-3.5 py-2.5 text-sm text-[#f7f0df] focus:border-[#d4af37] focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs text-[#b8a791] font-bengali-body mb-1">
              প্রেরক (From)
            </label>
            <input
              type="text"
              value={customization.sender}
              onChange={(e) => onChange({ sender: e.target.value })}
              placeholder="যেমন: ইতি, তোমার..."
              className="w-full bg-[#120e0b] border border-[#3d2f26] rounded-xl px-3.5 py-2.5 text-sm text-[#f7f0df] focus:border-[#d4af37] focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs text-[#b8a791] font-bengali-body flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>তারিখ (ঐচ্ছিক / Bengali Date)</span>
            </label>
            <button
              type="button"
              onClick={handleInsertTodayDate}
              className="text-[11px] text-[#ffd166] hover:underline cursor-pointer font-bengali-body"
            >
              + আজকের তারিখ বসান
            </button>
          </div>
          <input
            type="text"
            value={customization.date}
            onChange={(e) => onChange({ date: e.target.value })}
            placeholder="যেমন: ১৬ সেপ্টেম্বর ২০২৬ / ১৬ই আষাঢ়, ১৩৬১"
            className="w-full bg-[#120e0b] border border-[#3d2f26] rounded-xl px-3.5 py-2 text-sm text-[#f7f0df] focus:border-[#d4af37] focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Main Message / মূল লেখা */}
      <div className="space-y-2 pt-2 border-t border-[#2a1f18]">
        <div className="flex items-center justify-between">
          <label className="text-sm font-bengali-serif text-[#d4af37] font-medium flex items-center gap-1.5">
            <Type className="w-4 h-4" />
            <span>মূল লেখা (Card Quote / Message)</span>
          </label>
          <span className="text-[11px] text-[#8e7e6c]">
            {customization.message.length} অক্ষর
          </span>
        </div>
        <textarea
          rows={4}
          value={customization.message}
          onChange={(e) => onChange({ message: e.target.value })}
          placeholder="এখানে আপনার নিজের আন্তরিক অনুভূতি বা চিঠি লিখুন..."
          className="w-full bg-[#120e0b] border border-[#3d2f26] rounded-xl p-3.5 text-sm text-[#f7f0df] font-bengali-body leading-relaxed focus:border-[#d4af37] focus:outline-none transition-colors resize-y min-h-[95px]"
        />
      </div>

      {/* Typography Style Selector */}
      <div className="space-y-3 pt-2 border-t border-[#2a1f18]">
        <h4 className="font-bengali-serif text-sm text-[#d4af37] font-medium">
          ফন্ট ও হরফের শৈলী (Bengali Typography)
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {FONT_OPTIONS.map((f) => {
            const isSelected = customization.fontFamily === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => onChange({ fontFamily: f.id })}
                className={`p-2.5 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-[#241a14] border-[#d4af37] text-[#ffd166] shadow-sm'
                    : 'bg-[#120e0b] border-[#2e231c] text-[#a89882] hover:border-[#d4af37]/40 hover:text-[#f4eee0]'
                }`}
              >
                <span className="text-xs font-bengali-body truncate">{f.label}</span>
                <span className="text-sm px-2 py-0.5 rounded bg-black/40 text-[#f7f0df]">
                  {f.preview}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Formatting Toolbar: Bold, Italic, Alignment, Position */}
      <div className="space-y-4 pt-2 border-t border-[#2a1f18]">
        <h4 className="font-bengali-serif text-sm text-[#d4af37] font-medium">
          লেখার বিন্যাস ও অবস্থান
        </h4>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Bold & Italic */}
          <div className="flex items-center rounded-xl bg-[#120e0b] border border-[#3d2f26] p-1">
            <button
              type="button"
              onClick={() => onChange({ isBold: !customization.isBold })}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                customization.isBold ? 'bg-[#7a1f26] text-[#ffd166]' : 'text-[#a89882] hover:text-[#f4eee0]'
              }`}
              title="বোল্ড"
            >
              <Bold className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onChange({ isItalic: !customization.isItalic })}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                customization.isItalic ? 'bg-[#7a1f26] text-[#ffd166]' : 'text-[#a89882] hover:text-[#f4eee0]'
              }`}
              title="ইটালিক"
            >
              <Italic className="w-4 h-4" />
            </button>
          </div>

          {/* Alignment */}
          <div className="flex items-center rounded-xl bg-[#120e0b] border border-[#3d2f26] p-1">
            {(['left', 'center', 'right'] as const).map((align) => (
              <button
                key={align}
                type="button"
                onClick={() => onChange({ textAlign: align })}
                className={`p-2 rounded-lg transition-colors cursor-pointer ${
                  customization.textAlign === align
                    ? 'bg-[#7a1f26] text-[#ffd166]'
                    : 'text-[#a89882] hover:text-[#f4eee0]'
                }`}
                title={`অ্যালাইন ${align}`}
              >
                {align === 'left' && <AlignLeft className="w-4 h-4" />}
                {align === 'center' && <AlignCenter className="w-4 h-4" />}
                {align === 'right' && <AlignRight className="w-4 h-4" />}
              </button>
            ))}
          </div>

          {/* Vertical Position */}
          <div className="flex items-center rounded-xl bg-[#120e0b] border border-[#3d2f26] p-1">
            {(['top', 'center', 'bottom'] as const).map((pos) => (
              <button
                key={pos}
                type="button"
                onClick={() => onChange({ textPosition: pos })}
                className={`px-2.5 py-1.5 text-xs font-bengali-body rounded-lg transition-colors cursor-pointer ${
                  customization.textPosition === pos
                    ? 'bg-[#7a1f26] text-[#ffd166] font-semibold'
                    : 'text-[#a89882] hover:text-[#f4eee0]'
                }`}
              >
                {pos === 'top' && 'উপরে'}
                {pos === 'center' && 'মাঝে'}
                {pos === 'bottom' && 'নিচে'}
              </button>
            ))}
          </div>
        </div>

        {/* Color Palette */}
        <div className="space-y-2">
          <label className="text-xs text-[#b8a791] font-bengali-body">
            লেখার রঙ (Vintage Palette)
          </label>
          <div className="flex items-center gap-2 flex-wrap">
            {COLOR_PRESETS.map((color) => (
              <button
                key={color.value}
                type="button"
                onClick={() => onChange({ textColor: color.value })}
                className={`w-7 h-7 rounded-full border-2 transition-transform cursor-pointer ${
                  customization.textColor === color.value
                    ? 'border-[#d4af37] scale-110 shadow-[0_0_10px_rgba(212,175,55,0.4)]'
                    : 'border-transparent hover:scale-105'
                }`}
                style={{ backgroundColor: color.value }}
                title={color.label}
              />
            ))}
          </div>
        </div>

        {/* Font Size & Line Spacing Sliders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <div className="flex items-center justify-between text-xs text-[#b8a791] mb-1">
              <span>ফন্ট সাইজ</span>
              <span className="font-typewriter text-[#ffd166]">{customization.fontSize}px</span>
            </div>
            <input
              type="range"
              min={14}
              max={36}
              value={customization.fontSize}
              onChange={(e) => onChange({ fontSize: Number(e.target.value) })}
              className="w-full accent-[#d4af37] cursor-pointer"
            />
          </div>

          <div>
            <div className="flex items-center justify-between text-xs text-[#b8a791] mb-1">
              <span>লাইনের দূরত্ব (Line Height)</span>
              <span className="font-typewriter text-[#ffd166]">{customization.lineHeight}</span>
            </div>
            <input
              type="range"
              min={1.2}
              max={2.4}
              step={0.1}
              value={customization.lineHeight}
              onChange={(e) => onChange({ lineHeight: Number(e.target.value) })}
              className="w-full accent-[#d4af37] cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
