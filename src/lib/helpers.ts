import { Toast } from 'native-base';

import {
  ToastType,
  FieldValidationErrors,
  ValidationErrorDto,
  ThumbnailSize,
} from 'types';
import translations from './translations';
import config from './config';

// TODO: Maybe refactor
export const getCurrentRoute = (state) => {
  let actualRoute = state.routes[state.index];

  while (actualRoute.state) {
    actualRoute = actualRoute.state.routes[actualRoute.state.index];
  }

  return actualRoute;
};

export const showToast = (type: ToastType, message: string) => {
  const toastType = (() => {
    switch (type) {
      case ToastType.ERROR:
        return 'danger';

      case ToastType.SUCCESS:
        return 'success';
      default:
        return 'warning';
    }
  })();

  Toast.show({
    text: message,
    buttonText: 'Ok',
    duration: 3000,
    type: toastType,
  });
};

export const clearUrl = (url: string) => url.replace(/^https?:\/\//, '');

export const translateValidationErrorMessage = (message: string): string =>
  translations[message];

export const prepareValidationErrors = (
  validationErrors: ValidationErrorDto[],
): FieldValidationErrors =>
  validationErrors.reduce<FieldValidationErrors>((acc, error) => {
    const { field, message } = error;

    if (!acc[field]) {
      acc[field] = [];
    }

    acc[field].push(translateValidationErrorMessage(message));

    return acc;
  }, {});

export const getImageUrl = (
  fileName: string,
  fileSize = ThumbnailSize.FULL,
): string => {
  return `${config.apiUrl}/images/${fileName}?fileSize=${fileSize}`;
};
