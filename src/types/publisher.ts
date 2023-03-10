export interface PublisherInListDto {
  _id: string;
  name: string;
  logoUrl: string;
  description: string;
  patroniteUrl: string;
}

export interface PublisherDto extends PublisherInListDto {
  authors: string[];
  facebookUrl?: string;
  twitterUrl?: string;
  www?: string;
}
