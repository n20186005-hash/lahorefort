/**
 * Single source of truth for all visitor-facing copy on the Lahore Fort guide.
 *
 * Both languages (Urdu `ur` = primary, English `en`) live here so translations
 * cannot drift. Components receive a `locale` and read `ui[locale]`.
 *
 * Factual/entity data (names, coordinates, phone, ratings, map links) stays in
 * `data/site.ts`; only prose and labels live in this dictionary.
 */

export type Locale = 'ur' | 'en';
export const LOCALES: Locale[] = ['ur', 'en'];
export const HREFLANG: Record<Locale, string> = { ur: 'ur-PK', en: 'en' };
export const DEFAULT_LOCALE: Locale = 'ur';

export interface Card { title: string; text: string; }
export interface Story { title: string; badge: string; text: string; }
export interface Fact { h3: string; p: string; }
export interface Facility { badge: string; title: string; text: string; }
export interface Season { name: string; temp: string; cond: string; tip: string; }
export interface Route { title: string; icon: string; text: string; stops: string[]; }
export interface Itinerary { title: string; text: string; }
export interface FaqItem { question: string; answer: string; }
export interface Content {
  htmlLang: string;
  htmlDir: string;
  nav: { label: string; id: string }[];
  meta: {
    homeTitle: string;
    homeDesc: string;
    privacyTitle: string; privacyDesc: string;
    termsTitle: string; termsDesc: string;
    cookiesTitle: string; cookiesDesc: string;
    notFoundTitle: string; notFoundDesc: string;
    siteName: string;
  };
  hero: { eyebrow: string; h1Sub: string; intro: string; ctaPlan: string; ctaMap: string; };
  stats: { ratingLabel: string; reviewsLabel: string; unescoLabel: string; partsLabel: string; };
  intro: { eyebrow: string; h2: string; p: string; cards: Card[]; };
  gallery: { eyebrow: string; h2: string; p: string; captions: string[]; alts: string[]; };
  buildings: { eyebrow: string; h2: string; p: string; cards: Card[]; };
  history: { eyebrow: string; h2: string; timeline: { title: string; text: string }[]; };
  stories: { eyebrow: string; h2: string; p: string; items: Story[]; };
  visit: { eyebrow: string; h2: string; cards: Card[]; };
  transport: { eyebrow: string; h2: string; p: string; blocks: Fact[]; noticeLabel: string; fine: string; };
  facilities: { eyebrow: string; h2: string; p: string; items: Facility[]; };
  seasonal: { eyebrow: string; h2: string; p: string; tableHeads: string[]; seasons: Season[]; fine: string; };
  weather: { eyebrow: string; h2: string; p: string; adviceTitle: string; footer: string; nowUnavailable: string; };
  audience: { eyebrow: string; h2: string; p: string; routes: Route[]; itineraryHead: string; itineraries: Itinerary[]; };
  nearby: { eyebrow: string; h2: string; nearbyPrefix: string; nearbySuffix: string; cards: Card[]; };
  food: { eyebrow: string; h2: string; p: string; cards: Card[]; };
  map: { eyebrow: string; h2: string; mapPrefix: string; fine: string; iframeTitle: string; };
  responsibility: { eyebrow: string; h2: string; p: string; cards: Card[]; };
  faq: { eyebrow: string; h2: string; items: FaqItem[]; };
  sources: { eyebrow: string; h2: string; fine: string; };
  footer: { desc: string; legalLabel: string; fine1: string; fine2: string; fine3: string; };
}

export const ui: Record<Locale, Content> = {
  ur: {
    htmlLang: 'ur',
    htmlDir: 'rtl',
    nav: [
      { label: 'تعارف', id: 'تعارف' },
      { label: 'دورے کی منصوبہ بندی', id: 'دورہ' },
      { label: 'آمدورفت', id: 'آمدورفت' },
      { label: 'سہولیات', id: 'سہولیات' },
      { label: 'راستے', id: 'راستے' },
      { label: 'موسم', id: 'موسم' },
      { label: 'نقشہ', id: 'نقشہ' },
      { label: 'عام سوالات', id: 'سوالات' }
    ],
    meta: {
      homeTitle: `قلعہ لاہور (Lahore Fort)، لاہور — سیاحتی رہنما | تاریخ، ٹکٹ، اوقات، راستہ اور نقشہ`,
      homeDesc:
        'قلعہ لاہور (Lahore Fort) لاہور، پنجاب، پاکستان کا یونیسکو عالمی ورثہ شاہی قلعہ: تاریخ، مغل فنِ تعمیر، ٹکٹ و اوقات، راستے، پارکنگ، قریبی مقامات، سہولیات، موسم کی پیش گوئی اور نقشہ۔ Lahore Fort ticket price, opening hours, Sheesh Mahal, Alamgiri Gate, Mughal architecture & history — complete visitor guide.',
      privacyTitle: 'رازداری کی پالیسی',
      privacyDesc: 'قلعہ لاہور سیاحتی رہنما کی رازداری کی پالیسی اور کم سے کم ڈیٹا کے استعمال کی وضاحت۔',
      termsTitle: 'خدمت کی شرائط',
      termsDesc: 'قلعہ لاہور آزاد سیاحتی رہنما کی خدمت کی شرائط۔',
      cookiesTitle: 'کوکی ترتیبات',
      cookiesDesc: 'ضروری، تجزیاتی، ترجیحی اور مارکیٹنگ کوکی ترجیحات کا انتظام کریں۔',
      notFoundTitle: 'صفحہ نہیں ملا',
      notFoundDesc: 'درخواست کردہ صفحہ دستیاب نہیں۔',
      siteName: 'قلعہ لاہور، لاہور — سیاحتی رہنما'
    },
    hero: {
      eyebrow: 'یونیسکو عالمی ورثہ • اندرون شہر لاہور',
      h1Sub: '(لاہور، پنجاب، پاکستان)',
      intro:
        'یہاں آپ کا خیر مقدم ہے — قلعہ لاہور، جسے عام طور پر شاہی قلعہ (Lahore Fort) بھی کہا جاتا ہے۔ یہ لاہور، پنجاب، پاکستان کے اندرونِ شہر کے بیچوں بیچ واقع تاریخی مرکز ہے اور مسافروں کے لیے علاقے کا ایک اہم رخنماں (hub) ہے۔',
      ctaPlan: 'دورہ ترتیب دیں',
      ctaMap: 'گوگل نقشے میں کھولیں'
    },
    stats: {
      ratingLabel: 'گوگل نقشے کی فراہم کردہ درجہ بندی*',
      reviewsLabel: 'فراہم کردہ جائزوں کی تعداد*',
      unescoLabel: 'یونیسکو عالمی ورثہ اندراج',
      partsLabel: 'قلعہ کے اہم تاریخی اجزا'
    },
    intro: {
      eyebrow: 'مقام کی شناخت',
      h2: 'قلعہ لاہور کا تعارف',
      p:
        'قلعہ لاہور، جسے عام طور پر Lahore Fort یا شاہی قلعہ کہا جاتا ہے، لاہور شہر، پنجاب، پاکستان کے بیچوں بیچ واقع تاریخی مرکز ہے۔ پنجاب والڈ سٹی اتھارٹی کے مطابق موجودہ قلعے کی بڑی تعمیر اکبر کے عہد میں تقریباً ۱۵۶۶ء سے پکی اینٹوں میں ہوئی، جبکہ جہانگیر، شاہ جہاں اور اورنگزیب نے بعد میں محلات، دیوان، مسجدیں اور دروازے شامل کیے۔ یونیسکو نے قلعہ لاہور اور شالامار باغات کو ۱۹۸۱ء میں عالمی ورثے کی فہرست میں شامل کیا۔',
      cards: [
        { title: 'عالمگیری دروازہ', text: 'اورنگزیب کے دور کا عظیم داخلی دروازہ، جو حضوری باغ اور بادشاہی مسجد کی سمت قلعے کا نمایاں چہرہ بناتا ہے۔' },
        { title: 'شیش محل', text: 'شاہ جہاں کے عہد کی آئینہ کاری، سنگِ مرمر اور باریک تزئین کا مشہور شاہی حصہ، جسے تحفظ کے اصولوں کے تحت دیکھنا چاہیے۔' },
        { title: 'تصویری دیوار', text: 'جہانگیر کے دور میں شروع اور شاہ جہاں کے عہد میں مکمل ہونے والی رنگین کاشی کاری اور نقش و نگار سے آراستہ یادگار دیوار۔' }
      ]
    },
    gallery: {
      eyebrow: 'تصویری جھلکیاں',
      h2: 'قلعہ کے نمایاں حصے',
      p: 'تصویری فائلیں منصوبے میں مقامی راستوں سے لوڈ ہوتی ہیں؛ حقیقی فوٹو ماخذ، اصل فوٹوگرافروں اور آزاد لائسنس کی تفصیل IMAGE-CREDITS.md میں درج ہے۔',
      captions: ['عالمگیری دروازہ', 'شیش محل', 'نولکھا پویلین', 'تصویری دیوار', 'اندرون لاہور سے رات کا منظر'],
      alts: [
        'قلعہ لاہور (Lahore Fort) کا عالمگیری دروازہ — اندرون شہر لاہور، پنجاب، پاکستان',
        'شیش محل، قلعہ لاہور — اندرون شہر لاہور، پنجاب، پاکستان',
        'نولکھا پویلین، قلعہ لاہور — لاہور، پنجاب، پاکستان',
        'تصویری دیوار، قلعہ لاہور — لاہور، پنجاب، پاکستان',
        'قلعہ لاہور کا رات کا منظر — اندرون لاہور، پنجاب، پاکستان'
      ]
    },
    buildings: {
      eyebrow: 'شاہی کمپلیکس کے اندر',
      h2: 'قلعے کی نمایاں عمارتیں',
      p: 'یہ فصیل اپنے اندر درجنوں محلات، دیوان، عبادت گاہیں اور شاہی راستے چھپائے ہوئے ہے۔ تحفظ اور بحالی کے اصولوں کے تحت بعض حصے مخصوص اوقات میں یا عارضی طور پر بند بھی ہو سکتے ہیں، اس لیے دورے کے دوران عملے کی ہدایات پر عمل کریں۔',
      cards: [
        { title: 'دیوانِ عام', text: 'مغل بادشاہ عوام اور درباریوں سے عام ملاقاتوں کے لیے استعمال کرتے تھے؛ دیوارِ جھروکا وہ مقام تھا جہاں سے بادشاہ محفل اور شاہی جلوس دیکھتے تھے۔' },
        { title: 'دیوانِ خاص', text: 'شاہ جہاں کے عہد کا نجی دربار جہاں امرا، سفیروں اور خاص مہمانوں سے ملاقات ہوتی تھی؛ اس کی سنگِ مرمر اور سونے پانی کی تزئین شاہی ذوق کی عکاس ہے۔' },
        { title: 'خواب گاہ', text: 'مغل شہنشاہوں کی نجی رہائش کا حصہ، جو شاہی گوشے (شاہ برج) میں واقع ہے؛ شیش محل اسی شاہی علاقے کی نمایاں تزئین سمجھا جاتا ہے۔' },
        { title: 'موتی مسجد', text: 'شاہ جہاں کے عہد (تقریباً ۱۶۳۰–۳۵ء) میں بننے والی نجی عبادت گاہ؛ سفید سنگِ مرمر اور تین گنبدوں کی وجہ سے اسے "موتی مسجد" کہا جاتا ہے۔' },
        { title: 'نولکھا پویلین', text: 'شاہ جہاں کا سنگِ مرمر کا نجی کمرہ جس کی تعمیر پر تقریباً نو لاکھ روپے لاگت آئی؛ اپنی خمیدہ چھت اور باریک جالیوں کے لیے بھی جانا جاتا ہے۔' },
        { title: 'ہاتھی پائوں', text: 'شاہی ہاتھیوں کے لیے بنائی گئی چوڑی سیڑھیاں؛ ہاتھی پر سوار شہزادے یا خواتین بغیر اترے بالائی شاہی علاقوں تک پہنچ سکتے تھے۔' }
      ]
    },
    history: {
      eyebrow: 'تاریخی تسلسل',
      h2: 'قلعہ لاہور کی تاریخ اور اہمیت',
      timeline: [
        { title: 'قدیم اور قبل از مغل تہیں', text: 'آثارِ قدیمہ کی کھدائی سے اس مقام پر مغل دور سے پہلے انسانی آبادی کے شواہد ملے ہیں؛ موجودہ عمارتوں میں قبل از مغل ڈھانچے باقی نہیں۔' },
        { title: 'اکبر', text: 'سولہویں صدی میں قلعے کو پکی اینٹوں میں ازسرنو منظم اور وسعت دی گئی، جس سے آج کے شاہی قلعے کی بنیادی ترتیب قائم ہوئی۔' },
        { title: 'جہانگیر اور شاہ جہاں', text: 'شاہی چوک، تصویری دیوار، شیش محل، دیوان اور سنگِ مرمر کے نفیس حصوں نے قلعے کو فنِ تعمیر کی نئی تہیں دیں۔' },
        { title: 'اورنگزیب', text: '۱۶۷۴ء میں عالمگیری دروازہ بنایا گیا، جو آج قلعہ لاہور کی سب سے پہچانی جانے والی صورتوں میں شامل ہے۔' },
        { title: 'سکھ دور اور رنجیت سنگھ', text: 'مغل اقتدار کے زوال کے بعد سکھ سلطنت کے بانی مہاراجہ رنجیت سنگھ نے قلعے کو اپنی رہائش اور دربار کے لیے استعمال کیا اور کئی حصوں میں تبدیلیاں کروائیں، جس سے قلعہ ایک نئے سیاسی دور کا مرکز بھی بنا۔' },
        { title: 'برطانوی دور', text: 'انیسویں صدی کے وسط میں پنجاب کے برطانوی کنٹرول میں آنے کے بعد قلعے کے بڑے حصے فوجی استعمال میں آ گئے اور کچھ نفیس تزئینِ سنگِ مرمر کو نقصان پہنچا۔ بعد کے ادوار میں اس کی اہمیت محفوظ یادگار کے طور پر تسلیم ہوتی گئی۔' },
        { title: 'پاکستان اور تحفظ', text: '۱۹۴۷ء کے بعد محکمہ آثارِ قدیمہ و عجائب گھر اور بعد میں پنجاب والڈ سٹی اتھارٹی نے قلعے کی بحالی، مرمت اور سیاحتی رسائی کی نگرانی کا سلسلہ جاری رکھا ہوا ہے۔' },
        { title: 'یونیسکو عالمی ورثہ', text: '۱۹۸۱ء میں قلعہ لاہور اور شالامار باغات کو عالمی ورثے کی فہرست میں شامل کیا گیا۔ ۲۰۰۰ء میں یہ عارضی طور پر خطرے سے دوچار ورثے کی فہرست میں بھی رہا، جو بعد میں تحفظ کی کوششوں کے بعد ختم ہوئی۔' }
      ]
    },
    stories: {
      eyebrow: 'کہانیاں اور روایات',
      h2: 'دیواروں کے پیچھے کی کہانیاں',
      p: 'ذیل میں قلعے سے جڑی تاریخی حقیقتیں، ناموں کی وجوہات اور عوامی روایات دی گئی ہیں۔ ہر شے پر اس کی قسم کا نشان لگایا گیا ہے تاکہ حقیقت اور روایت میں تمیز برقرار رہے؛ عددی تفصیلات کے لیے نیچے دیے گئے معتبر حوالہ جات دیکھیں۔',
      items: [
        { title: '"نولکھا" کا مطلب', badge: 'نام کی وجہ', text: 'شاہ جہاں کے عہد میں جب یہ سنگِ مرمر کا کمرہ تقریباً ۱۶۳۳ء میں مکمل ہوا تو اس پر لاگت تقریباً نو لاکھ روپے آئی۔ عرفِ عام میں "نو لاکھ" ہی بگڑ کر "نولکھا" بن گیا اور یہی نام اس پویلین پر پڑا۔' },
        { title: 'شیش محل کی ستاروں بھری راتیں', badge: 'روایت', text: 'کہا جاتا ہے کہ شیش محل کی دیواروں اور چھتوں میں ہزاروں چھوٹے آئینے جڑے ہوئے ہیں۔ جب اندر شمعیں روشن کی جاتیں تو منعکس روشنی میں پورا کمرہ رات کے ستاروں بھرے آسمان جیسا لگتا — اسی لیے یہ آج بھی قلعے کی سب سے دلکش تزئین مانا جاتا ہے۔' },
        { title: 'ہاتھی پائوں — شاہی ہاتھیوں کا راستہ', badge: 'تاریخی حقیقت', text: 'قلعے کی یہ چوڑی، ہلکی ڈھلوان والی سیڑھیاں اس لیے بنائی گئیں کہ ہاتھی پر سوار شہنشاہ یا شاہی خواتین بغیر اترے بالائی شاہی علاقوں تک جا سکیں۔ مقامی زبان میں اسے "ہاتھی پائوں" یعنی ہاتھی کے قدموں والا راستہ کہا جاتا ہے۔' },
        { title: 'تصویری دیوار — رنگوں میں لکھی تاریخ', badge: 'تاریخی حقیقت', text: 'تصویری دیوار تقریباً ۴۴۲ میٹر طویل اور اوسطاً ۱۵ میٹر اونچی ہے اور قلعے کی شمالی و مغربی فصیل پر پھیلی ہوئی ہے۔ جہانگیر کے دور میں اس پر کام شروع ہوا اور شاہ جہاں کے عہد میں مکمل ہوا؛ کاشی کاری، فریسکو اور شکار و درباری زندگی کے مناظر اسے دنیا کی بڑی مورل دیواروں میں شمار کراتے ہیں۔' },
        { title: 'موتی مسجد کو "موتی" کیوں کہتے ہیں؟', badge: 'نام کی وجہ', text: 'شاہ جہاں کے عہد (تقریباً ۱۶۳۰–۳۵ء) میں بننے والی یہ ذاتی عبادت گاہ انتہائی سفید سنگِ مرمر سے تعمیر ہوئی۔ اس کی سفیدی اور چمک کی وجہ سے اسے موتی سے تشبیہ دی گئی اور یہی نام مشہور ہو گیا۔' },
        { title: 'رنجیت سنگھ کا قلعہ', badge: 'تاریخی حقیقت', text: 'انیسویں صدی کے اوائل میں مہاراجہ رنجیت سنگھ نے قلعے کو اپنی رہائش اور دربار بنایا۔ اس دور میں یہاں سکھ طرز کی کچھ عمارتیں بھی شامل ہوئیں اور قلعہ لاہور ایک نئی سلطنت کے سیاسی مرکز میں بدل گیا۔' },
        { title: 'نقصان سے تحفظ تک', badge: 'تاریخی حقیقت', text: '۱۸۴۹ء کے بعد قلعے کے بڑے حصے فوجی استعمال میں آئے اور کئی نفیس حصے نقصان کا شکار ہوئے۔ بیسویں صدی سے محکمہ آثارِ قدیمہ اور جدید دور میں پنجاب والڈ سٹی اتھارٹی کی کوششوں سے یہ آج پاکستان کے اہم محفوظ تاریخی مقامات میں شمار ہوتا ہے۔' }
      ]
    },
    visit: {
      eyebrow: 'عملی رہنمائی',
      h2: 'اپنا دورہ بہتر بنائیں',
      cards: [
        { title: 'بہترین وقت اور دورانیہ', text: 'سرد مہینوں میں صبح کا وقت زیادہ آرام دہ رہتا ہے۔ عام دورے کے لیے دو سے تین گھنٹے رکھیں؛ فنِ تعمیر یا فوٹوگرافی میں دلچسپی ہو تو مزید وقت فائدہ مند ہے۔' },
        { title: 'ٹکٹ اور فیس', text: 'عمومی داخلہ، طلبہ، غیر ملکی مہمان اور خصوصی گائیڈڈ ٹور کی فیس الگ ہو سکتی ہے۔ صرف مجاز ٹکٹ کاؤنٹر یا پنجاب والڈ سٹی اتھارٹی سے موجودہ قیمت کی تصدیق کریں۔' },
        { title: 'اوقات', text: 'دستیاب سرکاری/مقامی حوالوں میں دن کے اوقات تقریباً 9 بجے صبح سے 6 بجے شام تک درج ہیں، مگر موسم، رمضان، سرکاری تقریب یا تحفظ کے کام کے باعث تبدیلی ممکن ہے۔ روانگی سے پہلے تصدیق کریں۔' }
      ]
    },
    transport: {
      eyebrow: 'تفصیلی آمدورفت',
      h2: 'قلعہ لاہور کیسے پہنچیں',
      p: 'اندرونِ شہر کا یہ تاریخی علاقہ تنگ گلیوں اور بھیڑ والے راستوں پر مشتمل ہے، اس لیے منزل کو عالمگیری دروازے یا پلس کوڈ H8Q7+56P کے ساتھ سیٹ کرنا زیادہ بہتر رہتا ہے۔ ذیل میں مختلف سفری ذرائع کے لیے عملی رہنمائی دی گئی ہے۔',
      blocks: [
        { h3: 'ہوائی اڈے سے', p: 'علامہ اقبال انٹرنیشنل ایئرپورٹ (LHE) شہر کے مشرقی جانب واقع ہے۔ ٹیکسی یا رائیڈ ہیلنگ ایپ کا استعمال کر کے مقام میں "عالمگیری دروازہ، قلعہ لاہور" درج کریں۔ ٹریفک کے حالات کے مطابق سفر عموماً ۳۰ سے ۵۰ منٹ لیتا ہے؛ شام کے اوقات یا تہواروں میں زیادہ وقت رکھیں۔' },
        { h3: 'ریلوے اسٹیشن سے', p: 'لاہور جنکشن ریلوے اسٹیشن قلعے سے تقریباً ۳ تا ۴ کلومیٹر دور ہے۔ وہاں سے رکشہ یا ٹیکسی لے کر فورٹ روڈ تک پہنچا جا سکتا ہے؛ سفر کا دورانیہ ٹریفک کے حساب سے ۱۵ سے ۲۵ منٹ رہتا ہے۔' },
        { h3: 'پبلک ٹرانسپورٹ (میٹرو بس / اورنج لائن)', p: 'مرکزی راہداری پر میٹرو بس اور اورنج لائن میٹرو ٹرین کے قریبی اسٹیشن تک پہنچ کر وہاں سے مجاز رکشہ یا ٹیکسی لیں۔ مقامی ٹریفک انتظام کے مطابق راستہ بدل سکتا ہے، اس لیے روانگی سے پہلے لوکل روٹ کی تصدیق کر لیں۔' },
        { h3: 'ٹیکسی یا رائیڈ ہیلنگ', p: 'شہر بھر سے ٹیکسی اور رائیڈ ہیلنگ ایپس دستیاب ہیں۔ منزل "قلعہ لاہور — عالمگیری دروازہ" یا پلس کوڈ H8Q7+56P درج کریں تاکہ گاڑی اندرونِ شہر کے درست رخ پر پہنچے۔' },
        { h3: 'رکشہ اور موٹر سائیکل رکشہ', p: 'اندرونِ شہر کی تنگ گلیوں کے لیے رکشہ سب سے موزوں ذریعہ ہے۔ ٹریفک کے شگاف سے بچنے کے لیے قریبی تاریخی دروازوں (جیسے دہلی دروازہ یا کشمیری دروازہ) سے پیدل چلنے کا منصوبہ بنا سکتے ہیں۔' },
        { h3: 'پارکنگ', p: 'فصیل اور تاریخی دروازوں کے قریب جگہ محدود رہتی ہے۔ سڑک کے کنارے غیر مجاز پارکنگ کے بجائے مقررہ پارکنگ استعمال کریں؛ مصروف دنوں میں گریٹر اقبال پارک کے اطراف مجاز پارکنگ سے پیدل آنا بہتر ہو سکتا ہے۔' }
      ],
      noticeLabel: 'پتہ اور رابطہ',
      fine: 'راستہ اور پارکنگ کی صورتحال وقت کے ساتھ بدل سکتی ہے۔ تازہ رہنمائی کے لیے گوگل نقشہ کھولیں یا مقامی ٹریفک کے عملے سے رابطہ کریں۔'
    },
    facilities: {
      eyebrow: 'عملی سہولیات',
      h2: 'دورے کے دوران سہولیات',
      p: 'ذیل میں خدمات کی اقسام دی گئی ہیں جو عام طور پر قلعے کے اندر یا اس کے قریب دستیاب ہوتی ہیں۔ یہ رہنما کسی دکان، ہوٹل یا کاروبار کی تجارتی سفارش نہیں کرتا اور کسی نام کا تذکرہ نہیں کرتا؛ موجودہ صورتحال کے لیے موقع پر یا سرکاری ذرائع سے تصدیق کریں۔',
      items: [
        { badge: 'اندر', title: 'بیت الخلا', text: 'عمومی عوامی راستوں پر بیت الخلا کی سہولت موجود ہوتی ہے؛ مخصوص حصے بحالی کے باعث بند ہو سکتے ہیں، اس لیے داخلے پر عملے سے تازہ رہنمائی لیں۔' },
        { badge: 'اندر', title: 'پینے کا پانی', text: 'مقام پر پانی کے انتظامات محدود ہو سکتے ہیں؛ گرم دنوں میں اپنی پانی کی بوتل ساتھ رکھنا بہتر ہے۔' },
        { badge: 'گردونواح', title: 'پارکنگ', text: 'فصیل اور تاریخی دروازوں کے قریب جگہ محدود ہے؛ مقررہ (مجاز) پارکنگ استعمال کریں یا گریٹر اقبال پارک کے اطراف سے پیدل یا رکشے کے ذریعے آئیں۔' },
        { badge: 'گردونواح', title: 'کھانے پینے', text: 'فورٹ روڈ فوڈ اسٹریٹ اور ملحقہ گلیوں میں روایتی ریستوران، چھوٹے کھانے اور اسٹریٹ فوڈ کی اقسام ملتی ہیں؛ صفائی، قیمت اور تازہ مقامی جائزے دیکھ کر انتخاب کریں۔' },
        { badge: 'گردونواح', title: 'رہائش', text: 'اندرونِ شہر اور ملحقہ تجارتی علاقوں میں ہوٹل اور گیسٹ ہاؤس جیسی اقسام دستیاب ہیں؛ بکنگ سے پہلے محل وقوع اور جائزوں کا جائزہ لیں۔' },
        { badge: 'گردونواح', title: 'سٹور اور یادگاری دکانیں', text: 'یادگاری اشیاء، دستکاری اور روزمرہ اشیاء کی دکانیں قریبی گلیوں میں ملتی ہیں؛ دام طے کرنا مقامی روایت ہے۔' },
        { badge: 'گردونواح', title: 'بینک اور اے ٹی ایم', text: 'قریبی تجارتی راستوں پر بینک اور اے ٹی ایم دستیاب ہیں؛ چھوٹی دکانوں پر نقد رقم درکار ہو سکتی ہے، اس لیے کچھ نقد ساتھ رکھیں۔' },
        { badge: 'امداد', title: 'طبی اور ہنگامی خدمات', text: 'قریبی ہسپتال اور کلینک کے علاوہ ہنگامی صورت میں پنجاب کی سرکاری امدادی خدمات (ریسکیو ۱۱۲۲) تک رسائی ممکن ہے۔' },
        { badge: 'امداد', title: 'رہنمائی اور گائیڈڈ ٹور', text: 'مقامی ٹکٹ کاؤنٹر یا پنجاب والڈ سٹی اتھارٹی کے ذریعے مجاز گائیڈڈ ٹور دستیاب ہو سکتی ہے؛ فیس اور دستیابی وقت کے ساتھ بدل سکتی ہے۔' },
        { badge: 'گردونواح', title: 'رسائی اور وہیل چیئر', text: 'مرکزی راستوں پر سطح نسبتاً ہموار ہو سکتی ہے، لیکن تاریخی پتھریلی سیڑھیاں اور چوکھٹیں رکاوٹ بن سکتی ہیں؛ خصوصی ضرورت کے لیے پیشگی رہنمائی لیں۔' },
        { badge: 'گردونواح', title: 'ایندھن اور چارجنگ', text: 'آس پاس کے اہم راستوں پر فیول اسٹیشن اور جہاں دستیاب ہوں، گاڑیوں کی چارجنگ کے انتظامات موجود ہیں؛ طویل سفر سے پہلے گاڑی بھر لیں۔' },
        { badge: 'اندر', title: 'عبادت کی جگہ', text: 'موتی مسجد ایک تاریخی یادگار ہے؛ عبادت کی جگہ کے طور پر اس کا استعمال موقع کے قواعد پر منحصر ہو سکتا ہے۔ مجموعی طور پر علاقے میں عوامی نماز کی سہولت رکھنے والے مقامات موجود ہیں۔' }
      ]
    },
    seasonal: {
      eyebrow: 'موسم اور منصوبہ بندی',
      h2: 'ربع السنہ کے حساب سے دورے کی حکمتِ عملی',
      p: 'ذیل کی جدول طویل المدتی اوسط (climatological norm) پر مبنی عمومی رہنمائی ہے اور ہر سال موسمی تغیر کے ساتھ بدل سکتی ہے۔ اسے قطعی پیش گوئی کے بجائے سفری منصوبہ بندی کے لیے استعمال کریں۔',
      tableHeads: ['موسم', 'درجۂ حرارت', 'موسمی صورتحال', 'سفری تجویز'],
      seasons: [
        { name: 'بہار (مارچ – اپریل)', temp: '۲۰–۳۵°C', cond: 'موسم خوشگوار اور ہوائیں نرم؛ باغات اور صحنوں میں رنگا رنگی', tip: 'سال کا سب سے موزوں وقت — دوپہر کے بعد بھی سیر لطف دیتی ہے۔' },
        { name: 'گرمی (مئی – جون)', temp: '۳۰–۴۵°C', cond: 'شدید گرمی، دوپہر کا حصہ انتہائی تیز', tip: 'صبح سویرے یا شام کے وقت دورہ کریں؛ پانی کی بوتل اور ٹوپی ساتھ رکھیں۔' },
        { name: 'برسات (جولائی – ستمبر)', temp: '۲۸–۳۸°C', cond: 'مون سون کی بارشیں، کبھی کبھی تیز بارش اور نمی', tip: 'چھتری رکھیں اور پتھریلی سیڑھیوں پر پھسلن سے بچیں؛ بارش کے بعد کشی کاری پر روشنی بہتر نظر آتی ہے۔' },
        { name: 'خزاں و سردی (اکتوبر – فروری)', temp: '۷–۲۵°C', cond: 'ٹھنڈا اور عموماً صاف؛ کبھی کبھی دھند یا ہوا کی کیفیت متاثر', tip: 'قلعے کے دورے کے لیے سب سے آرام دہ مہینے — ہلکی جیکٹ اور پیدل چلنے کے لیے آرام دہ جوتے رکھیں۔' }
      ],
      fine: 'ہوا کی کیفیت اور درجۂ حرارت روزانہ کی پیش گوئی سے مختلف ہو سکتے ہیں؛ تازہ موسم اوپر والے موسم والے سیکشن میں دیکھیں۔'
    },
    weather: {
      eyebrow: 'موسم اور منصوبہ بندی',
      h2: 'قلعہ لاہور کا تازہ موسم',
      p: 'نیچے موجودہ موسم اور سات روزہ پیش گوئی دکھائی گئی ہے۔ سفر سے پہلے درجۂ حرارت، بارش کے امکان اور ہوا کے رجحان پر نظر رکھیں؛ عموماً اکتوبر سے مارچ کے ٹھنڈے مہینے قلعے کے دورے کے لیے زیادہ آرام دہ سمجھے جاتے ہیں۔',
      adviceTitle: 'سفری مشورہ',
      footer: 'موسم کی پیش گوئی ایک آزاد موسمیاتی ڈیٹا خدمت سے لی گئی ہے؛ درجۂ حرارت ڈگری سینٹی گریڈ میں ہے اور پیش گوئی وقت کے ساتھ بدل سکتی ہے۔',
      nowUnavailable: 'اس وقت موسم کی معلومات دستیاب نہیں۔'
    },
    audience: {
      eyebrow: 'آپ کے سفر کی ترتیب',
      h2: 'مختلف مسافروں کے لیے راستے',
      p: 'اپنے ساتھیوں اور رفتار کے مطابق ایک راستہ منتخب کریں — ہر راستہ قلعے کی اہمیت کو برقرار رکھتا ہے، بس دیکھنے کا انداز مختلف ہے۔',
      routes: [
        { title: 'خاندانی سفر (بچوں کے ساتھ)', icon: '👨‍👩‍👧‍👦', text: 'کھلے صحن، حضوری باغ اور بادشاہی مسجد کا پیدل حلقہ بچوں کے لیے موزوں ہے۔ دوپہر کی شدت سے بچنے کے لیے صبح کا وقت چنیں اور پانی ساتھ رکھیں۔', stops: ['عالمگیری دروازہ (بیرونی منظر)', 'مرکزی صحن و محرابیں', 'حضوری باغ', 'بادشاہی مسجد (بیرونی)'] },
        { title: 'فوٹوگرافی اور فطرت', icon: '📷', text: 'سونے کی گھنٹی سے پہلے اور غروب کے آس پاس روشنی سب سے نرم رہتی ہے۔ تصویری دیوار، شیش محل اور نولکھا پویلین کی کاشی کاری کلوز اپ کے لیے بہترین ہیں۔', stops: ['تصویری دیوار (Picture Wall)', 'شیش محل', 'نولکھا پویلین', 'عالمگیری دروازہ (سائے دار زاویہ)'] },
        { title: 'کم جسمانی بوجھ / رسائی', icon: '♿', text: 'زیادہ تر مرکزی راستے ہموار ہیں، لیکن کچھ حصے سیڑھیوں والے ہیں۔ سطحی راستوں پر توجہ دیں اور پیشگی رہنمائی کے لیے مقامی عملے سے رابطہ کریں۔', stops: ['زمینی سطح کے صحن', 'مجاز راستہ برائے وہیل چیئر', 'بیرونی دروازوں کا منظر', 'حضوری باغ (ہموار راستہ)'] }
      ],
      itineraryHead: 'عمومی راستے (آدھا دن / پورا دن)',
      itineraries: [
        { title: 'آدھا دن (۲–۳ گھنٹے)', text: 'اگر وقت محدود ہو تو عالمگیری دروازے سے داخل ہو کر مرکزی محلات، شیش محل اور تصویری دیوار دیکھیں، پھر حضوری باغ اور بادشاہی مسجد کے بیرونی حصے کا ایک مختصر پیدل چکر لگائیں۔' },
        { title: 'پورا دن (۴–۶ گھنٹے)', text: 'صبح قلعے کی اندرونی عمارتوں اور عجائب گھروں سے آغاز کریں، دوپہر کا وقفہ قریبی روایتی کھانے کے لیے رکھیں، پھر شام کو حضوری باغ، روشنائی دروازہ، رنجیت سنگھ کی سمادھی اور مینارِ پاکستان کا تاریخی حلقہ مکمل کریں۔' }
      ]
    },
    nearby: {
      eyebrow: 'قریب ہی',
      h2: 'آس پاس کے تاریخی مقامات',
      nearbyPrefix: 'قلعہ لاہور کے دورے کے دوران آپ آسانی سے ',
      nearbySuffix: ' جیسے تاریخی مقامات بھی دیکھ سکتے ہیں، جو ایک ہی تاریخی پیدل حلقے میں آتے ہیں۔',
      cards: [
        { title: 'بادشاہی مسجد', text: 'حضوری باغ کے دوسری جانب واقع عظیم مغل مسجد؛ قلعے کے ساتھ ایک ہی تاریخی پیدل حلقے میں دیکھی جا سکتی ہے۔' },
        { title: 'حضوری باغ اور روشنائی دروازہ', text: 'قلعے اور مسجد کے درمیان شاہی منظرنامے کا اہم حصہ، جہاں سے مغل لاہور کی شہری ترتیب اچھی طرح محسوس ہوتی ہے۔' },
        { title: 'مینارِ پاکستان', text: 'گریٹر اقبال پارک میں واقع قومی یادگار؛ قلعے کے آس پاس کے تاریخی سفر میں آسانی سے شامل کی جا سکتی ہے۔' }
      ]
    },
    food: {
      eyebrow: 'لاہوری ذائقہ',
      h2: 'قریب کی خوراک',
      p: 'فورٹ روڈ فوڈ اسٹریٹ اور اندرون لاہور میں روایتی پنجابی اور لاہوری کھانے ملتے ہیں۔ یہ رہنما کسی خاص کاروبار کی تجارتی سفارش نہیں کرتا؛ صفائی، قیمت اور تازہ مقامی جائزے دیکھ کر انتخاب کریں۔',
      cards: [
        { title: 'روایتی ناشتا', text: 'حلوہ پوری، چنے اور لسی جیسے مقامی ناشتے صبح کے دورے کے ساتھ مقبول انتخاب ہیں۔' },
        { title: 'لاہوری کھانے', text: 'کڑاہی، کباب، نان اور دیگر پنجابی پکوان علاقے کی خوراکی شناخت کا اہم حصہ ہیں۔' },
        { title: 'فوڈ اسٹریٹ کا منظر', text: 'شام کے وقت تاریخی چھتوں اور گلیوں سے قلعہ اور بادشاہی مسجد کے مناظر دکھائی دیتے ہیں؛ اوقات اور رسائی موقع پر دیکھیں۔' }
      ]
    },
    map: {
      eyebrow: 'جغرافیائی شناخت',
      h2: 'قلعہ لاہور کا نقشہ',
      mapPrefix: ' (Lahore Fort) ',
      fine: 'سرکاری معلومات اور تازہ اعلانات کے لیے پنجاب والڈ سٹی اتھارٹی — قلعہ لاہور اور پاکستان ٹورزم ڈیولپمنٹ کارپوریشن دیکھیں۔',
      iframeTitle: 'قلعہ لاہور کا گوگل نقشہ'
    },
    responsibility: {
      eyebrow: 'شعور اور ذمہ داری',
      h2: 'سیاحتی ذمہ داری اور تحفظ',
      p: 'یہ رہنما ایک آزاد، غیر منافع بخش معلوماتی منصوبہ ہے۔ قلعے کو محفوظ رکھنے میں آپ کا کردار اس کی دیکھ بھال کا حصہ ہے — ذیل کے نکات سفر کے دوران مددگار ثابت ہوں گے۔',
      cards: [
        { title: 'ورثے کا تحفظ', text: 'قلعے کی کاشی کاری، فریسکو اور آئینہ کاری نایاب ہیں۔ دیواروں، ستونوں اور نقوش کو ہاتھ نہ لگائیں اور فوٹوگرافی میں فلیش کا استعمال حد تک رکھیں تاکہ رنگ محفوظ رہیں۔' },
        { title: 'صفر فضلہ', text: 'اپنا کوڑا ساتھ لے جائیں یا مقررہ ری سائیکلنگ پوائنٹس پر ڈالیں۔ تاریخی احاطے کو صاف رکھنا آنے والی نسلوں کے لیے ضروری ہے۔' },
        { title: 'مقامی برادری کا احترام', text: 'اندرونِ شہر رہائشی علاقہ ہے۔ آواز، کیمرے اور راستے کے استعمال میں مقامی لوگوں اور تاجروں کے احترام کا خیال رکھیں۔' },
        { title: 'محفوظ سیاحت', text: 'پتھریلی سیڑھیوں پر پاؤں ٹھیک رکھیں، گرمیوں میں ہائیڈریٹ رہیں اور بارش کے بعد پھسلن والے حصوں سے بچیں۔ ایمرجنسی میں ریسکیو ۱۱۲۲ قابلِ رسائی ہے۔' }
      ]
    },
    faq: {
      eyebrow: 'عام سوالات',
      h2: 'دورے سے پہلے جاننے کی باتیں',
      items: [
        { question: `قلعہ لاہور دیکھنے کے لیے کتنا وقت رکھنا چاہیے؟`, answer: 'مرکزی عمارتیں، عجائب گھر اور صحن سکون سے دیکھنے کے لیے عموماً دو سے تھری گھنٹے مناسب ہیں۔ فنِ تعمیر یا فوٹوگرافی میں دلچسپی ہو تو مزید وقت فائدہ مند ہے۔' },
        { question: 'ٹکٹ اور اوقات کی تازہ معلومات کہاں سے ملیں گی؟', answer: 'اوقات اور فیس بدل سکتے ہیں، اس لیے سفر سے پہلے پنجاب والڈ سٹی اتھارٹی یا مقامی ٹکٹ کاؤنٹر سے تصدیق کریں۔' },
        { question: 'پارکنگ کہاں بہتر ہے؟', answer: 'اندرون شہر کے دروازوں کے قریب جگہ محدود ہو سکتی ہے۔ مقررہ پارکنگ استعمال کریں یا گریٹر اقبال پارک کے اطراف مجاز پارکنگ سے پیدل یا رکشے کے ذریعے آئیں۔' },
        { question: `قلعہ کے ساتھ کون سے مقامات دیکھے جا سکتے ہیں؟`, answer: 'بادشاہی مسجد، حضوری باغ، روشنائی دروازہ، رنجیت سنگھ کی سمادھی اور مینارِ پاکستان قریب واقع ہیں اور ایک ہی تاریخی پیدل حلقے میں آ سکتے ہیں۔' },
        { question: 'کیا قلعے کے اندر بیت الخلا اور پینے کا پانی دستیاب ہے؟', answer: 'عام طور پر مرکزی عوامی راستوں پر بیت الخلا اور پانی کے انتظامات موجود ہوتے ہیں؛ تاہم بحالی یا مخصوص حصوں کی بندش کے باعث صورتحال بدل سکتی ہے، اس لیے داخلے پر عملے سے تازہ رہنمائی لیں۔' },
        { question: 'محدود نقل و حرکت والے زائرین کے لیے رسائی کیسی ہے؟', answer: 'قلعہ تاریخی اور کئی جگہوں پر ناہموار ہے؛ کچھ حصے صرف سیڑھیوں کے ذریعے قابلِ رسائی ہیں۔ خصوصی ضرورت کے لیے روانگی سے پہلے پنجاب والڈ سٹی اتھارٹی یا مقامی انتظامیہ سے عملی راستے کے بارے میں دریافت کریں۔' },
        { question: `لاہور سے قلعہ لاہور تک سب سے قریبی راستہ کون سا ہے؟`, answer: 'اندرونِ شہر کے تاریخی دروازوں (جیسے دہلی دروازہ یا کشمیری دروازہ) سے پیدل یا رکشے کے ذریعے فورٹ روڈ تک آئیں۔ عالمگیری دروازے والا رخ قلعے کا نمایاں چہرہ ہے اور بادشاہی مسجد کے سامنے سے جڑتا ہے۔' },
        { question: 'ہوائی اڈے سے قلعہ لاہور کیسے پہنچیں؟', answer: 'علامہ اقبال انٹرنیشنل ایئرپورٹ (LHE) شہر کے مشرق میں ہے۔ ٹیکسی یا رائیڈ ہیلنگ ایپ کا استعمال کر کے منزل میں "عالمگیری دروازہ، قلعہ لاہور" یا پلس کوڈ H8Q7+56P درج کریں؛ ٹریفک کے حالات کے مطابق سفر عموماً ۳۰ سے ۵۰ منٹ لیتا ہے۔' },
        { question: 'پبلک ٹرانسپورٹ (میٹرو بس / اورنج لائن) سے کیسے آئیں؟', answer: 'لاہور جنکشن ریلوے اسٹیشن اور مرکزی راہداری پر میٹرو بس و اورنج لائن میٹرو ٹرین کے قریبی اسٹیشن تک پہنچ کر وہاں سے مجاز رکشہ یا ٹیکسی لیں۔ مقامی ٹریفک انتظام کے مطابق راستہ بدل سکتا ہے، اس لیے روانگی سے پہلے لوکل روٹ کی تصدیق کریں۔' },
        { question: `قلعہ لاہور دیکھنے کا بہترین موسم کون سا ہے؟`, answer: 'اکتوبر سے مارچ تک کا ٹھنڈا موسم قلعے کے دورے کے لیے زیادہ آرام دہ سمجھا جاتا ہے۔ گرمیوں (اپریل تا جون) میں دوپہر کی شدت کم کرنے کے لیے صبح کی سیر بہتر ہے، جبکہ جولائی سے ستمبر تک مون سون کی بارشوں کا امکان رہتا ہے۔' },
        { question: 'کیا اندرونِ قلعے فوٹوگرافی اور ڈرون کی اجازت ہے؟', answer: 'عام بیرونی حصوں میں فوٹوگرافی عام طور پر جائز ہے، لیکن پنجاب والڈ سٹی اتھارٹی کے قواعد کے مطابق کچھ حساس اندرونی مقامات، تجارتی شوٹس یا ڈرون پر پابندیاں یا اجازت نامہ درکار ہو سکتا ہے۔ موقع پر ہدایات کی پابندی کریں۔' },
        { question: 'کیا گائیڈڈ ٹور دستیاب ہے؟', answer: 'مقامی ٹکٹ کاؤنٹر یا پنجاب والڈ سٹی اتھارٹی کے ذریعے مجاز گائیڈڈ ٹور کی سہولت مل سکتی ہے۔ فیس اور دستیابی وقت کے ساتھ بدل سکتی ہے، اس لیے سفر سے پہلے تصدیق کریں۔' },
        { question: 'قریب کھانے پینے کے لیے کیا ملے گا؟', answer: 'فورٹ روڈ فوڈ اسٹریٹ اور اندرون لاہور میں روایتی پنجابی کھانے، ناشتہ اور اسٹریٹ فوڈ کی اقسام ملتی ہیں۔ یہ رہنما کسی خاص کاروبار کی تجارتی سفارش نہیں کرتا؛ صفائی، قیمت اور تازہ مقامی جائزے دیکھ کر انتخاب کریں۔' },
        { question: `قلعہ لاہور لاہور، پنجاب، پاکستان میں کہاں واقع ہے؟`, answer: `قلعہ لاہور فورٹ روڈ، اندرون شہر لاہور، پنجاب، پاکستان میں واقع ہے۔ GPS نقاط: 31.5882737, 74.3128776۔` },
        { question: `قلعہ لاہور کی ٹکٹ قیمت کتنی ہے؟`, answer: 'داخلے کی فیس کا تعین پنجاب والڈ سٹی اتھارٹی یا مقامی ٹکٹ کاؤنٹر کرتا ہے اور یہ وقت کے ساتھ بدل سکتی ہے (عام، طلبہ، غیر ملکی مہمان اور گائیڈڈ ٹور کے لیے الگ نرخ ہو سکتے ہیں)۔ تازہ "Lahore Fort ticket price" مقام پر یا سرکاری ذریعے سے تصدیق کریں۔' },
        { question: `قلعہ لاہور کے اوقات کیا ہیں؟`, answer: 'دستیاب سرکاری اور مقامی حوالوں میں دن کے اوقات عموماً 9 بجے صبح سے 6 بجے شام تک درج ہیں، لیکن موسم، رمضان، سرکاری تقریب یا تحفظ کے کام کے باعث تبدیلی ممکن ہے۔ "Lahore Fort opening hours" کی تازہ ترین صورتحال سفر سے پہلے جانچیں۔' },
        { question: 'شیش محل (Sheesh Mahal) قلعے میں کیا ہے؟', answer: 'شیش محل شاہ جہاں کے عہد کا نجی شاہی حصہ ہے جس میں آئینہ کاری، سنگِ مرمر اور باریک تزئین ہے۔ یہ قلعہ لاہور کی سب سے مشہور یادگاروں میں سے ایک ہے اور مغل فنِ تعمیر کا شاہکار سمجھا جاتا ہے۔' },
        { question: 'عالمگیری دروازہ (Alamgiri Gate) کیوں مشہور ہے؟', answer: 'عالمگیری دروازہ اورنگزیب کے دور (۱۶۷۴ء) میں بنایا گیا تھا اور قلعے کا نمایاں داخلی رخ ہے جو حضوری باغ اور بادشاہی مسجد کی سمت کھلتا ہے۔ یہ لاہور کی پہچانی جانے والی تاریخی عمارتوں میں شمار ہوتا ہے۔' },
        { question: `قلعہ لاہور کی تاریخ کیا ہے اور اسے کس نے بنایا؟`, answer: 'موجودہ قلعے کی بڑی تعمیر اکبر کے عہد میں تقریباً ۱۵۶۶ء سے پکی اینٹوں میں ہوئی، بعد میں جہانگیر، شاہ جہاں اور اورنگزیب نے محلات، دیوان، مسجدیں اور دروازے شامل کیے۔ ۱۹۸۱ء میں یونیسکو نے اسے عالمی ورثے کی فہرست میں شامل کیا۔' }
      ]
    },
    sources: {
      eyebrow: 'معتبر حوالے',
      h2: 'معلومات کہاں سے تقابل کی گئی ہیں',
      fine: '* گوگل نقشے کی درجہ بندی اور جائزوں کی تعداد صارف کی فراہم کردہ معلومات پر مبنی ہے اور وقت کے ساتھ بدل سکتی ہے۔'
    },
    footer: {
      desc: 'یہ ویب سائٹ ایک آزاد، غیر منافع بخش سیاحتی معلوماتی رہنما منصوبہ ہے اور کسی سرکاری ادارے یا سرکاری تنظیم سے منسلک نہیں۔',
      legalLabel: 'قانونی صفحات',
      fine1: 'اس رہنما کی معلومات میٹروپولیٹن کارپوریشن لاہور، پنجاب والڈ سٹی اتھارٹی، ٹورازم ڈیولپمنٹ کارپوریشن آف پنجاب، پاکستان ٹورزم ڈیولپمنٹ کارپوریشن، محکمہ آثارِ قدیمہ و عجائب گھر پاکستان اور یونیسکو کے عوامی مواد سے تقابل کی گئی ہیں۔ اس میں کوئی تجارتی سفارش شامل نہیں۔',
      fine2: 'تصاویر کے حقوق ان کے اصل فوٹوگرافروں اور حقوق رکھنے والوں کے پاس محفوظ ہیں۔ تصویری کریڈٹ اور لائسنس کی تفصیل منصوبے کی فائل IMAGE-CREDITS.md میں موجود ہے۔',
      fine3: '© 2026'
    }
  },

  en: {
    htmlLang: 'en',
    htmlDir: 'ltr',
    nav: [
      { label: 'Introduction', id: 'introduction' },
      { label: 'Plan your visit', id: 'plan-visit' },
      { label: 'Getting there', id: 'getting-there' },
      { label: 'Facilities', id: 'facilities' },
      { label: 'Routes', id: 'routes' },
      { label: 'Weather', id: 'weather' },
      { label: 'Map', id: 'map' },
      { label: 'FAQ', id: 'faq' }
    ],
    meta: {
      homeTitle: `Lahore Fort (قلعہ لاہور), Lahore — Travel Guide | History, Tickets, Hours, Directions & Map`,
      homeDesc:
        'Lahore Fort (قلعہ لاہور) is a Mughal-era UNESCO World Heritage fort in Lahore, Punjab, Pakistan: history, Mughal architecture, ticket price, opening hours, directions, parking, nearby attractions, visitor facilities, weather forecast and map. Lahore Fort ticket price, opening hours, Sheesh Mahal, Alamgiri Gate, Mughal architecture & history — complete visitor guide.',
      privacyTitle: 'Privacy Policy',
      privacyDesc: 'Privacy policy and minimal-data explanation for the Lahore Fort travel guide.',
      termsTitle: 'Terms of Service',
      termsDesc: 'Terms of service for the independent Lahore Fort travel guide.',
      cookiesTitle: 'Cookie Settings',
      cookiesDesc: 'Manage essential, analytics, preferences and marketing cookie choices.',
      notFoundTitle: 'Page not found',
      notFoundDesc: 'The requested page is not available.',
      siteName: 'Lahore Fort, Lahore — Travel Guide'
    },
    hero: {
      eyebrow: 'UNESCO World Heritage • Walled City of Lahore',
      h1Sub: '(Lahore, Punjab, Pakistan)',
      intro:
        'Welcome — Lahore Fort, more commonly known as Shahi Qila (Lahore Fort). It is a historic hub in the heart of the Walled City of Lahore, Punjab, Pakistan, and an important gateway for travellers exploring the region.',
      ctaPlan: 'Plan your visit',
      ctaMap: 'Open in Google Maps'
    },
    stats: {
      ratingLabel: 'Rating provided by Google Maps*',
      reviewsLabel: 'Number of reviews provided*',
      unescoLabel: 'UNESCO World Heritage inscription',
      partsLabel: 'Major historic components of the fort'
    },
    intro: {
      eyebrow: 'About the site',
      h2: 'Introduction to Lahore Fort',
      p:
        'Lahore Fort, more commonly called Lahore Fort or Shahi Qila, is a historic landmark in the heart of Lahore city, Punjab, Pakistan. According to the Punjab Walled City Authority, the main fort as it stands today was largely rebuilt in fired brick from around 1566 CE during the reign of Akbar, while Jahangir, Shah Jahan and Aurangzeb later added palaces, diwans, mosques and gates. In 1981 UNESCO inscribed Lahore Fort and the Shalimar Gardens on its World Heritage List.',
      cards: [
        { title: 'Alamgiri Gate', text: 'The great entrance gate built under Aurangzeb, forming the fort’s distinctive face towards Hazuri Bagh and the Badshahi Mosque.' },
        { title: 'Sheesh Mahal', text: 'The famous royal apartment of Shah Jahan’s era, renowned for its mirror work, marble and fine ornament — to be viewed in line with conservation principles.' },
        { title: 'Picture Wall', text: 'A celebrated tiled and painted wall begun under Jahangir and completed under Shah Jahan, adorned with colourful kashi tilework and murals.' }
      ]
    },
    gallery: {
      eyebrow: 'Visual glimpses',
      h2: 'Highlights of the fort',
      p: 'Images are loaded from local project paths; the true photo credits, original photographers and open licences are listed in IMAGE-CREDITS.md.',
      captions: ['Alamgiri Gate', 'Sheesh Mahal', 'Naulakha Pavilion', 'Picture Wall', 'Night view from inside Lahore'],
      alts: [
        'Alamgiri Gate of Lahore Fort (Lahore Fort) — Walled City of Lahore, Punjab, Pakistan',
        'Sheesh Mahal, Lahore Fort — Walled City of Lahore, Punjab, Pakistan',
        'Naulakha Pavilion, Lahore Fort — Lahore, Punjab, Pakistan',
        'Picture Wall, Lahore Fort — Lahore, Punjab, Pakistan',
        'Night view of Lahore Fort — inside Lahore, Punjab, Pakistan'
      ]
    },
    buildings: {
      eyebrow: 'Inside the royal complex',
      h2: 'Notable buildings of the fort',
      p: 'Within its ramparts the fort hides dozens of palaces, diwans, places of worship and royal passages. Some sections may be closed at certain times or temporarily for conservation, so follow staff guidance during your visit.',
      cards: [
        { title: 'Diwan-i-Am', text: 'Used by Mughal emperors for public and courtly audiences; the Jharoka wall was where the emperor watched assemblies and royal processions.' },
        { title: 'Diwan-i-Khas', text: 'The private audience hall of Shah Jahan’s era for nobles, ambassadors and special guests; its marble and gilded ornament reflects royal taste.' },
        { title: 'Khwabgah', text: 'The private residential quarters of the Mughal emperors, located in the royal corner (Shah Burj); the Sheesh Mahal is considered the finest ornament of this royal zone.' },
        { title: 'Moti Masjid', text: 'A private place of worship built under Shah Jahan (c. 1630–35), named the "Pearl Mosque" for its white marble and three domes.' },
        { title: 'Naulakha Pavilion', text: 'Shah Jahan’s marble private chamber, said to have cost about nine lakh rupees; also known for its curved roof and fine screens.' },
        { title: 'Elephant Path (Hathi Paon)', text: 'Wide ramps built for the royal elephants so that princes or ladies riding them could reach the upper royal quarters without dismounting.' }
      ]
    },
    history: {
      eyebrow: 'Historical continuity',
      h2: 'History and significance of Lahore Fort',
      timeline: [
        { title: 'Antiquity and pre-Mughal layers', text: 'Archaeological excavation shows evidence of human settlement here before the Mughal period; no pre-Mughal structure survives in the present buildings.' },
        { title: 'Akbar', text: 'In the 16th century the fort was reorganised and expanded in fired brick, establishing the basic layout of today’s royal fort.' },
        { title: 'Jahangir and Shah Jahan', text: 'The royal square, the Picture Wall, the Sheesh Mahal, the diwans and fine marble sections added new layers of architecture to the fort.' },
        { title: 'Aurangzeb', text: 'In 1674 the Alamgiri Gate was built, today one of the most recognised faces of Lahore Fort.' },
        { title: 'Sikh period and Ranjit Singh', text: 'After the decline of Mughal power, Maharaja Ranjit Singh, founder of the Sikh Empire, used the fort for his residence and court and made changes to several parts, turning it into the centre of a new political era.' },
        { title: 'British period', text: 'After Punjab came under British control in the mid-19th century, large parts of the fort were put to military use and some fine marble ornament was damaged. Later eras increasingly recognised its importance as a protected monument.' },
        { title: 'Pakistan and conservation', text: 'After 1947 the Department of Archaeology and Museums, and later the Punjab Walled City Authority, have continued to supervise restoration, repair and tourist access to the fort.' },
        { title: 'UNESCO World Heritage', text: 'In 1981 Lahore Fort and the Shalimar Gardens were inscribed on the World Heritage List. In 2000 it briefly also appeared on the List of World Heritage in Danger, later removed following conservation efforts.' }
      ]
    },
    stories: {
      eyebrow: 'Stories and traditions',
      h2: 'Stories behind the walls',
      p: 'Below are historical facts, reasons behind names and popular traditions associated with the fort. Each item is tagged by type so the distinction between fact and tradition is preserved; for numerical detail see the reliable references below.',
      items: [
        { title: 'Meaning of "Naulakha"', badge: 'Name origin', text: 'When this marble chamber was completed around 1633 under Shah Jahan, it cost about nine lakh rupees. In common speech "nau lakh" corrupted into "Naulakha", and the pavilion took this name.' },
        { title: 'Starry nights of the Sheesh Mahal', badge: 'Tradition', text: 'It is said that thousands of tiny mirrors are set into the walls and ceilings of the Sheesh Mahal. When lamps were lit inside, the reflected light made the whole chamber look like a star-filled night sky — which is why it is still considered the fort’s most enchanting ornament.' },
        { title: 'Elephant Path — the route of royal elephants', badge: 'Historical fact', text: 'These wide, gently sloping ramps were built so that the emperor riding an elephant, or royal ladies, could reach the upper royal quarters without dismounting. In the local language it is called "Hathi Paon", the path of the elephant’s feet.' },
        { title: 'Picture Wall — history written in colour', badge: 'Historical fact', text: 'The Picture Wall is about 442 metres long and on average 15 metres high, spread along the fort’s northern and western ramparts. Work began under Jahangir and was completed under Shah Jahan; its tilework, frescoes and hunting and courtly scenes rank it among the great mural walls of the world.' },
        { title: 'Why is the Moti Masjid called "Pearl"?', badge: 'Name origin', text: 'This private place of worship, built under Shah Jahan (c. 1630–35), was constructed in extremely white marble. Its whiteness and lustre led to a comparison with a pearl, and the name became popular.' },
        { title: 'Ranjit Singh’s fort', badge: 'Historical fact', text: 'In the early 19th century Maharaja Ranjit Singh made the fort his residence and court. Some Sikh-style buildings were added in this period, and Lahore Fort became the political centre of a new empire.' },
        { title: 'From damage to preservation', badge: 'Historical fact', text: 'After 1849 large parts of the fort were put to military use and several fine sections were damaged. From the 20th century, through the Department of Archaeology and, in the modern era, the Punjab Walled City Authority, it is today counted among Pakistan’s important protected historic sites.' }
      ]
    },
    visit: {
      eyebrow: 'Practical guidance',
      h2: 'Make the most of your visit',
      cards: [
        { title: 'Best time and duration', text: 'Mornings in the cooler months are more comfortable. Allow two to three hours for a relaxed visit to the main buildings, museums and courtyards; more time helps if you are interested in architecture or photography.' },
        { title: 'Tickets and fees', text: 'General admission, student, foreign-visitor and special guided-tour rates may differ. Confirm the current price only at the authorised ticket counter or the Punjab Walled City Authority.' },
        { title: 'Opening hours', text: 'Available official and local references list daytime hours roughly 9:00 AM to 6:00 PM, but they may change due to weather, Ramadan, official events or conservation work. Verify before you travel.' }
      ]
    },
    transport: {
      eyebrow: 'Detailed access',
      h2: 'How to reach Lahore Fort',
      p: 'This historic area inside the city is made up of narrow lanes and crowded streets, so it is better to set your destination to the Alamgiri Gate or the plus code H8Q7+56P. Practical guidance for different modes of travel is given below.',
      blocks: [
        { h3: 'From the airport', p: 'Allama Iqbal International Airport (LHE) lies to the east of the city. Use a taxi or ride-hailing app and enter "Alamgiri Gate, Lahore Fort" as the destination. The trip usually takes 30–50 minutes depending on traffic; allow extra time in the evening or during festivals.' },
        { h3: 'From the railway station', p: 'Lahore Junction Railway Station is about 3–4 km from the fort. From there a rickshaw or taxi can take you to Fort Road; the journey is about 15–25 minutes depending on traffic.' },
        { h3: 'Public transport (Metro Bus / Orange Line)', p: 'Reach a nearby station of the Metro Bus or Orange Line Metro Train on the main corridor, then take an authorised rickshaw or taxi from there. Routes may vary with local traffic management, so confirm the local route before departure.' },
        { h3: 'Taxi or ride-hailing', p: 'Taxis and ride-hailing apps are available across the city. Enter "Lahore Fort — Alamgiri Gate" or the plus code H8Q7+56P so the vehicle reaches the correct side inside the Walled City.' },
        { h3: 'Rickshaw and motorcycle rickshaw', p: 'For the narrow lanes of the Walled City the rickshaw is the most suitable means. To avoid traffic snarls you can plan to walk from the nearby historic gates (such as Delhi Gate or Kashmiri Gate).' },
        { h3: 'Parking', p: 'Space near the ramparts and historic gates is limited. Use designated (authorised) parking rather than roadside illegal parking; on busy days it may be better to walk in from authorised parking around Greater Iqbal Park.' }
      ],
      noticeLabel: 'Address and contact',
      fine: 'Routes and parking conditions can change over time. Open Google Maps for fresh guidance or contact local traffic staff on site.'
    },
    facilities: {
      eyebrow: 'Practical facilities',
      h2: 'Facilities during your visit',
      p: 'The types of services listed below are generally available inside or near the fort. This guide does not make a commercial recommendation for any shop, hotel or business and names none; confirm the current situation on site or through official sources.',
      items: [
        { badge: 'Inside', title: 'Toilets', text: 'Toilets are generally available on the main public routes; some may be closed for restoration, so ask staff for fresh guidance on entry.' },
        { badge: 'Inside', title: 'Drinking water', text: 'Water arrangements on site may be limited; on hot days it is better to carry your own water bottle.' },
        { badge: 'Around', title: 'Parking', text: 'Space near the ramparts and historic gates is limited; use designated (authorised) parking or come on foot or by rickshaw from around Greater Iqbal Park.' },
        { badge: 'Around', title: 'Food and drink', text: 'Fort Road Food Street and adjacent lanes offer traditional restaurants, small eateries and street food; choose by checking cleanliness, price and fresh local reviews.' },
        { badge: 'Around', title: 'Accommodation', text: 'Hotels and guest houses are available in the Walled City and adjacent commercial areas; review location and ratings before booking.' },
        { badge: 'Around', title: 'Stores and souvenir shops', text: 'Shops for souvenirs, handicrafts and daily items are found in nearby lanes; bargaining over price is a local custom.' },
        { badge: 'Around', title: 'Bank and ATM', text: 'Banks and ATMs are available on nearby commercial roads; small shops may require cash, so keep some cash with you.' },
        { badge: 'Help', title: 'Medical and emergency services', text: 'Besides nearby hospitals and clinics, in an emergency the Punjab government rescue service (Rescue 1122) is reachable.' },
        { badge: 'Help', title: 'Guidance and guided tours', text: 'Authorised guided tours may be available through the local ticket counter or the Punjab Walled City Authority; fees and availability vary with time.' },
        { badge: 'Around', title: 'Accessibility and wheelchair', text: 'Main routes may be relatively even, but historic stone stairs and thresholds can be obstacles; seek advance guidance for special needs.' },
        { badge: 'Around', title: 'Fuel and charging', text: 'Fuel stations and, where available, vehicle charging facilities exist on important nearby roads; fill up before a long trip.' },
        { badge: 'Inside', title: 'Place of worship', text: 'The Moti Masjid is a historic monument; its use as a place of worship may depend on site rules. The area generally has locations offering public prayer facilities.' }
      ]
    },
    seasonal: {
      eyebrow: 'Weather and planning',
      h2: 'Seasonal visiting strategy',
      p: 'The table below is general guidance based on the long-term climatological norm of the Lahore plain and can vary with weather each year. Use it for trip planning rather than as an exact forecast.',
      tableHeads: ['Season', 'Temperature', 'Conditions', 'Travel tip'],
      seasons: [
        { name: 'Spring (March – April)', temp: '20–35°C', cond: 'Pleasant weather and gentle breeze; colour in gardens and courtyards', tip: 'The most suitable time of the year — a visit remains enjoyable even after noon.' },
        { name: 'Summer (May – June)', temp: '30–45°C', cond: 'Intense heat, midday sun very strong', tip: 'Visit early morning or in the evening; carry a water bottle and a hat.' },
        { name: 'Monsoon (July – September)', temp: '28–38°C', cond: 'Monsoon rains, sometimes heavy with humidity', tip: 'Carry an umbrella and take care on slippery stone stairs; tilework looks better in post-rain light.' },
        { name: 'Autumn & Winter (October – February)', temp: '7–25°C', cond: 'Cool and generally clear; occasional fog or affected air quality', tip: 'The most comfortable months to visit the fort — bring a light jacket and comfortable walking shoes.' }
      ],
      fine: 'Air quality and temperature can differ from the daily forecast; see the live weather in the weather section above.'
    },
    weather: {
      eyebrow: 'Weather and planning',
      h2: "Lahore Fort's current weather",
      p: 'The current weather and 7-day forecast are shown below. Before travelling, keep an eye on temperature, rain probability and wind; the cooler months from October to March are generally considered the most comfortable for visiting the fort.',
      adviceTitle: 'Travel advice',
      footer: 'The weather forecast is taken from an independent meteorological data service; temperatures are in degrees Celsius and the forecast may change over time.',
      nowUnavailable: 'Weather information is not available at the moment.'
    },
    audience: {
      eyebrow: 'Your travel plan',
      h2: 'Routes for different travellers',
      p: 'Choose a route according to your companions and pace — every route preserves the fort’s significance, only the way of seeing differs.',
      routes: [
        { title: 'Family trip (with children)', icon: '👨‍👩‍👧‍👦', text: 'The open courtyards, Hazuri Bagh and the walking loop to the Badshahi Mosque suit children. Choose the morning to avoid midday heat and carry water.', stops: ['Alamgiri Gate (exterior view)', 'Main courtyard and arcades', 'Hazuri Bagh', 'Badshahi Mosque (exterior)'] },
        { title: 'Photography and nature', icon: '📷', text: 'Light is softest before the golden hour and around sunset. The Picture Wall, Sheesh Mahal and Naulakha Pavilion are excellent for close-up tilework.', stops: ['Picture Wall', 'Sheesh Mahal', 'Naulakha Pavilion', 'Alamgiri Gate (shaded angle)'] },
        { title: 'Low mobility / accessibility', icon: '♿', text: 'Most main routes are even, but some parts have stairs. Focus on level paths and contact local staff in advance for guidance.', stops: ['Ground-level courtyards', 'Authorised wheelchair route', 'View of the outer gates', 'Hazuri Bagh (even path)'] }
      ],
      itineraryHead: 'General routes (half day / full day)',
      itineraries: [
        { title: 'Half day (2–3 hours)', text: 'If time is short, enter through the Alamgiri Gate and see the main palaces, the Sheesh Mahal and the Picture Wall, then take a short walk around the exterior of Hazuri Bagh and the Badshahi Mosque.' },
        { title: 'Full day (4–6 hours)', text: 'Start in the morning with the fort’s inner buildings and museums, take a midday break for nearby traditional food, then in the evening complete the historic loop of Hazuri Bagh, Roshnai Gate, Ranjit Singh’s Samadhi and Minar-e-Pakistan.' }
      ]
    },
    nearby: {
      eyebrow: 'Nearby',
      h2: 'Historic sites around',
      nearbyPrefix: 'During a visit to Lahore Fort you can also easily see historic sites such as ',
      nearbySuffix: ', all within the same historic walking loop.',
      cards: [
        { title: 'Badshahi Mosque', text: 'The great Mughal mosque across Hazuri Bagh, viewable in the same historic walking loop as the fort.' },
        { title: 'Hazuri Bagh and Roshnai Gate', text: 'An important part of the royal townscape between the fort and the mosque, where the urban layout of Mughal Lahore is well felt.' },
        { title: 'Minar-e-Pakistan', text: 'A national monument in Greater Iqbal Park, easily included in the historic trip around the fort.' }
      ]
    },
    food: {
      eyebrow: 'Lahori flavour',
      h2: 'Food nearby',
      p: 'Fort Road Food Street and inner Lahore offer traditional Punjabi and Lahori food. This guide does not make a commercial recommendation for any particular business; choose by checking cleanliness, price and fresh local reviews.',
      cards: [
        { title: 'Traditional breakfast', text: 'Local breakfasts such as halwa puri, chickpeas and lassi are popular choices to pair with a morning visit.' },
        { title: 'Lahori dishes', text: 'Karahi, kebabs, naan and other Punjabi cuisine are an important part of the region’s food identity.' },
        { title: 'Food Street views', text: 'In the evening, historic rooftops and lanes offer views of the fort and Badshahi Mosque; check timings and access on site.' }
      ]
    },
    map: {
      eyebrow: 'Geographic identity',
      h2: "Lahore Fort's map",
      mapPrefix: ' (Lahore Fort) ',
      fine: 'For official information and fresh notices see the Punjab Walled City Authority — Lahore Fort and the Pakistan Tourism Development Corporation.',
      iframeTitle: "Lahore Fort's Google Map"
    },
    responsibility: {
      eyebrow: 'Awareness and responsibility',
      h2: 'Responsible and protective tourism',
      p: 'This guide is an independent, non-profit information project. Your role in preserving the fort is part of its care — the points below will help during your visit.',
      cards: [
        { title: 'Protect the heritage', text: 'The fort’s tilework, frescoes and mirror work are rare. Do not touch the walls, columns and motifs, and keep flash photography limited so colours are preserved.' },
        { title: 'Zero waste', text: 'Take your litter with you or use the designated recycling points. Keeping the historic enclosure clean is necessary for future generations.' },
        { title: 'Respect the local community', text: 'The Walled City is a residential area. Be mindful of noise, cameras and the use of pathways with respect for local people and traders.' },
        { title: 'Safe tourism', text: 'Keep your footing on stone stairs, stay hydrated in summer and avoid slippery sections after rain. In an emergency Rescue 1122 is reachable.' }
      ]
    },
    faq: {
      eyebrow: 'FAQ',
      h2: 'Things to know before you visit',
      items: [
        { question: 'How much time should I keep for visiting Lahore Fort?', answer: 'Two to three hours is usually suitable for a relaxed look at the main buildings, museums and courtyards. More time helps if you are interested in architecture or photography.' },
        { question: 'Where do I get fresh ticket and timing information?', answer: 'Hours and fees can change, so confirm with the Punjab Walled City Authority or the local ticket counter before travelling.' },
        { question: 'Where is parking better?', answer: 'Space near the Walled City gates may be limited. Use designated parking or come on foot or by rickshaw from authorised parking around Greater Iqbal Park.' },
        { question: 'Which sites can be seen along with the fort?', answer: 'The Badshahi Mosque, Hazuri Bagh, Roshnai Gate, Ranjit Singh’s Samadhi and Minar-e-Pakistan are nearby and can fall within the same historic walking loop.' },
        { question: 'Are toilets and drinking water available inside the fort?', answer: 'Generally, toilets and water arrangements exist on the main public routes; however, the situation may change due to restoration or closure of specific sections, so ask staff for fresh guidance on entry.' },
        { question: 'How accessible is it for visitors with limited mobility?', answer: 'The fort is historic and uneven in places; some sections are reachable only by stairs. For special needs, inquire with the Punjab Walled City Authority or local administration about the practical route before departure.' },
        { question: 'What is the closest route from Lahore to Lahore Fort?', answer: 'From the historic gates of the Walled City (such as Delhi Gate or Kashmiri Gate) walk or take a rickshaw to Fort Road. The Alamgiri Gate face is the fort’s prominent front and connects in front of the Badshahi Mosque.' },
        { question: 'How to reach Lahore Fort from the airport?', answer: 'Allama Iqbal International Airport (LHE) is east of the city. Use a taxi or ride-hailing app and enter "Alamgiri Gate, Lahore Fort" or the plus code H8Q7+56P as the destination; the trip usually takes 30–50 minutes depending on traffic.' },
        { question: 'How to come by public transport (Metro Bus / Orange Line)?', answer: 'Reach a nearby station of the Lahore Junction Railway Station and the Metro Bus or Orange Line Metro Train on the main corridor, then take an authorised rickshaw or taxi from there. The route may change with local traffic management, so confirm the local route before departure.' },
        { question: 'What is the best season to see Lahore Fort?', answer: 'The cool season from October to March is considered the most comfortable for visiting the fort. In summer (April to June) a morning visit is better to reduce midday heat, while July to September carries a chance of monsoon rains.' },
        { question: 'Is photography and drone allowed inside the fort?', answer: 'Photography is generally permitted in the outer sections, but under Punjab Walled City Authority rules some sensitive inner locations, commercial shoots or drones may require restrictions or permission. Follow on-site instructions.' },
        { question: 'Is a guided tour available?', answer: 'Authorised guided tours may be available through the local ticket counter or the Punjab Walled City Authority. Fees and availability vary with time, so confirm before travelling.' },
        { question: 'What food and drink is available nearby?', answer: 'Fort Road Food Street and inner Lahore offer traditional Punjabi food, breakfast and street food. This guide does not make a commercial recommendation for any particular business; choose by checking cleanliness, price and fresh local reviews.' },
        { question: 'Where is Lahore Fort located in Lahore, Punjab, Pakistan?', answer: 'Lahore Fort is located on Fort Road, Walled City of Lahore, Punjab, Pakistan. GPS coordinates: 31.5882737, 74.3128776.' },
        { question: 'What is the Lahore Fort ticket price?', answer: 'The entry fee is set by the Punjab Walled City Authority or the local ticket counter and may change over time (separate rates may apply for general, student, foreign visitor and guided tour). Confirm the fresh "Lahore Fort ticket price" on site or through official sources.' },
        { question: 'What are the Lahore Fort opening hours?', answer: 'Available official and local references generally list daytime hours as 9:00 AM to 6:00 PM, but they may change due to weather, Ramadan, official events or conservation work. Check the latest "Lahore Fort opening hours" before you travel.' },
        { question: 'What is the Sheesh Mahal (Mirror Palace) inside the fort?', answer: 'The Sheesh Mahal is a private royal apartment of Shah Jahan’s era with mirror work, marble and fine ornament. It is one of the fort’s most famous monuments and is considered a masterpiece of Mughal architecture.' },
        { question: 'Why is the Alamgiri Gate famous?', answer: 'The Alamgiri Gate was built in the era of Aurangzeb (1674) and is the fort’s prominent entrance face opening towards Hazuri Bagh and the Badshahi Mosque. It is counted among Lahore’s most recognisable historic buildings.' },
        { question: 'What is the history of Lahore Fort and who built it?', answer: 'The main fort as it stands today was largely rebuilt in fired brick from around 1566 CE during the reign of Akbar; later Jahangir, Shah Jahan and Aurangzeb added palaces, diwans, mosques and gates. In 1981 UNESCO inscribed it on the World Heritage List.' }
      ]
    },
    sources: {
      eyebrow: 'Reliable references',
      h2: 'Where the information is compared',
      fine: '* The rating and number of reviews on Google Maps are based on user-provided information and may change over time.'
    },
    footer: {
      desc: 'This website is an independent, non-profit tourism information guide project and is not affiliated with any government agency or commercial operator.',
      legalLabel: 'Legal pages',
      fine1: 'The information in this guide is compared against public material from the Metropolitan Corporation Lahore, the Punjab Walled City Authority, the Tourism Development Corporation of Punjab, the Pakistan Tourism Development Corporation, the Department of Archaeology and Museums Pakistan and UNESCO. It contains no commercial recommendation.',
      fine2: 'Image rights belong to their original photographers and rights holders. Image credits and licence details are in the project file IMAGE-CREDITS.md.',
      fine3: '© 2026'
    }
  }
};

export default ui;
