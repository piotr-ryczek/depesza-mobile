export type ValidationErrorDto = {
  field: string;
  message: string;
};

export type FieldValidationErrors = {
  [fieldName: string]: string[];
};
