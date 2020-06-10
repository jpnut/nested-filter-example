import { request } from './client';

export type ValidatedResponse<T> = ValidationErrorResponse | T;

export interface ValidationErrorResponse {
  errors: Record<string, string[]>;
  message: string;
}

export interface AppDataTransferObjectsOrderAddProductToOrderDataAddProductToOrderData {
  product: number;
}

export interface AppHttpRequestsAddProductToOrderRequest {
  body: AppDataTransferObjectsOrderAddProductToOrderDataAddProductToOrderData;
}

export interface AppDataTransferObjectsOrderOrderData {
  id: number;
  reference: string;
  total: number;
  placed_at?: string | null;
  completed_at?: string | null;
  cancelled_at?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  customer?: AppDataTransferObjectsCustomerCustomerData | null;
  products?: AppDataTransferObjectsProductProductData[] | null;
}

export interface AppDataTransferObjectsCustomerCustomerData {
  id: number;
  reference: string;
  full_name: string;
  email?: string | null;
  phone?: string | null;
  created_at: string;
  updated_at: string;
  orders?: AppDataTransferObjectsOrderOrderData[] | null;
}

export interface AppDataTransferObjectsProductProductData {
  id: number;
  reference: string;
  name: string;
  slug: string;
  description?: string | null;
  amount: number;
  published_at?: string | null;
  archived_at?: string | null;
  available: boolean;
  created_at?: string | null;
  updated_at?: string | null;
  orders?: AppDataTransferObjectsOrderOrderData[] | null;
}

export interface AppDataTransferObjectsCustomerIndexCustomerRequestParams {
  filter?: AppDataTransferObjectsCustomerCustomerFilterData | null;
  include?: string[] | null;
  search?: string | null;
  page?: number | null;
  per_page?: number | null;
}

export interface AppDataTransferObjectsCustomerCustomerFilterData {
  id?: JPNutEloquentNestedFilterIDFilterObject | null;
  reference?: JPNutEloquentNestedFilterStringFilterObject | null;
  full_name?: JPNutEloquentNestedFilterStringFilterObject | null;
  email?: JPNutEloquentNestedFilterStringFilterObject | null;
  phone?: JPNutEloquentNestedFilterStringFilterObject | null;
  created_at?: JPNutEloquentNestedFilterDateFilterObject | null;
  updated_at?: JPNutEloquentNestedFilterDateFilterObject | null;
  orders?: AppDataTransferObjectsOrderOrderFilterData[] | null;
  and?: AppDataTransferObjectsCustomerCustomerFilterData[] | null;
  or?: AppDataTransferObjectsCustomerCustomerFilterData[] | null;
}

export interface JPNutEloquentNestedFilterIDFilterObject {
  value: string;
  operator: any;
}

export interface JPNutEloquentNestedFilterStringFilterObject {
  value?: string | null;
  operator: any;
  case_sensitive: boolean;
}

export interface JPNutEloquentNestedFilterDateFilterObject {
  value?: string | null;
  operator: any;
}

export interface AppDataTransferObjectsOrderOrderFilterData {
  id?: JPNutEloquentNestedFilterIDFilterObject | null;
  reference?: JPNutEloquentNestedFilterStringFilterObject | null;
  total?: JPNutEloquentNestedFilterNumberFilterObject | null;
  placed_at?: JPNutEloquentNestedFilterDateFilterObject | null;
  completed_at?: JPNutEloquentNestedFilterDateFilterObject | null;
  cancelled_at?: JPNutEloquentNestedFilterDateFilterObject | null;
  created_at?: JPNutEloquentNestedFilterDateFilterObject | null;
  updated_at?: JPNutEloquentNestedFilterDateFilterObject | null;
  customer?: AppDataTransferObjectsCustomerCustomerFilterData[] | null;
  products?: AppDataTransferObjectsProductProductFilterData[] | null;
  and?: AppDataTransferObjectsOrderOrderFilterData[] | null;
  or?: AppDataTransferObjectsOrderOrderFilterData[] | null;
}

export interface JPNutEloquentNestedFilterNumberFilterObject {
  value?: number | null;
  operator: any;
}

export interface AppDataTransferObjectsProductProductFilterData {
  id?: JPNutEloquentNestedFilterIDFilterObject | null;
  reference?: JPNutEloquentNestedFilterStringFilterObject | null;
  name?: JPNutEloquentNestedFilterStringFilterObject | null;
  slug?: JPNutEloquentNestedFilterStringFilterObject | null;
  description?: JPNutEloquentNestedFilterStringFilterObject | null;
  amount?: JPNutEloquentNestedFilterNumberFilterObject | null;
  published_at?: JPNutEloquentNestedFilterDateFilterObject | null;
  archived_at?: JPNutEloquentNestedFilterDateFilterObject | null;
  available?: JPNutEloquentNestedFilterBooleanFilterObject | null;
  created_at?: JPNutEloquentNestedFilterDateFilterObject | null;
  updated_at?: JPNutEloquentNestedFilterDateFilterObject | null;
  and?: AppDataTransferObjectsProductProductFilterData[] | null;
  or?: AppDataTransferObjectsProductProductFilterData[] | null;
}

export interface JPNutEloquentNestedFilterBooleanFilterObject {
  value?: boolean | null;
  operator: any;
}

export interface AppHttpRequestsIndexCustomerRequest {
  queryParams: AppDataTransferObjectsCustomerIndexCustomerRequestParams;
}

export interface AppDataTransferObjectsCustomerIndexCustomerResponseData {
  data: AppDataTransferObjectsCustomerCustomerData[];
  meta: AppSupportDataTransferObjectPaginationMetaData;
}

export interface AppSupportDataTransferObjectPaginationMetaData {
  current_page: number;
  from?: number | null;
  last_page: number;
  per_page: number;
  to?: number | null;
  total: number;
}

export interface AppDataTransferObjectsCustomerCreateCustomerData {
  full_name: string;
  email?: string | null;
  phone?: string | null;
}

export interface AppHttpRequestsCreateCustomerRequest {
  body: AppDataTransferObjectsCustomerCreateCustomerData;
}

export interface AppSupportDataTransferObjectShowRequestParams {
  include?: string[] | null;
}

export interface AppHttpRequestsShowCustomerRequest {
  queryParams: AppSupportDataTransferObjectShowRequestParams;
}

export interface AppDataTransferObjectsCustomerUpdateCustomerData {
  full_name?: string | null;
  email?: string | null;
  phone?: string | null;
}

export interface AppHttpRequestsUpdateCustomerRequest {
  body: AppDataTransferObjectsCustomerUpdateCustomerData;
}

export interface AppDataTransferObjectsOrderIndexOrderRequestParams {
  filter?: AppDataTransferObjectsOrderOrderFilterData | null;
  include?: string[] | null;
  page?: number | null;
  per_page?: number | null;
}

export interface AppHttpRequestsIndexOrderRequest {
  queryParams: AppDataTransferObjectsOrderIndexOrderRequestParams;
}

export interface AppDataTransferObjectsOrderIndexOrderResponseData {
  data: AppDataTransferObjectsOrderOrderData[];
  meta: AppSupportDataTransferObjectPaginationMetaData;
}

export interface AppDataTransferObjectsOrderCreateOrderData {
  placed_at?: string | null;
  completed_at?: string | null;
  cancelled_at?: string | null;
  customer: number;
}

export interface AppHttpRequestsCreateOrderRequest {
  body: AppDataTransferObjectsOrderCreateOrderData;
}

export interface AppHttpRequestsShowOrderRequest {
  queryParams: AppSupportDataTransferObjectShowRequestParams;
}

export interface AppDataTransferObjectsOrderUpdateOrderData {
  placed_at?: string | null;
  completed_at?: string | null;
  cancelled_at?: string | null;
}

export interface AppHttpRequestsUpdateOrderRequest {
  body: AppDataTransferObjectsOrderUpdateOrderData;
}

export interface AppDataTransferObjectsProductIndexProductRequestParams {
  filter?: AppDataTransferObjectsProductProductFilterData | null;
  include?: string[] | null;
  search?: string | null;
  page?: number | null;
  per_page?: number | null;
}

export interface AppHttpRequestsIndexProductRequest {
  queryParams: AppDataTransferObjectsProductIndexProductRequestParams;
}

export interface AppDataTransferObjectsProductIndexProductResponseData {
  data: AppDataTransferObjectsProductProductData[];
  meta: AppSupportDataTransferObjectPaginationMetaData;
}

export interface AppDataTransferObjectsProductCreateProductData {
  name: string;
  description?: string | null;
  amount: number;
  published_at?: string | null;
  archived_at?: string | null;
  available?: boolean | null;
}

export interface AppHttpRequestsCreateProductRequest {
  body: AppDataTransferObjectsProductCreateProductData;
}

export interface AppHttpRequestsShowProductRequest {
  queryParams: AppSupportDataTransferObjectShowRequestParams;
}

export interface AppDataTransferObjectsProductUpdateProductData {
  name?: string | null;
  description?: string | null;
  published_at?: string | null;
  archived_at?: string | null;
  available?: boolean | null;
}

export interface AppHttpRequestsUpdateProductRequest {
  body: AppDataTransferObjectsProductUpdateProductData;
}

export const ordersProductsStoreRequest = (
  { body }: AppHttpRequestsAddProductToOrderRequest,
  order: string,
  options?: RequestInit,
) =>
  request<AppDataTransferObjectsOrderOrderData>(`http://filter-example.localhost/api/orders/${order}/products`, {
    method: 'POST',
    body: JSON.stringify(body),
    ...options,
  });

export const ordersProductsDestroyRequest = (order: string, product: string, options?: RequestInit) =>
  request<AppDataTransferObjectsOrderOrderData>(
    `http://filter-example.localhost/api/orders/${order}/products/${product}`,
    { method: 'DELETE', ...options },
  );

export const customersIndexRequest = ({ queryParams }: AppHttpRequestsIndexCustomerRequest, options?: RequestInit) =>
  request<AppDataTransferObjectsCustomerIndexCustomerResponseData>(`http://filter-example.localhost/api/customers`, {
    method: 'GET',
    queryParams,
    ...options,
  });

export const customersStoreRequest = ({ body }: AppHttpRequestsCreateCustomerRequest, options?: RequestInit) =>
  request<AppDataTransferObjectsCustomerCustomerData>(`http://filter-example.localhost/api/customers`, {
    method: 'POST',
    body: JSON.stringify(body),
    ...options,
  });

export const customersShowRequest = (
  { queryParams }: AppHttpRequestsShowCustomerRequest,
  customer: string,
  options?: RequestInit,
) =>
  request<AppDataTransferObjectsCustomerCustomerData>(`http://filter-example.localhost/api/customers/${customer}`, {
    method: 'GET',
    queryParams,
    ...options,
  });

export const customersUpdateRequest = (
  { body }: AppHttpRequestsUpdateCustomerRequest,
  customer: string,
  options?: RequestInit,
) =>
  request<AppDataTransferObjectsCustomerCustomerData>(`http://filter-example.localhost/api/customers/${customer}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    ...options,
  });

export const customersDestroyRequest = (customer: string, options?: RequestInit) =>
  request<boolean>(`http://filter-example.localhost/api/customers/${customer}`, { method: 'DELETE', ...options });

export const ordersIndexRequest = ({ queryParams }: AppHttpRequestsIndexOrderRequest, options?: RequestInit) =>
  request<AppDataTransferObjectsOrderIndexOrderResponseData>(`http://filter-example.localhost/api/orders`, {
    method: 'GET',
    queryParams,
    ...options,
  });

export const ordersStoreRequest = ({ body }: AppHttpRequestsCreateOrderRequest, options?: RequestInit) =>
  request<AppDataTransferObjectsOrderOrderData>(`http://filter-example.localhost/api/orders`, {
    method: 'POST',
    body: JSON.stringify(body),
    ...options,
  });

export const ordersShowRequest = (
  { queryParams }: AppHttpRequestsShowOrderRequest,
  order: string,
  options?: RequestInit,
) =>
  request<AppDataTransferObjectsOrderOrderData>(`http://filter-example.localhost/api/orders/${order}`, {
    method: 'GET',
    queryParams,
    ...options,
  });

export const ordersUpdateRequest = (
  { body }: AppHttpRequestsUpdateOrderRequest,
  order: string,
  options?: RequestInit,
) =>
  request<AppDataTransferObjectsOrderOrderData>(`http://filter-example.localhost/api/orders/${order}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    ...options,
  });

export const ordersDestroyRequest = (order: string, options?: RequestInit) =>
  request<boolean>(`http://filter-example.localhost/api/orders/${order}`, { method: 'DELETE', ...options });

export const productsIndexRequest = ({ queryParams }: AppHttpRequestsIndexProductRequest, options?: RequestInit) =>
  request<AppDataTransferObjectsProductIndexProductResponseData>(`http://filter-example.localhost/api/products`, {
    method: 'GET',
    queryParams,
    ...options,
  });

export const productsStoreRequest = ({ body }: AppHttpRequestsCreateProductRequest, options?: RequestInit) =>
  request<AppDataTransferObjectsProductProductData>(`http://filter-example.localhost/api/products`, {
    method: 'POST',
    body: JSON.stringify(body),
    ...options,
  });

export const productsShowRequest = (
  { queryParams }: AppHttpRequestsShowProductRequest,
  product: string,
  options?: RequestInit,
) =>
  request<AppDataTransferObjectsProductProductData>(`http://filter-example.localhost/api/products/${product}`, {
    method: 'GET',
    queryParams,
    ...options,
  });

export const productsUpdateRequest = (
  { body }: AppHttpRequestsUpdateProductRequest,
  product: string,
  options?: RequestInit,
) =>
  request<AppDataTransferObjectsProductProductData>(`http://filter-example.localhost/api/products/${product}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    ...options,
  });

export const productsDestroyRequest = (product: string, options?: RequestInit) =>
  request<boolean>(`http://filter-example.localhost/api/products/${product}`, { method: 'DELETE', ...options });
