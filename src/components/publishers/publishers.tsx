import React, { useCallback } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { PublisherInListDto } from 'types';

import { PublisherInList } from './publisher-in-list';

const keyExtractor = ({ _id }: PublisherInListDto): string => _id;

type PublishersProps = {
  publishers: PublisherInListDto[];
};

export const Publishers = (props: PublishersProps) => {
  const { publishers } = props;

  const renderItem = useCallback(
    ({ item }) => <PublisherInList publisher={item} />,
    [],
  );

  return (
    <FlatList
      data={publishers}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      style={styles.wrapper}
    />
  );
};

const styles = StyleSheet.create({
  wrapper: { paddingVertical: 10 },
});
