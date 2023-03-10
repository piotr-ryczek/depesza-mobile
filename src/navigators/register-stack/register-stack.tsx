import React from 'react';
import { SafeAreaView } from 'react-native';
import {
  createStackNavigator,
  StackScreenProps,
} from '@react-navigation/stack';

import { RegisterScreen } from 'screens/register';
import { RegisterByEmailScreen } from 'screens/register-by-email';

import { baseScreenOptions } from 'lib/header/config';
import { DrawerParamList } from 'navigators/app-drawer';

export type RegisterStackParamList = {
  Register: {};
  RegisterByEmail: {};
};

const Stack = createStackNavigator<RegisterStackParamList>();
const { Navigator, Screen } = Stack;

type RegisterStackProps = StackScreenProps<DrawerParamList, 'RegisterStack'>;

export const RegisterStack = (props: RegisterStackProps) => {
  const { navigation } = props;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Navigator
        initialRouteName="Register"
        screenOptions={{
          ...baseScreenOptions({ navigation }),
        }}>
        <Screen
          name="Register"
          component={RegisterScreen}
          options={{
            headerTitle: 'Rejestracja',
          }}
        />

        <Screen
          name="RegisterByEmail"
          component={RegisterByEmailScreen}
          options={{ headerTitle: 'Rejestracja email' }}
        />
      </Navigator>
    </SafeAreaView>
  );
};
