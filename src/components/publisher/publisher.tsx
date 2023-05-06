import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

import config from 'lib/config';
import { Patronite } from 'components/support-box/patronite';
import { Patreon } from 'components/support-box/patreon';
import { BuyCoffeeTo } from 'components/support-box/buy-coffee-to';
import { PageWrapper } from 'components/page';
import { Paragraph } from 'components/content';
import { UrlButton } from 'components/url-button';
import { clearUrl, getImageUrl } from 'lib/helpers';
import { PublisherDto, ThumbnailSize } from 'types';

type PublisherProps = {
  publisher: PublisherDto;
};

export const Publisher = (props: PublisherProps) => {
  const { publisher } = props;

  if (!publisher) return null;

  const {
    patroniteUrl,
    patreonUrl,
    buyCoffeeToUrl,
    logoUrl,
    description,
    authors,
    facebookUrl,
    twitterUrl,
    www,
  } = publisher;

  return (
    <PageWrapper>
      {/* Logo */}
      <View style={styles.logoWrapper}>
        <Image
          source={{
            uri: getImageUrl(logoUrl, ThumbnailSize.W150),
          }}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      {/* Description */}
      {!!description && <Paragraph>{description}</Paragraph>}
      {/* Authors */}
      {!!authors && (authors || []).length > 0 && (
        <Paragraph>Autorzy: {authors.join(', ')}</Paragraph>
      )}
      {/* Patronite */}
      {!!patroniteUrl && <Patronite url={patroniteUrl} />}
      {/* Patreon */}
      {!!patreonUrl && <Patreon url={patreonUrl} />}
      {/* BuyCoffeeTo */}
      {!!buyCoffeeToUrl && <BuyCoffeeTo url={buyCoffeeToUrl} />}
      {/* URLs */}
      {!!facebookUrl && (
        <UrlButton
          url={facebookUrl}
          label="Facebook"
          icon={
            <Icon
              name="facebook-square"
              size={24}
              color="white"
              type="font-awesome"
            />
          }
          backgroundColor="#3b5998"
        />
      )}
      {!!twitterUrl && (
        <UrlButton
          url={twitterUrl}
          label="Twitter"
          icon={
            <Icon
              name="twitter-square"
              size={26}
              color="white"
              type="font-awesome"
            />
          }
          backgroundColor="#1DA1F2"
        />
      )}
      {!!www && (
        <UrlButton
          url={www}
          label={clearUrl(www)}
          icon={
            <Icon
              name="external-link-alt"
              size={20}
              color="white"
              type="font-awesome-5"
            />
          }
          backgroundColor="#3c3c3c"
        />
      )}
    </PageWrapper>
  );
};

const styles = StyleSheet.create({
  logoWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    marginBottom: 20,
  },
  logo: {
    height: 80,
    width: '90%',
  },
});
