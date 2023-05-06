import React, { ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  SPACE,
  LINE_HEIGHT,
  FONT_FAMILY_TEXT,
  CAPTION_FONT_SIZE,
} from 'styles';

type CaptionProps = {
  children: ReactNode;
  margin?: boolean;
};

export const Caption = (props: CaptionProps) => {
  const { children, margin = true } = props;

  return (
    <View style={[styles.wrapper, margin && { marginBottom: SPACE }]}>
      <Text selectable style={[styles.text, styles.textItalic]}>
        {children}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  text: {
    fontSize: CAPTION_FONT_SIZE,
    fontFamily: FONT_FAMILY_TEXT,
    lineHeight: LINE_HEIGHT,
    flex: 1,
  },
  textItalic: {
    fontFamily: 'OpenSans-LightItalic',
  },
});
