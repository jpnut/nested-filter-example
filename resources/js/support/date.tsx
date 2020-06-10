import * as React from 'react';
import { parseISO, differenceInMonths } from 'date-fns';
import { format } from 'date-fns-tz';
import isString from 'lodash/isString';
import isDate from 'lodash/isDate';
import isNil from 'lodash/isNil';

export const toDate = (value?: string | null) => {
  if (isNil(value)) {
    return value;
  }

  return parseISO(value);
};

export const fromDate = (date?: Date | null) => {
  if (isNil(date)) {
    return date;
  }

  return date.toISOString();
};

export const formatDate = (date: Date, to?: string) => {
  if (to !== undefined) {
    return format(date, to);
  }

  if (differenceInMonths(new Date(), date) > 10) {
    return format(date, 'dd MMM yyyy, HH:mm');
  }

  return format(date, 'dd MMM, HH:mm');
};

export const formatDateForForm = (date?: Date | null) => {
  if (!isDate(date)) {
    return date;
  }

  return format(date, `yyyy-MM-dd'T'HH:mm:ss`);
};

export const DisplayDate: React.SFC<{ children?: string | Date | null; to?: string; fallback?: string | null }> = ({
  children,
  to,
  fallback = 'N/A',
}) => {
  if (isString(children)) {
    return <span>{formatDate(toDate(children) as Date, to)}</span>;
  }

  if (isDate(children)) {
    return <span>{formatDate(children, to)}</span>;
  }

  return <span>{fallback}</span>;
};
