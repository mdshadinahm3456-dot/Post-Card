import { SITE_CONFIG } from '../config/appConfig';
import { PageSeoConfig } from './seo';

/**
 * Organization structured data (Schema.org / Organization)
 * Represents the official publisher and creator entity of Magic Card.
 */
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_CONFIG.siteUrl}/#organization`,
    name: SITE_CONFIG.siteName,
    url: `${SITE_CONFIG.siteUrl}/`,
    logo: `${SITE_CONFIG.siteUrl}/favicon.svg`,
    image: `${SITE_CONFIG.siteUrl}/og-image.jpg`,
    description: 'A Bangladesh-focused Bengali Vintage Love Card and Postcard Generator.',
    knowsLanguage: 'bn-BD',
    areaServed: {
      '@type': 'Country',
      name: 'Bangladesh',
      identifier: 'BD'
    }
  };
}

/**
 * WebSite structured data (Schema.org / WebSite)
 * Core site-level entity.
 */
export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_CONFIG.siteUrl}/#website`,
    name: SITE_CONFIG.siteName,
    url: `${SITE_CONFIG.siteUrl}/`,
    inLanguage: 'bn-BD',
    description: SITE_CONFIG.defaultDescription,
    publisher: {
      '@id': `${SITE_CONFIG.siteUrl}/#organization`
    }
  };
}

/**
 * WebApplication structured data (Schema.org / WebApplication)
 * Describes the interactive card creator web tool.
 */
export function getWebApplicationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    '@id': `${SITE_CONFIG.siteUrl}/#webapp`,
    name: SITE_CONFIG.siteName,
    url: `${SITE_CONFIG.siteUrl}/`,
    applicationCategory: 'DesignApplication',
    operatingSystem: 'All',
    inLanguage: 'bn-BD',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'BDT'
    },
    creator: {
      '@id': `${SITE_CONFIG.siteUrl}/#organization`
    }
  };
}

/**
 * WebPage structured data (Schema.org / WebPage)
 * Page-specific entity matching dynamic routes with actual name, url, and description.
 */
export function getWebPageSchema(pageKey: string, meta: PageSeoConfig, pageUrl: string) {
  const schema: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: meta.title,
    description: meta.description,
    inLanguage: 'bn-BD',
    isPartOf: {
      '@id': `${SITE_CONFIG.siteUrl}/#website`
    }
  };

  if (pageKey !== 'home' && meta.breadcrumbName) {
    schema.breadcrumb = {
      '@id': `${pageUrl}#breadcrumb`
    };
  }

  return schema;
}

/**
 * BreadcrumbList structured data (Schema.org / BreadcrumbList)
 * Accurately reflects visible navigation: Home → [Subpage].
 */
export function getBreadcrumbSchema(pageKey: string, meta: PageSeoConfig, pageUrl: string) {
  if (pageKey === 'home' || !meta.breadcrumbName) {
    return null;
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${pageUrl}#breadcrumb`,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'হোম',
        item: `${SITE_CONFIG.siteUrl}/`
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: meta.breadcrumbName,
        item: pageUrl
      }
    ]
  };
}

/**
 * Generate full JSON-LD schema array for the specified page.
 * Keeps structured data cleanly separated from UI components.
 */
export function generatePageJsonLd(pageKey: string, meta: PageSeoConfig, canonicalUrl: string) {
  const schemas: any[] = [
    getOrganizationSchema(),
    getWebSiteSchema(),
    getWebApplicationSchema(),
    getWebPageSchema(pageKey, meta, canonicalUrl)
  ];

  const breadcrumbs = getBreadcrumbSchema(pageKey, meta, canonicalUrl);
  if (breadcrumbs) {
    schemas.push(breadcrumbs);
  }

  return schemas;
}
