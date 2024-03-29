import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, BackHandler } from 'react-native';
import ScrollBottomSheet from 'react-native-scroll-bottom-sheet';

import {
  BottomSheetGroup,
  BottomSheetArticlesGroupDataItem,
  BottomSheetRegionGroupDataItem,
} from 'types';
import { useBottomSheet } from 'lib/hooks';

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

  const backAction = () => {
    if (bottomSheetRef.current.prevSnapIndex === 0) {
      bottomSheetRef.current.snapTo(1);
      return true;
    }

    return false;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
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
