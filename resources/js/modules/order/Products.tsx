import * as React from 'react';
import { Order } from './transformers';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { PaperSection } from '@components/material/PaperSection';
import { Toolbar, Typography, IconButton, Chip, makeStyles, Theme, createStyles } from '@material-ui/core';
import { AddProductModal } from './AddProduct';
import { useCreate } from '@hooks/create';
import { Product as ProductType, productTransformer } from '@modules/product/transformers';
import {
  ordersProductsDestroyRequest,
  ordersProductsStoreRequest,
  AppDataTransferObjectsOrderOrderData,
} from '@api/schema';
import { useAsyncCallback } from 'react-async-hook';
import toString from 'lodash/toString';

interface Props {
  order: Order;
  mergeResult: (order: Partial<AppDataTransferObjectsOrderOrderData>) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      flexGrow: 1,
    },
    toolbar: {
      borderBottom: `1px solid ${theme.palette.grey[200]}`,
      paddingRight: theme.spacing(1),
    },
    chips: {
      backgroundColor: theme.palette.grey[50],
      padding: theme.spacing(2, 3),
    },
    chip: {
      marginRight: theme.spacing(1),
    },
  }),
);

export const Products: React.SFC<Props> = ({ order, mergeResult }) => {
  const classes = useStyles();

  const addProduct = (product: number) => ordersProductsStoreRequest({ body: { product } }, toString(order.id));

  const { createModalOpen, openCreateModal, closeCreateModal, handleCreated } = useCreate<
    AppDataTransferObjectsOrderOrderData
  >({
    onCreate: ({ products, total }) => {
      mergeResult({
        products,
        total,
      });
    },
  });

  const deleteProduct = useAsyncCallback(ordersProductsDestroyRequest);

  const handleDelete = (product: ProductType) =>
    deleteProduct.execute(toString(order.id), toString(product.id)).then(({ data: { products, total } }) => {
      mergeResult({
        products,
        total,
      });
    });

  return (
    <>
      {order.products && (
        <PaperSection elevation={1}>
          <Toolbar className={classes.toolbar}>
            <Typography className={classes.title} variant="h6">
              Products
            </Typography>
            <IconButton color="primary" onClick={openCreateModal}>
              <AddCircleIcon />
            </IconButton>
            <AddProductModal
              open={createModalOpen}
              add={addProduct}
              handleClose={closeCreateModal}
              onComplete={handleCreated}
            />
          </Toolbar>
          <div className={classes.chips}>
            {order.products
              .map((product) => productTransformer(product))
              .map((product) => (
                <Product key={product.id} product={product} onDelete={handleDelete} />
              ))}
          </div>
        </PaperSection>
      )}
    </>
  );
};

interface ProductProps {
  product: ProductType;
  onDelete: (product: ProductType) => void;
}

const Product: React.SFC<ProductProps> = ({ product, onDelete }) => {
  const classes = useStyles();

  const [deleting, setDeleting] = React.useState(false);

  const handleDelete = () => {
    setDeleting(true);
    onDelete(product);
  };

  return (
    <Chip
      key={product.id}
      label={product.name}
      color="primary"
      className={classes.chip}
      disabled={deleting}
      onDelete={handleDelete}
    />
  );
};
