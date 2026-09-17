import React, { useState, useEffect } from 'react';
import { PostcardTemplate, CardCustomizationState } from '../types';
import {
  generateShareUrl,
  shareToWhatsApp,
  shareToFacebook,
  shareToMessenger,
  shareToTelegram,
  copyToClipboard,
  canNativeShare,
  triggerNativeShare,
  DEFAULT_SHARE_TEXT
} from '../utils/shareCard';
import {
  X,
  Copy,
  Check,
  Share2,
  Send,
  MessageCircle,
  ExternalLink,
  Sparkles
} from 'lucide-react';

interface ShareCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  card: PostcardTemplate;
  customization: CardCustomizationState;
  quoteId?: string;
}

export const ShareCardModal: React.FC<ShareCardModalProps> = ({
  isOpen,
  onClose,
  card,
  customization,
  quoteId
}) => {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    if (isOpen && card) {
      const url = generateShareUrl(card, customization, quoteId);
      setShareUrl(url);
      setCopied(false);
      setCopyError(false);
    }
  }, [isOpen, card, customization, quoteId]);

  // Keyboard Escape key support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !card) return null;

  const handleCopyLink = async () => {
    setCopyError(false);
    const success = await copyToClipboard(shareUrl);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } else {
      setCopyError(true);
      setTimeout(() => setCopyError(false), 4000);
    }
  };

  const handleNativeShare = async () => {
    await triggerNativeShare(shareUrl, `${card.title} - Magic Card`, DEFAULT_SHARE_TEXT);
  };

  return (
    <div
      id="share-card-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        id="share-card-modal"
        className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto bg-[#16120f] border border-[#d4af37]/40 rounded-3xl shadow-2xl p-5 sm:p-7 text-[#f4eee0] scrollbar-none"
      >
        {/* Vintage Corner Ornaments */}
        <div className="absolute top-3 left-3 text-[#d4af37]/40 text-xs select-none">✦</div>
        <div className="absolute top-3 right-3 text-[#d4af37]/40 text-xs select-none">✦</div>
        <div className="absolute bottom-3 left-3 text-[#d4af37]/40 text-xs select-none">✦</div>
        <div className="absolute bottom-3 right-3 text-[#d4af37]/40 text-xs select-none">✦</div>

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#a89882] hover:text-[#f4eee0] hover:bg-[#251d17] rounded-full transition-colors cursor-pointer"
          aria-label="Close share modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-1 mb-5">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#7a1f26]/30 border border-[#d4af37]/40 mb-2 shadow-inner">
            <span className="text-2xl">💌</span>
          </div>
          <h3 className="font-bengali-serif text-xl sm:text-2xl font-bold text-[#f7f0df]">
            আপনার Magic Card শেয়ার করুন
          </h3>
          <p className="font-bengali-body text-xs sm:text-sm text-[#b8a791]">
            আপনার তৈরি করা পোস্টকার্ডটি বন্ধুদের সাথে শেয়ার করুন।
          </p>
        </div>

        {/* Compact Card Miniature Preview */}
        <div className="mb-5 p-3 rounded-2xl bg-[#1f1713] border border-[#3b2d24] shadow-inner flex items-center gap-3.5">
          <div className="relative w-20 h-16 sm:w-24 sm:h-18 flex-shrink-0 rounded-xl overflow-hidden border border-[#d4af37]/40 bg-[#120e0b]">
            <img
              src={card.image}
              alt={card.alt || `${card.title} - Vintage Love Postcard`}
              width={96}
              height={72}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute top-1 right-1 text-[8px] bg-[#7a1f26] text-[#ffd166] px-1 rounded font-vintage-serif border border-[#d4af37]/40">
              MC
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 text-xs text-[#d4af37] font-vintage-serif tracking-wider uppercase">
              <Sparkles className="w-3 h-3 text-[#ffd166]" />
              <span>{card.title}</span>
            </div>
            <p className="text-xs sm:text-sm text-[#e6dbcb] font-bengali-serif line-clamp-2 italic mt-0.5">
              “{customization.message || card.defaultQuote}”
            </p>
            <div className="flex items-center gap-2 mt-1 text-[11px] text-[#9c8b77] font-bengali-body">
              {customization.recipient && <span>প্রাপক: {customization.recipient}</span>}
              {customization.sender && <span>• {customization.sender}</span>}
            </div>
          </div>
        </div>

        {/* Social Share Grid */}
        <div className="space-y-3 mb-5">
          <span className="text-xs font-vintage-serif uppercase tracking-wider text-[#d4af37]/80 block">
            সোশ্যাল মিডিয়ায় শেয়ার করুন
          </span>
          <div className="grid grid-cols-2 gap-2.5">
            {/* WhatsApp */}
            <button
              type="button"
              onClick={() => shareToWhatsApp(shareUrl)}
              className="py-2.5 px-3.5 rounded-xl bg-[#1b2b1e] hover:bg-[#223926] text-[#69db7c] border border-[#2e5234] text-xs sm:text-sm font-bengali-body font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm active:scale-95"
            >
              <MessageCircle className="w-4 h-4 text-[#51cf66]" />
              <span>💬 WhatsApp</span>
            </button>

            {/* Facebook */}
            <button
              type="button"
              onClick={() => shareToFacebook(shareUrl)}
              className="py-2.5 px-3.5 rounded-xl bg-[#162338] hover:bg-[#1c2e4a] text-[#74c0fc] border border-[#2b446e] text-xs sm:text-sm font-bengali-body font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm active:scale-95"
            >
              <span className="font-bold text-sm text-[#4dabf7]">f</span>
              <span>Facebook</span>
            </button>

            {/* Messenger */}
            <button
              type="button"
              onClick={() => shareToMessenger(shareUrl)}
              className="py-2.5 px-3.5 rounded-xl bg-[#231b33] hover:bg-[#2d2242] text-[#d0bfff] border border-[#483669] text-xs sm:text-sm font-bengali-body font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm active:scale-95"
            >
              <MessageCircle className="w-4 h-4 text-[#b197fc]" />
              <span>💬 Messenger</span>
            </button>

            {/* Telegram */}
            <button
              type="button"
              onClick={() => shareToTelegram(shareUrl)}
              className="py-2.5 px-3.5 rounded-xl bg-[#132938] hover:bg-[#1a374c] text-[#66d9e8] border border-[#245270] text-xs sm:text-sm font-bengali-body font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm active:scale-95"
            >
              <Send className="w-4 h-4 text-[#3bc9db]" />
              <span>✈️ Telegram</span>
            </button>
          </div>
        </div>

        {/* Copy Link Section */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-xs text-[#a89882] font-bengali-body">
            <span>কার্ডের লিংক কপি করুন:</span>
            {copied && (
              <span className="text-[#81c784] font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                <span>✅ Link Copied!</span>
              </span>
            )}
            {copyError && (
              <span className="text-[#ff808d] text-[11px]">
                Link Copy করা যায়নি। আবার চেষ্টা করুন।
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 bg-[#120e0b] border border-[#3b2d24] focus-within:border-[#d4af37]/60 rounded-xl p-1.5 transition-colors">
            <input
              type="text"
              readOnly
              value={shareUrl}
              onClick={(e) => (e.target as HTMLInputElement).select()}
              className="flex-1 bg-transparent px-2.5 py-1 text-xs text-[#d8cab7] font-mono outline-none truncate"
            />
            <button
              type="button"
              onClick={handleCopyLink}
              className={`py-1.5 px-3.5 rounded-lg text-xs font-bengali-body font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                copied
                  ? 'bg-[#1b5e20] text-[#aef0bc] border border-[#4caf50]/50'
                  : 'bg-[#7a1f26] hover:bg-[#91252d] text-[#f8edd6] border border-[#d4af37]/40 active:scale-95'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>কপি হয়েছে</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#ffd166]" />
                  <span>Copy Link</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Native Web Share Button (if supported) */}
        {canNativeShare() && (
          <div className="pt-2">
            <button
              type="button"
              onClick={handleNativeShare}
              className="w-full py-2.5 px-4 rounded-xl bg-[#241a14] hover:bg-[#31231b] border border-[#d4af37]/40 text-xs sm:text-sm font-bengali-body text-[#ffd166] flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Share2 className="w-4 h-4 text-[#ffd166]" />
              <span>📤 আরও মাধ্যমে শেয়ার করুন (Share Sheet)</span>
            </button>
          </div>
        )}

        {/* Subtle Footer Note */}
        <div className="mt-5 pt-3 border-t border-[#2e221b] text-center text-[11px] text-[#8e7e6c] font-bengali-body">
          <span>এই লিংকের মাধ্যমে যেকোনো ব্রাউজারে আপনার তৈরি কার্ডটি সরাসরি দেখা যাবে।</span>
        </div>
      </div>
    </div>
  );
};
