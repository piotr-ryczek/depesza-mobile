import React from 'react';
import { StyleSheet } from 'react-native';

import { SupportBox } from './support-box';

type PatroniteProps = {
  url: string;
};

export const Patronite = (props: PatroniteProps) => {
  const { url } = props;

  return (
    <SupportBox
      url={url}
      imageUrl={require('../../../assets/patronite.png')}
      imageStyles={StyleSheet.flatten(styles.image)}
      providerLabel="Patronite"
    />
  );
};

const styles = StyleSheet.create({
  image: {
    height: '70%',
  },
});
