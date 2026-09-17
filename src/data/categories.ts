import { Category, CategoryGroup, PostcardTemplate, Quote } from '../types';
import { normalizeBengaliText } from '../utils/bengaliUtils';

export const categories: Category[] = [
  // --- LOVE & RELATIONSHIP ---
  {
    id: 'love',
    name: '❤️ প্রেম',
    icon: '❤️',
    englishLabel: 'Love',
    description: 'হৃদয়ের গভীরতম অনুরাগে ভরা প্রেমের বার্তা',
    group: 'love',
    isPopular: true
  },
  {
    id: 'romantic',
    name: '🌹 রোমান্টিক',
    icon: '🌹',
    englishLabel: 'Romantic',
    description: 'মিষ্টি খুনসুটি আর মায়াবী রোমান্টিক চিঠি',
    group: 'love',
    isPopular: true
  },
  {
    id: 'heartbreak',
    name: '💔 বিরহ',
    icon: '💔',
    englishLabel: 'Heartbreak',
    description: 'না-বলা দীর্ঘশ্বাস আর বেদনামাখা অনুভূতির কথা',
    group: 'love'
  },
  {
    id: 'missing',
    name: '🥺 মিস করা',
    icon: '🥺',
    englishLabel: 'Missing You',
    description: 'প্রিয় মানুষের অভাব ও স্মৃতির ডাক',
    group: 'love',
    isPopular: true
  },
  {
    id: 'unrequited',
    name: '🖤 একতরফা প্রেম',
    icon: '🖤',
    englishLabel: 'Unrequited Love',
    description: 'একক হৃদয়ের নীরব ও গোপন ভালোবাসার প্রকাশ',
    group: 'love'
  },
  {
    id: 'loveletter',
    name: '💌 প্রেমপত্র',
    icon: '💌',
    englishLabel: 'Love Letter',
    description: 'ভিন্টেজ খামে মোড়ানো আবেগি প্রেমের চিঠি',
    group: 'love',
    isPopular: true
  },
  {
    id: 'proposal',
    name: '💍 প্রপোজ',
    icon: '💍',
    englishLabel: 'Proposal',
    description: 'আজীবন একসাথে চলার মিষ্টি প্রস্তাব',
    group: 'love'
  },
  {
    id: 'anniversary',
    name: '💑 বিবাহবার্ষিকী',
    icon: '💑',
    englishLabel: 'Anniversary',
    description: 'দাম্পত্য জীবনের ভালোবাসার দিন উদযাপন',
    group: 'love'
  },
  {
    id: 'distance_love',
    name: '💕 দূরত্বের ভালোবাসা',
    icon: '💕',
    englishLabel: 'Long Distance Love',
    description: 'মাইল দূর থেকেও দুটি মনের অটুট বন্ধন',
    group: 'love'
  },
  {
    id: 'memories',
    name: '🌸 স্মৃতি',
    icon: '🌸',
    englishLabel: 'Memories',
    description: 'পুরনো দিনের মধুরতম স্মৃতির খতিয়ান',
    group: 'love'
  },

  // --- FAMILY ---
  {
    id: 'mother',
    name: '👩 মায়ের জন্য',
    icon: '👩',
    englishLabel: "Mother's Day",
    description: 'মায়ের নিঃস্বার্থ ভালোবাসার প্রতি বিনম্র শ্রদ্ধা',
    group: 'family',
    isPopular: true
  },
  {
    id: 'father',
    name: '👨 বাবার জন্য',
    icon: '👨',
    englishLabel: "Father's Day",
    description: 'বাবার নিরাপদ বটচ্ছায়ার প্রতি ভালোবাসা',
    group: 'family',
    isPopular: true
  },
  {
    id: 'sister',
    name: '👧 বোনের জন্য',
    icon: '👧',
    englishLabel: 'For Sister',
    description: 'স্নেহময়ী বোনকে আন্তরিক ভালোবাসা ও শুভেচ্ছা',
    group: 'family'
  },
  {
    id: 'brother',
    name: '👦 ভাইয়ের জন্য',
    icon: '👦',
    englishLabel: 'For Brother',
    description: 'প্রিয় ভাইকে শ্রদ্ধা ও ভালোবাসার বার্তা',
    group: 'family'
  },
  {
    id: 'family',
    name: '👨‍👩‍👧 পরিবারের জন্য',
    icon: '👨‍👩‍👧',
    englishLabel: 'Family Love',
    description: 'পরিবারের সকলের জন্য আন্তরিক শুভেচ্ছা ও শুভাশিস',
    group: 'family'
  },

  // --- FRIENDSHIP ---
  {
    id: 'friendship',
    name: '🤝 বন্ধুত্ব',
    icon: '🤝',
    englishLabel: 'Friendship',
    description: 'জীবনের সবচেয়ে সুন্দর বন্ধুত্বের উদযাপন',
    group: 'friendship',
    isPopular: true
  },
  {
    id: 'for_friend',
    name: '🫂 বন্ধুর জন্য',
    icon: '🫂',
    englishLabel: 'Best Friend',
    description: 'সবচেয়ে বিশ্বস্ত ও প্রিয় বন্ধুর জন্য বিশেষ চিঠি',
    group: 'friendship'
  },
  {
    id: 'thank_you',
    name: '🙏 ধন্যবাদ',
    icon: '🙏',
    englishLabel: 'Thank You',
    description: 'হৃদয়ের গভীর থেকে প্রকাশ করা আন্তরিক কৃতজ্ঞতা',
    group: 'friendship',
    isPopular: true
  },
  {
    id: 'apology',
    name: '🤍 ক্ষমা চাওয়া',
    icon: '🤍',
    englishLabel: 'Apology & Forgiveness',
    description: 'ভুল বোঝাবুঝি দূর করে ক্ষমা চেয়ে পাঠানো বার্তা',
    group: 'friendship'
  },
  {
    id: 'best_wishes',
    name: '🌷 শুভকামনা',
    icon: '🌷',
    englishLabel: 'Best Wishes',
    description: 'ভবিষ্যতের সুন্দর পথচলায় আন্তরিক শুভকামনা',
    group: 'friendship'
  },
  {
    id: 'greetings',
    name: '🍀 শুভেচ্ছা',
    icon: '🍀',
    englishLabel: 'Warm Greetings',
    description: 'যেকোনো দিনে প্রিয়জনকে সুন্দর শুভেচ্ছা পাঠানো',
    group: 'friendship'
  },

  // --- CELEBRATION ---
  {
    id: 'birthday',
    name: '🎂 জন্মদিন',
    icon: '🎂',
    englishLabel: 'Birthday',
    description: 'প্রিয়জনের জন্মদিনের জন্য বিশেষ উষ্ণ শুভেচ্ছা',
    group: 'celebration',
    isPopular: true
  },
  {
    id: 'wedding',
    name: '💍 বিবাহ',
    icon: '💍',
    englishLabel: 'Wedding',
    description: 'নবদম্পতির নতুন জীবনের জন্য আন্তরিক শুভাশিস',
    group: 'celebration',
    isPopular: true
  },
  {
    id: 'anniversary_celeb',
    name: '💑 বিবাহবার্ষিকী',
    icon: '💑',
    englishLabel: 'Wedding Anniversary',
    description: 'দাম্পত্য জীবনের আরেকটি ভালোবাসার মাইলফলক',
    group: 'celebration'
  },
  {
    id: 'congratulations',
    name: '🎓 অভিনন্দন',
    icon: '🎓',
    englishLabel: 'Congratulations',
    description: 'পরীক্ষা, গ্র্যাজুয়েশন বা বিশেষ অর্জনে অভিনন্দন',
    group: 'celebration',
    isPopular: true
  },
  {
    id: 'success',
    name: '🏆 সাফল্য',
    icon: '🏆',
    englishLabel: 'Success',
    description: 'পরিশ্রমের বিজয়ে অনন্য সাফল্যের বার্তা',
    group: 'celebration'
  },
  {
    id: 'new_home',
    name: '🏠 নতুন বাসা',
    icon: '🏠',
    englishLabel: 'New Home',
    description: 'নতুন নীড়ে সুখ, শান্তি ও সমৃদ্ধির কামনা',
    group: 'celebration'
  },
  {
    id: 'new_baby',
    name: '👶 নতুন সন্তান',
    icon: '👶',
    englishLabel: 'Newborn Baby',
    description: 'পৃথিবীতে আসা নতুন অতিথির জন্য পরম আশীর্বাদ',
    group: 'celebration'
  },
  {
    id: 'general_wishes',
    name: '🎉 সাধারণ শুভেচ্ছা',
    icon: '🎉',
    englishLabel: 'Celebration Wishes',
    description: 'আনন্দঘন যেকোনো মুহূর্তে চমৎকার শুভবার্তা',
    group: 'celebration'
  },

  // --- EMOTIONAL ---
  {
    id: 'pain',
    name: '💔 কষ্ট',
    icon: '💔',
    englishLabel: 'Heartache',
    description: 'নীরবে সয়ে যাওয়া কষ্টের আবেগি বহিঃপ্রকাশ',
    group: 'emotional'
  },
  {
    id: 'sadness',
    name: '😔 মন খারাপ',
    icon: '😔',
    englishLabel: 'Sad Mood',
    description: 'মন খারাপের অলস মুহূর্তে হৃদয়ের অনুভূতি',
    group: 'emotional'
  },
  {
    id: 'rain',
    name: '🌧️ বৃষ্টি',
    icon: '🌧️',
    englishLabel: 'Rainy Romance',
    description: 'বৃষ্টিভেজা দুপুর আর স্মৃতি জাগানিয়া অনুভূতির সুর',
    group: 'emotional',
    isPopular: true
  },
  {
    id: 'night',
    name: '🌙 রাত',
    icon: '🌙',
    englishLabel: 'Midnight Solitude',
    description: 'নিঝুম রাতের একলা ভাবনা আর চাঁদের আলো',
    group: 'emotional'
  },
  {
    id: 'old_memories',
    name: '🕰️ পুরনো স্মৃতি',
    icon: '🕰️',
    englishLabel: 'Old Memories',
    description: 'কৈশোর ও হারানো ফেলে আসা দিনের স্মৃতিচারণ',
    group: 'emotional'
  },
  {
    id: 'loneliness',
    name: '🖤 একাকীত্ব',
    icon: '🖤',
    englishLabel: 'Solitude',
    description: 'নিঃসঙ্গতার নিঃশব্দ পদধ্বনি ও চিন্তা',
    group: 'emotional'
  },
  {
    id: 'beautiful_memories',
    name: '🌸 সুন্দর স্মৃতি',
    icon: '🌸',
    englishLabel: 'Cherished Memories',
    description: 'হৃদয়ে চিরভাস্বর হয়ে থাকা প্রিয় মুহূর্তগুলো',
    group: 'emotional'
  },

  // --- BANGLADESH & CULTURAL ---
  {
    id: 'independence_day',
    name: '🇧🇩 স্বাধীনতা দিবস',
    icon: '🇧🇩',
    englishLabel: 'Independence Day',
    description: '২৬শে মার্চের রক্তিম সূর্য ও বীর মুক্তিযোদ্ধাদের স্মরণ',
    group: 'cultural'
  },
  {
    id: 'victory_day',
    name: '🇧🇩 বিজয় দিবস',
    icon: '🇧🇩',
    englishLabel: 'Victory Day',
    description: '১৬ই ডিসেম্বরের মহান জাতীয় বিজয় ও আত্মত্যাগ',
    group: 'cultural'
  },
  {
    id: 'ramadan',
    name: '🌙 রমজান',
    icon: '🌙',
    englishLabel: 'Ramadan Kareem',
    description: 'পবিত্র মাহে রমজানের রহমত, মাগফিরাত ও নাজাত',
    group: 'cultural'
  },
  {
    id: 'eid_ul_fitr',
    name: '🕌 ঈদুল ফিতর',
    icon: '🕌',
    englishLabel: 'Eid-ul-Fitr',
    description: 'ঈদের অনাবিল আনন্দ ও শুভেচ্ছা বার্তা',
    group: 'cultural',
    isPopular: true
  },
  {
    id: 'eid_ul_adha',
    name: '🕌 ঈদুল আজহা',
    icon: '🕌',
    englishLabel: 'Eid-ul-Adha',
    description: 'ত্যাগের মহিমায় উদ্ভাসিত কোরবানির ঈদ মোবারক',
    group: 'cultural'
  },
  {
    id: 'shab_e_barat',
    name: '🌙 শবে বরাত',
    icon: '🌙',
    englishLabel: 'Shab-e-Barat',
    description: 'সৌভাগ্যের রজনীতে ক্ষমা ও দোয়ার বার্তা',
    group: 'cultural'
  },
  {
    id: 'shab_e_qadr',
    name: '🌙 শবে কদর',
    icon: '🌙',
    englishLabel: 'Laylat al-Qadr',
    description: 'হাজার মাসের শ্রেষ্ঠ রজনীতে রহমতের প্রার্থনা',
    group: 'cultural'
  },
  {
    id: 'pohela_boishakh',
    name: '🌼 পহেলা বৈশাখ',
    icon: '🌼',
    englishLabel: 'Pohela Boishakh',
    description: 'শুভ নববর্ষ—নতুন বছরের আনন্দ, মঙ্গল শোভাযাত্রা ও আশা',
    group: 'cultural',
    isPopular: true
  }
];

export const POPULAR_CATEGORIES = categories.filter((c) => c.isPopular);

export const CATEGORY_GROUPS_CONFIG: Record<CategoryGroup, { id: CategoryGroup; titleBengali: string; icon: string }> = {
  love: { id: 'love', titleBengali: 'প্রেম ও সম্পর্ক', icon: '❤️' },
  family: { id: 'family', titleBengali: 'পরিবার ও স্নেহ', icon: '👨‍👩‍👧' },
  friendship: { id: 'friendship', titleBengali: 'বন্ধুত্ব ও কৃতজ্ঞতা', icon: '🤝' },
  celebration: { id: 'celebration', titleBengali: 'উৎসব ও উদযাপন', icon: '🎉' },
  emotional: { id: 'emotional', titleBengali: 'অনুভূতি ও স্মৃতি', icon: '🌧️' },
  cultural: { id: 'cultural', titleBengali: 'বাংলাদেশ ও সংস্কৃতি', icon: '🇧🇩' }
};

export function getCategoriesByGroup(group: CategoryGroup): Category[] {
  return categories.filter((c) => c.group === group);
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}

/**
 * Match card against category ID or category name
 */
export function cardMatchesCategory(card: PostcardTemplate, categoryIdOrName: string): boolean {
  if (!categoryIdOrName || categoryIdOrName === 'All' || categoryIdOrName === 'all' || categoryIdOrName === 'সকল') {
    return true;
  }

  // Check ID match in card.categories array
  if (card.categories && card.categories.includes(categoryIdOrName)) {
    return true;
  }

  // Check category name normalized
  const normCat = normalizeBengaliText(categoryIdOrName);
  const cardCatNorm = normalizeBengaliText(card.category);
  if (cardCatNorm.includes(normCat) || normCat.includes(cardCatNorm)) {
    return true;
  }

  // Find if categoryIdOrName is an ID in our categories list, and compare with its name
  const matchedCat = categories.find((c) => c.id === categoryIdOrName || c.name === categoryIdOrName);
  if (matchedCat) {
    if (card.categories && card.categories.includes(matchedCat.id)) return true;
    const mNameNorm = normalizeBengaliText(matchedCat.name);
    if (cardCatNorm.includes(mNameNorm) || mNameNorm.includes(cardCatNorm)) return true;
  }

  return false;
}

/**
 * Match quote against category ID or category name
 */
export function quoteMatchesCategory(quote: Quote, categoryIdOrName: string): boolean {
  if (!categoryIdOrName || categoryIdOrName === 'All' || categoryIdOrName === 'all' || categoryIdOrName === 'সকল') {
    return true;
  }

  if (quote.categories && quote.categories.includes(categoryIdOrName)) {
    return true;
  }

  const normCat = normalizeBengaliText(categoryIdOrName);
  const quoteCatNorm = normalizeBengaliText(quote.category);
  if (quoteCatNorm.includes(normCat) || normCat.includes(quoteCatNorm)) {
    return true;
  }

  const matchedCat = categories.find((c) => c.id === categoryIdOrName || c.name === categoryIdOrName);
  if (matchedCat) {
    if (quote.categories && quote.categories.includes(matchedCat.id)) return true;
    const mNameNorm = normalizeBengaliText(matchedCat.name);
    if (quoteCatNorm.includes(mNameNorm) || mNameNorm.includes(quoteCatNorm)) return true;
  }

  return false;
}
