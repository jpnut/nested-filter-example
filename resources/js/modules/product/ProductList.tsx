import { useAsyncAbortable } from 'react-async-hook';
import * as React from 'react';
import { productsIndexRequest, AppDataTransferObjectsProductIndexProductRequestParams } from '@api/schema';
import {
  Container,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  makeStyles,
  createStyles,
  Toolbar,
  Typography,
  IconButton,
  Theme,
  lighten,
  Box,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { CreateProductModal } from './CreateProduct';
import classNames from 'classnames';
import { productTransformer, Product, IncomingProduct } from './transformers';
import { Money } from '@support/money';
import { DisplayDate } from '@support/date';
import { TableWithLoaderWrapper } from '@components/table/TableLoader';
import { TableSkeleton } from '@components/table/TableSkeleton';
import { DeleteProductDialog } from './DeleteProduct';
import { useDelete } from '@hooks/delete';
import { useCreate } from '@hooks/create';
import { TablePagination } from '@components/table/TablePagination';
import { usePagination } from '@hooks/pagination';
import { useUpdate } from '@hooks/update';
import { UpdateProductModal } from './UpdateProduct';
import { Link as RouterLink } from 'react-router-dom';
import { schema } from '@components/query-builder/schema';
import { serialize } from '@components/query-builder/serializer';
import { Builder, State } from 'react-nested-filter';
import { components, fieldSchema } from '@components/query-builder/components';

const actionWidth = 'calc(3 * (1.5rem + 24px))';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    title: {
      flexGrow: 1,
    },
    actionCell: {
      width: actionWidth,
      boxSizing: 'content-box',
    },
    skeletonAction: {
      display: 'inline-block',
      margin: theme.spacing(1.125, 1.5),
    },
    pagination: {
      flex: 1,
      justifyContent: 'space-between',
    },
  }),
);

interface RequestParams {
  queryParams: AppDataTransferObjectsProductIndexProductRequestParams;
}

export const ProductList = () => {
  const classes = useStyles();

  const [requestParams, setRequestParams] = React.useState<RequestParams>({
    queryParams: { page: 1, per_page: 10, filter: null },
  });

  const products = useAsyncAbortable(
    async (signal) => productsIndexRequest(requestParams, { signal }),
    [requestParams],
    {
      setLoading: (state) => ({ ...state, loading: true }),
    },
  );

  const { createModalOpen, openCreateModal, closeCreateModal, handleCreated } = useCreate<Product, IncomingProduct>({
    onCreate: () => products.execute(requestParams),
  });

  const { updateEntity, handleUpdate, handleUpdateModalClose, handleUpdated } = useUpdate<Product, IncomingProduct>({
    onUpdate: () => products.execute(requestParams),
  });

  const { deleteEntity, handleDelete, handleDeleteDialogClose, handleDeleted } = useDelete<Product>({
    onDelete: () => products.execute(requestParams),
  });

  const { page, perPage, handlePageChange, handlePerPageChange } = usePagination({
    onPageSet: (newPage: number) =>
      setRequestParams(({ queryParams, ...rest }) => ({ queryParams: { ...queryParams, page: newPage }, ...rest })),
    onPerPageSet: (newPerPage: number) =>
      setRequestParams(({ queryParams, ...rest }) => ({
        queryParams: { ...queryParams, per_page: newPerPage },
        ...rest,
      })),
  });

  const handleFilter = (state: State) => {
    setRequestParams(({ queryParams, ...rest }) => ({
      queryParams: { ...queryParams, filter: serialize(state, schema) },
      ...rest,
    }));
  };

  return (
    <Container>
      <Box marginBottom={2}>
        <Builder
          schema={schema}
          resource="product"
          onFilter={handleFilter}
          components={components}
          fieldSchema={fieldSchema}
        />
      </Box>
      <Paper elevation={1}>
        {products.error && <div>Error: {products.error.message}</div>}
        <Toolbar className={classes.toolbar}>
          <Typography className={classes.title} variant="h6">
            Products
          </Typography>
          <IconButton color="primary" onClick={openCreateModal}>
            <AddCircleIcon />
          </IconButton>
          <CreateProductModal open={createModalOpen} handleClose={closeCreateModal} onComplete={handleCreated} />
          <UpdateProductModal product={updateEntity} handleClose={handleUpdateModalClose} onComplete={handleUpdated} />
          <DeleteProductDialog product={deleteEntity} handleClose={handleDeleteDialogClose} onDeleted={handleDeleted} />
        </Toolbar>
        <TableWithLoaderWrapper loading={!!products.result && products.loading}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ width: '15%' }}>Reference</TableCell>
                <TableCell style={{ width: `calc(40% - ${actionWidth})` }}>Name</TableCell>
                <TableCell style={{ width: '15%' }}>Amount</TableCell>
                <TableCell style={{ width: '15%' }}>Published</TableCell>
                <TableCell style={{ width: '15%' }}>Archived</TableCell>
                <TableCell size="small" align="right" className={classes.actionCell} />
              </TableRow>
            </TableHead>
            <TableBody>
              {(products.result &&
                products.result.data.data
                  .map((product) => productTransformer(product))
                  .map((product) => (
                    <ProductListRow
                      key={product.id}
                      product={product}
                      onUpdate={handleUpdate}
                      onDelete={handleDelete}
                      updating={!!(updateEntity && updateEntity.id === product.id)}
                      deleting={!!(deleteEntity && deleteEntity.id === product.id)}
                    />
                  ))) || (
                <TableSkeleton rows={10}>
                  <TableCell>
                    <Skeleton variant="rect" height={24} />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="rect" height={24} />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="rect" height={24} />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="rect" height={24} />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="rect" height={24} />
                  </TableCell>
                  <TableCell size="small" align="right">
                    <Skeleton variant="circle" height={24} width={24} className={classes.skeletonAction} />
                    <Skeleton variant="circle" height={24} width={24} className={classes.skeletonAction} />
                    <Skeleton variant="circle" height={24} width={24} className={classes.skeletonAction} />
                  </TableCell>
                </TableSkeleton>
              )}
            </TableBody>
          </Table>
        </TableWithLoaderWrapper>
        <Toolbar className={classes.toolbar}>
          <TablePagination
            className={classes.pagination}
            count={products.result?.data.meta.last_page || 1}
            page={page}
            perPage={perPage}
            onPageChange={handlePageChange}
            onPerPageChange={handlePerPageChange}
          />
        </Toolbar>
      </Paper>
    </Container>
  );
};

interface ProductListRowProps {
  product: Product;
  onUpdate: (product: Product) => void;
  onDelete: (product: Product) => void;
  updating: boolean;
  deleting: boolean;
}

const useRowStyles = makeStyles(({ transitions, palette }: Theme) =>
  createStyles({
    row: {
      transition: transitions.create('background-color', { duration: transitions.duration.short }),
    },
    rowUpdating: {
      backgroundColor: lighten(palette.info.light, 0.85),
    },
    rowDeleting: {
      backgroundColor: lighten(palette.error.light, 0.85),
    },
  }),
);

const ProductListRow: React.SFC<ProductListRowProps> = ({ product, onUpdate, onDelete, updating, deleting }) => {
  const classes = useRowStyles();

  const handleProductUpdate = () => {
    onUpdate(product);
  };

  const handleProductDelete = () => {
    onDelete(product);
  };

  return (
    <TableRow
      key={product.id}
      hover
      className={classNames(classes.row, updating && classes.rowUpdating, deleting && classes.rowDeleting)}
    >
      <TableCell>
        <Box fontFamily="Monospace" fontSize={14}>
          {product.reference}
        </Box>
      </TableCell>
      <TableCell>{product.name}</TableCell>
      <TableCell>
        <Money>{product.amount}</Money>
      </TableCell>
      <TableCell>
        <DisplayDate>{product.published_at}</DisplayDate>
      </TableCell>
      <TableCell>
        <DisplayDate>{product.archived_at}</DisplayDate>
      </TableCell>
      <TableCell size="small" align="right">
        <IconButton color="inherit" component={RouterLink} to={`/products/${product.id}`}>
          <VisibilityIcon />
        </IconButton>
        <IconButton color="inherit" onClick={handleProductUpdate}>
          <EditIcon />
        </IconButton>
        <IconButton color="inherit" onClick={handleProductDelete}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};
