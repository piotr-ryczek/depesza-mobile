import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Linking,
  ImageSourcePropType,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import {
  BORDER_RADIUS,
  SPACE,
  LINE_HEIGHT_SMALL,
  ACTIVE_OPACITY,
  FONT_FAMILY_TEXT_REGULAR,
} from 'styles';
import { BACKGROUND_COLOR, BORDER_WIDTH } from './helpers';

type SupportBoxProps = {
  url: string;
  imageStyles: any;
  buttonStyles?: any;
  imageUrl: ImageSourcePropType;
  providerLabel: string;
};

export const SupportBox = (props: SupportBoxProps) => {
  const {
    url,
    imageStyles,
    buttonStyles = {},
    imageUrl,
    providerLabel,
  } = props;

  const handleGo = () => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity activeOpacity={ACTIVE_OPACITY} onPress={handleGo}>
        <View style={styles.explanationWrapper}>
          <Text style={styles.explanation}>
            Pamiętaj, że autorzy utrzymują się dzięki naszemu wsparciu. Bez
            wpłat wcześniej czy później znikną. Wejdź na {providerLabel} i
            bezpośrednio dołóż swoją cegiełkę do pracy autora!
          </Text>
        </View>
        <View style={{ ...styles.button, ...buttonStyles }}>
          <Image
            source={imageUrl}
            style={{ ...styles.image, ...imageStyles }}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: SPACE,
  },
  explanationWrapper: {
    borderLeftWidth: BORDER_WIDTH,
    borderRightWidth: BORDER_WIDTH,
    borderTopWidth: BORDER_WIDTH,
    borderColor: BACKGROUND_COLOR,
    borderTopLeftRadius: BORDER_RADIUS,
    borderTopRightRadius: BORDER_RADIUS,
    padding: 10,
  },
  explanation: {
    textAlign: 'justify',
    fontFamily: FONT_FAMILY_TEXT_REGULAR,
    lineHeight: LINE_HEIGHT_SMALL,
  },
  button: {
    height: 50,
    borderBottomLeftRadius: BORDER_RADIUS,
    borderBottomRightRadius: BORDER_RADIUS,
    backgroundColor: BACKGROUND_COLOR,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flexGrow: 1,
    marginTop: 0,
  },
});
