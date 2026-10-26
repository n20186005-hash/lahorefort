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

export const LAT = 31.5882737;
export const LON = 74.3154525;

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

export const TIMEZONE='Asia/Karachi', OFFSET=18000, TTL=600000, DEADLINE=4500;
export interface Forecast {timezone:string;utc_offset_seconds:number;current:{time:string;temperature_2m:number;apparent_temperature:number;relative_humidity_2m:number;weather_code:number;wind_speed_10m:number};daily:{time:string[];weather_code:number[];temperature_2m_max:number[];temperature_2m_min:number[];precipitation_probability_max:(number|null)[];uv_index_max:(number|null)[]}}
export function validateWeather(data:unknown,now=Date.now()):Forecast {
 const d=data as Forecast,c=d?.current,x=d?.daily;const n=(v:unknown,lo:number,hi:number)=>typeof v==='number'&&Number.isFinite(v)&&v>=lo&&v<=hi;
 const today=new Date(now+OFFSET*1000).toISOString().slice(0,10);
 if(d?.timezone!==TIMEZONE||d.utc_offset_seconds!==OFFSET||!c||!x||typeof c.time!=='string'||!/^\d{4}-\d{2}-\d{2}T([01]\d|2[0-3]):[0-5]\d$/.test(c.time))throw Error('Incomplete forecast');
 const age=now-Date.parse(c.time+'+05:00');if(!Number.isFinite(age)||age>10800000||age< -900000||c.time.slice(0,10)!==today)throw Error('Stale forecast');
 for(const [key,lo,hi]of [['temperature_2m',-100,65],['apparent_temperature',-120,80],['relative_humidity_2m',0,100],['wind_speed_10m',0,500]]as const)if(!n(c[key],lo,hi))throw Error('Invalid current number');
 const code=(v:unknown)=>typeof v==='number'&&Object.hasOwn(WMO_EN,v);if(!code(c.weather_code))throw Error('Invalid WMO');
 for(const key of ['time','weather_code','temperature_2m_max','temperature_2m_min','precipitation_probability_max','uv_index_max']as const)if(!Array.isArray(x[key])||x[key].length!==7)throw Error('Incomplete seven days');
 for(let i=0;i<7;i++){const day=new Date(Date.parse(today+'T00:00Z')+i*86400000).toISOString().slice(0,10);if(x.time[i]!==day||!code(x.weather_code[i]))throw Error('Invalid forecast date/code');if(!n(x.temperature_2m_max[i],-100,65)||!n(x.temperature_2m_min[i],-100,65)||x.temperature_2m_min[i]>x.temperature_2m_max[i])throw Error('Invalid temperature');if(x.precipitation_probability_max[i]!==null&&!n(x.precipitation_probability_max[i],0,100))throw Error('Invalid probability');if(x.uv_index_max[i]!==null&&!n(x.uv_index_max[i],0,30))throw Error('Invalid UV');}
 return d;
}
const windLimits=[1,6,12,20,29,39,50,62,75,89,103,118,Infinity];
const windLabels={en:['Calm','Light air','Light breeze','Gentle breeze','Moderate breeze','Fresh breeze','Strong breeze','Near gale','Gale','Strong gale','Storm','Violent storm','Hurricane'],ur:['پُرسکون','بہت ہلکی ہوا','ہلکی ہوا','نرم ہوا','معتدل ہوا','تازہ ہوا','تیز ہوا','بہت تیز ہوا','طوفانی ہوا','شدید طوفانی ہوا','طوفان','شدید طوفان','انتہائی تیز ہوا']};
export function beaufort(kmh:number,locale:Locale):{level:number;label:string}{const level=windLimits.findIndex(limit=>kmh<limit);return {level,label:windLabels[locale][level]};}
export function uvLabel(uv:number,locale:Locale):string {const index=uv<3?0:uv<6?1:uv<8?2:uv<11?3:4;return(locale==='en'?['Low','Moderate','High','Very high','Extreme']:['کم','درمیانہ','زیادہ','بہت زیادہ','انتہائی'])[index];}
export function weekdayLabel(iso:string,locale:Locale):string{return new Intl.DateTimeFormat(locale==='en'?'en-PK':'ur-PK',{weekday:'short',timeZone:'UTC'}).format(new Date(iso+'T12:00Z'));}
export function dayName(_i:number,iso:string,locale:Locale):string{return new Intl.DateTimeFormat(locale==='en'?'en-PK':'ur-PK',{weekday:'short',day:'numeric',month:'short',timeZone:'UTC'}).format(new Date(iso+'T12:00Z'));}
export interface Advice {umbrella:boolean;notes:string[]}
export function buildAdvice(cur:Forecast['current'],today:{precipitation_probability_max?:number|null;uv_index_max?:number|null;temperature_2m_max?:number},locale:Locale='ur'):Advice{
 const en=locale==='en',notes:string[]=[],code=cur.weather_code,pop=today.precipitation_probability_max,storm=[95,96,99].includes(code),heavy=[65,67,82].includes(code),rain=[51,53,55,56,57,61,63,65,66,67,80,81,82].includes(code);
 if(storm)notes.push(en?'The model indicates thunderstorms: seek substantial shelter and avoid isolated trees or exposed walls. Follow local instructions.':'ماڈل گرج چمک بتاتا ہے: محفوظ عمارت میں پناہ لیں، الگ درخت اور کھلی فصیل سے دور رہیں اور مقامی ہدایات دیکھیں۔');
 else if(heavy)notes.push(en?'The model indicates heavy rain: slippery stone and waterlogged paths require caution. It does not confirm a closure.':'ماڈل تیز بارش بتاتا ہے: پھسلن والی پتھریلی جگہ اور جمع پانی سے احتیاط کریں۔ یہ بندش کی اطلاع نہیں۔');
 else if(rain)notes.push(en?'Rain is indicated: use suitable footwear and rain protection on stone paths.':'بارش متوقع ہے: پتھریلے راستوں کے لیے مناسب جوتے اور بارش سے بچاؤ رکھیں۔');
 if(pop!=null&&pop>=40)notes.push(en?'Rain probability is elevated; carry rain protection. Probability does not describe rainfall intensity.':'بارش کا امکان بڑھا ہوا ہے؛ بارش سے بچاؤ ساتھ رکھیں۔ امکان کی شرح بارش کی شدت نہیں بتاتی۔');
 if(today.uv_index_max!=null&&today.uv_index_max>=6)notes.push(en?'High UV: use sun protection, including on cloudy days.':'بالائے بنفشی شعاعیں زیادہ ہیں؛ بادل کے باوجود دھوپ سے بچاؤ رکھیں۔');
 if(cur.wind_speed_10m>=50)notes.push(en?'Strong wind: keep clear of exposed edges and unstable objects.':'ہوا تیز ہے؛ کھلے کناروں اور غیر مستحکم چیزوں سے دور رہیں۔');
 if(today.temperature_2m_max!=null&&today.temperature_2m_max>=38)notes.push(en?'High temperature: carry water and shorten midday sun exposure.':'گرمی زیادہ ہے؛ پانی رکھیں اور دوپہر کی دھوپ میں وقت کم کریں۔');
 else if(today.temperature_2m_max!=null&&today.temperature_2m_max<=15)notes.push(en?'Cool conditions: bring an extra layer.':'ٹھنڈے موسم کے لیے اضافی گرم لباس رکھیں۔');
 if(!notes.length)notes.push(en?'Plan clothing and breaks around the actual conditions. The forecast does not confirm monument access.':'اصل حالات کے مطابق لباس اور وقفے طے کریں۔ پیش گوئی قلعے کے کھلنے کی تصدیق نہیں۔');
 return {umbrella:!storm&&(rain||(pop!=null&&pop>=40)),notes};
}
export async function fetchWeather():Promise<Forecast>{const controller=new AbortController();let timer:ReturnType<typeof setTimeout>|undefined;try{return await Promise.race([(async()=>{const res=await fetch(WX_URL,{signal:controller.signal});if(!res.ok)throw Error('Weather HTTP');const data=validateWeather(await res.json());if(controller.signal.aborted)throw Error('Weather deadline');return data;})(),new Promise<Forecast>((_,reject)=>timer=setTimeout(()=>{controller.abort();reject(Error('Weather deadline'));},DEADLINE))]);}finally{clearTimeout(timer);}}
let cached:{at:number;data:Forecast}|undefined;
export async function getWeather():Promise<Forecast|null>{try{if(cached&&Date.now()-cached.at>=0&&Date.now()-cached.at<TTL)return validateWeather(cached.data);const data=await fetchWeather();cached={at:Date.now(),data};return data;}catch{return null;}}
