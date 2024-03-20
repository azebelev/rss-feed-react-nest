export interface ChanelFeedDto {
  items: Item[];
  feedUrl: string;
  image: Image;
  paginationLinks: PaginationLinks;
  title: string;
  description?: string;
  pubDate: string;
  link: string;
  language: string;
  copyright: string;
  lastBuildDate: string;
}

export interface Item {
  creator: string;
  title: string;
  link: string;
  pubDate: string;
  'dc:creator': string;
  'media:content'?: MediaContent;
  'media:credit'?: string;
  content: string;
  contentSnippet: string;
  guid: string;
  categories?: Category[];
  isoDate: string;
}

export interface MediaContent {
  $: GeneratedType;
}

export interface GeneratedType {
  height: string;
  medium: string;
  url: string;
  width: string;
}

export interface Category {
  _: string;
  $: GeneratedType2;
}

export interface GeneratedType2 {
  domain: string;
}

export interface Image {
  link: string;
  url: string;
  title: string;
}

export interface PaginationLinks {
  self: string;
}
