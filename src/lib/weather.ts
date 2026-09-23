/**
 * Weather data layer for Lahore Fort.
 *
 * The site is a fully static Astro build (Cloudflare Static Assets), so the
 * "server component" fetches data at build time and renders an initial snapshot;
 * a small client script then refreshes it on the fly. A short module-level cache
 * avoids hammering the endpoint during a build.
 *
 * Data source: Open-Meteo forecast endpoint for the fort coordinates.
 *
 * Both Urdu (`ur`) and English (`en`) label sets live here so the panel and the
 * offline client refresh stay in sync with the page language.
 */

import type { Locale } from '../i18n';

export const LAT = 31.588273674183135;
export const LON = 74.31287757729703;

export const WX_URL =
  `https://api.open-meteo.com/v1/forecast` +
  `?latitude=${LAT}&longitude=${LON}` +
  `&current=temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m` +
  `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,uv_index_max` +
  `&timezone=Asia%2FKarachi&forecast_days=7&wind_speed_unit=kmh`;

const URI_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
export function toUrduDigits(n: unknown): string {
  return String(n ?? '').replace(/\d/g, (d) => URI_DIGITS[+d] ?? d);
}

export function digitFormat(n: unknown, locale: Locale): string {
  return locale === 'ur' ? toUrduDigits(n) : String(n ?? '');
}

const WMO_BASE: Record<string, string> = {
  '0': 'صاف',
  '1': 'زیادہ تر صاف',
  '2': 'جزوی ابر آلود',
  '3': 'ابر آلود',
  '45': 'دھند',
  '48': 'برفانی دھند',
  '51': 'ہلکی بوندا باندی',
  '53': 'بوندا باندی',
  '55': 'تیز بوندا باندی',
  '56': 'جمتی ہلکی بوندا باندی',
  '57': 'جمتی تیز بوندا باندی',
  '61': 'ہلکی بارش',
  '63': 'بارش',
  '65': 'تیز بارش',
  '66': 'جمتی ہلکی بارش',
  '67': 'جمتی تیز بارش',
  '71': 'ہلکی برفباری',
  '73': 'برفباری',
  '75': 'تیز برفباری',
  '77': 'برف کے دانے',
  '80': 'ہلکی بارش کے جھلکے',
  '81': 'بارش کے جھلکے',
  '82': 'تیز بارش کے جھلکے',
  '85': 'برفانی جھلکے',
  '86': 'تیز برفانی جھلکے',
  '95': 'گرج چمک',
  '96': 'گرج چمک کے ساتھ ژالہ',
  '99': 'شدید گرج چمک اور ژالہ'
};
const WMO_EN: Record<string, string> = {
  '0': 'Clear',
  '1': 'Mainly clear',
  '2': 'Partly cloudy',
  '3': 'Overcast',
  '45': 'Fog',
  '48': 'Rime fog',
  '51': 'Light drizzle',
  '53': 'Drizzle',
  '55': 'Dense drizzle',
  '56': 'Light freezing drizzle',
  '57': 'Dense freezing drizzle',
  '61': 'Light rain',
  '63': 'Rain',
  '65': 'Heavy rain',
  '66': 'Light freezing rain',
  '67': 'Heavy freezing rain',
  '71': 'Light snow',
  '73': 'Snow',
  '75': 'Heavy snow',
  '77': 'Snow grains',
  '80': 'Light rain showers',
  '81': 'Rain showers',
  '82': 'Violent rain showers',
  '85': 'Snow showers',
  '86': 'Heavy snow showers',
  '95': 'Thunderstorm',
  '96': 'Thunderstorm with hail',
  '99': 'Severe thunderstorm with hail'
};
export const WMO_LABELS: Record<Locale, Record<string, string>> = { ur: WMO_BASE, en: WMO_EN };
export function wmoLabel(code: unknown, locale: Locale): string {
  return (WMO_LABELS[locale] ?? WMO_BASE)[String(code)] ?? (locale === 'en' ? 'Variable weather' : 'مختلف موسم');
}

const BEAUFORT_UR: [number, string][] = [
  [1, 'ہلکی ہوا'], [6, 'ہوا'], [12, 'ہوا'], [20, 'نرم ہوا'], [29, 'معتدل ہوا'],
  [39, 'تیز ہوا'], [50, 'طاقتور ہوا'], [62, 'طوفانی ہوا'], [75, 'طوفان'], [89, 'شدید طوفان'], [1000, 'ہولناک طوفان']
];
const BEAUFORT_EN: [number, string][] = [
  [1, 'Light air'], [6, 'Light breeze'], [12, 'Gentle breeze'], [20, 'Moderate breeze'], [29, 'Fresh breeze'],
  [39, 'Strong breeze'], [50, 'Near gale'], [62, 'Gale'], [75, 'Storm'], [89, 'Violent storm'], [1000, 'Hurricane']
];
const BEAUFORT: Record<Locale, [number, string][]> = { ur: BEAUFORT_UR, en: BEAUFORT_EN };
export function beaufort(kmh: number, locale: Locale): { level: number; label: string } {
  const table = BEAUFORT[locale] ?? BEAUFORT_UR;
  const k = Number(kmh) || 0;
  let level = 0;
  for (let i = 0; i < table.length; i++) {
    if (k >= table[i][0]) level = i;
  }
  return { level, label: table[level][1] as string };
}

export function uvLabel(uv: number, locale: Locale): string {
  const u = Number(uv) || 0;
  if (locale === 'en') {
    if (u < 3) return 'Low';
    if (u < 6) return 'Moderate';
    if (u < 8) return 'High';
    if (u < 11) return 'Very High';
    return 'Extreme';
  }
  if (u < 3) return 'کم';
  if (u < 6) return 'درمیانہ';
  if (u < 8) return 'زیادہ';
  if (u < 11) return 'بہت زیادہ';
  return 'انتہائی';
}

const WEEKDAYS: Record<Locale, string[]> = {
  ur: ['اتوار', 'پیر', 'منگل', 'بدھ', 'جمعرات', 'جمعہ', 'ہفتہ'],
  en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
};
const DAY_LABELS: Record<Locale, { today: string; tomorrow: string }> = {
  ur: { today: 'آج', tomorrow: 'کل' },
  en: { today: 'Today', tomorrow: 'Tomorrow' }
};
export function weekdayLabel(iso: string, locale: Locale): string {
  const p = String(iso).split('-');
  if (p.length < 3) return '';
  return WEEKDAYS[locale][new Date(Date.UTC(+p[0], +p[1] - 1, +p[2])).getUTCDay()];
}
export function dayLabel(i: number, locale: Locale): string {
  if (i === 0) return DAY_LABELS[locale].today;
  if (i === 1) return DAY_LABELS[locale].tomorrow;
  return weekdayLabel('', locale); // fallthrough; real index handled by caller
}
export function dayName(i: number, iso: string, locale: Locale): string {
  if (i === 0) return DAY_LABELS[locale].today;
  if (i === 1) return DAY_LABELS[locale].tomorrow;
  return weekdayLabel(iso, locale);
}

const RAIN_CODES = [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 85, 86, 95, 96, 99];

export interface Advice { umbrella: boolean; notes: string[]; }
/** Neutral, visitor-facing guidance derived from the forecast, in the page language. */
export function buildAdvice(
  cur: { weather_code?: number; wind_speed_10m?: number; temperature_2m?: number } | null | undefined,
  today: { precipitation_probability_max?: number; uv_index_max?: number; temperature_2m_max?: number } | null | undefined,
  locale: Locale = 'ur'
): Advice {
  const notes: string[] = [];
  let umbrella = false;
  const code = Number(cur?.weather_code ?? 0);
  const pop = Number(today?.precipitation_probability_max ?? 0);
  if (RAIN_CODES.includes(code) || pop >= 40) {
    umbrella = true;
    notes.push(locale === 'en'
      ? 'Rain is likely — carry an umbrella or light raincoat and take care on stone stairs.'
      : 'بارش کا امکان ہے — چھتری یا ہلکا بارشی کوٹ ساتھ رکھیں اور پتھریلی سیڑھیوں پر احتیاط کریں۔');
  }
  const uv = Number(today?.uv_index_max ?? 0);
  if (uv >= 6) {
    notes.push(locale === 'en'
      ? `High UV today (index ${Math.round(uv)}) — use a hat, sunglasses and sunscreen.`
      : `آج بالائے بنفشی شعاعیں زیادہ (شدت ${toUrduDigits(Math.round(uv))}) — ٹوپی، عینک اور سن اسکرین استعمال کریں۔`);
  }
  const wind = Number(cur?.wind_speed_10m ?? 0);
  const bf = beaufort(wind, locale);
  if (bf.level >= 6) {
    notes.push(locale === 'en'
      ? `Strong wind (${bf.label}) — keep balance in open areas.`
      : `ہوا تیز (${bf.label}) — کھلے حصوں میں توازن برقرار رکھیں۔`);
  }
  const tmax = Number(today?.temperature_2m_max ?? 0);
  if (tmax >= 38) {
    notes.push(locale === 'en'
      ? 'High temperature — carry a water bottle and seek shade during the midday peak.'
      : 'درجۂ حرارت زیادہ — پانی کی بوتل ساتھ رکھیں اور دوپہر کے شدید حصے میں سائے کا سہارا لیں۔');
  } else if (tmax <= 15) {
    notes.push(locale === 'en'
      ? 'Cool weather — bring warm clothing and a light jacket.'
      : 'موسم ٹھنڈا — گرم لباس اور ہلکی جیکٹ رکھیں۔');
  } else {
    notes.push(locale === 'en'
      ? 'Mild weather — normal tourist clothing is fine.'
      : 'موسم معتدل — عام سیاحتی لباس مناسب ہے۔');
  }
  if (notes.length === 0) notes.push(locale === 'en'
    ? 'Weather is favourable — pick your visiting time.'
    : 'موسم سازگار ہے — دورے کا وقت منتخب کریں۔');
  return { umbrella, notes };
}

/** Module-level cache so multiple render passes reuse one fetch during a build. */
const cache = new Map<string, { ts: number; data: unknown }>();
const TTL = 30 * 60 * 1000;

export async function getWeather(): Promise<unknown | null> {
  try {
    const key = 'fort-v1';
    const hit = cache.get(key);
    if (hit && Date.now() - hit.ts < TTL) return hit.data;
    const res = await fetch(WX_URL, { cf: { cacheTtl: 600 } } as RequestInit);
    if (!res.ok) return null;
    const data = await res.json();
    cache.set(key, { ts: Date.now(), data });
    return data;
  } catch {
    return null;
  }
}
