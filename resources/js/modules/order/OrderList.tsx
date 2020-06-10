import { useAsyncAbortable } from 'react-async-hook';
import * as React from 'react';
import { ordersIndexRequest, AppDataTransferObjectsOrderIndexOrderRequestParams } from '@api/schema';
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
  Link,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { CreateOrderModal } from './CreateOrder';
import classNames from 'classnames';
import { orderTransformer, Order, IncomingOrder } from './transformers';
import { Money } from '@support/money';
import { DisplayDate } from '@support/date';
import { TableWithLoaderWrapper } from '@components/table/TableLoader';
import { TableSkeleton } from '@components/table/TableSkeleton';
import { DeleteOrderDialog } from './DeleteOrder';
import { useDelete } from '@hooks/delete';
import { useCreate } from '@hooks/create';
import { TablePagination } from '@components/table/TablePagination';
import { usePagination } from '@hooks/pagination';
import { useUpdate } from '@hooks/update';
import { UpdateOrderModal } from './UpdateOrder';
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
  queryParams: AppDataTransferObjectsOrderIndexOrderRequestParams;
}

export const OrderList = () => {
  const classes = useStyles();

  const [requestParams, setRequestParams] = React.useState<RequestParams>({
    queryParams: { page: 1, per_page: 10, filter: null, include: ['customer'] },
  });

  const orders = useAsyncAbortable(async (signal) => ordersIndexRequest(requestParams, { signal }), [requestParams], {
    setLoading: (state) => ({ ...state, loading: true }),
  });

  const { createModalOpen, openCreateModal, closeCreateModal, handleCreated } = useCreate<Order, IncomingOrder>({
    onCreate: () => orders.execute(requestParams),
  });

  const { updateEntity, handleUpdate, handleUpdateModalClose, handleUpdated } = useUpdate<Order, IncomingOrder>({
    onUpdate: () => orders.execute(requestParams),
  });

  const { deleteEntity, handleDelete, handleDeleteDialogClose, handleDeleted } = useDelete<Order>({
    onDelete: () => orders.execute(requestParams),
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
          resource="order"
          onFilter={handleFilter}
          components={components}
          fieldSchema={fieldSchema}
        />
      </Box>
      <Paper elevation={1}>
        {orders.error && <div>Error: {orders.error.message}</div>}
        <Toolbar className={classes.toolbar}>
          <Typography className={classes.title} variant="h6">
            Orders
          </Typography>
          <IconButton color="primary" onClick={openCreateModal}>
            <AddCircleIcon />
          </IconButton>
          <CreateOrderModal open={createModalOpen} handleClose={closeCreateModal} onComplete={handleCreated} />
          <UpdateOrderModal order={updateEntity} handleClose={handleUpdateModalClose} onComplete={handleUpdated} />
          <DeleteOrderDialog order={deleteEntity} handleClose={handleDeleteDialogClose} onDeleted={handleDeleted} />
        </Toolbar>
        <TableWithLoaderWrapper loading={!!orders.result && orders.loading}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ width: '15%' }}>Reference</TableCell>
                <TableCell style={{ width: `calc(40% - ${actionWidth})` }}>Customer</TableCell>
                <TableCell style={{ width: '15%' }}>Total</TableCell>
                <TableCell style={{ width: '15%' }}>Placed</TableCell>
                <TableCell style={{ width: '15%' }}>Completed</TableCell>
                <TableCell size="small" align="right" className={classes.actionCell} />
              </TableRow>
            </TableHead>
            <TableBody>
              {(orders.result &&
                orders.result.data.data
                  .map((order) => orderTransformer(order))
                  .map((order) => (
                    <OrderListRow
                      key={order.id}
                      order={order}
                      onUpdate={handleUpdate}
                      onDelete={handleDelete}
                      updating={!!(updateEntity && updateEntity.id === order.id)}
                      deleting={!!(deleteEntity && deleteEntity.id === order.id)}
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
            count={orders.result?.data.meta.last_page || 1}
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

interface OrderListRowProps {
  order: Order;
  onUpdate: (order: Order) => void;
  onDelete: (order: Order) => void;
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

const OrderListRow: React.SFC<OrderListRowProps> = ({ order, onUpdate, onDelete, updating, deleting }) => {
  const classes = useRowStyles();

  const handleOrderUpdate = () => {
    onUpdate(order);
  };

  const handleOrderDelete = () => {
    onDelete(order);
  };

  return (
    <TableRow
      key={order.id}
      hover
      className={classNames(classes.row, updating && classes.rowUpdating, deleting && classes.rowDeleting)}
    >
      <TableCell>
        <Box fontFamily="Monospace" fontSize={14}>
          {order.reference}
        </Box>
      </TableCell>
      <TableCell>
        {order.customer && (
          <Link component={RouterLink} to={`/customers/${order.customer.id}`}>
            {order.customer.full_name}
          </Link>
        )}
      </TableCell>
      <TableCell>
        <Money>{order.total}</Money>
      </TableCell>
      <TableCell>
        <DisplayDate>{order.placed_at}</DisplayDate>
      </TableCell>
      <TableCell>
        <DisplayDate>{order.completed_at}</DisplayDate>
      </TableCell>
      <TableCell size="small" align="right">
        <IconButton color="inherit" component={RouterLink} to={`/orders/${order.id}`}>
          <VisibilityIcon />
        </IconButton>
        <IconButton color="inherit" onClick={handleOrderUpdate}>
          <EditIcon />
        </IconButton>
        <IconButton color="inherit" onClick={handleOrderDelete}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};
