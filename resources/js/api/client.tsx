import queryString from 'query-string';
import isObject from 'lodash/isObject';
import isArray from 'lodash/isArray';

type QueryParams = { [key: string]: any };

export interface RequestArgs extends RequestInit {
  queryParams?: QueryParams | null;
}

export type RequestOptions = Omit<RequestArgs, 'queryParams'>;

const defaultOptions = {
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
};

const getFullResponse = async <T extends any>(
  url: URL,
  { headers, ...rest }: RequestInit,
): Promise<GenericResponse<T>> => {
  const response = await fetch(url.href, {
    ...rest,
    headers,
  });

  const data = await response.json();

  return {
    data,
    response,
  };
};

export interface GenericResponse<T> {
  data: T;
  response: Response;
}

const stringifyNestedProperties = (obj: QueryParams) => {
  const newObj: QueryParams = {};

  Object.keys(obj).forEach((key) => {
    if (obj[key] === null) {
      return;
    }

    if (isObject(obj[key]) && !isArray(obj[key])) {
      newObj[key] = JSON.stringify(obj[key]);

      return;
    }

    newObj[key] = obj[key];
  });

  return newObj;
};

export async function request<T>(uri: string, { queryParams, ...rest }: RequestArgs): Promise<GenericResponse<T>> {
  const url = new URL(uri.toString());

  if (queryParams) {
    url.search = queryString.stringify(stringifyNestedProperties(queryParams), { arrayFormat: 'bracket' });
  }

  const headers = {
    ...defaultOptions.headers,
    ...rest.headers,
  };

  const response = await getFullResponse<T>(url, { ...rest, headers });

  return response;
}

export const partialRequest = <T extends object, U extends keyof T>(uri: string, args: RequestArgs) =>
  request<Pick<T, U>>(uri, args);
