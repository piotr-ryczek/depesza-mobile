import React from 'react';
import { StyleSheet } from 'react-native';

import { BACKGROUND_COLOR, BORDER_WIDTH } from './helpers';
import { SupportBox } from './support-box';

type BuyCoffeeToProps = {
  url: string;
};

export const BuyCoffeeTo = (props: BuyCoffeeToProps) => {
  const { url } = props;

  return (
    <SupportBox
      url={url}
      imageUrl={require('../../../assets/buy-coffee-to.png')}
      imageStyles={StyleSheet.flatten(styles.image)}
      buttonStyles={StyleSheet.flatten(styles.button)}
      providerLabel="BuyCoffeeTo"
    />
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'transparent',
    borderLeftWidth: BORDER_WIDTH,
    borderRightWidth: BORDER_WIDTH,
    borderBottomWidth: BORDER_WIDTH,
    borderColor: BACKGROUND_COLOR,
    transform: [
      {
        translateY: -1,
      },
    ],
  },
  image: {
    height: '60%',
  },
});
