import React, { useState, useRef, useEffect } from 'react';
import { PostcardTemplate, CardCustomizationState, Quote, TypographyStyle } from '../types';
import { postcards } from '../data/postcards';
import { quotes } from '../data/quotes';
import { categories, POPULAR_CATEGORIES, cardMatchesCategory, getCategoryById } from '../data/categories';
import { CardPreview } from '../components/CardPreview';
import { TextEditor } from '../components/TextEditor';
import { EffectsPanel } from '../components/EffectsPanel';
import { ExportSizeSelector } from '../components/ExportSizeSelector';
import { QuoteSelector } from '../components/QuoteSelector';
import { DownloadGate } from '../components/DownloadGate';
import { FavoriteButton } from '../components/FavoriteButton';
import { ShareCardModal } from '../components/ShareCardModal';
import { SaveCreationButton } from '../components/SaveCreationButton';
import { addRecentlyUsed } from '../utils/myCreations';
import { parseShareParams } from '../utils/shareCard';
import { exportElementToImage } from '../utils/exportCard';
import { toBengaliNumber, bengaliIncludes } from '../utils/bengaliUtils';
import {
  Download,
  Dices,
  Sparkles,
  Layers,
  Edit3,
  Sliders,
  Check,
  Search,
  AlertTriangle,
  RotateCcw,
  X,
  ChevronDown,
  Share2
} from 'lucide-react';

interface GeneratorProps {
  initialCard?: PostcardTemplate;
  initialQuote?: Quote;
  initialOccasion?: string;
  initialCustomization?: Partial<CardCustomizationState>;
  creationId?: string;
}

const DEFAULT_CUSTOMIZATION: CardCustomizationState = {
  recipient: 'প্রিয়তমা',
  message: '',
  sender: 'ইতি, তোমার...',
  date: '',
  fontFamily: 'bengali-serif',
  fontSize: 22,
  isBold: false,
  isItalic: false,
  textAlign: 'center',
  letterSpacing: 0.5,
  lineHeight: 1.6,
  textColor: '#f7f0df',
  textPosition: 'center',
  effect: 'original',
  showStamp: true,
  borderStyle: 'classic',
  exportRatio: 'postcard',
  exportFormat: 'png'
};

export const Generator: React.FC<GeneratorProps> = ({
  initialCard,
  initialQuote,
  initialOccasion,
  initialCustomization,
  creationId
}) => {
  // Step 1: Selected Occasion state
  const [selectedOccasion, setSelectedOccasion] = useState<string>(() => {
    return initialOccasion || 'all';
  });
  const [showAllOccasionsModal, setShowAllOccasionsModal] = useState(false);

  const [selectedCard, setSelectedCard] = useState<PostcardTemplate>(() => {
    if (initialCard) return initialCard;
    if (initialOccasion && initialOccasion !== 'all') {
      const matched = postcards.find((c) => cardMatchesCategory(c, initialOccasion));
      if (matched) return matched;
    }
    return postcards[0];
  });

  const [customization, setCustomization] = useState<CardCustomizationState>(() => {
    return {
      ...DEFAULT_CUSTOMIZATION,
      message: initialQuote?.text || initialCard?.defaultQuote || postcards[0].defaultQuote,
      typography: initialCard?.typography || 'bengali-serif',
      borderStyle: initialCard?.borderStyle || 'classic',
      ...initialCustomization
    };
  });

  // Track active saved creation ID
  const [activeCreationId, setActiveCreationId] = useState<string | undefined>(creationId);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Active sub-tab in editor controls
  const [activeTab, setActiveTab] = useState<'quotes' | 'text' | 'effects' | 'size'>('quotes');
  const [cardSearchQuery, setCardSearchQuery] = useState('');
  const [isDownloadGateOpen, setIsDownloadGateOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  const previewCardRef = useRef<HTMLDivElement>(null);

  // Parse shareable URL query parameters if present on first mount
  useEffect(() => {
    const shareData = parseShareParams();
    if (shareData) {
      if (shareData.cardId) {
        const found = postcards.find((c) => c.id === shareData.cardId);
        if (found) {
          setSelectedCard(found);
        }
      }
      if (shareData.customization && Object.keys(shareData.customization).length > 0) {
        setCustomization((prev) => ({ ...prev, ...shareData.customization }));
      }
    }
  }, []);

  // Track recently used card whenever active card changes
  useEffect(() => {
    if (selectedCard) {
      addRecentlyUsed(selectedCard);
    }
  }, [selectedCard]);

  // When initialCard changes from props
  useEffect(() => {
    if (initialCard) {
      setSelectedCard(initialCard);
      if (!customization.message) {
        setCustomization((prev) => ({
          ...prev,
          message: initialCard.defaultQuote
        }));
      }
    }
  }, [initialCard]);

  // When initialQuote changes from props
  useEffect(() => {
    if (initialQuote) {
      setCustomization((prev) => ({
        ...prev,
        message: initialQuote.text
      }));
      setActiveTab('text');
    }
  }, [initialQuote]);

  // When initialCustomization changes from props
  useEffect(() => {
    if (initialCustomization) {
      setCustomization((prev) => ({
        ...prev,
        ...initialCustomization
      }));
    }
    if (creationId) {
      setActiveCreationId(creationId);
    }
  }, [initialCustomization, creationId]);

  // Filtered card library thumbnails based on selectedOccasion and search query
  const filteredThumbnails = postcards.filter((c) => {
    const matchesOccasion =
      selectedOccasion === 'all' || cardMatchesCategory(c, selectedOccasion);

    const matchesSearch =
      !cardSearchQuery ||
      bengaliIncludes(c.title, cardSearchQuery) ||
      bengaliIncludes(c.category, cardSearchQuery) ||
      bengaliIncludes(c.defaultQuote, cardSearchQuery) ||
      c.categories?.some((catId) => bengaliIncludes(catId, cardSearchQuery)) ||
      c.keywords?.some((kw) => bengaliIncludes(kw, cardSearchQuery));

    return matchesOccasion && matchesSearch;
  });

  // Handle updates to customization
  const handleCustomizationChange = (updates: Partial<CardCustomizationState>) => {
    setCustomization((prev) => ({ ...prev, ...updates }));
  };

  // Reset text styles
  const handleResetStyle = () => {
    setCustomization((prev) => ({
      ...prev,
      fontFamily: selectedCard.typography || 'bengali-serif',
      fontSize: 22,
      isBold: false,
      isItalic: false,
      textAlign: 'center',
      letterSpacing: 0.5,
      lineHeight: 1.6,
      textColor: '#f7f0df',
      textPosition: selectedCard.textPosition || 'center'
    }));
  };

  // Surprise Me Functionality (আমাকে চমকে দিন)
  const handleSurpriseMe = () => {
    // Pick from cards matching current occasion if selected, else from all
    const availableCards =
      selectedOccasion === 'all'
        ? postcards
        : postcards.filter((c) => cardMatchesCategory(c, selectedOccasion));
    const cardPool = availableCards.length > 0 ? availableCards : postcards;
    const randomCard = cardPool[Math.floor(Math.random() * cardPool.length)];

    const availableQuotes =
      selectedOccasion === 'all'
        ? quotes
        : quotes.filter((q) => cardMatchesCategory({ category: q.category } as any, selectedOccasion));
    const quotePool = availableQuotes.length > 0 ? availableQuotes : quotes;
    const randomQuote = quotePool[Math.floor(Math.random() * quotePool.length)];

    const fontOptions: TypographyStyle[] = [
      'bengali-serif',
      'handwritten',
      'vintage-serif',
      'typewriter',
      'classic',
      'calligraphy'
    ];
    const randomFont = fontOptions[Math.floor(Math.random() * fontOptions.length)];
    const colors = ['#f7f0df', '#e5c05d', '#e8b4b8', '#fffdfa', '#eadecc'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    setSelectedCard(randomCard);
    setCustomization((prev) => ({
      ...prev,
      message: randomQuote.text,
      fontFamily: randomFont,
      textColor: randomColor,
      borderStyle: randomCard.borderStyle,
      effect: (['original', 'sepia', 'old-paper', 'warm-vintage'] as const)[
        Math.floor(Math.random() * 4)
      ]
    }));
  };

  // Trigger Download Gate Modal
  const handleInitiateDownload = () => {
    setErrorMessage(null);
    setIsDownloadGateOpen(true);
  };

  // Final Download Execution after 8-second countdown completes
  const handlePerformFinalDownload = async () => {
    if (!previewCardRef.current) {
      setErrorMessage('দুঃখিত, কার্ড তৈরি করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
      return;
    }

    setIsExporting(true);
    setErrorMessage(null);

    try {
      const sanitizedTitle = selectedCard.title
        .replace(/[^\w\s-]/gi, '')
        .trim()
        .replace(/\s+/g, '-')
        .toLowerCase();

      await exportElementToImage({
        element: previewCardRef.current,
        filename: `magic-card-${sanitizedTitle || 'vintage'}`,
        format: customization.exportFormat,
        scale: 2.5
      });

      setIsDownloadGateOpen(false);
      setSuccessNotice('আপনার HD কার্ডটি সফলভাবে ডাউনলোড হয়েছে!');
      setTimeout(() => setSuccessNotice(null), 5000);
    } catch (error) {
      console.error('Export Error:', error);
      setErrorMessage('দুঃখিত, কার্ড তৈরি করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    } finally {
      setIsExporting(false);
    }
  };

  // Find active occasion label
  const activeOccasionObj = getCategoryById(selectedOccasion);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
      {/* Title & Workflow Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#241a14] border border-[#d4af37]/30 text-xs text-[#d4af37] font-vintage-serif tracking-widest uppercase">
          <span>💌 MAGIC CARD GENERATOR</span>
        </div>
        <h1 className="font-bengali-serif text-2xl sm:text-4xl font-bold text-[#f7f0df]">
          Magic Card Generator
        </h1>
        <p className="font-bengali-body text-xs sm:text-sm text-[#b8a791]">
          পছন্দের Vintage Card নির্বাচন করুন, বাংলা প্রেমের উক্তি বা নিজের লেখা যোগ করুন, সাজিয়ে নিন এবং HD Card Download করুন।
        </p>

        {/* 7-Step Workflow breadcrumbs */}
        <div className="flex items-center justify-center gap-1 sm:gap-2 flex-wrap pt-2 text-[11px] sm:text-xs font-bengali-body text-[#a89882]">
          <span className="px-2.5 py-1 rounded-lg bg-[#241a14] text-[#ffd166] border border-[#3b2c22]">
            ১. উপলক্ষ নির্বাচন
          </span>
          <span>→</span>
          <span className="px-2.5 py-1 rounded-lg bg-[#241a14] text-[#ffd166] border border-[#3b2c22]">
            ২. কার্ড নির্বাচন
          </span>
          <span>→</span>
          <span className="px-2.5 py-1 rounded-lg bg-[#241a14] text-[#ffd166] border border-[#3b2c22]">
            ৩. উক্তি নির্বাচন
          </span>
          <span>→</span>
          <span className="px-2.5 py-1 rounded-lg bg-[#241a14] text-[#ffd166] border border-[#3b2c22]">
            ৪. নিজের লেখা
          </span>
          <span>→</span>
          <span className="px-2.5 py-1 rounded-lg bg-[#241a14] text-[#ffd166] border border-[#3b2c22]">
            ৫. সাজিয়ে নিন
          </span>
          <span>→</span>
          <span className="px-2.5 py-1 rounded-lg bg-[#241a14] text-[#ffd166] border border-[#3b2c22]">
            ৬. প্রিভিউ
          </span>
          <span>→</span>
          <span className="px-2.5 py-1 rounded-lg bg-[#7a1f26] text-[#f8edd6] border border-[#d4af37]/40 font-semibold">
            ৭. ডাউনলোড
          </span>
        </div>
      </div>

      {/* Success / Error Alerts */}
      {errorMessage && (
        <div className="bg-[#381216] border border-[#c93b48] text-[#ffccd1] p-4 rounded-xl text-sm font-bengali-body flex items-center gap-2 max-w-2xl mx-auto shadow-lg">
          <AlertTriangle className="w-5 h-5 flex-shrink-0 text-[#ff808d]" />
          <span>{errorMessage}</span>
        </div>
      )}

      {successNotice && (
        <div className="bg-[#122e18] border border-[#4e8d58] text-[#b4f2c3] p-4 rounded-xl text-sm font-bengali-body flex items-center gap-2 max-w-2xl mx-auto shadow-lg">
          <Check className="w-5 h-5 flex-shrink-0 text-[#81c784]" />
          <span>{successNotice}</span>
        </div>
      )}

      {/* STEP 1: Occasion Selector (ঐচ্ছিক উপলক্ষ নির্বাচন) */}
      <div className="bg-[#181310] border border-[#d4af37]/25 rounded-2xl p-4 sm:p-5 shadow-xl space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#2e231c] pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#ffd166]" />
            <h3 className="font-bengali-serif text-base sm:text-lg font-bold text-[#f7f0df]">
              ১. উপলক্ষ নির্বাচন করুন
            </h3>
            <span className="text-[11px] text-[#a89882] font-bengali-body">(ঐচ্ছিক / Optional)</span>
          </div>

          <div className="flex items-center gap-2">
            {selectedOccasion !== 'all' && (
              <button
                type="button"
                onClick={() => setSelectedOccasion('all')}
                className="text-xs text-[#ffd166] hover:underline flex items-center gap-1 font-bengali-body cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>সব কার্ড দেখুন</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => setShowAllOccasionsModal(!showAllOccasionsModal)}
              className="text-xs px-2.5 py-1 rounded-lg bg-[#241a14] border border-[#3a2c22] text-[#c8baa7] hover:text-[#f7f0df] flex items-center gap-1 font-bengali-body cursor-pointer transition-colors"
            >
              <span>সকল ক্যাটাগরি</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Popular Occasion Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            type="button"
            onClick={() => setSelectedOccasion('all')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bengali-body whitespace-nowrap transition-all cursor-pointer ${
              selectedOccasion === 'all'
                ? 'bg-[#7a1f26] text-[#f8edd6] border border-[#d4af37] shadow-sm font-semibold'
                : 'bg-[#120e0b] text-[#a89882] border border-[#2e231c] hover:text-[#f7f0df]'
            }`}
          >
            ✨ সব কার্ড দেখুন
          </button>

          {POPULAR_CATEGORIES.map((cat) => {
            const isSelected = selectedOccasion === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setSelectedOccasion(cat.id);
                  // If current card doesn't match this occasion, pick the first matching card
                  const matching = postcards.find((c) => cardMatchesCategory(c, cat.id));
                  if (matching) setSelectedCard(matching);
                }}
                className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-bengali-body whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#7a1f26] text-[#f8edd6] border border-[#d4af37] shadow-sm font-semibold'
                    : 'bg-[#120e0b] text-[#a89882] border border-[#2e231c] hover:text-[#f7f0df] hover:border-[#d4af37]/30'
                }`}
              >
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Dropdown for All Categories if clicked */}
        {showAllOccasionsModal && (
          <div className="pt-3 border-t border-[#2e231c] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-48 overflow-y-auto pr-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setSelectedOccasion(cat.id);
                  setShowAllOccasionsModal(false);
                  const matching = postcards.find((c) => cardMatchesCategory(c, cat.id));
                  if (matching) setSelectedCard(matching);
                }}
                className={`p-2 rounded-lg text-left text-xs font-bengali-body border transition-colors flex items-center gap-1.5 cursor-pointer ${
                  selectedOccasion === cat.id
                    ? 'bg-[#7a1f26] border-[#d4af37] text-[#f8edd6] font-semibold'
                    : 'bg-[#120e0b] border-[#2e231c] text-[#a89882] hover:text-[#f7f0df]'
                }`}
              >
                <span>{cat.icon}</span>
                <span className="truncate">{cat.name.replace(/[^\u0980-\u09FF\s]/g, '').trim()}</span>
              </button>
            ))}
          </div>
        )}

        {/* Active Occasion Banner indicator */}
        {selectedOccasion !== 'all' && activeOccasionObj && (
          <div className="bg-[#241a14] border border-[#d4af37]/30 px-3 py-2 rounded-xl flex items-center justify-between text-xs font-bengali-body text-[#ffd166]">
            <div className="flex items-center gap-1.5">
              <span>উপলক্ষ: <strong>{activeOccasionObj.name}</strong></span>
              <span className="text-[#a89882]">— {activeOccasionObj.description}</span>
            </div>
            <span className="text-[#a89882]">
              ({toBengaliNumber(filteredThumbnails.length)}টি কার্ড উপলভ্য)
            </span>
          </div>
        )}
      </div>

      {/* Main Two-Column Layout: Left (Live Preview) & Right (Interactive Studio) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT: Live Realistic Card Preview (Step 6) */}
        <div className="lg:col-span-6 xl:col-span-7 lg:sticky lg:top-22 space-y-4">
          <div className="bg-[#181310] border border-[#d4af37]/30 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-4">
            {/* Top Preview Bar */}
            <div className="flex items-center justify-between border-b border-[#2e231c] pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#d4af37] animate-pulse" />
                <h2 className="font-bengali-serif text-base sm:text-lg font-bold text-[#f7f0df]">
                  ৬. লাইভ কার্ড প্রিভিউ (Live Card Preview)
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <FavoriteButton id={selectedCard.id} type="cards" size="sm" />
                <button
                  type="button"
                  onClick={handleSurpriseMe}
                  className="px-2.5 py-1 rounded-lg bg-[#241a14] hover:bg-[#33241b] border border-[#3b2d24] text-[#ffd166] text-xs font-bengali-body flex items-center gap-1 cursor-pointer transition-colors"
                  title="Randomize Card & Quote"
                >
                  <Dices className="w-3.5 h-3.5" />
                  <span>🎲 আমাকে চমকে দিন</span>
                </button>
              </div>
            </div>

            {/* The Actual Exportable Card Preview */}
            <div className="relative overflow-hidden flex items-center justify-center min-h-[300px] sm:min-h-[400px]">
              <CardPreview
                ref={previewCardRef}
                card={selectedCard}
                customization={customization}
                isExporting={isExporting}
              />
            </div>

            {/* Preview Bottom Info & Actions: Save, Share, and HD Download (Step 7) */}
            <div className="pt-2 border-t border-[#2e231c] flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-[#a89882] font-bengali-body text-center sm:text-left">
                <span>নির্বাচিত টেমপ্লেট: </span>
                <strong className="text-[#ffd166]">{selectedCard.title}</strong>
                <span className="mx-1">•</span>
                <span>{customization.exportFormat.toUpperCase()} ({customization.exportRatio})</span>
              </div>

              {/* Action Buttons: Save, Share, Download */}
              <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap sm:flex-nowrap justify-center sm:justify-end">
                <SaveCreationButton
                  card={selectedCard}
                  customization={customization}
                  quoteId={initialQuote?.id}
                  existingId={activeCreationId}
                  onSaved={(saved) => {
                    setActiveCreationId(saved.id);
                    setSuccessNotice('কার্ডটি আপনার তৈরিকৃত তালিকায় সফলভাবে সংরক্ষণ হয়েছে!');
                    setTimeout(() => setSuccessNotice(null), 4000);
                  }}
                />

                <button
                  id="btn-trigger-share-modal"
                  type="button"
                  onClick={() => setIsShareModalOpen(true)}
                  className="px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-[#241a14] hover:bg-[#34241b] text-[#ffd166] border border-[#3b2d24] hover:border-[#d4af37]/40 font-bengali-body font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95 shadow-sm"
                  title="কার্ডটি বন্ধুদের সাথে শেয়ার করুন"
                >
                  <Share2 className="w-4 h-4 text-[#ffd166]" />
                  <span>🔗 Share Card</span>
                </button>

                {/* Step 7: Main Download Button */}
                <button
                  id="btn-main-trigger-download"
                  type="button"
                  onClick={handleInitiateDownload}
                  className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-[#7a1f26] hover:bg-[#96252f] text-[#f8edd6] border border-[#d4af37]/50 font-bengali-body font-bold text-xs sm:text-base shadow-xl shadow-[#7a1f26]/30 flex items-center justify-center gap-2 transition-all transform active:scale-95 cursor-pointer"
                >
                  <Download className="w-4 sm:w-5 h-4 sm:h-5 text-[#ffd166]" />
                  <span>HD কার্ড ডাউনলোড করুন</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Multi-Step Controls Studio */}
        <div className="lg:col-span-6 xl:col-span-5 space-y-6">
          {/* STEP 2: Card Selection Carousel / Grid */}
          <div className="bg-[#181310] border border-[#d4af37]/25 rounded-2xl p-4 sm:p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="font-bengali-serif text-lg font-bold text-[#f7f0df] flex items-center gap-2">
                <span>২. কার্ড নির্বাচন করুন</span>
              </h3>
              <span className="text-xs text-[#d4af37] font-bengali-body">
                {toBengaliNumber(filteredThumbnails.length)}টি কার্ড
              </span>
            </div>

            {/* Quick Card Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#a89882] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={cardSearchQuery}
                onChange={(e) => setCardSearchQuery(e.target.value)}
                placeholder="কার্ড বা উক্তি খুঁজুন..."
                className="w-full bg-[#120e0b] border border-[#33261e] rounded-xl pl-9 pr-3 py-2 text-xs text-[#f7f0df] focus:border-[#d4af37] focus:outline-none placeholder-[#7a6b5a]"
              />
            </div>

            {/* Horizontal Thumbnails Carousel */}
            <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none">
              {filteredThumbnails.length > 0 ? (
                filteredThumbnails.map((card) => {
                  const isSelected = selectedCard.id === card.id;

                  return (
                    <button
                      key={card.id}
                      type="button"
                      onClick={() => {
                        setSelectedCard(card);
                        if (!customization.message) {
                          setCustomization((prev) => ({
                            ...prev,
                            message: card.defaultQuote
                          }));
                        }
                      }}
                      className={`relative flex-shrink-0 w-26 h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#d4af37] scale-105 shadow-md shadow-[#d4af37]/30 ring-1 ring-[#d4af37]'
                          : 'border-[#2d221a] opacity-80 hover:opacity-100 hover:border-[#d4af37]/40'
                      }`}
                    >
                      <img
                        src={card.image}
                        alt={card.alt || `${card.title} - Vintage Love Postcard`}
                        width={104}
                        height={80}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex items-end p-1">
                        <span className="text-[9px] font-bengali-serif text-[#f4eee0] truncate w-full">
                          {card.title}
                        </span>
                      </div>
                      {isSelected && (
                        <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#d4af37] text-black flex items-center justify-center text-[10px] font-bold">
                          ✓
                        </div>
                      )}
                    </button>
                  );
                })
              ) : (
                <div className="w-full py-6 text-center text-xs text-[#8e7e6c] font-bengali-body">
                  এই উপলক্ষে কোনো কার্ড পাওয়া যায়নি।{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedOccasion('all');
                      setCardSearchQuery('');
                    }}
                    className="text-[#ffd166] underline ml-1 cursor-pointer"
                  >
                    সব কার্ড দেখুন
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Sub-Tabs for Customization: 3. Quotes, 4. Text, 5. Effects, Size */}
          <div className="flex items-center gap-1.5 p-1.5 bg-[#140f0c] border border-[#2e231b] rounded-2xl overflow-x-auto scrollbar-none">
            <button
              type="button"
              onClick={() => setActiveTab('quotes')}
              className={`flex-1 min-w-[90px] py-2.5 px-3 rounded-xl text-xs font-bengali-body font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'quotes'
                  ? 'bg-[#7a1f26] text-[#f8edd6] border border-[#d4af37]/40 shadow-sm'
                  : 'text-[#a89882] hover:text-[#f4eee0] hover:bg-[#1f1712]'
              }`}
            >
              <span>৩. উক্তি</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('text')}
              className={`flex-1 min-w-[95px] py-2.5 px-3 rounded-xl text-xs font-bengali-body font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'text'
                  ? 'bg-[#7a1f26] text-[#f8edd6] border border-[#d4af37]/40 shadow-sm'
                  : 'text-[#a89882] hover:text-[#f4eee0] hover:bg-[#1f1712]'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>৪. নিজের লেখা</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('effects')}
              className={`flex-1 min-w-[95px] py-2.5 px-3 rounded-xl text-xs font-bengali-body font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'effects'
                  ? 'bg-[#7a1f26] text-[#f8edd6] border border-[#d4af37]/40 shadow-sm'
                  : 'text-[#a89882] hover:text-[#f4eee0] hover:bg-[#1f1712]'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>৫. সাজিয়ে নিন</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('size')}
              className={`flex-1 min-w-[85px] py-2.5 px-3 rounded-xl text-xs font-bengali-body font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'size'
                  ? 'bg-[#7a1f26] text-[#f8edd6] border border-[#d4af37]/40 shadow-sm'
                  : 'text-[#a89882] hover:text-[#f4eee0] hover:bg-[#1f1712]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>সাইজ</span>
            </button>
          </div>

          {/* Active Tab Panel Content */}
          <div className="transition-all duration-300">
            {activeTab === 'quotes' && (
              <QuoteSelector
                currentQuoteText={customization.message}
                selectedOccasion={selectedOccasion}
                onSelectQuote={(quote) => {
                  handleCustomizationChange({ message: quote.text });
                }}
                onSurpriseMe={handleSurpriseMe}
              />
            )}

            {activeTab === 'text' && (
              <TextEditor
                customization={customization}
                onChange={handleCustomizationChange}
                onReset={handleResetStyle}
              />
            )}

            {activeTab === 'effects' && (
              <EffectsPanel
                currentEffect={customization.effect}
                onEffectChange={(effect) => handleCustomizationChange({ effect })}
                borderStyle={customization.borderStyle}
                onBorderStyleChange={(borderStyle) => handleCustomizationChange({ borderStyle })}
                showStamp={customization.showStamp}
                onToggleStamp={(showStamp) => handleCustomizationChange({ showStamp })}
              />
            )}

            {activeTab === 'size' && (
              <ExportSizeSelector
                currentRatio={customization.exportRatio}
                onRatioChange={(exportRatio) => handleCustomizationChange({ exportRatio })}
                currentFormat={customization.exportFormat}
                onFormatChange={(exportFormat) => handleCustomizationChange({ exportFormat })}
              />
            )}
          </div>
        </div>
      </div>

      {/* Download Ad Gate Modal */}
      <DownloadGate
        isOpen={isDownloadGateOpen}
        onClose={() => setIsDownloadGateOpen(false)}
        onDownloadConfirmed={handlePerformFinalDownload}
        isDownloading={isExporting}
      />

      {/* Share Card Modal */}
      <ShareCardModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        card={selectedCard}
        customization={customization}
        quoteId={initialQuote?.id}
      />

      {/* Mobile Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 lg:hidden p-2.5 bg-[#120e0b]/95 backdrop-blur-md border-t border-[#d4af37]/30 shadow-2xl flex items-center gap-2">
        <SaveCreationButton
          card={selectedCard}
          customization={customization}
          quoteId={initialQuote?.id}
          existingId={activeCreationId}
          variant="compact"
          onSaved={(saved) => {
            setActiveCreationId(saved.id);
            setSuccessNotice('কার্ডটি সংরক্ষণ হয়েছে!');
            setTimeout(() => setSuccessNotice(null), 3000);
          }}
        />

        <button
          id="btn-mobile-sticky-share"
          type="button"
          onClick={() => setIsShareModalOpen(true)}
          className="p-2.5 rounded-xl bg-[#241a14] text-[#ffd166] border border-[#3b2d24] flex items-center justify-center cursor-pointer active:scale-95"
          title="Share Card"
        >
          <Share2 className="w-4 h-4 text-[#ffd166]" />
        </button>

        <button
          id="btn-mobile-sticky-download"
          type="button"
          onClick={handleInitiateDownload}
          className="flex-1 py-3 px-3 rounded-xl bg-[#7a1f26] text-[#f8edd6] border border-[#d4af37]/50 font-bengali-body font-bold text-sm shadow-lg flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer truncate"
        >
          <Download className="w-4 h-4 text-[#ffd166] flex-shrink-0" />
          <span>HD ডাউনলোড</span>
        </button>
      </div>
    </div>
  );
};
