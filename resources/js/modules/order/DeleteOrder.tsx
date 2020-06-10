import * as React from 'react';
import { DeleteDialog } from '@components/delete/Delete';
import { ordersDestroyRequest } from '@api/schema';
import { Order } from './transformers';

interface Props {
  order?: Order;
  handleClose: () => void;
  onDeleted: () => void;
}

export const DeleteOrderDialog: React.SFC<Props> = ({ order, handleClose, onDeleted }) => {
  return (
    <DeleteDialog
      entity={order}
      entityName="Order"
      deleteEntityRequest={ordersDestroyRequest}
      handleClose={handleClose}
      onDeleted={onDeleted}
    />
  );
};
