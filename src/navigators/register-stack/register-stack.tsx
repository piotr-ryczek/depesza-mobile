import React from 'react';
import { SafeAreaView } from 'react-native';
import {
  createStackNavigator,
  StackScreenProps,
} from '@react-navigation/stack';

import { RegisterScreen } from 'screens/register';
import { RegisterByEmailScreen } from 'screens/register-by-email';
import { ConfirmEmailManuallyScreen } from 'screens/confirm-email-manually';

import { baseScreenOptions } from 'lib/header/config';
import { DrawerParamList } from 'navigators/app-drawer';
import { useAppSelector } from 'lib/hooks';
import { UserRole } from 'types';

export type RegisterStackParamList = {
  Register: {};
  RegisterByEmail: {};
  ConfirmEmailManually: {};
};

const Stack = createStackNavigator<RegisterStackParamList>();
const { Navigator, Screen } = Stack;

type RegisterStackProps = StackScreenProps<DrawerParamList, 'RegisterStack'>;

export const RegisterStack = (props: RegisterStackProps) => {
  const { navigation } = props;

  const { jwtToken, role, hasAccess } = useAppSelector((state) => state);

  // Currently impossible in second condition (isLoggedReader && !hasAccess) as logging without access results in error HAS_NOT_ACCESS
  const isLoggedReader = !!(jwtToken && role === UserRole.READER);
  const isNotLoggedInOrHasNotAccess =
    !jwtToken || (isLoggedReader && !hasAccess);

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
        {isNotLoggedInOrHasNotAccess && (
          <Screen
            name="ConfirmEmailManually"
            component={ConfirmEmailManuallyScreen}
            options={{ headerTitle: 'Potwierdzenie adresu email' }}
          />
        )}
      </Navigator>
    </SafeAreaView>
  );
};
