export interface PublisherInListDto {
  _id: string;
  name: string;
  logoUrl: string;
  description: string;
  patroniteUrl?: string;
  patreonUrl?: string;
  buyCoffeeToUrl?: string;
}

export interface PublisherDto extends PublisherInListDto {
  authors: string[];
  facebookUrl?: string;
  twitterUrl?: string;
  www?: string;
}
