import React from 'react';
import { View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { screenStyles } from 'styles';
import { Articles } from 'components/articles';
import api from 'lib/api';
import { ArticlesStackParamList } from 'navigators/articles-stack';

type DashboardScreenProps = StackScreenProps<
  ArticlesStackParamList,
  'Dashboard'
>;

export const DashboardScreen = (props: DashboardScreenProps) => {
  const { navigation } = props;

  return (
    <View style={screenStyles.screenWrapper}>
      <Articles apiCall={api.getReaderArticles} />
    </View>
  );
};
