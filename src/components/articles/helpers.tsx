import { ArticleDto } from 'types';

export const getItem = (data: ArticleDto[], index: number) => {
  const item = data[index];

  return {
    ...item,
    index: index,
    key: item._id,
  };
};
export const getItemCount = (data: ArticleDto[]) => data.length;

export const getKey = (item: ArticleDto) => item._id.toString();

export const invalidArticlesFilter = ({
  publishedBy,
  region,
}: ArticleDto): boolean => !!publishedBy && !!region;
