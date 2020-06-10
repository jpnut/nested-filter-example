import { CreateProductValues } from './CreateProduct';
import { toMoney, fromMoney } from '@support/money';
import { AppDataTransferObjectsProductProductData } from '@api/schema';
import { UpdateProductValues } from './UpdateProduct';
import { toDate, fromDate } from '@support/date';

export type IncomingProduct = AppDataTransferObjectsProductProductData;

export interface Product
  extends Omit<
    AppDataTransferObjectsProductProductData,
    'amount' | 'published_at' | 'archived_at' | 'created_at' | 'updated_at'
  > {
  amount: number;
  published_at?: Date | null;
  archived_at?: Date | null;
  created_at: Date;
  updated_at: Date;
}

export const createProductTransformer = (values: CreateProductValues) => ({
  ...values,
  amount: toMoney(values.amount),
  published_at: fromDate(toDate(values.published_at)),
  archived_at: fromDate(toDate(values.archived_at)),
});

export const updateProductTransformer = (values: UpdateProductValues) => ({
  ...values,
  amount: toMoney(values.amount),
  published_at: fromDate(toDate(values.published_at)),
  archived_at: fromDate(toDate(values.archived_at)),
});

export const productTransformer = (product: AppDataTransferObjectsProductProductData): Product => ({
  ...product,
  amount: fromMoney(product.amount),
  published_at: toDate(product.published_at),
  archived_at: toDate(product.archived_at),
  created_at: toDate(product.created_at) as Date,
  updated_at: toDate(product.updated_at) as Date,
});
