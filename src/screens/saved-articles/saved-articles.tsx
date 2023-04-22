import React from 'react';
import { View } from 'react-native';

import { screenStyles } from 'styles';
import { Articles } from 'components/articles';
import api from 'lib/api';

export const SavedArticlesScreen = () => {
  return (
    <View style={screenStyles.screenWrapper}>
      <Articles apiCall={api.getArticlesToRead} />
    </View>
  );
};
