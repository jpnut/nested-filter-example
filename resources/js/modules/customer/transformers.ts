import { AppDataTransferObjectsCustomerCustomerData } from '@api/schema';
import { toDate } from '@support/date';

export type IncomingCustomer = AppDataTransferObjectsCustomerCustomerData;

export interface Customer extends Omit<IncomingCustomer, 'created_at' | 'updated_at'> {
  created_at: Date;
  updated_at: Date;
}

export const customerTransformer = (customer: IncomingCustomer): Customer => ({
  ...customer,
  created_at: toDate(customer.created_at) as Date,
  updated_at: toDate(customer.updated_at) as Date,
});
