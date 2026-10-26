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
    url: `${SITE}/${locale==='en'?'en/':''}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: STREET_ADDRESS,
      addressLocality: CITY_NAME,
      addressRegion: STATE_PROVINCE,
      addressCountry: COUNTRY_CODE
    },
    geo: { '@type': 'GeoCoordinates', latitude: LATITUDE, longitude: LONGITUDE },
    hasMap: MAPS_SHARE_URL,
    sameAs: SAME_AS
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
    faqSchema(locale)
  ];
}
