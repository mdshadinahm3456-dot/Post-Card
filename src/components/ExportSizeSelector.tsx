import React from 'react';
import { ExportRatioKey } from '../types';
import { EXPORT_SIZE_CONFIGS } from '../utils/exportSizes';
import { Smartphone, Square, Layout, Image as ImageIcon } from 'lucide-react';

interface ExportSizeSelectorProps {
  currentRatio: ExportRatioKey;
  onRatioChange: (ratio: ExportRatioKey) => void;
  currentFormat: 'png' | 'jpeg';
  onFormatChange: (format: 'png' | 'jpeg') => void;
}

export const ExportSizeSelector: React.FC<ExportSizeSelectorProps> = ({
  currentRatio,
  onRatioChange,
  currentFormat,
  onFormatChange
}) => {
  const getIcon = (key: ExportRatioKey) => {
    switch (key) {
      case 'square':
        return <Square className="w-4 h-4" />;
      case 'story':
      case 'whatsapp':
        return <Smartphone className="w-4 h-4" />;
      case 'facebook':
        return <Layout className="w-4 h-4" />;
      case 'postcard':
      default:
        return <ImageIcon className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-[#181310] border border-[#d4af37]/25 rounded-2xl p-5 md:p-6 space-y-5 shadow-xl text-[#f4eee0]">
      {/* Title */}
      <div className="flex items-center justify-between pb-3 border-b border-[#31251e]">
        <div>
          <h3 className="font-bengali-serif text-lg font-semibold text-[#f7f0df]">
            এক্সপোর্ট সাইজ ও ফরম্যাট (Export Dimensions)
          </h3>
          <p className="text-xs text-[#a89882] font-bengali-body">
            সোশ্যাল মিডিয়ার জন্য উপযুক্ত অনুপাত নির্বাচন করুন
          </p>
        </div>

        {/* PNG / JPG Toggle */}
        <div className="flex items-center bg-[#120e0b] border border-[#31251e] rounded-xl p-1 gap-1">
          <button
            type="button"
            onClick={() => onFormatChange('png')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              currentFormat === 'png'
                ? 'bg-[#7a1f26] text-[#f7f0df]'
                : 'text-[#8e7e6c] hover:text-[#f4eee0]'
            }`}
          >
            PNG
          </button>
          <button
            type="button"
            onClick={() => onFormatChange('jpeg')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              currentFormat === 'jpeg'
                ? 'bg-[#7a1f26] text-[#f7f0df]'
                : 'text-[#8e7e6c] hover:text-[#f4eee0]'
            }`}
          >
            JPG
          </button>
        </div>
      </div>

      {/* Social Media Ratio Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {(Object.keys(EXPORT_SIZE_CONFIGS) as ExportRatioKey[]).map((key) => {
          const cfg = EXPORT_SIZE_CONFIGS[key];
          const isSelected = currentRatio === key;

          return (
            <button
              key={key}
              type="button"
              onClick={() => onRatioChange(key)}
              className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer flex items-center justify-between ${
                isSelected
                  ? 'bg-[#7a1f26]/40 border-[#d4af37] text-[#f7f0df] ring-1 ring-[#d4af37]/40 shadow-md'
                  : 'bg-[#120e0b] border-[#31251e] text-[#a89882] hover:border-[#d4af37]/40 hover:text-[#f4eee0]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className={`p-2 rounded-lg ${
                    isSelected ? 'bg-[#d4af37] text-black' : 'bg-[#251b14] text-[#d4af37]'
                  }`}
                >
                  {getIcon(key)}
                </div>
                <div>
                  <div className="text-xs font-bold font-bengali-body text-[#f7f0df]">
                    {cfg.name}
                  </div>
                  <div className="text-[10px] text-[#8e7e6c] mt-0.5">
                    {cfg.width} × {cfg.height}px
                  </div>
                </div>
              </div>
              <span className="font-mono text-xs text-[#d4af37] px-2 py-0.5 rounded bg-[#241a14] border border-[#3a2c22]">
                {cfg.ratioLabel}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
