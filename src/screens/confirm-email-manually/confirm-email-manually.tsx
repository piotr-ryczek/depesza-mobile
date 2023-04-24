import React, { useState } from 'react';
import { ScrollView, Text } from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';
import {
  Button,
  Input,
  Item,
  Label,
  Text as NativeBaseText,
} from 'native-base';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import api from 'lib/api';
import { handleError, loginReader } from 'state/actions';
import { screenStyles, formStyles } from 'styles';
import { Loading } from 'components/loading';
import {
  FormSection,
  FormSpace,
  FormWrapper,
  ItemWrapper,
} from 'components/form';
import { showToast } from 'lib/helpers';
import { ToastType } from 'types';
import { DrawerParamList } from 'navigators/app-drawer';
import { useAppDispatch } from 'lib/hooks';
import { RegisterStackParamList } from 'navigators/register-stack';

type ConfirmEmailManuallyScreenProps = {
  navigation: CompositeNavigationProp<
    DrawerNavigationProp<DrawerParamList>,
    StackNavigationProp<RegisterStackParamList, 'ConfirmEmailManually'>
  >;
  route: RouteProp<RegisterStackParamList, 'ConfirmEmailManually'>;
};

export const ConfirmEmailManuallyScreen = (
  props: ConfirmEmailManuallyScreenProps,
) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [verificationCode, setVerificationCode] = useState<string>('');

  const handleCodeChange = (value: string) => {
    setVerificationCode(value);
  };

  const goMainPage = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'ArticlesStack' }],
      }),
    );
  };

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.verifyEmail(verificationCode);

      const {
        token,
        followedRegions,
        toReadArticles: savedArticles,
        hasAccess,
      } = data;

      dispatch(
        loginReader({
          jwtToken: token,
          followedRegions,
          savedArticles,
          hasAccess,
        }),
      );
      showToast(
        ToastType.SUCCESS,
        'Weryfikacja zakończona sukcesem. Zalogowano.',
      );
      goMainPage();
    } catch (error) {
      setIsLoading(false);
      dispatch(
        handleError(
          error,
          'Niepoprawny kod bądź wystąpił błąd podczas weryfikacji',
          false,
        ),
      );
    }
  };

  return (
    <ScrollView style={screenStyles.screenWrapper}>
      <Loading isLoading={isLoading} />
      <FormWrapper>
        <FormSection first last>
          <Text>
            Jeśli pojawił się problem z otworzeniem otrzymanego w wiadomości
            email linku możesz tutaj ręcznie wpisać kod.
          </Text>
          <FormSpace />
          <ItemWrapper>
            <Item floatingLabel>
              <Label>Kod potwierdzający</Label>
              <Input onChangeText={handleCodeChange} value={verificationCode} />
            </Item>
          </ItemWrapper>
          <FormSpace />
          <ItemWrapper button>
            <Button
              primary
              full
              rounded
              style={formStyles.button}
              onPress={handleConfirm}>
              <NativeBaseText>Potwierdź email</NativeBaseText>
            </Button>
          </ItemWrapper>
        </FormSection>
      </FormWrapper>
    </ScrollView>
  );
};
