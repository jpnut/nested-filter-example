import * as React from 'react';
import { DeleteDialog } from '@components/delete/Delete';
import { productsDestroyRequest } from '@api/schema';
import { Product } from './transformers';

interface Props {
  product?: Product;
  handleClose: () => void;
  onDeleted: () => void;
}

export const DeleteProductDialog: React.SFC<Props> = ({ product, handleClose, onDeleted }) => {
  return (
    <DeleteDialog
      entity={product}
      entityName="Product"
      deleteEntityRequest={productsDestroyRequest}
      handleClose={handleClose}
      onDeleted={onDeleted}
    />
  );
};
