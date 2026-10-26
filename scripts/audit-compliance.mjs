import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const guides=JSON.parse(fs.readFileSync('src/data/guides.json','utf8'));
let checks=0;const ok=(v,message)=>{assert.ok(v,message);checks++;};
const read=p=>fs.readFileSync(p,'utf8');
const origin='https://lahorefort.org';
const all=[];function walk(p){for(const e of fs.readdirSync(p,{withFileTypes:true})){const f=path.join(p,e.name);if(e.isDirectory())walk(f);else if(f.endsWith('.html'))all.push(f);}}walk('dist');
ok(guides.length===30,'30 independent Urdu guides');
ok(new Set(guides.map(g=>g.slug)).size===30,'unique guide slugs');
ok(new Set(guides.map(g=>g.title)).size===30,'unique titles');
const sitemap=fs.readdirSync('dist').filter(f=>/^sitemap.*\.xml$/.test(f)).map(f=>read('dist/'+f)).join('\n');
for(const guide of guides){
 ok(guide.sections.length>=3,guide.slug+' complete sections');
 ok(guide.sources.length>0&&guide.sources.every(s=>s.url.startsWith('https:')&&s.checked==='2026-10-25'),guide.slug+' dated sources');
 for(const en of [false,...(guide.english?[true]:[])]){
  const route=(en?'/en':'')+'/guides/'+guide.slug+'/';const h=read('dist'+route+'index.html');
  ok(h.includes(`<link rel="canonical" href="${origin+route}"`),route+' self canonical');
  ok(h.includes(`lang="${en?'en':'ur-PK'}"`),route+' language');
  ok((h.match(/<h1(?:\s|>)/g)||[]).length===1,route+' one h1');
  ok(!/name="robots" content="noindex/.test(h),route+' indexable');
  ok(h.includes('Editorial')||h.includes('editorial')||h.includes('ادارتی ذمہ داری'),route+' responsibility');
  ok(h.includes('2026-10-25'),route+' check date');
  ok(sitemap.includes(origin+route),route+' sitemap membership');
  ok(/<link[^>]*hreflang="en"/.test(h)===Boolean(guide.english),route+' real English counterpart only');
  for(const source of guide.sources)ok(h.includes(source.url.replaceAll('&','&amp;')),route+' actual source link');
  for(const section of (en?guide.english:guide).sections)ok(h.includes(section.heading),route+' rendered section');
 }
}
for(const f of all){const h=read(f);ok(h.includes('<title>'),f+' title');ok(h.includes('name="description"'),f+' description');ok(!h.includes('aggregateRating'),f+' no own aggregate rating');ok(!h.includes('historybynight.com'),f+' no unverified booking destination');}
for(const p of ['404.html','en/404/index.html'])ok(read('dist/'+p).includes('name="robots" content="noindex'),p+' noindex');
const home=read('dist/index.html');ok(home.includes('26,453')&&home.includes('Google Maps')&&home.includes('2026-10-25'),'dated attributed Maps snapshot');ok(home.includes('غروب')&&home.includes('صبح 9'),'hours conflict visible');ok(home.includes('74.3154525'),'correct place longitude');
for(const f of ['CREDITS.txt','analytics.js','sw.js','robots.txt','manifest.webmanifest','icons/icon-192.png','icons/icon-512.png'])ok(fs.existsSync('dist/'+f),f+' published');
for(const name of ['Ansub263','Faiza Badar Abbasi','Jawad.hassan89','Muhammad Haider Sajjad','drfyzee'])ok(read('dist/CREDITS.txt').includes(name),'photographer '+name);
ok(!sitemap.includes('/404')&&!sitemap.includes('/cookies/')&&!sitemap.includes('/raazdari/'),'sitemap excludes errors and privacy settings');
console.log(JSON.stringify({status:'PASS',checks,htmlPages:all.length,independentUrduGuides:guides.length,englishCounterparts:guides.filter(g=>g.english).length}));
