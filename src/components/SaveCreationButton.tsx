import React, { useState } from 'react';
import { PostcardTemplate, CardCustomizationState, SavedCreation } from '../types';
import { saveCreation } from '../utils/myCreations';
import { Bookmark, Check, Save } from 'lucide-react';

interface SaveCreationButtonProps {
  card: PostcardTemplate;
  customization: CardCustomizationState;
  quoteId?: string;
  existingId?: string;
  onSaved?: (creation: SavedCreation) => void;
  className?: string;
  variant?: 'primary' | 'compact' | 'outline';
}

export const SaveCreationButton: React.FC<SaveCreationButtonProps> = ({
  card,
  customization,
  quoteId,
  existingId,
  onSaved,
  className = '',
  variant = 'outline'
}) => {
  const [isSaved, setIsSaved] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSave = () => {
    try {
      const saved = saveCreation(
        {
          cardId: card.id,
          title: card.title,
          quoteId,
          customization
        },
        existingId
      );

      if (saved) {
        setIsSaved(true);
        if (onSaved) onSaved(saved);
        setTimeout(() => setIsSaved(false), 3000);
      }
    } catch (err) {
      console.error('Failed to save creation:', err);
      setErrorMsg('সংরক্ষণ করা সম্ভব হয়নি');
      setTimeout(() => setErrorMsg(null), 3000);
    }
  };

  if (variant === 'compact') {
    return (
      <button
        type="button"
        onClick={handleSave}
        title={isSaved ? 'সংরক্ষিত হয়েছে' : 'আমার তৈরি কার্ডে সংরক্ষণ করুন'}
        className={`p-2 rounded-xl transition-all cursor-pointer flex items-center justify-center ${
          isSaved
            ? 'bg-[#1b4324] text-[#aef0bc] border border-[#388e3c]'
            : 'bg-[#241a14] hover:bg-[#33241b] text-[#ffd166] border border-[#3b2d24]'
        } ${className}`}
      >
        {isSaved ? <Check className="w-4 h-4 text-[#81c784]" /> : <Bookmark className="w-4 h-4" />}
      </button>
    );
  }

  return (
    <button
      type="button"
      id="btn-save-creation"
      onClick={handleSave}
      className={`px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl font-bengali-body font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 ${
        isSaved
          ? 'bg-[#1b4324] text-[#aef0bc] border border-[#388e3c] shadow-md shadow-[#1b4324]/30'
          : variant === 'primary'
          ? 'bg-[#7a1f26] hover:bg-[#91252d] text-[#f8edd6] border border-[#d4af37]/50 shadow-md'
          : 'bg-[#241a14] hover:bg-[#31231b] text-[#ffd166] border border-[#3b2d24] hover:border-[#d4af37]/40'
      } ${className}`}
    >
      {isSaved ? (
        <>
          <Check className="w-4 h-4 text-[#81c784]" />
          <span>✅ সংরক্ষণ হয়েছে!</span>
        </>
      ) : (
        <>
          <Save className="w-4 h-4 text-[#ffd166]" />
          <span>💾 সংরক্ষণ করুন</span>
        </>
      )}
      {errorMsg && <span className="text-[10px] text-red-400 ml-1">{errorMsg}</span>}
    </button>
  );
};
