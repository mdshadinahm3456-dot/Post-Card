import React, { useRef, useState } from 'react';
import { SavedCreation, PostcardTemplate } from '../types';
import { postcards } from '../data/postcards';
import { CardPreview } from './CardPreview';
import { formatBengaliDate } from '../utils/bengaliUtils';
import { Edit3, Download, Share2, Trash2, Calendar, Sparkles } from 'lucide-react';

interface CreationCardProps {
  creation: SavedCreation;
  onEdit: (creation: SavedCreation) => void;
  onDownload: (creation: SavedCreation, element: HTMLElement) => void;
  onShare: (creation: SavedCreation) => void;
  onDeleteRequest: (creation: SavedCreation) => void;
}

export const CreationCard: React.FC<CreationCardProps> = ({
  creation,
  onEdit,
  onDownload,
  onShare,
  onDeleteRequest
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [imageError, setImageError] = useState(false);

  // Match the template postcard
  const matchedTemplate: PostcardTemplate =
    postcards.find((c) => c.id === creation.cardId) || {
      id: creation.cardId,
      title: creation.title || 'ভিন্টেজ কার্ড',
      category: 'রোমান্টিক',
      image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=80',
      defaultQuote: 'তুমি আমার চাঁদের আলো...',
      textPosition: creation.customization.textPosition || 'center',
      typography: creation.customization.fontFamily || 'bengali-serif',
      borderStyle: creation.customization.borderStyle || 'classic'
    };

  const handleDownloadClick = () => {
    if (cardRef.current) {
      onDownload(creation, cardRef.current);
    }
  };

  return (
    <div
      id={`saved-creation-${creation.id}`}
      className="group relative bg-[#17120e] border border-[#d4af37]/30 hover:border-[#d4af37]/70 rounded-2xl p-3 sm:p-4 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col justify-between overflow-hidden"
    >
      {/* Top Corner Ornaments */}
      <div className="absolute top-2 left-2 text-[#d4af37]/20 text-[10px] select-none">✦</div>
      <div className="absolute top-2 right-2 text-[#d4af37]/20 text-[10px] select-none">✦</div>

      {/* Card Header & Date */}
      <div className="flex items-center justify-between gap-2 mb-2 px-1">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="text-xs">💌</span>
          <h4 className="font-bengali-serif font-bold text-xs sm:text-sm text-[#f7f0df] truncate">
            {creation.title || matchedTemplate.title}
          </h4>
        </div>

        <div className="flex items-center gap-1 text-[10px] text-[#9e8d7b] font-bengali-body flex-shrink-0">
          <Calendar className="w-3 h-3 text-[#a89882]" />
          <span>{formatBengaliDate(new Date(creation.createdAt || Date.now()))}</span>
        </div>
      </div>

      {/* Realistic Card Preview Box */}
      <div className="relative my-2 rounded-xl overflow-hidden border border-[#3b2d23] bg-[#0f0b09] shadow-inner flex items-center justify-center min-h-[190px] sm:min-h-[210px]">
        <div ref={cardRef} className="w-full">
          <CardPreview
            card={matchedTemplate}
            customization={creation.customization}
            isExporting={false}
          />
        </div>
      </div>

      {/* Text Excerpt summary */}
      <div className="px-1 py-1.5 text-xs text-[#c9bcab] font-bengali-body">
        <p className="line-clamp-1 italic text-[#e6dbcb]">
          “{creation.customization.message}”
        </p>
        <div className="flex items-center justify-between text-[10px] text-[#948473] mt-1">
          {creation.customization.recipient && (
            <span>প্রাপক: {creation.customization.recipient}</span>
          )}
          {creation.customization.sender && (
            <span>প্রেরক: {creation.customization.sender}</span>
          )}
        </div>
      </div>

      {/* Action Buttons Row */}
      <div className="mt-3 pt-2.5 border-t border-[#2d221a] grid grid-cols-4 gap-1.5">
        {/* 1. Edit Button */}
        <button
          type="button"
          onClick={() => onEdit(creation)}
          className="py-2 px-1 rounded-xl bg-[#241a14] hover:bg-[#34241b] text-[#ffd166] border border-[#3d2e23] hover:border-[#d4af37]/40 text-[11px] sm:text-xs font-bengali-body font-semibold flex items-center justify-center gap-1 transition-all cursor-pointer active:scale-95"
          title="কার্ডটি এডিট করুন"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>এডিট</span>
        </button>

        {/* 2. Download Button */}
        <button
          type="button"
          onClick={handleDownloadClick}
          className="py-2 px-1 rounded-xl bg-[#7a1f26] hover:bg-[#91252d] text-[#f8edd6] border border-[#d4af37]/50 text-[11px] sm:text-xs font-bengali-body font-semibold flex items-center justify-center gap-1 transition-all cursor-pointer shadow-md shadow-[#7a1f26]/30 active:scale-95"
          title="HD কার্ড ডাউনলোড করুন"
        >
          <Download className="w-3.5 h-3.5 text-[#ffd166]" />
          <span>ডাউনলোড</span>
        </button>

        {/* 3. Share Button */}
        <button
          type="button"
          onClick={() => onShare(creation)}
          className="py-2 px-1 rounded-xl bg-[#241a14] hover:bg-[#34241b] text-[#c9bcaa] hover:text-[#f7f0df] border border-[#3d2e23] hover:border-[#d4af37]/40 text-[11px] sm:text-xs font-bengali-body font-semibold flex items-center justify-center gap-1 transition-all cursor-pointer active:scale-95"
          title="কার্ডটি শেয়ার করুন"
        >
          <Share2 className="w-3.5 h-3.5 text-[#ffd166]" />
          <span>শেয়ার</span>
        </button>

        {/* 4. Delete Button */}
        <button
          type="button"
          onClick={() => onDeleteRequest(creation)}
          className="py-2 px-1 rounded-xl bg-[#241a14] hover:bg-[#3d1a1d] text-[#a89882] hover:text-[#ff808d] border border-[#3d2e23] hover:border-[#b71c1c]/50 text-[11px] sm:text-xs font-bengali-body font-semibold flex items-center justify-center gap-1 transition-all cursor-pointer active:scale-95"
          title="কার্ডটি মুছে ফেলুন"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>মুছুন</span>
        </button>
      </div>
    </div>
  );
};
