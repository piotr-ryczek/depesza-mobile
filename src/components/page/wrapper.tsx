import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

type PageWrapperProps = {
  children: ReactNode;
};

export const PageWrapper = (props: PageWrapperProps) => {
  const { children } = props;

  return <View style={styles.wrapper}>{children}</View>;
};

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
});
