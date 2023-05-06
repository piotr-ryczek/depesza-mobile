export type ArticleDto = {
  _id: string;
  isPublished: boolean;
  reportedByLength: number;
  publishedBy: {
    _id: string;
    name: string;
    logoUrl: string;
    patroniteUrl?: string;
    patreonUrl?: string;
    buyCoffeeToUrl?: string;
  };
  title: string;
  excerpt: string;
  content: string;
  region: {
    _id: string;
    title: string;
    contintent: string;
    iconUrl: string;
  };
  createdAt: string;
  reporterBy: string[];
  photoUrl: string;
  author: string;
  wordpressId?: string;
  lastWordpressPhotoUrl?: string;
};
