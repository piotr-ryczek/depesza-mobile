import React, { ReactNode } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SPACE, SMALL_SPACE, FONT_FAMILY_HEADER } from 'styles';

type Header1Props = {
  children: ReactNode;
  noMarginTop?: boolean;
};

export const Header1 = (props: Header1Props) => {
  const { children, noMarginTop = false } = props;

  return (
    <View style={[styles.wrapper, noMarginTop && { marginTop: 0 }]}>
      <Text selectable style={styles.text}>
        {children}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: SMALL_SPACE,
    marginBottom: SPACE,
  },
  text: {
    fontSize: 24,
    fontFamily: FONT_FAMILY_HEADER,
  },
});
