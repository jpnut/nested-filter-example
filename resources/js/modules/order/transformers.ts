import { CreateOrderValues } from './CreateOrder';
import { fromMoney } from '@support/money';
import { AppDataTransferObjectsOrderOrderData } from '@api/schema';
import { UpdateOrderValues } from './UpdateOrder';
import { toDate, fromDate } from '@support/date';

export type IncomingOrder = AppDataTransferObjectsOrderOrderData;

export interface Order
  extends Omit<
    AppDataTransferObjectsOrderOrderData,
    'total' | 'placed_at' | 'completed_at' | 'cancelled_at' | 'created_at' | 'updated_at'
  > {
  total: number;
  placed_at?: Date | null;
  completed_at?: Date | null;
  cancelled_at?: Date | null;
  created_at: Date;
  updated_at: Date;
}

export const createOrderTransformer = (values: CreateOrderValues) => ({
  ...values,
  customer: values.customer ? values.customer.id : undefined,
  products: [],
  placed_at: fromDate(toDate(values.placed_at)),
  completed_at: fromDate(toDate(values.completed_at)),
  cancelled_at: fromDate(toDate(values.cancelled_at)),
});

export const updateOrderTransformer = (values: UpdateOrderValues) => ({
  ...values,
  products: [],
  placed_at: fromDate(values.placed_at),
  completed_at: fromDate(values.completed_at),
  cancelled_at: fromDate(values.cancelled_at),
});

export const orderTransformer = (order: AppDataTransferObjectsOrderOrderData): Order => ({
  ...order,
  total: fromMoney(order.total),
  placed_at: toDate(order.placed_at),
  completed_at: toDate(order.completed_at),
  cancelled_at: toDate(order.cancelled_at),
  created_at: toDate(order.created_at) as Date,
  updated_at: toDate(order.updated_at) as Date,
});
