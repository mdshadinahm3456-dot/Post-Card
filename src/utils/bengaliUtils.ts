/**
 * Bengali Language, Numeral, Date, and Normalization Utilities
 * Designed specifically for Bangladesh-focused user experience
 */

const BENGALI_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
const ENGLISH_DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

const BENGALI_MONTHS = [
  'জানুয়ারি',
  'ফেব্রুয়ারি',
  'মার্চ',
  'এপ্রিল',
  'মে',
  'জুন',
  'জুলাই',
  'আগস্ট',
  'সেপ্টেম্বর',
  'অক্টোবর',
  'নভেম্বর',
  'ডিসেম্বর'
];

/**
 * Convert numbers (or strings with English digits) into Bengali numerals
 * e.g. 8 -> '৮', 2026 -> '২০২৬', "08s" -> "০৮s"
 */
export function toBengaliNumber(input: number | string | undefined | null): string {
  if (input === undefined || input === null) return '';
  const str = input.toString();
  return str.replace(/[0-9]/g, (digit) => BENGALI_DIGITS[parseInt(digit, 10)]);
}

/**
 * Convert Bengali numerals to English digits
 */
export function toEnglishNumber(input: string): string {
  if (!input) return '';
  let result = input;
  BENGALI_DIGITS.forEach((bnDigit, idx) => {
    result = result.split(bnDigit).join(ENGLISH_DIGITS[idx]);
  });
  return result;
}

/**
 * Format date into Bangladesh-standard Bengali format:
 * e.g. "১৬ সেপ্টেম্বর ২০২৬"
 */
export function formatBengaliDate(dateInput?: Date | string | number): string {
  let date: Date;

  if (!dateInput) {
    date = new Date();
  } else if (typeof dateInput === 'string' || typeof dateInput === 'number') {
    date = new Date(dateInput);
    if (isNaN(date.getTime())) {
      // If it's already a non-standard formatted string, return as is
      return String(dateInput);
    }
  } else {
    date = dateInput;
  }

  const day = toBengaliNumber(date.getDate());
  const monthName = BENGALI_MONTHS[date.getMonth()];
  const year = toBengaliNumber(date.getFullYear());

  return `${day} ${monthName} ${year}`;
}

/**
 * Normalizes Bengali and Latin strings for search comparisons:
 * - NFC normalization
 * - Zero-width space/joiner removal
 * - Case insensitivity
 */
export function normalizeBengaliText(text: string | undefined | null): string {
  if (!text) return '';
  return text
    .normalize('NFC')
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    .trim()
    .toLowerCase();
}

/**
 * Helper to check if a source text contains a search query in Bengali
 */
export function bengaliIncludes(source: string | undefined | null, query: string): boolean {
  if (!source || !query) return false;
  const normSource = normalizeBengaliText(source);
  const normQuery = normalizeBengaliText(query);
  return normSource.includes(normQuery);
}
