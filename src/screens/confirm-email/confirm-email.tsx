import React, { useCallback, useReducer } from 'react';
import { ScrollView, Text } from 'react-native';
import { useFocusEffect, CommonActions } from '@react-navigation/native';
import { Button, Text as NativeBaseText } from 'native-base';
import { DrawerScreenProps } from '@react-navigation/drawer';

import api from 'lib/api';
import { loginReader } from 'state/actions';
import { screenStyles } from 'styles';
import { Loading } from 'components/loading';
import { BasicReducer, basicReducer } from 'lib/basic-reducer';
import { PageWrapper } from 'components/page';
import { FormSpace } from 'components/form';
import { showToast } from 'lib/helpers';
import { ToastType } from 'types';
import { DrawerParamList } from 'navigators/app-drawer';
import { useAppDispatch } from 'lib/hooks';

type ConfirmEmailScreenProps = DrawerScreenProps<
  DrawerParamList,
  'ConfirmEmail'
>;

type ConfirmEmailState = {
  hasFailed: boolean;
  isLoading: boolean;
};

export const ConfirmEmailScreen = (props: ConfirmEmailScreenProps) => {
  const { route, navigation } = props;
  const dispatch = useAppDispatch();
  const [state, setState] = useReducer<BasicReducer<ConfirmEmailState>>(
    basicReducer,
    {
      hasFailed: false,
      isLoading: false,
    },
  );

  const { hasFailed, isLoading } = state;

  const {
    params: { verificationCode },
  } = route;

  const goMainPage = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'ArticlesStack' }],
      }),
    );
  };

  const verifyEmail = async () => {
    setState({ isLoading: true, hasFailed: false });

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
      console.log(error.response.data);
      setState({ isLoading: false, hasFailed: true });
    }
  };

  useFocusEffect(
    useCallback(() => {
      verifyEmail();
    }, []),
  );

  return (
    <ScrollView style={screenStyles.screenWrapper}>
      <PageWrapper>
        <Loading isLoading={isLoading} />
        {!isLoading && hasFailed && (
          <>
            <Text>Weryfikacja nieudana.</Text>
            <FormSpace />
            <Button primary full rounded onPress={goMainPage}>
              <NativeBaseText>Przejdź na stronę główną</NativeBaseText>
            </Button>
          </>
        )}
      </PageWrapper>
    </ScrollView>
  );
};
