import raw from './guides.json';
export interface Guide {slug:string;title:string;description:string;summary:string;sections:{heading:string;paragraphs:string[];bullets?:string[]}[];sources:{title:string;url:string;checked:string}[];related:string[];image?:{path:string;alt:string;caption:string};english?:Guide;}
export const guides = raw as Guide[];
export const guidePath = (slug:string,locale:'ur'|'en'='ur') => `${locale==='en'?'/en':''}/guides/${slug}/`;
