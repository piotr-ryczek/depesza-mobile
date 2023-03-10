import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';

import { ArticlesStackParamList } from 'navigators/articles-stack';

type RegionsScreenProps = StackScreenProps<ArticlesStackParamList, 'Regions'>;

export const RegionsScreen = (props: RegionsScreenProps) => {
  const { navigation } = props;

  return (
    <View>
      <Text>Regiony</Text>
      <Button
        onPress={() => navigation.navigate('Region' as never)}
        title="Region"
      />
    </View>
  );
};
