import React, { useState } from 'react';
import { gallery } from '../data/gallery';
import { GalleryItem, PostcardTemplate } from '../types';
import { FavoriteButton } from '../components/FavoriteButton';
import { DownloadGate } from '../components/DownloadGate';
import { exportElementToImage } from '../utils/exportCard';
import { Download, Sparkles, Image as ImageIcon, Eye } from 'lucide-react';

interface VintageGalleryProps {
  onCustomizeItem: (galleryItem: GalleryItem) => void;
}

export const VintageGallery: React.FC<VintageGalleryProps> = ({ onCustomizeItem }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [selectedItemForDownload, setSelectedItemForDownload] = useState<GalleryItem | null>(null);
  const [isDownloadGateOpen, setIsDownloadGateOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const filters = [
    { id: 'All', label: 'সকল আর্ট' },
    { id: 'রোমান্টিক', label: '❤️ Romantic' },
    { id: 'বৃষ্টি ও মেঘ', label: '🌧️ Rainy' },
    { id: 'চিঠি ও স্মৃতি', label: '💌 Vintage Letter' },
    { id: 'দূরত্ব ও বিরহ', label: '🥀 Distance' },
    { id: 'চিরন্তন প্রেম', label: '✨ Eternal' }
  ];

  const filteredItems = gallery.filter((item) => {
    if (selectedFilter === 'All') return true;
    return (
      item.category.toLowerCase().includes(selectedFilter.toLowerCase()) ||
      selectedFilter.toLowerCase().includes(item.category.toLowerCase())
    );
  });

  const handleOpenDownload = (item: GalleryItem) => {
    setSelectedItemForDownload(item);
    setIsDownloadGateOpen(true);
  };

  const handlePerformDownload = async () => {
    if (!selectedItemForDownload) return;

    setIsExporting(true);
    try {
      // Find the specific card element to export or download direct image
      const targetElement = document.getElementById(`gallery-card-art-${selectedItemForDownload.id}`);
      if (targetElement) {
        await exportElementToImage({
          element: targetElement,
          filename: `magic-card-gallery-${selectedItemForDownload.id}`,
          format: 'png',
          scale: 2.5
        });
      } else {
        // Fallback direct image trigger
        const link = document.createElement('a');
        link.href = selectedItemForDownload.image;
        link.download = `magic-card-gallery-${selectedItemForDownload.id}.png`;
        link.click();
      }
      setIsDownloadGateOpen(false);
    } catch (err) {
      console.error('Gallery Download Error', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#241a14] border border-[#d4af37]/30 text-xs text-[#d4af37] font-vintage-serif tracking-widest uppercase">
          <ImageIcon className="w-3.5 h-3.5" />
          <span>CURATED VINTAGE ARTWORKS</span>
        </div>
        <h1 className="font-bengali-serif text-3xl sm:text-4xl font-bold text-[#f7f0df]">
          🖼️ Vintage Love Gallery
        </h1>
        <p className="font-bengali-body text-sm sm:text-base text-[#b8a791] leading-relaxed">
          বিশেষভাবে নির্বাচিত ক্লাসিক উক্তি ও নস্টালজিক ভিন্টেজ আর্টওয়ার্ক। এক ক্লিকে ডাউনলোড করুন
          অথবা আপনার মনমতো কাস্টমাইজ করে নিন।
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setSelectedFilter(f.id)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bengali-body whitespace-nowrap transition-all duration-200 cursor-pointer ${
              selectedFilter === f.id
                ? 'bg-[#7a1f26] text-[#f8edd6] border border-[#d4af37] shadow-md font-semibold'
                : 'bg-[#181310] text-[#a89882] border border-[#31251e] hover:text-[#f4eee0] hover:border-[#d4af37]/40'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="group bg-[#16110e] border border-[#2e231c] hover:border-[#d4af37]/50 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
          >
            {/* Image Art Area */}
            <div
              id={`gallery-card-art-${item.id}`}
              className="relative aspect-[4/3] w-full overflow-hidden bg-[#1f1712]"
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

              {/* Category Pill */}
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded-full text-[11px] font-bengali-body font-medium bg-black/60 backdrop-blur-md text-[#d4af37] border border-[#d4af37]/30">
                  {item.category}
                </span>
              </div>

              {/* Favorite Button */}
              <div className="absolute top-3 right-3 z-10">
                <FavoriteButton id={item.id} type="gallery" size="sm" />
              </div>

              {/* Quote Overlay at Bottom of Art */}
              <div className="absolute bottom-3 left-3 right-3 text-center pointer-events-none">
                <p className="font-bengali-serif text-sm text-[#f7f0df] drop-shadow-md line-clamp-2">
                  “{item.quoteBengali || item.quote || item.quoteEnglish}”
                </p>
              </div>
            </div>

            {/* Info and Actions */}
            <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="font-bengali-serif text-base font-bold text-[#f7f0df] group-hover:text-[#ffd166] transition-colors">
                  {item.title}
                </h4>
                {(item.author || item.quoteEnglish) && (
                  <p className="font-bengali-body text-xs text-[#a89882] mt-0.5 truncate">
                    — {item.author || item.quoteEnglish}
                  </p>
                )}
              </div>

              {/* Action Buttons: Direct Download & Customize */}
              <div className="pt-3 border-t border-[#261d17] grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleOpenDownload(item)}
                  className="w-full py-2 px-2.5 rounded-xl bg-[#241a14] hover:bg-[#31231a] text-[#f7f0df] border border-[#3d2f25] hover:border-[#d4af37]/40 text-xs font-bengali-body font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>ডাউনলোড</span>
                </button>

                <button
                  type="button"
                  onClick={() => onCustomizeItem(item)}
                  className="w-full py-2 px-2.5 rounded-xl bg-[#7a1f26] hover:bg-[#91252d] text-[#f8edd6] border border-[#d4af37]/40 text-xs font-bengali-body font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-95 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#ffd166]" />
                  <span>Customize</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Download Ad Gate Modal */}
      <DownloadGate
        isOpen={isDownloadGateOpen}
        onClose={() => setIsDownloadGateOpen(false)}
        onDownloadConfirmed={handlePerformDownload}
        isDownloading={isExporting}
      />
    </div>
  );
};
