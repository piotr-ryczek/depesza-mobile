import React from 'react';
import { StyleSheet } from 'react-native';

import { SupportBox } from './support-box';

type PatreonProps = {
  url: string;
};

export const Patreon = (props: PatreonProps) => {
  const { url } = props;

  return (
    <SupportBox
      url={url}
      imageUrl={require('../../../assets/patreon.png')}
      imageStyles={StyleSheet.flatten(styles.image)}
      providerLabel="Patreon"
    />
  );
};

const styles = StyleSheet.create({
  image: {
    height: '37%',
  },
});
