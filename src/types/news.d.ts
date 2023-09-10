export interface News {
  title: string;
  description: string;
  link: string;
  enclosure: {
    "@type": string;
    "@url": string;
  };
}
