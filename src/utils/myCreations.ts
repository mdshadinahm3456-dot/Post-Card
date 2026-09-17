import { SavedCreation, RecentlyUsedItem, PostcardTemplate } from '../types';

const CREATIONS_KEY = 'magicCard_myCreations';
const RECENTLY_USED_KEY = 'magicCard_recentlyUsed';
const MAX_RECENTLY_USED = 12;

function isLocalStorageAvailable(): boolean {
  try {
    const test = '__mc_test__';
    window.localStorage.setItem(test, test);
    window.localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}

/**
 * Retrieve all saved creations safely from localStorage
 */
export function getMyCreations(): SavedCreation[] {
  if (!isLocalStorageAvailable()) return [];

  try {
    const raw = window.localStorage.getItem(CREATIONS_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    // Sanitize and validate data structure to avoid crashes from corrupted items
    return parsed
      .filter((item): item is SavedCreation => {
        return (
          item &&
          typeof item === 'object' &&
          typeof item.id === 'string' &&
          typeof item.cardId === 'string' &&
          item.customization &&
          typeof item.customization === 'object'
        );
      })
      .sort((a, b) => (b.updatedAt || b.createdAt || 0) - (a.updatedAt || a.createdAt || 0));
  } catch (err) {
    console.warn('Failed to parse saved creations:', err);
    return [];
  }
}

/**
 * Save or update a card creation with duplicate protection
 */
export function saveCreation(
  data: {
    cardId: string;
    title?: string;
    quoteId?: string;
    customization: SavedCreation['customization'];
  },
  existingId?: string
): SavedCreation | null {
  if (!isLocalStorageAvailable()) {
    throw new Error('Local storage is not available in this browser');
  }

  try {
    const creations = getMyCreations();
    const now = Date.now();

    // Check if an existing creation is targeted
    let targetIndex = -1;
    if (existingId) {
      targetIndex = creations.findIndex((c) => c.id === existingId);
    }

    // If no existingId specified, check if user is re-saving the exact same card & message recently
    if (targetIndex === -1) {
      targetIndex = creations.findIndex(
        (c) =>
          c.cardId === data.cardId &&
          c.customization.message === data.customization.message &&
          c.customization.recipient === data.customization.recipient &&
          c.customization.sender === data.customization.sender
      );
    }

    let savedItem: SavedCreation;

    if (targetIndex !== -1) {
      // Update existing
      const existing = creations[targetIndex];
      savedItem = {
        ...existing,
        cardId: data.cardId,
        title: data.title || existing.title || 'আমার কার্ড',
        quoteId: data.quoteId || existing.quoteId,
        customization: { ...data.customization },
        updatedAt: now
      };
      creations[targetIndex] = savedItem;
    } else {
      // Create new creation
      savedItem = {
        id: `mc_${now}_${Math.random().toString(36).substring(2, 8)}`,
        cardId: data.cardId,
        title: data.title || 'আমার ভিন্টেজ কার্ড',
        quoteId: data.quoteId,
        customization: { ...data.customization },
        createdAt: now,
        updatedAt: now
      };
      creations.unshift(savedItem);
    }

    window.localStorage.setItem(CREATIONS_KEY, JSON.stringify(creations));
    window.dispatchEvent(new CustomEvent('magic_card_creations_updated'));
    return savedItem;
  } catch (err) {
    console.error('Error saving creation:', err);
    throw err;
  }
}

/**
 * Update an existing creation by ID
 */
export function updateCreation(id: string, updates: Partial<SavedCreation>): boolean {
  if (!isLocalStorageAvailable()) return false;

  try {
    const creations = getMyCreations();
    const index = creations.findIndex((c) => c.id === id);
    if (index === -1) return false;

    creations[index] = {
      ...creations[index],
      ...updates,
      updatedAt: Date.now()
    };

    window.localStorage.setItem(CREATIONS_KEY, JSON.stringify(creations));
    window.dispatchEvent(new CustomEvent('magic_card_creations_updated'));
    return true;
  } catch (err) {
    console.error('Error updating creation:', err);
    return false;
  }
}

/**
 * Delete a creation by ID
 */
export function deleteCreation(id: string): boolean {
  if (!isLocalStorageAvailable()) return false;

  try {
    const creations = getMyCreations();
    const filtered = creations.filter((c) => c.id !== id);
    window.localStorage.setItem(CREATIONS_KEY, JSON.stringify(filtered));
    window.dispatchEvent(new CustomEvent('magic_card_creations_updated'));
    return true;
  } catch (err) {
    console.error('Error deleting creation:', err);
    return false;
  }
}

/**
 * Retrieve recently used cards
 */
export function getRecentlyUsed(): RecentlyUsedItem[] {
  if (!isLocalStorageAvailable()) return [];

  try {
    const raw = window.localStorage.getItem(RECENTLY_USED_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter((item): item is RecentlyUsedItem => {
        return (
          item &&
          typeof item === 'object' &&
          typeof item.cardId === 'string' &&
          typeof item.title === 'string'
        );
      })
      .slice(0, MAX_RECENTLY_USED);
  } catch (err) {
    console.warn('Failed to parse recently used items:', err);
    return [];
  }
}

/**
 * Add or bump a card in recently used
 */
export function addRecentlyUsed(card: Pick<PostcardTemplate, 'id' | 'title' | 'image'>): void {
  if (!isLocalStorageAvailable() || !card || !card.id) return;

  try {
    const items = getRecentlyUsed();
    // Remove if already exists to bump to front
    const filtered = items.filter((item) => item.cardId !== card.id);
    filtered.unshift({
      cardId: card.id,
      title: card.title,
      image: card.image,
      lastUsedAt: Date.now()
    });

    const capped = filtered.slice(0, MAX_RECENTLY_USED);
    window.localStorage.setItem(RECENTLY_USED_KEY, JSON.stringify(capped));
    window.dispatchEvent(new CustomEvent('magic_card_recently_used_updated'));
  } catch (err) {
    console.warn('Failed to save recently used card:', err);
  }
}

/**
 * Clear recently used cards
 */
export function clearRecentlyUsed(): void {
  if (!isLocalStorageAvailable()) return;

  try {
    window.localStorage.removeItem(RECENTLY_USED_KEY);
    window.dispatchEvent(new CustomEvent('magic_card_recently_used_updated'));
  } catch (err) {
    console.warn('Failed to clear recently used:', err);
  }
}
