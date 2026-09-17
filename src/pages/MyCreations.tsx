import React, { useState, useEffect, useRef } from 'react';
import { SavedCreation, PostcardTemplate } from '../types';
import { getMyCreations, deleteCreation } from '../utils/myCreations';
import { postcards } from '../data/postcards';
import { CreationCard } from '../components/CreationCard';
import { ShareCardModal } from '../components/ShareCardModal';
import { DownloadGate } from '../components/DownloadGate';
import { RecentlyUsed } from '../components/RecentlyUsed';
import { exportElementToImage } from '../utils/exportCard';
import { toBengaliNumber, bengaliIncludes } from '../utils/bengaliUtils';
import {
  Bookmark,
  Sparkles,
  Search,
  Trash2,
  AlertTriangle,
  Check,
  X,
  PlusCircle,
  HelpCircle
} from 'lucide-react';

interface MyCreationsProps {
  onEditCreation: (creation: SavedCreation) => void;
  onNavigateToGenerator: () => void;
  onSelectRecentlyUsedCard?: (card: PostcardTemplate) => void;
}

export const MyCreations: React.FC<MyCreationsProps> = ({
  onEditCreation,
  onNavigateToGenerator,
  onSelectRecentlyUsedCard
}) => {
  const [creations, setCreations] = useState<SavedCreation[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeShareCreation, setActiveShareCreation] = useState<SavedCreation | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Delete modal state
  const [creationToDelete, setCreationToDelete] = useState<SavedCreation | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  // Download gate state
  const [isDownloadGateOpen, setIsDownloadGateOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [downloadTargetElement, setDownloadTargetElement] = useState<HTMLElement | null>(null);
  const [downloadingCreation, setDownloadingCreation] = useState<SavedCreation | null>(null);

  const loadCreations = () => {
    setCreations(getMyCreations());
  };

  useEffect(() => {
    loadCreations();
    window.addEventListener('magic_card_creations_updated', loadCreations);
    return () => {
      window.removeEventListener('magic_card_creations_updated', loadCreations);
    };
  }, []);

  // Filter creations
  const filteredCreations = creations.filter((c) => {
    if (!searchQuery.trim()) return true;
    return (
      bengaliIncludes(c.title || '', searchQuery) ||
      bengaliIncludes(c.customization.message || '', searchQuery) ||
      bengaliIncludes(c.customization.recipient || '', searchQuery) ||
      bengaliIncludes(c.customization.sender || '', searchQuery)
    );
  });

  // Handle Share
  const handleShareClick = (creation: SavedCreation) => {
    setActiveShareCreation(creation);
    setIsShareModalOpen(true);
  };

  // Handle Download from card
  const handleDownloadClick = (creation: SavedCreation, element: HTMLElement) => {
    setDownloadingCreation(creation);
    setDownloadTargetElement(element);
    setIsDownloadGateOpen(true);
  };

  // Final download execution
  const handlePerformFinalDownload = async () => {
    if (!downloadTargetElement || !downloadingCreation) return;

    setIsExporting(true);
    try {
      await exportElementToImage({
        element: downloadTargetElement,
        filename: `magic-card-${downloadingCreation.title || 'creation'}`,
        format: downloadingCreation.customization.exportFormat || 'png',
        scale: 2.5
      });

      setIsDownloadGateOpen(false);
      setNotification('আপনার HD কার্ডটি সফলভাবে ডাউনলোড হয়েছে!');
      setTimeout(() => setNotification(null), 4000);
    } catch (err) {
      console.error('Download error:', err);
      setNotification('কার্ডটি ডাউনলোড করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
      setTimeout(() => setNotification(null), 4000);
    } finally {
      setIsExporting(false);
    }
  };

  // Handle Delete Confirmation
  const handleConfirmDelete = () => {
    if (!creationToDelete) return;

    const success = deleteCreation(creationToDelete.id);
    if (success) {
      setNotification('✅ কার্ডটি মুছে ফেলা হয়েছে।');
      setTimeout(() => setNotification(null), 3000);
    }
    setCreationToDelete(null);
  };

  const getMatchedPostcard = (cardId: string): PostcardTemplate => {
    return (
      postcards.find((c) => c.id === cardId) || {
        id: cardId,
        title: 'Magic Card',
        category: 'রোমান্টিক',
        image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=80',
        defaultQuote: '',
        textPosition: 'center',
        typography: 'bengali-serif',
        borderStyle: 'classic'
      }
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#241a14] border border-[#d4af37]/30 text-xs text-[#d4af37] font-vintage-serif tracking-widest uppercase">
          <span>💾 MY CREATIONS WORKSPACE</span>
        </div>
        <h1 className="font-bengali-serif text-3xl sm:text-4xl font-bold text-[#f7f0df]">
          আমার তৈরি কার্ড
        </h1>
        <p className="font-bengali-body text-sm sm:text-base text-[#b8a791]">
          আপনার তৈরি করা Magic Card-গুলো এখানে সংরক্ষিত থাকবে। আপনি যেকোনো সময় এডিট, ডাউনলোড ও শেয়ার করতে পারবেন।
        </p>

        <div className="pt-2 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={onNavigateToGenerator}
            className="px-5 py-2.5 rounded-xl bg-[#7a1f26] hover:bg-[#91252d] text-[#f8edd6] border border-[#d4af37]/50 font-bengali-body font-semibold text-sm shadow-md shadow-[#7a1f26]/30 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-[#ffd166]" />
            <span>✨ নতুন কার্ড তৈরি করুন</span>
          </button>
        </div>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className="bg-[#18311d] border border-[#4e8d58] text-[#baf2c7] p-3.5 rounded-xl text-sm font-bengali-body flex items-center justify-center gap-2 max-w-md mx-auto shadow-lg animate-fade-in">
          <Check className="w-4 h-4 text-[#81c784]" />
          <span>{notification}</span>
        </div>
      )}

      {/* Search & Filter Bar */}
      {creations.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#181310] border border-[#2e221b] p-3 sm:p-4 rounded-2xl shadow-md">
          <div className="text-xs sm:text-sm font-bengali-body text-[#c8baa7]">
            মোট সংরক্ষিত কার্ড:{' '}
            <strong className="text-[#ffd166]">{toBengaliNumber(creations.length)}</strong>টি
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-[#a89882] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="সংরক্ষিত কার্ড বা উক্তি খুঁজুন..."
              className="w-full bg-[#120e0b] border border-[#3b2d24] rounded-xl pl-9 pr-8 py-2 text-xs sm:text-sm text-[#f7f0df] focus:border-[#d4af37] focus:outline-none placeholder-[#7a6b5a]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#a89882] hover:text-[#f7f0df]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Creations Grid */}
      {filteredCreations.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCreations.map((creation) => (
            <CreationCard
              key={creation.id}
              creation={creation}
              onEdit={onEditCreation}
              onDownload={handleDownloadClick}
              onShare={handleShareClick}
              onDeleteRequest={(item) => setCreationToDelete(item)}
            />
          ))}
        </div>
      ) : creations.length > 0 ? (
        /* No search results */
        <div className="bg-[#181310] border border-[#2e221b] rounded-2xl p-10 text-center space-y-3">
          <p className="font-bengali-body text-sm text-[#a89882]">
            "{searchQuery}" এর সাথে মিলে এমন কোনো সংরক্ষিত কার্ড পাওয়া যায়নি।
          </p>
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="text-xs text-[#ffd166] underline cursor-pointer"
          >
            সব সংরক্ষিত কার্ড দেখুন
          </button>
        </div>
      ) : (
        /* Empty State */
        <div className="bg-[#181310] border border-[#d4af37]/25 rounded-3xl p-8 sm:p-14 text-center max-w-2xl mx-auto shadow-2xl space-y-4">
          <div className="w-18 h-18 mx-auto rounded-full bg-[#7a1f26]/20 border border-[#d4af37]/40 flex items-center justify-center text-3xl shadow-inner">
            💌
          </div>
          <h3 className="font-bengali-serif text-2xl font-bold text-[#f7f0df]">
            এখনো কোনো কার্ড সংরক্ষণ করা হয়নি
          </h3>
          <p className="font-bengali-body text-sm text-[#a89882] max-w-md mx-auto leading-relaxed">
            আপনার পছন্দের পোস্টকার্ড নির্বাচন করে মনের মতো উক্তি ও ভিন্টেজ ইফেক্ট দিয়ে সাজিয়ে এখানে সেভ করে রাখুন।
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={onNavigateToGenerator}
              className="px-6 py-3 rounded-xl bg-[#7a1f26] hover:bg-[#91252d] text-[#f8edd6] border border-[#d4af37]/50 font-bengali-body font-bold text-sm shadow-xl shadow-[#7a1f26]/30 transition-all flex items-center justify-center gap-2 mx-auto active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#ffd166]" />
              <span>✨ প্রথম কার্ডটি তৈরি করুন</span>
            </button>
          </div>
        </div>
      )}

      {/* Recently Used Section */}
      <div className="pt-4">
        <RecentlyUsed
          onSelectCard={(card) => {
            if (onSelectRecentlyUsedCard) {
              onSelectRecentlyUsedCard(card);
            } else {
              onNavigateToGenerator();
            }
          }}
        />
      </div>

      {/* Delete Confirmation Modal */}
      {creationToDelete && (
        <div
          id="delete-confirmation-backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
        >
          <div className="relative w-full max-w-sm bg-[#16120f] border border-[#d4af37]/40 rounded-3xl p-6 text-center shadow-2xl space-y-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#3d1a1d] border border-[#c93b48]/50 flex items-center justify-center text-xl text-[#ff808d]">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h3 className="font-bengali-serif text-xl font-bold text-[#f7f0df]">
                কার্ডটি মুছে ফেলবেন?
              </h3>
              <p className="font-bengali-body text-xs text-[#a89882]">
                এই সংরক্ষিত কার্ডটি আপনার তালিকা থেকে স্থায়ীভাবে মুছে যাবে।
              </p>
            </div>

            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setCreationToDelete(null)}
                className="flex-1 py-2.5 px-4 rounded-xl bg-[#241a14] hover:bg-[#31231b] border border-[#3b2c22] text-xs font-bengali-body font-semibold text-[#c8baa7] transition-colors cursor-pointer"
              >
                বাতিল করুন
              </button>

              <button
                type="button"
                onClick={handleConfirmDelete}
                className="flex-1 py-2.5 px-4 rounded-xl bg-[#8c1d24] hover:bg-[#a6222b] border border-[#ff808d]/40 text-xs font-bengali-body font-bold text-white transition-all shadow-md active:scale-95 cursor-pointer"
              >
                হ্যাঁ, মুছে দিন
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {activeShareCreation && (
        <ShareCardModal
          isOpen={isShareModalOpen}
          onClose={() => {
            setIsShareModalOpen(false);
            setActiveShareCreation(null);
          }}
          card={getMatchedPostcard(activeShareCreation.cardId)}
          customization={activeShareCreation.customization}
          quoteId={activeShareCreation.quoteId}
        />
      )}

      {/* Download Gate Modal */}
      <DownloadGate
        isOpen={isDownloadGateOpen}
        onClose={() => {
          setIsDownloadGateOpen(false);
          setDownloadingCreation(null);
          setDownloadTargetElement(null);
        }}
        onDownloadConfirmed={handlePerformFinalDownload}
        isDownloading={isExporting}
      />
    </div>
  );
};
