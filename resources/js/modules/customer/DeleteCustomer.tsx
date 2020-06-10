import * as React from 'react';
import { DeleteDialog } from '@components/delete/Delete';
import { customersDestroyRequest } from '@api/schema';
import { Customer } from './transformers';

interface Props {
  customer?: Customer;
  handleClose: () => void;
  onDeleted: () => void;
}

export const DeleteCustomerDialog: React.SFC<Props> = ({ customer, handleClose, onDeleted }) => {
  return (
    <DeleteDialog
      entity={customer}
      entityName="Customer"
      deleteEntityRequest={customersDestroyRequest}
      handleClose={handleClose}
      onDeleted={onDeleted}
    />
  );
};
