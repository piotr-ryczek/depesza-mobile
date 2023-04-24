import React, { useReducer, useCallback } from 'react';
import { ScrollView, Text, TouchableWithoutFeedback, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import {
  Button,
  Item,
  Input,
  Label,
  Text as NativeBaseText,
  Icon,
} from 'native-base';
import {
  useFocusEffect,
  RouteProp,
  CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native';

import { handleError } from 'state/actions';
import { Loading } from 'components/loading';
import { BasicReducer, basicReducer } from 'lib/basic-reducer';
import api from 'lib/api';
import { showToast, prepareValidationErrors } from 'lib/helpers';
import { screenStyles, formStyles } from 'styles';
import { FieldValidationErrors, ToastType } from 'types';
import {
  FormSection,
  FormSpace,
  FormWrapper,
  ItemWrapper,
  InputError,
} from 'components/form';
import { RegisterStackParamList } from 'navigators/register-stack';
import { DrawerParamList } from 'navigators/app-drawer';
import { useAppDispatch } from 'lib/hooks';
import { Separator } from 'components/content';

type RegisterByEmailScreenProps = {
  navigation: CompositeNavigationProp<
    DrawerNavigationProp<DrawerParamList>,
    StackNavigationProp<RegisterStackParamList, 'RegisterByEmail'>
  >;
  route: RouteProp<RegisterStackParamList, 'RegisterByEmail'>;
};

type RegisterByEmailScreenState = {
  isLoading: boolean;
  registrationComplete: boolean;
  isPasswordVisible: boolean;
  isRepeatPasswordVisible: boolean;
  validationErrors: FieldValidationErrors;
};

type FormValues = {
  email: string;
  password: string;
  repeatPassword: string;
};

export const RegisterByEmailScreen = (props: RegisterByEmailScreenProps) => {
  const navigation = useNavigation();

  const dispatch = useAppDispatch();
  const [state, setState] = useReducer<
    BasicReducer<RegisterByEmailScreenState>
  >(basicReducer, {
    isLoading: false,
    registrationComplete: false,
    isPasswordVisible: false,
    isRepeatPasswordVisible: false,
    validationErrors: {},
  });

  const [formValues, setFormValues] = useReducer<BasicReducer<FormValues>>(
    basicReducer,
    {
      email: '',
      password: '',
      repeatPassword: '',
    },
  );

  const {
    isLoading,
    registrationComplete,
    isPasswordVisible,
    isRepeatPasswordVisible,
    validationErrors,
  } = state;
  const { email, password, repeatPassword } = formValues;

  // Handlers

  const handleTextChange = (fieldName: string) => (value: string) => {
    setFormValues({
      [fieldName]: value,
    });
  };

  const handleRegister = async () => {
    setState({ isLoading: true });
    try {
      const { data } = await api.registerByEmail(
        email,
        password,
        repeatPassword,
      );

      // const { status } = data;

      showToast(ToastType.SUCCESS, 'Poprawnie utworzono konto.');
      setState({ isLoading: false, registrationComplete: true });
    } catch (error) {
      const newState = {
        isLoading: false,
      };

      if (error.response?.data?.fields?.length) {
        const { fields } = error.response.data;

        Object.assign(newState, {
          validationErrors: prepareValidationErrors(fields),
        });
      }

      setFormValues({
        password: '',
        repeatPassword: '',
      });
      setState(newState);
      dispatch(handleError(error, 'Błędna rejestracja', false));
    }
  };

  const handleShowPassword = () => {
    setState({
      isPasswordVisible: true,
    });
  };

  const handleHidePassword = () => {
    setState({
      isPasswordVisible: false,
    });
  };

  const handleShowRepeatPassword = () => {
    setState({
      isRepeatPasswordVisible: true,
    });
  };

  const handleHideRepeatPassword = () => {
    setState({
      isRepeatPasswordVisible: false,
    });
  };

  // Side effects

  useFocusEffect(
    useCallback(() => {
      setState({
        validationErrors: {},
      });

      setFormValues({
        email: '',
        password: '',
        repeatPassword: '',
      });
    }, []),
  );

  return (
    <ScrollView style={screenStyles.screenWrapper}>
      <Loading isLoading={isLoading} />
      <FormWrapper>
        {registrationComplete ? (
          <FormSection first last>
            <Text>
              Sprawdź swoją skrzynkę pocztową. Znajdziesz tam email z linkiem
              aktywacyjnym, który należy otworzyć w aplikacji.
            </Text>
            <FormSpace />
            <Button
              primary
              full
              rounded
              onPress={() => navigation.navigate('ArticlesStack' as never)}>
              <NativeBaseText>Wróc do artykułów</NativeBaseText>
            </Button>
          </FormSection>
        ) : (
          <>
            <FormSection first>
              <ItemWrapper>
                <Item floatingLabel error={!!validationErrors.email}>
                  <Label>Email</Label>
                  <Input
                    onChangeText={handleTextChange('email')}
                    autoCompleteType="email"
                    keyboardType="email-address"
                    value={email}
                  />
                </Item>
                <InputError error={validationErrors.email} />
              </ItemWrapper>
              <ItemWrapper>
                <Item floatingLabel error={!!validationErrors.password}>
                  <Label>Hasło</Label>
                  <Input
                    secureTextEntry={!isPasswordVisible}
                    onChangeText={handleTextChange('password')}
                    value={password}
                  />
                </Item>
                <InputError error={validationErrors.password} />
                <View
                  style={[
                    formStyles.iconWrapperOverInput,
                    isPasswordVisible && formStyles.iconWrapperOverInputHold,
                  ]}>
                  <TouchableWithoutFeedback
                    onPressIn={handleShowPassword}
                    onPressOut={handleHidePassword}>
                    <Icon
                      name={isPasswordVisible ? 'eye-slash' : 'eye'}
                      style={formStyles.iconOverInput}
                      type="FontAwesome5"
                    />
                  </TouchableWithoutFeedback>
                </View>
              </ItemWrapper>
              <ItemWrapper>
                <Item floatingLabel error={!!validationErrors.repeatPassword}>
                  <Label>Powtórz hasło</Label>
                  <Input
                    secureTextEntry={!isRepeatPasswordVisible}
                    onChangeText={handleTextChange('repeatPassword')}
                    value={repeatPassword}
                  />
                </Item>
                <InputError error={validationErrors.repeatPassword} />
                <View
                  style={[
                    formStyles.iconWrapperOverInput,
                    isPasswordVisible && formStyles.iconWrapperOverInputHold,
                  ]}>
                  <TouchableWithoutFeedback
                    onPressIn={handleShowRepeatPassword}
                    onPressOut={handleHideRepeatPassword}>
                    <Icon
                      name={isRepeatPasswordVisible ? 'eye-slash' : 'eye'}
                      style={formStyles.iconOverInput}
                      type="FontAwesome5"
                    />
                  </TouchableWithoutFeedback>
                </View>
              </ItemWrapper>
              <ItemWrapper button>
                <Button
                  primary
                  full
                  rounded
                  style={formStyles.button}
                  onPress={handleRegister}>
                  <NativeBaseText>Załóż konto</NativeBaseText>
                </Button>
              </ItemWrapper>
            </FormSection>
            <Separator />
            <FormSection last>
              <Button
                info
                full
                rounded
                style={formStyles.button}
                onPress={() => navigation.navigate('ConfirmEmailManually')}>
                <NativeBaseText>Potwierdź email ręcznie</NativeBaseText>
              </Button>
            </FormSection>
          </>
        )}
      </FormWrapper>
    </ScrollView>
  );
};
