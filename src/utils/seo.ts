import { SITE_CONFIG } from '../config/appConfig';
import { generatePageJsonLd } from './structuredData';

export interface PageSeoConfig {
  title: string;
  description: string;
  canonicalPath: string;
  robots: string;
  ogType: string;
  breadcrumbName?: string;
}

export const PAGE_SEO_MAP: Record<string, PageSeoConfig> = {
  home: {
    title: 'Magic Card – প্রেমের উক্তি দিয়ে সুন্দর Vintage Card তৈরি করুন',
    description:
      'অনলাইনে তৈরি করুন সুন্দর Vintage Love Card। পছন্দের ডিজাইন ও প্রেমের উক্তি নির্বাচন করুন, নিজের লেখা যোগ করুন এবং HD Card Download করুন।',
    canonicalPath: '/',
    robots: 'index, follow',
    ogType: 'website'
  },
  postcards: {
    title: 'Vintage Postcard Templates | Magic Card',
    description:
      'সুন্দর Vintage Postcard Template বেছে নিন এবং আপনার পছন্দের লেখা দিয়ে নিজের Magic Card তৈরি করুন।',
    canonicalPath: '/postcards',
    robots: 'index, follow',
    ogType: 'website',
    breadcrumbName: 'Vintage Postcard Templates'
  },
  quotes: {
    title: 'বাংলা প্রেমের উক্তি ও Romantic Quotes | Magic Card',
    description:
      'প্রিয় মানুষকে পাঠানোর জন্য সুন্দর বাংলা প্রেমের উক্তি, রোমান্টিক মেসেজ ও আবেগের কথা খুঁজে নিন এবং পছন্দের Card-এ ব্যবহার করুন।',
    canonicalPath: '/quotes',
    robots: 'index, follow',
    ogType: 'website',
    breadcrumbName: 'বাংলা প্রেমের উক্তি'
  },
  gallery: {
    title: 'Vintage Love Card Gallery | Magic Card',
    description:
      'দেখুন সুন্দর Vintage Love Card Gallery এবং পছন্দের ডিজাইন থেকে নিজের Magic Card তৈরি করুন।',
    canonicalPath: '/vintage-gallery',
    robots: 'index, follow',
    ogType: 'website',
    breadcrumbName: 'Vintage Love Card Gallery'
  },
  categories: {
    title: 'Bengali Vintage Card Categories | Magic Card',
    description:
      'প্রেম, রোমান্টিক, বৃষ্টি, বিরহ, মিস করা, প্রেমপত্র, জন্মদিন, Anniversary এবং আরও অনেক Vintage Card category খুঁজে নিন।',
    canonicalPath: '/categories',
    robots: 'index, follow',
    ogType: 'website',
    breadcrumbName: 'Card Categories'
  },
  generator: {
    title: 'Vintage Love Card Generator | Magic Card',
    description:
      'পছন্দের Vintage Card নির্বাচন করুন, বাংলা প্রেমের উক্তি বা নিজের লেখা যোগ করুন, সাজিয়ে নিন এবং HD Card Download করুন।',
    canonicalPath: '/generator',
    robots: 'index, follow',
    ogType: 'website',
    breadcrumbName: 'Magic Card Generator'
  },
  privacy: {
    title: 'Privacy Policy | Magic Card',
    description:
      'Magic Card-এর গোপনীয়তা নীতি ও ব্যবহারকারীর ব্যক্তিগত তথ্য সুরক্ষা বিষয়ক নিয়মাবলী।',
    canonicalPath: '/privacy',
    robots: 'index, follow',
    ogType: 'website',
    breadcrumbName: 'Privacy Policy'
  },
  terms: {
    title: 'Terms & Conditions | Magic Card',
    description:
      'Magic Card ডিজিটাল পোস্টকার্ড প্ল্যাটফর্ম ব্যবহারের সাধারণ নিয়মাবলী ও শর্তসমূহ।',
    canonicalPath: '/terms',
    robots: 'index, follow',
    ogType: 'website',
    breadcrumbName: 'Terms & Conditions'
  },
  contact: {
    title: 'Contact Magic Card',
    description:
      'Magic Card সম্পর্কে যোগাযোগের তথ্য এবং সহায়তা এখানে দেখুন।',
    canonicalPath: '/contact',
    robots: 'index, follow',
    ogType: 'website',
    breadcrumbName: 'Contact'
  },
  about: {
    title: 'আমাদের সম্পর্কে (About Us) | Magic Card',
    description:
      'Magic Card-এর উদ্দেশ্য, বৈশিষ্ট্য ও বাংলাদেশ-ভিত্তিক বাংলা ভিন্টেজ কার্ড তৈরির অভিজ্ঞতা সম্পর্কে জানুন।',
    canonicalPath: '/about',
    robots: 'index, follow',
    ogType: 'website',
    breadcrumbName: 'About Us'
  },
  favorites: {
    title: 'আমার পছন্দ (My Favorites) | Magic Card',
    description:
      'আপনার ব্রাউজারে বুকমার্ক করা পছন্দের পোস্টকার্ড ও উক্তির ব্যক্তিগত সংগ্রহ।',
    canonicalPath: '/favorites',
    robots: 'noindex, nofollow',
    ogType: 'website',
    breadcrumbName: 'আমার পছন্দ'
  },
  'my-creations': {
    title: 'আমার তৈরি কার্ড (My Creations) | Magic Card',
    description:
      'আপনার ডিভাইসে সংরক্ষিত ও কাস্টমাইজড ভিন্টেজ কার্ডসমূহের ব্যক্তিগত সংগ্রহ।',
    canonicalPath: '/my-creations',
    robots: 'noindex, nofollow',
    ogType: 'website',
    breadcrumbName: 'আমার তৈরি কার্ড'
  }
};

/**
 * Helper to update or create a <meta> element in document.head
 */
function setMetaTag(attributeName: 'name' | 'property', attributeValue: string, content: string) {
  let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attributeName, attributeValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

/**
 * Helper to update or create a <link> element in document.head
 */
function setLinkTag(rel: string, href: string) {
  let element = document.querySelector(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
}

/**
 * Updates full technical SEO metadata dynamically based on active page
 */
export function applyPageSeo(pageKey: string) {
  const meta = PAGE_SEO_MAP[pageKey] || PAGE_SEO_MAP.home;
  const canonicalUrl = meta.canonicalPath === '/'
    ? `${SITE_CONFIG.siteUrl}/`
    : `${SITE_CONFIG.siteUrl}${meta.canonicalPath}`;

  const fullOgImageUrl = `${SITE_CONFIG.siteUrl}${SITE_CONFIG.ogImage}`;

  // 1. Page Title
  document.title = meta.title;

  // 2. Meta Description
  setMetaTag('name', 'description', meta.description);

  // 3. Robots Meta (index/follow vs noindex/nofollow for private pages)
  setMetaTag('name', 'robots', meta.robots);
  setMetaTag('name', 'googlebot', meta.robots);

  // 4. Canonical Link
  setLinkTag('canonical', canonicalUrl);

  // 5. Open Graph Meta Tags
  setMetaTag('property', 'og:title', meta.title);
  setMetaTag('property', 'og:description', meta.description);
  setMetaTag('property', 'og:url', canonicalUrl);
  setMetaTag('property', 'og:site_name', SITE_CONFIG.siteName);
  setMetaTag('property', 'og:locale', 'bn_BD');
  setMetaTag('property', 'og:type', meta.ogType);
  setMetaTag('property', 'og:image', fullOgImageUrl);
  setMetaTag('property', 'og:image:width', '1200');
  setMetaTag('property', 'og:image:height', '630');
  setMetaTag('property', 'og:image:alt', `${SITE_CONFIG.siteName} – ${SITE_CONFIG.tagline}`);

  // 6. Twitter / X Card
  setMetaTag('name', 'twitter:card', 'summary_large_image');
  setMetaTag('name', 'twitter:title', meta.title);
  setMetaTag('name', 'twitter:description', meta.description);
  setMetaTag('name', 'twitter:image', fullOgImageUrl);

  // 7. Schema.org JSON-LD structured data
  updateJsonLdSchema(pageKey, meta, canonicalUrl);
}

function updateJsonLdSchema(pageKey: string, meta: PageSeoConfig, canonicalUrl: string) {
  let scriptEl = document.getElementById('magic-card-schema') as HTMLScriptElement | null;
  if (!scriptEl) {
    scriptEl = document.createElement('script');
    scriptEl.id = 'magic-card-schema';
    scriptEl.type = 'application/ld+json';
    document.head.appendChild(scriptEl);
  }

  const schemas = generatePageJsonLd(pageKey, meta, canonicalUrl);
  scriptEl.textContent = JSON.stringify(schemas, null, 2);
}
