import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { isItemFavorited, toggleFavoriteItem } from '../utils/favorites';

interface FavoriteButtonProps {
  id: string;
  type: 'cards' | 'quotes' | 'gallery';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  id,
  type,
  className = '',
  size = 'md'
}) => {
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    setIsFav(isItemFavorited(type, id));

    const handleUpdate = () => {
      setIsFav(isItemFavorited(type, id));
    };

    window.addEventListener('magic_card_favorites_updated', handleUpdate);
    return () => {
      window.removeEventListener('magic_card_favorites_updated', handleUpdate);
    };
  }, [id, type]);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const result = toggleFavoriteItem(type, id);
    setIsFav(result.isFav);
  };

  const iconSize = size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5';

  return (
    <button
      id={`fav-btn-${type}-${id}`}
      type="button"
      onClick={handleToggle}
      className={`p-2 rounded-full transition-all duration-200 backdrop-blur-md cursor-pointer ${
        isFav
          ? 'bg-[#7a1f26]/80 text-[#ff7582] border border-[#d4af37]/40 shadow-md scale-105'
          : 'bg-black/40 text-[#c8baa7] hover:text-[#ff7582] hover:bg-black/70 border border-white/10'
      } ${className}`}
      title={isFav ? 'পছন্দ থেকে সরান' : 'পছন্দে যোগ করুন'}
      aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart className={`${iconSize} ${isFav ? 'fill-[#e63946]' : ''}`} />
    </button>
  );
};
