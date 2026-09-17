import { Quote } from '../types';

export const quotes: Quote[] = [
  // --- প্রেম ও রোমান্টিক ---
  {
    id: 'q001',
    text: 'তোমাকে কাছে পাওয়ার চেয়ে, তোমাকে ভালোবাসাটাই যেন বেশি সুন্দর।',
    category: '❤️ প্রেম',
    categories: ['love', 'romantic'],
    author: 'হৃদয়ের কথা'
  },
  {
    id: 'q002',
    text: 'তোমাকে পাওয়ার জন্য নয়, তোমাকে একদিন ভালোবেসেছিলাম—শুধু ভালোবাসার প্রয়োজনে।',
    category: '❤️ প্রেম',
    categories: ['love', 'romantic'],
    author: 'অজানা প্রেমিক'
  },
  {
    id: 'q003',
    text: 'হাজারটা ভিড়ের মাঝেও যে চোখের চাহনি আমি খুঁজি, তা কেবলই তোমার।',
    category: '🌹 রোমান্টিক',
    categories: ['romantic', 'love'],
    author: 'অনুভূতির দেয়াল'
  },
  {
    id: 'q004',
    text: 'তোমার হাসির মধ্যে এমন এক মায়া আছে, যা পৃথিবীর সমস্ত ক্লান্তি মুছে দেয়।',
    category: '🌹 রোমান্টিক',
    categories: ['romantic', 'love'],
    author: 'মুগ্ধ নয়ন'
  },
  {
    id: 'q005',
    text: 'তুমি আমার জীবনের সেই প্রিয়তম অধ্যায়, যা আমি বারবার পড়তে চাই।',
    category: '❤️ প্রেম',
    categories: ['love', 'romantic', 'loveletter'],
    author: 'গল্পের শেষ পাতা'
  },
  {
    id: 'q006',
    text: 'ভালোবাসা কোনো বিনিময় চায় না, শুধু একটু যত্ন আর নিঃশর্ত নির্ভরতা খোঁজে।',
    category: '❤️ প্রেম',
    categories: ['love', 'romantic'],
    author: 'নিভৃত ভাবনা'
  },

  // --- বিরহ, কষ্ট ও একতরফা প্রেম ---
  {
    id: 'q007',
    text: 'তুমি ছিলে আমার পাওয়া শ্রেষ্ঠ উপহার, আর হারানো এক গভীর ক্ষত।',
    category: '💔 বিরহ',
    categories: ['heartbreak', 'pain', 'sadness'],
    author: 'স্মৃতির চাদর'
  },
  {
    id: 'q008',
    text: 'কিছু গল্প কখনো পূর্ণতা পায় না, তবু তারা আজীবন বুকের ভেতর বেঁচে থাকে।',
    category: '💔 বিরহ',
    categories: ['heartbreak', 'pain', 'old_memories'],
    author: 'ভাঙা আয়না'
  },
  {
    id: 'q009',
    text: 'আমি চেয়েছিলাম তুমি আমার হও, কিন্তু তুমি শিখিয়ে গেলে একলা ভালোবেসে বাঁচা।',
    category: '🖤 একতরফা প্রেম',
    categories: ['unrequited', 'loneliness', 'sadness'],
    author: 'নীরব অভিমান'
  },
  {
    id: 'q010',
    text: 'তোমায় ভুলে যাওয়ার মতো কোনো পথ আমার জানা নেই, শুধু দূরত্বটুকু সয়ে নেওয়া ছাড়া।',
    category: '💔 কষ্ট',
    categories: ['pain', 'heartbreak', 'missing'],
    author: 'একলা বিকেল'
  },

  // --- মিস করা ও দূরত্বের ভালোবাসা ---
  {
    id: 'q011',
    text: 'তুমি কাছে না থেকেও আমার প্রতিটি গল্পের সবচেয়ে সুন্দর অংশ।',
    category: '🥺 মিস করা',
    categories: ['missing', 'distance_love', 'love'],
    author: 'হৃদয়ের কথা'
  },
  {
    id: 'q012',
    text: 'দূরত্ব হয়তো শরীরকে দূরে রাখে, কিন্তু প্রতিটি প্রার্থনায় তুমি আছো সবার আগে।',
    category: '💕 দূরত্বের ভালোবাসা',
    categories: ['distance_love', 'missing', 'love'],
    author: 'দূর সীমানা'
  },
  {
    id: 'q013',
    text: 'প্রতিটি নিঃশ্বাসে তোমার অনুপস্থিতি টের পাই, যেন বাতাসেই তোমার সুবাস মেখে আছে।',
    category: '🥺 মিস করা',
    categories: ['missing', 'distance_love'],
    author: 'অপেক্ষার প্রহর'
  },

  // --- প্রেমপত্র ও স্মৃতি ---
  {
    id: 'q014',
    text: 'কিছু চিঠি কখনো ডাকবাক্সে ফেলা হয় না, শুধু বুকের গভীরে সযত্নে জমা থাকে।',
    category: '💌 প্রেমপত্র',
    categories: ['loveletter', 'memories', 'love'],
    author: 'ডাকপিয়ন'
  },
  {
    id: 'q015',
    text: 'কিছু স্মৃতি সময়ের সঙ্গে পুরনো হয় না, বরং আরও গভীর হয়।',
    category: '🌸 স্মৃতি',
    categories: ['memories', 'beautiful_memories', 'old_memories'],
    author: 'চিরন্তন প্রেম'
  },
  {
    id: 'q016',
    text: 'পুরনো হলুদ কাগজে লেখা চিঠির সুবাসে আজো আমি তোমায় খুঁজে পাই।',
    category: '💌 প্রেমপত্র',
    categories: ['loveletter', 'old_memories', 'memories'],
    author: 'ভিন্টেজ খাম'
  },
  {
    id: 'q017',
    text: 'স্মৃতিরা কখনো মরে না; তারা শুধু ধুলোপড়া ডায়েরির পাতার মতো নীরবে অপেক্ষা করে।',
    category: '🕰️ পুরনো স্মৃতি',
    categories: ['old_memories', 'memories', 'beautiful_memories'],
    author: 'স্মৃতিচারণ'
  },

  // --- প্রপোজ ও বিবাহবার্ষিকী ---
  {
    id: 'q018',
    text: 'তুমি কি আমার সেই হাতটি ধরবে, যে হাত কখনো তোমায় ছাড়বে না?',
    category: '💍 প্রপোজ',
    categories: ['proposal', 'wedding', 'love'],
    author: 'অঙ্গীকার'
  },
  {
    id: 'q019',
    text: 'বাকিটা পথ তোমার সাথে হাঁটতে চাই—রোদে ছায়া হয়ে, আর বৃষ্টিতে ছাতা হয়ে।',
    category: '💍 প্রপোজ',
    categories: ['proposal', 'romantic', 'wedding'],
    author: 'চিরন্তন প্রতিজ্ঞা'
  },
  {
    id: 'q020',
    text: 'আমাদের এই পথচলার প্রতিটি মুহূর্ত যেন একটি সোনালী অধ্যায়। শুভ বিবাহবার্ষিকী, প্রিয়!',
    category: '💑 বিবাহবার্ষিকী',
    categories: ['anniversary', 'anniversary_celeb', 'wedding', 'love'],
    author: 'দাম্পত্য সুখ'
  },
  {
    id: 'q021',
    text: 'বছরের পর বছর কেটে গেলেও তোমার চোখে সেই প্রথম দিনের ভালোবাসাই দেখতে পাই।',
    category: '💑 বিবাহবার্ষিকী',
    categories: ['anniversary', 'anniversary_celeb', 'romantic'],
    author: 'চিরন্তন বন্ধন'
  },

  // --- পরিবার (মা, বাবা, ভাই, বোন) ---
  {
    id: 'q022',
    text: 'মা, তোমার কোলের মতো নিরাপদ কোনো আশ্রয় এই পুরো পৃথিবীতে আর কোথাও নেই।',
    category: '👩 মায়ের জন্য',
    categories: ['mother', 'family', 'thank_you'],
    author: 'সন্তানের অনুভূতি'
  },
  {
    id: 'q023',
    text: 'তুমি শিখিয়েছো কীভাবে নিঃস্বার্থ ভালোবাসতে হয়। ভালো থেকো মা, সবসময়।',
    category: '👩 মায়ের জন্য',
    categories: ['mother', 'family', 'best_wishes'],
    author: 'মায়ের আঁচল'
  },
  {
    id: 'q024',
    text: 'বাবা মানে মাথার ওপর এক বটবৃক্ষের ছায়া, যিনি নীরবে সব ঝড় সামলে নেন।',
    category: '👨 বাবার জন্য',
    categories: ['father', 'family', 'thank_you'],
    author: 'বাবার স্নেহ'
  },
  {
    id: 'q025',
    text: 'তোমার হাত ধরে জীবনের শক্ত মাটি চিনেছি। তোমার প্রতি রইল বিনম্র শ্রদ্ধা, বাবা।',
    category: '👨 বাবার জন্য',
    categories: ['father', 'family', 'best_wishes'],
    author: 'কৃতজ্ঞ সন্তান'
  },
  {
    id: 'q026',
    text: 'প্রিয় বোন, তোমার মিষ্টি হাসি যেন আমাদের বাড়ির প্রতিটি কোণে আনন্দ ছড়িয়ে দেয়।',
    category: '👧 বোনের জন্য',
    categories: ['sister', 'family', 'best_wishes'],
    author: 'স্নেহের বাঁধন'
  },
  {
    id: 'q027',
    text: 'ভাই, যেকোনো বিপদে যার পাশে থাকা আমাকে সাহস দেয়, সে তুমি। সবসময় পাশে থেকো।',
    category: '👦 ভাইয়ের জন্য',
    categories: ['brother', 'family', 'friendship'],
    author: 'অটুট বন্ধন'
  },

  // --- বন্ধুত্ব, কৃতজ্ঞতা ও ক্ষমা ---
  {
    id: 'q028',
    text: 'ভালো বন্ধু জীবনের গল্পের সবচেয়ে সুন্দর অধ্যায়।',
    category: '🤝 বন্ধুত্ব',
    categories: ['friendship', 'for_friend'],
    author: 'বন্ধুত্বের বাঁধন'
  },
  {
    id: 'q029',
    text: 'হাজারটা সম্পর্কের ভিড়ে যে নিঃশর্তে পাশে থাকে, সেই তো সত্যিকারের বন্ধু।',
    category: '🤝 বন্ধুত্ব',
    categories: ['friendship', 'for_friend'],
    author: 'আজীবন বন্ধু'
  },
  {
    id: 'q030',
    text: 'তুমি আমার জীবনে এমন এক মানুষ, যার পাশে থাকলে কোনো ভণিতা করতে হয় না।',
    category: '🫂 বন্ধুর জন্য',
    categories: ['for_friend', 'friendship', 'thank_you'],
    author: 'প্রিয় সাথী'
  },
  {
    id: 'q031',
    text: 'তোমার নিঃস্বার্থ সহযোগিতার জন্য হৃদয়ের গভীর থেকে জানাই আন্তরিক ধন্যবাদ।',
    category: '🙏 ধন্যবাদ',
    categories: ['thank_you', 'greetings', 'best_wishes'],
    author: 'কৃতজ্ঞ হৃদয়'
  },
  {
    id: 'q032',
    text: 'অনিচ্ছাকৃত ভুলের জন্য আমি আন্তরিকভাবে দুঃখিত। আমাদের সম্পর্কটা আমার কাছে অমূল্য।',
    category: '🤍 ক্ষমা চাওয়া',
    categories: ['apology', 'friendship', 'love'],
    author: 'আন্তরিক ক্ষমা'
  },
  {
    id: 'q033',
    text: 'তোমার প্রতিটি নতুন পথে থাকুক সাফল্য আর সুন্দর দিনের গল্প।',
    category: '🌷 শুভকামনা',
    categories: ['best_wishes', 'greetings', 'success'],
    author: 'শুভাশিস'
  },

  // --- উৎসব ও উদযাপন (জন্মদিন, বিবাহ, অভিনন্দন, সাফল্য) ---
  {
    id: 'q034',
    text: 'তোমার নতুন বছরটা হোক আনন্দ, ভালোবাসা আর সুন্দর স্মৃতিতে ভরা। শুভ জন্মদিন!',
    category: '🎂 জন্মদিন',
    categories: ['birthday', 'celebration', 'general_wishes'],
    author: 'জন্মদিনের শুভেচ্ছা'
  },
  {
    id: 'q035',
    text: 'জীবনের প্রতিটি নতুন বছরে তোমার মুখে এই উজ্জ্বল হাসি যেন চিরকাল অটুট থাকে।',
    category: '🎂 জন্মদিন',
    categories: ['birthday', 'celebration'],
    author: 'স্নেহের শুভেচ্ছা'
  },
  {
    id: 'q036',
    text: 'দুটো হৃদয়ের এই পবিত্র মিলন ভালোবাসায় ও বিশ্বাসে চিরকাল সমৃদ্ধ হোক। শুভ বিবাহ!',
    category: '💍 বিবাহ',
    categories: ['wedding', 'celebration', 'love'],
    author: 'নবদম্পতির আশীর্বাদ'
  },
  {
    id: 'q037',
    text: 'তোমার কঠোর পরিশ্রম আজ অনন্য সাফল্যের রূপ নিয়েছে। অনেক অনেক অভিনন্দন!',
    category: '🎓 অভিনন্দন',
    categories: ['congratulations', 'success', 'celebration'],
    author: 'গর্বিত শুভাকাঙ্ক্ষী'
  },
  {
    id: 'q038',
    text: 'নতুন নীড়ে শুরু হোক এক নতুন অধ্যায়—সুখ, সমৃদ্ধি আর শান্তিতে ভরে উঠুক এই বাড়ি।',
    category: '🏠 নতুন বাসা',
    categories: ['new_home', 'celebration', 'best_wishes'],
    author: 'গৃহপ্রবেশের দোয়া'
  },
  {
    id: 'q039',
    text: 'পৃথিবীতে স্বাগত নতুন অতিথিকে! পরম করুণাময় তার জীবনে অফুরন্ত বরকত দান করুন।',
    category: '👶 নতুন সন্তান',
    categories: ['new_baby', 'celebration', 'family'],
    author: 'নতুন আলোর ছোঁয়া'
  },

  // --- বৃষ্টি, রাত ও আবেগ ---
  {
    id: 'q040',
    text: 'তোমার কথা মনে পড়লে বৃষ্টিও যেন পুরনো চিঠি হয়ে যায়।',
    category: '🌧️ বৃষ্টি',
    categories: ['rain', 'memories', 'romantic', 'missing'],
    author: 'বৃষ্টির গান'
  },
  {
    id: 'q041',
    text: 'বৃষ্টিভেজা বিকেলে এক কাপ গরম চা আর তোমার স্মৃতি—এর চেয়ে সুন্দর আর কী হতে পারে?',
    category: '🌧️ বৃষ্টি',
    categories: ['rain', 'memories', 'romantic'],
    author: 'শ্রাবণের সুর'
  },
  {
    id: 'q042',
    text: 'যদি রাত শেষে ভোর না হতো, আমি অনন্তকাল ধরে তোমায় ভেবে যেতাম।',
    category: '🌙 রাত',
    categories: ['night', 'romantic', 'love', 'missing'],
    author: 'নিশাচর ভাবনা'
  },
  {
    id: 'q043',
    text: 'নিস্তব্ধ রাতের একলা চাঁদের মতো, কিছু অনুভূতি শুধু নীরবতাতেই কথা বলে।',
    category: '🖤 একাকীত্ব',
    categories: ['loneliness', 'night', 'sadness'],
    author: 'একলা প্রহর'
  },

  // --- বাংলাদেশ ও সংস্কৃতি (ঈদ, রমজান, বৈশাখ, জাতীয় দিবস) ---
  {
    id: 'q044',
    text: 'ঈদের অনাবিল আনন্দ ছড়িয়ে পড়ুক প্রতিটি পরিবারে। ঈদ মোবারক!',
    category: '🕌 ঈদুল ফিতর',
    categories: ['eid_ul_fitr', 'eid_ul_adha', 'cultural', 'celebration'],
    author: 'ঈদের আনন্দ'
  },
  {
    id: 'q045',
    text: 'পবিত্র রমজানের প্রতিটি রোজা নিয়ে আসুক আত্মশুদ্ধি, রহমত ও ক্ষমা। মাহে রমজান মোবারক।',
    category: '🌙 রমজান',
    categories: ['ramadan', 'shab_e_barat', 'shab_e_qadr', 'cultural'],
    author: 'রহমতের দিন'
  },
  {
    id: 'q046',
    text: 'মুছে যাক গ্লানি, ঘুচে যাক জরা—নতুন সূর্যের আলোয় রাঙিয়ে উঠুক জীবন। শুভ নববর্ষ!',
    category: '🌼 পহেলা বৈশাখ',
    categories: ['pohela_boishakh', 'cultural', 'celebration'],
    author: 'বৈশাখী আবাহন'
  },
  {
    id: 'q047',
    text: 'বীর মুক্তিযোদ্ধাদের রক্তে অর্জিত লাল-সবুজের এই পতাকা আমাদের চিরন্তন অহংকার।',
    category: '🇧🇩 স্বাধীনতা দিবস',
    categories: ['independence_day', 'victory_day', 'cultural'],
    author: 'দেশপ্রেম'
  }
];
