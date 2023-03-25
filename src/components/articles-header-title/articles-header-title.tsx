import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Icon } from 'react-native-elements';

import useBottomSheet from 'lib/hooks/use-bottom-sheet';
import { FONT_FAMILY_HEADER } from 'styles';

type ArticlesHeaderTitleProps = {
  title: string;
};

export const ArticlesHeaderTitle = (props: ArticlesHeaderTitleProps) => {
  const { title } = props;

  const { bottomSheetRef } = useBottomSheet();

  const handleToggleBottomSheet = () => {
    // @ts-ignore
    if (bottomSheetRef.current.prevSnapIndex === 0) {
      // @ts-ignore
      bottomSheetRef.current.snapTo(1);
    } else {
      // @ts-ignore
      bottomSheetRef.current.snapTo(0);
    }
  };

  return (
    <View style={styles.header}>
      <Button
        onPress={handleToggleBottomSheet}
        title={title}
        iconRight
        icon={
          <Icon name="caret-down" size={24} color="white" type="font-awesome" />
        }
        buttonStyle={styles.drawerButton}
        titleStyle={styles.title}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    alignSelf: 'flex-start',
  },
  drawerButton: {
    backgroundColor: 'transparent',
  },
  title: {
    color: 'white',
    fontSize: 18,
    marginRight: 8,
    fontFamily: FONT_FAMILY_HEADER,
  },
});
