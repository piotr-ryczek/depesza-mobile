import React from 'react';
import { SafeAreaView } from 'react-native';
import {
  createStackNavigator,
  StackScreenProps,
} from '@react-navigation/stack';

import { AboutScreen } from 'screens/about';
import { baseScreenOptions } from 'lib/header/config';
import { DrawerParamList } from 'navigators/app-drawer';

export type AboutStackParamList = {
  About: {};
};

const Stack = createStackNavigator<AboutStackParamList>();
const { Navigator, Screen } = Stack;

type AboutStackProps = StackScreenProps<DrawerParamList, 'AboutStack'>;

export const AboutStack = (props: AboutStackProps) => {
  const { navigation } = props;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Navigator
        initialRouteName="About"
        screenOptions={{
          ...baseScreenOptions({ navigation }),
        }}>
        <Screen
          name="About"
          component={AboutScreen}
          options={{ headerTitle: 'O aplikacji' }}
        />
      </Navigator>
    </SafeAreaView>
  );
};
