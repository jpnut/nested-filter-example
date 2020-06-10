import { ValidatedResponse, ValidationErrorResponse } from '@api/schema';
import mapValues from 'lodash/mapValues';
import { FieldMetaProps } from 'formik';
import isNil from 'lodash/isNil';

export const getErrorsFromResponseData = <T extends any>(data: ValidatedResponse<T>) => {
  const { errors } = data as ValidationErrorResponse;

  return mapValues(errors, (e) => e[0]);
};

export const hasError = <T extends any>(meta: FieldMetaProps<T>) => !isNil(meta.error) && meta.touched;

export const errorText = <T extends any>(meta: FieldMetaProps<T>) => (meta.touched ? meta.error : undefined);
