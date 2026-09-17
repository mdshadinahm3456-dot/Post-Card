import { CardCustomizationState, PostcardTemplate } from '../types';

export const DEFAULT_SHARE_TEXT = 'আমি Magic Card দিয়ে একটি Vintage Card তৈরি করেছি 💌';

/**
 * Generate a shareable URL encoding card ID and essential customization parameters
 */
export function generateShareUrl(
  card: PostcardTemplate,
  customization?: Partial<CardCustomizationState>,
  quoteId?: string
): string {
  try {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const pathname = typeof window !== 'undefined' ? window.location.pathname : '/';
    const url = new URL(pathname, origin || 'https://magiccard.app');

    url.searchParams.set('page', 'generator');
    url.searchParams.set('card', card.id);

    if (quoteId) {
      url.searchParams.set('q', quoteId);
    }

    if (customization) {
      if (customization.message && customization.message !== card.defaultQuote) {
        // Cap message length if extraordinarily long to prevent URL overflow
        const truncated = customization.message.length > 300 
          ? customization.message.substring(0, 300) 
          : customization.message;
        url.searchParams.set('msg', truncated);
      }
      if (customization.recipient && customization.recipient !== 'প্রিয়তমা') {
        url.searchParams.set('to', customization.recipient);
      }
      if (customization.sender && customization.sender !== 'ইতি, তোমার...') {
        url.searchParams.set('from', customization.sender);
      }
      if (customization.date) {
        url.searchParams.set('date', customization.date);
      }
      if (customization.fontFamily && customization.fontFamily !== 'bengali-serif') {
        url.searchParams.set('font', customization.fontFamily);
      }
      if (customization.effect && customization.effect !== 'original') {
        url.searchParams.set('eff', customization.effect);
      }
      if (customization.textPosition && customization.textPosition !== 'center') {
        url.searchParams.set('pos', customization.textPosition);
      }
      if (customization.textAlign && customization.textAlign !== 'center') {
        url.searchParams.set('align', customization.textAlign);
      }
      if (customization.textColor && customization.textColor !== '#f7f0df') {
        url.searchParams.set('clr', customization.textColor);
      }
      if (customization.borderStyle && customization.borderStyle !== 'classic') {
        url.searchParams.set('border', customization.borderStyle);
      }
    }

    return url.toString();
  } catch (err) {
    console.warn('Failed to construct share URL:', err);
    return typeof window !== 'undefined' ? window.location.href : '';
  }
}

/**
 * Parse shareable URL query parameters
 */
export function parseShareParams(searchString?: string): {
  cardId?: string;
  quoteId?: string;
  customization?: Partial<CardCustomizationState>;
} | null {
  try {
    const search = searchString !== undefined 
      ? searchString 
      : typeof window !== 'undefined' 
        ? window.location.search 
        : '';

    if (!search) return null;

    const params = new URLSearchParams(search);
    const cardId = params.get('card');
    if (!cardId) return null;

    const quoteId = params.get('q') || undefined;
    const customization: Partial<CardCustomizationState> = {};

    const msg = params.get('msg');
    if (msg) customization.message = msg;

    const to = params.get('to');
    if (to) customization.recipient = to;

    const from = params.get('from');
    if (from) customization.sender = from;

    const date = params.get('date');
    if (date) customization.date = date;

    const font = params.get('font');
    if (font) customization.fontFamily = font as any;

    const eff = params.get('eff');
    if (eff) customization.effect = eff as any;

    const pos = params.get('pos');
    if (pos) customization.textPosition = pos as any;

    const align = params.get('align');
    if (align) customization.textAlign = align as any;

    const clr = params.get('clr');
    if (clr) customization.textColor = clr;

    const border = params.get('border');
    if (border) customization.borderStyle = border as any;

    return { cardId, quoteId, customization };
  } catch (err) {
    console.warn('Failed to parse share parameters:', err);
    return null;
  }
}

/**
 * Share via WhatsApp
 */
export function shareToWhatsApp(url: string, message = DEFAULT_SHARE_TEXT): void {
  const text = `${message}\n${url}`;
  const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
  window.open(waUrl, '_blank', 'noopener,noreferrer');
}

/**
 * Share via Facebook
 */
export function shareToFacebook(url: string, message = DEFAULT_SHARE_TEXT): void {
  const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(message)}`;
  window.open(fbUrl, '_blank', 'noopener,noreferrer');
}

/**
 * Share via Messenger
 */
export function shareToMessenger(url: string): void {
  // Mobile deep link or web send dialog
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  if (isMobile) {
    window.location.href = `fb-messenger://share?link=${encodeURIComponent(url)}`;
  } else {
    const dialogUrl = `https://www.facebook.com/dialog/send?link=${encodeURIComponent(url)}&app_id=291494419107518&redirect_uri=${encodeURIComponent(url)}`;
    window.open(dialogUrl, '_blank', 'noopener,noreferrer');
  }
}

/**
 * Share via Telegram
 */
export function shareToTelegram(url: string, message = DEFAULT_SHARE_TEXT): void {
  const tgUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(message)}`;
  window.open(tgUrl, '_blank', 'noopener,noreferrer');
}

/**
 * Copy text to clipboard with fallback
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Fallback to execCommand
  }

  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    textArea.style.top = '-9999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch (err) {
    console.error('Clipboard copy failed:', err);
    return false;
  }
}

/**
 * Check if Web Share API is available
 */
export function canNativeShare(): boolean {
  return typeof navigator !== 'undefined' && !!navigator.share;
}

/**
 * Trigger Native Web Share
 */
export async function triggerNativeShare(
  url: string,
  title = 'Magic Card',
  text = DEFAULT_SHARE_TEXT
): Promise<boolean> {
  if (!canNativeShare()) return false;

  try {
    await navigator.share({
      title,
      text,
      url
    });
    return true;
  } catch (err: any) {
    // AbortError is triggered when user cancels share sheet - don't treat as fatal error
    if (err && err.name === 'AbortError') {
      return false;
    }
    console.warn('Native share failed:', err);
    return false;
  }
}
