import React from 'react';
import { SafeAreaView } from 'react-native';
import {
  createStackNavigator,
  StackScreenProps,
} from '@react-navigation/stack';

import { PublishersScreen } from 'screens/publishers';
import { Hamburger } from 'components/hamburger';
import { baseScreenOptions } from 'lib/header/config';
import { DrawerParamList } from 'navigators/app-drawer';
import { PublisherScreen } from 'screens/publisher';

export type PublishersStackParamList = {
  Publishers: {};
  Publisher: {
    publisherId: string;
  };
};

const Stack = createStackNavigator<PublishersStackParamList>();
const { Navigator, Screen } = Stack;

type PublishersStackProps = StackScreenProps<
  DrawerParamList,
  'PublishersStack'
>;

export const PublishersStack = (props: PublishersStackProps) => {
  const { navigation } = props;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Navigator
        initialRouteName="Publishers"
        screenOptions={{
          ...baseScreenOptions({ navigation }),
          headerRight: () => <Hamburger navigation={navigation} />,
        }}>
        <Screen
          name="Publishers"
          component={PublishersScreen}
          options={{ headerTitle: 'Autorzy' }}
        />
        <Screen
          name="Publisher"
          component={PublisherScreen}
          options={{ headerTitle: 'Autor' }}
        />
      </Navigator>
    </SafeAreaView>
  );
};
