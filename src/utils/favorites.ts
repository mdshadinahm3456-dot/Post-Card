const FAVORITES_KEY = 'magic_card_favorites_v1';

export interface SavedFavorites {
  cards: string[]; // postcard IDs
  quotes: string[]; // quote IDs
  gallery: string[]; // gallery IDs
}

export const getFavorites = (): SavedFavorites => {
  try {
    const data = localStorage.getItem(FAVORITES_KEY);
    if (!data) {
      return { cards: [], quotes: [], gallery: [] };
    }
    const parsed = JSON.parse(data);
    return {
      cards: Array.isArray(parsed.cards) ? parsed.cards : [],
      quotes: Array.isArray(parsed.quotes) ? parsed.quotes : [],
      gallery: Array.isArray(parsed.gallery) ? parsed.gallery : []
    };
  } catch (error) {
    console.error('Failed to read favorites from localStorage:', error);
    return { cards: [], quotes: [], gallery: [] };
  }
};

export const toggleFavoriteItem = (
  type: 'cards' | 'quotes' | 'gallery',
  id: string
): { isFav: boolean; updated: SavedFavorites } => {
  try {
    const current = getFavorites();
    const list = current[type];
    const index = list.indexOf(id);
    let isFav = false;

    if (index >= 0) {
      list.splice(index, 1);
      isFav = false;
    } else {
      list.push(id);
      isFav = true;
    }

    localStorage.setItem(FAVORITES_KEY, JSON.stringify(current));
    // Trigger custom event so other components update synchronously
    window.dispatchEvent(new CustomEvent('magic_card_favorites_updated', { detail: current }));
    return { isFav, updated: current };
  } catch (error) {
    console.error('Failed to save favorite to localStorage:', error);
    return { isFav: false, updated: getFavorites() };
  }
};

export const isItemFavorited = (
  type: 'cards' | 'quotes' | 'gallery',
  id: string
): boolean => {
  const current = getFavorites();
  return current[type].includes(id);
};

export const clearAllFavorites = (): void => {
  try {
    const empty: SavedFavorites = { cards: [], quotes: [], gallery: [] };
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(empty));
    window.dispatchEvent(new CustomEvent('magic_card_favorites_updated', { detail: empty }));
  } catch (error) {
    console.error('Failed to clear favorites in localStorage:', error);
  }
};

