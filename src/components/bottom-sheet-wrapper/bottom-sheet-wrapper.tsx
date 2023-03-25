import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import ScrollBottomSheet from 'react-native-scroll-bottom-sheet';

import {
  BottomSheetGroup,
  BottomSheetArticlesGroupDataItem,
  BottomSheetRegionGroupDataItem,
} from 'types';
import useBottomSheet from 'lib/hooks/use-bottom-sheet';

import { Handle } from './handle';
import { SectionHeader } from './section-header';
import { SectionItem } from './section-item';

const windowHeight = Dimensions.get('window').height;

const keyExtractor = ({
  id,
}: BottomSheetArticlesGroupDataItem | BottomSheetRegionGroupDataItem) => id;

type BottomSheetWrapperProps = {
  groups: BottomSheetGroup[];
};

export const BottomSheetWrapper = (props: BottomSheetWrapperProps) => {
  const { groups } = props;
  const bottomSheetRef = useRef(null);

  const { setBottomSheetRef } = useBottomSheet();

  useEffect(() => {
    // @ts-ignore
    setBottomSheetRef(bottomSheetRef);
  }, []);

  return (
    <ScrollBottomSheet
      componentType="SectionList"
      snapPoints={[0, windowHeight]}
      initialSnapIndex={1}
      renderHandle={Handle}
      sections={groups}
      keyExtractor={keyExtractor}
      renderSectionHeader={SectionHeader}
      renderItem={SectionItem}
      contentContainerStyle={styles.contentContainerStyle}
      ref={bottomSheetRef}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    padding: 16,
    backgroundColor: 'white',
  },
});
