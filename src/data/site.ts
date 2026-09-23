/**
 * Single-attraction SEO entity binding.
 *
 * This is the only place holding factual (source-comparable) data about Lahore Fort.
 * Any page title, JSON-LD node, visible NAP block and map link must read from here,
 * so the domain meaning (قلعہ لاہور = Lahore Fort) is semantically bound to
 * the official full name, the city and the country everywhere on the site.
 */

export const DOMAIN_NAME = 'lahorefort.org';
export const SITE_URL = 'https://lahorefort.org';
export const ATTRACTION_ID = `${SITE_URL}/#attraction`;

/** Google Analytics 4 measurement id (loaded only after consent). */
export const GA4_ID = 'G-HXM22WWPKP';

/** Official / full name used by WCLA, UNESCO and DOAM. */
export const ATTRACTION_FULL_NAME = 'قلعہ لاہور';
export const ATTRACTION_FULL_NAME_EN = 'Lahore Fort';
/** Commonly used alias tied to the domain meaning. */
export const ATTRACTION_SHORT_NAME = 'شاہی قلعہ';
export const ATTRACTION_SHORT_NAME_EN = 'Shahi Qila';

export const CITY_NAME = 'لاہور';
export const CITY_NAME_EN = 'Lahore';
export const STATE_PROVINCE = 'پنجاب';
export const STATE_PROVINCE_EN = 'Punjab';
export const COUNTRY_NAME = 'پاکستان';
export const COUNTRY_NAME_EN = 'Pakistan';
export const COUNTRY_CODE = 'PK';

export const PLUS_CODE = 'H8Q7+56P';
export const STREET_ADDRESS = 'H8Q7+56P، فورٹ روڈ، اندرون شہر لاہور';
export const STREET_ADDRESS_EN =
  'Fort Road, Walled City of Lahore, Lahore, Punjab, Pakistan';

export const LATITUDE = 31.588273674183135;
export const LONGITUDE = 74.31287757729703;
export const GEO_TEXT = '31.5882737, 74.3128776';

export const TELEPHONE = '+92-42-99204196';
export const TELEPHONE_DISPLAY = '+92 42 99204196';

export const MAPS_SHARE_URL = 'https://maps.app.goo.gl/new9CMHfA9H4XSZH6';
export const MAPS_EMBED_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6045.018717305006!2d74.31287757729703!3d31.588273674183135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39191b622e82346f%3A0x35bdc71e324cb4ec!2z5ouJ5ZCI5bCU5aCh!5e1!3m2!1szh-CN!2s!4v1788420833647!5m2!1szh-CN!2s';

/** Google listing snapshot (indicative, changes over time). */
export const RATING_VALUE = 4.6;
export const RATING_COUNT = 26406;
export const RATING_BEST = 5;

export const OPENING_OPENS = '09:00';
export const OPENING_CLOSES = '18:00';
export const OPENING_HOURS_TEXT = '9 بجے صبح سے 6 بجے شام تک';

export const HERO_IMAGE = '/images/alamgiri-gate.jpg';
export const HERO_IMAGE_ALT =
  'قلعہ لاہور (Lahore Fort) کا تاریخی عالمگیری دروازہ — اندرون شہر لاہور، پنجاب، پاکستان';

/** Core landmarks clustering around the fort (entity expansion). */
export const NEARBY_LANDMARKS = [
  'بادشاہی مسجد',
  'حضوری باغ',
  'روشنائی دروازہ',
  'مینارِ پاکستان',
  'رنجیت سنگھ کی سمادھی'
];
export const NEARBY_LANDMARKS_EN = [
  'Badshahi Mosque',
  'Hazuri Bagh',
  'Roshnai Gate',
  'Minar-e-Pakistan',
  'Ranjit Singh Samadhi'
];

/** Official / institutional outbound references (E-E-A-T). */
export const AUTHORITY_SOURCES = [
  {
    name: 'پنجاب والڈ سٹی اتھارٹی — قلعہ لاہور',
    url: 'https://walledcitylahore.gop.pk/lahore-fort/'
  },
  {
    name: 'یونیسکو — قلعہ لاہور اور شالامار باغات',
    url: 'https://whc.unesco.org/en/list/171/'
  },
  {
    name: 'محکمہ آثارِ قدیمہ و عجائب گھر پاکستان — محفوظ مقام',
    url: 'https://doam.gov.pk/public/sites/6502'
  },
  { name: 'میٹروپولیٹن کارپوریشن لاہور', url: 'https://lahore-mc.punjab.gov.pk/' },
  {
    name: 'ٹورازم ڈیولپمنٹ کارپوریشن آف پنجاب',
    url: 'https://tdcp.gop.pk/'
  },
  {
    name: 'پاکستان ٹورزم ڈیولپمنٹ کارپوریشن',
    url: 'https://tourism.gov.pk/'
  }
];

/** English names for the same authority sources (E-E-A-T, mirrored copy). */
export const AUTHORITY_SOURCES_EN = [
  { name: 'Punjab Walled City Authority — Lahore Fort', url: 'https://walledcitylahore.gop.pk/lahore-fort/' },
  { name: 'UNESCO — Lahore Fort and Shalamar Gardens', url: 'https://whc.unesco.org/en/list/171/' },
  {
    name: 'Department of Archaeology and Museums, Pakistan — Protected Site',
    url: 'https://doam.gov.pk/public/sites/6502'
  },
  { name: 'Metropolitan Corporation Lahore', url: 'https://lahore-mc.punjab.gov.pk/' },
  { name: 'Tourism Development Corporation of Punjab', url: 'https://tdcp.gop.pk/' },
  { name: 'Pakistan Tourism Development Corporation', url: 'https://tourism.gov.pk/' }
];

/** Breadcrumb trail in English (mirrors BREADCRUMB_TRAIL). */
export const BREADCRUMB_TRAIL_EN = [
  ATTRACTION_FULL_NAME_EN,
  CITY_NAME_EN,
  STATE_PROVINCE_EN,
  COUNTRY_NAME_EN
];

/** Government tourism portal used for authoritative outbound linking. */
export const GOVT_TOURISM_URL = 'https://tourism.gov.pk/';
export const GOVT_TOURISM_NAME = 'پاکستان ٹورزم ڈیولپمنٹ کارپوریشن';

/**
 * SEO site name follows the "attraction + city + travel guide" pattern
 * (قلعہ لاہور + لاہور + سیاحتی رہنما). Used for og:site_name, JSON-LD and
 * every secondary page title suffix.
 */
export const SITE_NAME = `${ATTRACTION_FULL_NAME}، ${CITY_NAME} — سیاحتی رہنما`;
export const SITE_NAME_EN = `${ATTRACTION_FULL_NAME_EN}, ${CITY_NAME_EN} — Travel Guide`;

/** Appends the canonical site name so every page shares one entity anchor. */
export function withSiteName(locale: 'ur' | 'en', pageTitle: string): string {
  return locale === 'en' ? `${pageTitle} | ${SITE_NAME_EN}` : `${pageTitle} | ${SITE_NAME}`;
}

/** Short display blocks (visible breadcrumb / footer / intro). */
export const BREADCRUMB_TRAIL = [
  ATTRACTION_FULL_NAME,
  CITY_NAME,
  STATE_PROVINCE,
  COUNTRY_NAME
];

export const DESCRIPTIONS = {
  home:
    'قلعہ لاہور (Lahore Fort) لاہور، پنجاب، پاکستان کا یونیسکو عالمی ورثہ شاہی قلعہ: تاریخ، مغل فنِ تعمیر، ٹکٹ و اوقات، راستے، پارکنگ، قریبی مقامات، سہولیات، موسم کی پیش گوئی اور نقشہ۔ Lahore Fort ticket price, opening hours, Sheesh Mahal, Alamgiri Gate, Mughal architecture & history — complete visitor guide.',
  privacy: 'قلعہ لاہور سیاحتی رہنما کی رازداری کی پالیسی اور کم سے کم ڈیٹا کے استعمال کی وضاحت۔',
  terms: 'قلعہ لاہور آزاد سیاحتی رہنما کی خدمت کی شرائط۔',
  cookies: 'ضروری، تجزیاتی، ترجیحی اور مارکیٹنگ کوکی ترجیحات کا انتظام کریں۔',
  notFound: 'درخواست کردہ صفحہ موجود نہیں۔'
};
