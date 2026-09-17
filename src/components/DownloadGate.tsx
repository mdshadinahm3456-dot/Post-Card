import React, { useState, useEffect, useRef } from 'react';
import { APP_CONFIG } from '../config/appConfig';
import { ExternalLink, CheckCircle2, Lock, Download, X, AlertCircle } from 'lucide-react';
import { toBengaliNumber } from '../utils/bengaliUtils';

interface DownloadGateProps {
  isOpen: boolean;
  onClose: () => void;
  onDownloadConfirmed: () => void;
  isDownloading?: boolean;
}

export const DownloadGate: React.FC<DownloadGateProps> = ({
  isOpen,
  onClose,
  onDownloadConfirmed,
  isDownloading = false
}) => {
  const [hasClickedSponsor, setHasClickedSponsor] = useState(false);
  const [countdown, setCountdown] = useState<number>(APP_CONFIG.downloadGateSeconds || 8);
  const [isTimerFinished, setIsTimerFinished] = useState(false);
  const [popupBlockedWarning, setPopupBlockedWarning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Every time the modal opens, reset state completely
  useEffect(() => {
    if (isOpen) {
      setHasClickedSponsor(false);
      setCountdown(APP_CONFIG.downloadGateSeconds || 8);
      setIsTimerFinished(false);
      setPopupBlockedWarning(false);
      if (timerRef.current) clearInterval(timerRef.current);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isOpen]);

  const handleSponsorClick = () => {
    setPopupBlockedWarning(false);
    try {
      const openedWindow = window.open(APP_CONFIG.sponsorUrl, '_blank', 'noopener,noreferrer');
      if (!openedWindow || openedWindow.closed || typeof openedWindow.closed === 'undefined') {
        setPopupBlockedWarning(true);
      }
    } catch {
      setPopupBlockedWarning(true);
    }

    setHasClickedSponsor(true);
    setCountdown(APP_CONFIG.downloadGateSeconds || 8);
    setIsTimerFinished(false);

    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          setIsTimerFinished(true);
          // Trigger download automatically once ready
          setTimeout(() => {
            onDownloadConfirmed();
          }, 300);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleFinalDownload = () => {
    if (!isTimerFinished) return;
    onDownloadConfirmed();
  };

  if (!isOpen) return null;

  return (
    <div
      id="download-gate-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isDownloading) onClose();
      }}
    >
      <div
        id="download-gate-modal"
        className="relative w-full max-w-md bg-[#16120f] border border-[#d4af37]/40 rounded-3xl shadow-2xl p-6 md:p-8 text-[#f4eee0] text-center overflow-hidden"
      >
        {/* Vintage Top Corner Ornaments */}
        <div className="absolute top-3 left-3 text-[#d4af37]/40 text-xs select-none">✦</div>
        <div className="absolute top-3 right-3 text-[#d4af37]/40 text-xs select-none">✦</div>
        <div className="absolute bottom-3 left-3 text-[#d4af37]/40 text-xs select-none">✦</div>
        <div className="absolute bottom-3 right-3 text-[#d4af37]/40 text-xs select-none">✦</div>

        {/* Close button */}
        <button
          id="btn-close-download-gate"
          type="button"
          onClick={onClose}
          disabled={isDownloading}
          className="absolute top-4 right-4 p-2 text-[#a89882] hover:text-[#f4eee0] hover:bg-[#251d17] rounded-full transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Badge */}
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#7a1f26]/30 border border-[#d4af37]/40 mb-4 shadow-inner">
          <span className="text-2xl">💌</span>
        </div>

        <h3 className="font-bengali-serif text-2xl font-bold text-[#f7f0df] tracking-wide mb-1">
          আপনার কার্ড তৈরি হচ্ছে...
        </h3>
        <p className="font-vintage-serif text-xs tracking-widest text-[#d4af37] uppercase mb-4 opacity-90">
          SPONSOR VERIFICATION & HD EXPORT
        </p>

        {/* Message box */}
        <div className="bg-[#1e1713] border border-[#3a2c24] rounded-2xl p-4 mb-6 text-sm text-[#e0d4c1] font-bengali-body leading-relaxed">
          <p className="text-sm font-semibold text-[#f7f0df] mb-1">
            আপনার কার্ড তৈরি হচ্ছে... Sponsor দেখুন
          </p>
          <p className="text-xs text-[#a89882]">
            একটি ছোট্ট Sponsor Page ভিজিট করুন, তারপর {toBengaliNumber(8)} সেকেন্ডেই আপনার পছন্দের কার্ডটি হাই-কোয়ালিটিতে ডাউনলোড হবে।
          </p>
        </div>

        {/* Step 1: Sponsor Button */}
        {!hasClickedSponsor ? (
          <div className="space-y-4">
            <button
              id="btn-sponsor-link"
              type="button"
              onClick={handleSponsorClick}
              className="w-full py-4 px-6 rounded-2xl font-bengali-body font-semibold text-[#f8edd6] bg-[#7a1f26] hover:bg-[#91252d] border border-[#d4af37]/50 shadow-xl shadow-[#7a1f26]/30 transition-all transform active:scale-95 flex items-center justify-center gap-2 text-base cursor-pointer"
            >
              <span>Sponsor দেখুন →</span>
              <ExternalLink className="w-4 h-4 text-[#d4af37]" />
            </button>
            <p className="text-xs text-[#9c8b74] italic">
              নতুন ট্যাবে স্পন্সর পেজটি খুলবে এবং এখানে স্বয়ংক্রিয়ভাবে ডাউনলোড আনলক হবে।
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {popupBlockedWarning && (
              <div className="flex items-start gap-2 bg-[#2a1a12] border border-[#b87333]/50 text-[#f0caa0] p-3 rounded-xl text-xs text-left">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#e5a93c]" />
                <span>
                  Sponsor Page খুলতে browser popup permission প্রয়োজন হতে পারে। অনুগ্রহ করে পপআপ এলাও করুন।
                </span>
              </div>
            )}

            {/* Countdown / Status Box with Bengali numerals */}
            {!isTimerFinished ? (
              <div className="bg-[#120d0b] border border-[#d4af37]/30 rounded-2xl py-6 px-4 shadow-inner">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <div className="w-16 h-16 rounded-full border-2 border-[#d4af37] flex items-center justify-center font-bengali-serif text-3xl font-bold text-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.25)] animate-pulse">
                    {toBengaliNumber(countdown)}
                  </div>
                </div>
                <p className="text-sm font-bengali-body text-[#eadecc] font-medium">
                  কার্ড তৈরি হচ্ছে... অনুগ্রহ করে {toBengaliNumber(countdown)} সেকেন্ড অপেক্ষা করুন
                </p>
                <div className="w-full bg-[#2a201a] h-2 rounded-full mt-4 overflow-hidden p-0.5">
                  <div
                    className="bg-gradient-to-r from-[#d4af37] to-[#f3cf7a] h-full transition-all duration-1000 ease-linear rounded-full"
                    style={{
                      width: `${((8 - countdown) / 8) * 100}%`
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className="bg-[#142318] border border-[#4e8d58]/60 rounded-2xl py-4 px-4 text-[#89d698] flex items-center justify-center gap-2 shadow-inner">
                <CheckCircle2 className="w-5 h-5 text-[#4e8d58]" />
                <span className="font-bengali-body font-semibold text-base text-[#aef0bc]">
                  ✅ আপনার HD কার্ড প্রস্তুত!
                </span>
              </div>
            )}

            {/* Download Button */}
            <button
              id="btn-confirm-download-now"
              type="button"
              disabled={!isTimerFinished || isDownloading}
              onClick={handleFinalDownload}
              className={`w-full py-4 px-6 rounded-2xl font-bengali-body font-bold text-base transition-all flex items-center justify-center gap-2 shadow-lg ${
                isTimerFinished
                  ? 'bg-[#1b5e20] hover:bg-[#2e7d32] text-white border border-[#81c784]/60 active:scale-95 cursor-pointer shadow-[#1b5e20]/40'
                  : 'bg-[#261f1a] text-[#857463] border border-[#3b2f27] cursor-not-allowed'
              }`}
            >
              {isDownloading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  <span>কার্ড ডাউনলোড হচ্ছে...</span>
                </>
              ) : isTimerFinished ? (
                <>
                  <Download className="w-5 h-5 text-[#81c784]" />
                  <span>HD কার্ড ডাউনলোড করুন</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-[#756454]" />
                  <span>লক করা আছে ({toBengaliNumber(countdown)} সেকেন্ড)</span>
                </>
              )}
            </button>

            <button
              id="btn-reopen-sponsor"
              type="button"
              onClick={handleSponsorClick}
              className="text-xs text-[#a89882] hover:text-[#d4af37] underline block mx-auto transition-colors cursor-pointer"
            >
              পেজটি খোলেনি? আবার Sponsor দেখুন
            </button>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-[#31251e] flex items-center justify-between text-[11px] text-[#8f7e6b]">
          <span>নিরাপদ ও ভাইরাস মুক্ত</span>
          <span className="text-[#d4af37]/70 font-vintage-serif tracking-wider">
            MAGIC CARD • BANGLADESH
          </span>
        </div>
      </div>
    </div>
  );
};
