import React from 'react';
import { SafeAreaView } from 'react-native';
import {
  createStackNavigator,
  StackScreenProps,
} from '@react-navigation/stack';

import { LoginScreen } from 'screens/login';
import { LoginPublisherScreen } from 'screens/login-publisher';
import { baseScreenOptions } from 'lib/header/config';
import { DrawerParamList } from 'navigators/app-drawer';

export type LoginStackParamList = {
  Login: {};
  LoginPublisher: {};
};

const Stack = createStackNavigator<LoginStackParamList>();
const { Navigator, Screen } = Stack;

type LoginStackProps = StackScreenProps<DrawerParamList, 'LoginStack'>;

export const LoginStack = (props: LoginStackProps) => {
  const { navigation } = props;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Navigator
        initialRouteName="Login"
        screenOptions={{
          ...baseScreenOptions({ navigation }),
        }}>
        <Screen
          name="Login"
          component={LoginScreen}
          options={{ headerTitle: 'Logowanie' }}
        />
        <Screen
          name="LoginPublisher"
          component={LoginPublisherScreen}
          options={{ headerTitle: 'Logowanie wydawcy' }}
        />
      </Navigator>
    </SafeAreaView>
  );
};
