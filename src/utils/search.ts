import { postcards } from '../data/postcards';
import { quotes } from '../data/quotes';
import { gallery } from '../data/gallery';
import { categories } from '../data/categories';
import { PostcardTemplate, Quote, GalleryItem, Category } from '../types';
import { bengaliIncludes, normalizeBengaliText } from './bengaliUtils';

export interface GlobalSearchResult {
  cards: PostcardTemplate[];
  quotes: Quote[];
  gallery: GalleryItem[];
  categories: Category[];
  totalMatches: number;
}

export function performGlobalSearch(query: string): GlobalSearchResult {
  const normQuery = normalizeBengaliText(query);
  if (!normQuery) {
    return {
      cards: [],
      quotes: [],
      gallery: [],
      categories: [],
      totalMatches: 0
    };
  }

  const matchedCategories = categories.filter((c) => {
    return (
      bengaliIncludes(c.name, normQuery) ||
      bengaliIncludes(c.id, normQuery) ||
      bengaliIncludes(c.description, normQuery) ||
      (c.englishLabel && bengaliIncludes(c.englishLabel, normQuery))
    );
  });

  const matchedCards = postcards.filter((card) => {
    const matchesCategoryArray = card.categories?.some(
      (catId) => bengaliIncludes(catId, normQuery)
    );

    return (
      bengaliIncludes(card.title, normQuery) ||
      bengaliIncludes(card.category, normQuery) ||
      bengaliIncludes(card.defaultQuote, normQuery) ||
      (card.mood && bengaliIncludes(card.mood, normQuery)) ||
      card.keywords?.some((kw) => bengaliIncludes(kw, normQuery)) ||
      matchesCategoryArray
    );
  });

  const matchedQuotes = quotes.filter((q) => {
    const matchesCategoryArray = q.categories?.some(
      (catId) => bengaliIncludes(catId, normQuery)
    );

    return (
      bengaliIncludes(q.text, normQuery) ||
      bengaliIncludes(q.category, normQuery) ||
      (q.author && bengaliIncludes(q.author, normQuery)) ||
      matchesCategoryArray
    );
  });

  const matchedGallery = gallery.filter((item) => {
    return (
      bengaliIncludes(item.title, normQuery) ||
      bengaliIncludes(item.category, normQuery) ||
      bengaliIncludes(item.quoteBengali, normQuery) ||
      bengaliIncludes(item.quoteEnglish, normQuery) ||
      bengaliIncludes(item.author, normQuery)
    );
  });

  const totalMatches =
    matchedCards.length +
    matchedQuotes.length +
    matchedGallery.length +
    matchedCategories.length;

  return {
    cards: matchedCards,
    quotes: matchedQuotes,
    gallery: matchedGallery,
    categories: matchedCategories,
    totalMatches
  };
}
