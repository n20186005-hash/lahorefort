import type { Locale } from '../i18n';
import { ui } from '../i18n';
import {
  ATTRACTION_FULL_NAME,
  ATTRACTION_FULL_NAME_EN,
  ATTRACTION_SHORT_NAME,
  ATTRACTION_SHORT_NAME_EN,
  CITY_NAME,
  STATE_PROVINCE,
  COUNTRY_CODE,
  STREET_ADDRESS,
  LATITUDE,
  LONGITUDE,
  MAPS_SHARE_URL,
  TELEPHONE,
  RATING_VALUE,
  RATING_COUNT,
  BREADCRUMB_TRAIL,
  BREADCRUMB_TRAIL_EN
} from '../data/site';

const SAME_AS = [
  'https://en.wikipedia.org/wiki/Lahore_Fort',
  'https://whc.unesco.org/en/list/171/'
];

const SITE = 'https://lahorefort.org';

function attractionSchema(locale: Locale) {
  const name = locale === 'en' ? ATTRACTION_FULL_NAME_EN : ATTRACTION_FULL_NAME;
  const alternateName = locale === 'en'
    ? [ATTRACTION_SHORT_NAME_EN, ATTRACTION_FULL_NAME]
    : [ATTRACTION_SHORT_NAME, ATTRACTION_FULL_NAME_EN];
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    '@id': `${SITE}/#attraction`,
    name,
    alternateName,
    description: ui[locale].meta.homeDesc,
    image: [`${SITE}/images/alamgiri-gate.jpg`],
    isAccessibleForFree: false,
    url: `${SITE}/`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: STREET_ADDRESS,
      addressLocality: CITY_NAME,
      addressRegion: STATE_PROVINCE,
      addressCountry: COUNTRY_CODE
    },
    geo: { '@type': 'GeoCoordinates', latitude: LATITUDE, longitude: LONGITUDE },
    hasMap: MAPS_SHARE_URL,
    telephone: TELEPHONE,
    sameAs: SAME_AS,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: RATING_VALUE,
      reviewCount: RATING_COUNT
    }
  };
}

function faqSchema(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: ui[locale].faq.items.map((it) => ({
      '@type': 'Question',
      name: it.question,
      acceptedAnswer: { '@type': 'Answer', text: it.answer }
    }))
  };
}

function breadcrumbSchema(locale: Locale) {
  const trail = locale === 'en' ? BREADCRUMB_TRAIL_EN : BREADCRUMB_TRAIL;
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((label, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: label,
      item: `${SITE}/${i === 0 ? '' : ''}`
    }))
  };
}

export function buildJsonLd(locale: Locale = 'ur') {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: ui[locale].meta.siteName,
      url: `${SITE}/`,
      inLanguage: locale === 'en' ? 'en' : 'ur'
    },
    attractionSchema(locale),
    breadcrumbSchema(locale),
    faqSchema(locale)
  ];
}
