import React from 'react';

import {
  BottomSheetDataRegionGroup,
  BottomSheetDataArticlesGroup,
} from 'types';
import { Region } from './region';
import { ArticlesGroup } from './articles-group';

type SectionItemProps = {
  item: BottomSheetDataArticlesGroup | BottomSheetDataRegionGroup;
};

export const SectionItem = (props: SectionItemProps) => {
  const { item } = props;
  const { type } = item;

  switch (type) {
    case 'region':
      return <Region region={item} />;
    case 'app':
      return <ArticlesGroup group={item} />;
    default:
      return null;
  }
};
