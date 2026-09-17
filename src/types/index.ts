export type TextPosition = 'top' | 'center' | 'bottom';
export type TypographyStyle =
  | 'bengali-serif'
  | 'handwritten'
  | 'vintage-serif'
  | 'typewriter'
  | 'classic'
  | 'calligraphy'
  | 'newspaper';

export type BorderStyle =
  | 'classic'
  | 'vintage-ornate'
  | 'minimal-gold'
  | 'postmark'
  | 'double-frame';

export type VintageEffect =
  | 'original'
  | 'sepia'
  | 'old-paper'
  | 'faded'
  | 'bw'
  | 'film-grain'
  | 'dust'
  | 'scratch'
  | 'coffee-stain'
  | 'warm-vintage';

export type ExportRatioKey = 'postcard' | 'square' | 'story' | 'facebook' | 'whatsapp';

export type CategoryGroup =
  | 'love'
  | 'family'
  | 'friendship'
  | 'celebration'
  | 'emotional'
  | 'cultural';

export interface PostcardTemplate {
  id: string;
  title: string;
  category: string;
  categories?: string[];
  image: string;
  defaultQuote: string;
  textPosition: TextPosition;
  typography: TypographyStyle;
  borderStyle: BorderStyle;
  recommendedEffect?: VintageEffect;
  keywords?: string[];
  featured?: boolean;
  isNew?: boolean;
  collection?: 'popular' | 'new' | 'romantic' | 'rainy' | 'vintage_letter';
  mood?: string;
  stampText?: string;
  description?: string;
  alt?: string;
  width?: number;
  height?: number;
}

export interface Quote {
  id: string;
  text: string;
  category: string;
  categories?: string[];
  author?: string;
  occasionId?: string;
}

export interface GalleryItem {
  id: string;
  image: string;
  category: string;
  title: string;
  quoteBengali?: string;
  quoteEnglish?: string;
  quote?: string;
  author?: string;
  description?: string;
  alt?: string;
  width?: number;
  height?: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  englishLabel?: string;
  description?: string;
  group?: CategoryGroup;
  isPopular?: boolean;
}

export interface CardCustomizationState {
  recipient: string;
  message: string;
  sender: string;
  date: string;
  fontFamily: TypographyStyle;
  fontSize: number; // in pt / px
  isBold: boolean;
  isItalic: boolean;
  textAlign: 'left' | 'center' | 'right';
  letterSpacing: number; // px
  lineHeight: number; // ratio e.g. 1.6
  textColor: string;
  textPosition: TextPosition;
  effect: VintageEffect;
  showStamp: boolean;
  borderStyle: BorderStyle;
  exportRatio: ExportRatioKey;
  exportFormat: 'png' | 'jpeg';
}

export interface ExportSizeConfig {
  key: ExportRatioKey;
  name: string;
  ratioLabel: string;
  aspectRatioClass: string;
  width: number;
  height: number;
  description: string;
}

export interface FavoriteItem {
  id: string;
  type: 'card' | 'quote' | 'gallery';
  addedAt: number;
  metadata?: any;
}

export interface SavedCreation {
  id: string;
  cardId: string;
  title: string;
  quoteId?: string;
  customization: CardCustomizationState;
  createdAt: number;
  updatedAt: number;
}

export interface RecentlyUsedItem {
  cardId: string;
  title: string;
  image: string;
  lastUsedAt: number;
}
