import { useAsyncAbortable } from 'react-async-hook';
import * as React from 'react';
import { customersIndexRequest, AppDataTransferObjectsCustomerIndexCustomerRequestParams } from '@api/schema';
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
import { CreateCustomerModal } from './CreateCustomer';
import classNames from 'classnames';
import { customerTransformer, Customer, IncomingCustomer } from './transformers';
import { TableWithLoaderWrapper } from '@components/table/TableLoader';
import { TableSkeleton } from '@components/table/TableSkeleton';
import { DeleteCustomerDialog } from './DeleteCustomer';
import { useDelete } from '@hooks/delete';
import { useCreate } from '@hooks/create';
import { TablePagination } from '@components/table/TablePagination';
import { usePagination } from '@hooks/pagination';
import { useUpdate } from '@hooks/update';
import { UpdateCustomerModal } from './UpdateCustomer';
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
  queryParams: AppDataTransferObjectsCustomerIndexCustomerRequestParams;
}

export const CustomerList = () => {
  const classes = useStyles();

  const [requestParams, setRequestParams] = React.useState<RequestParams>({
    queryParams: { page: 1, per_page: 10, filter: null },
  });

  const customers = useAsyncAbortable(
    async (signal) => customersIndexRequest(requestParams, { signal }),
    [requestParams],
    {
      setLoading: (state) => ({ ...state, loading: true }),
    },
  );

  const { createModalOpen, openCreateModal, closeCreateModal, handleCreated } = useCreate<Customer, IncomingCustomer>({
    onCreate: () => customers.execute(requestParams),
  });

  const { updateEntity, handleUpdate, handleUpdateModalClose, handleUpdated } = useUpdate<Customer, IncomingCustomer>({
    onUpdate: () => customers.execute(requestParams),
  });

  const { deleteEntity, handleDelete, handleDeleteDialogClose, handleDeleted } = useDelete<Customer>({
    onDelete: () => customers.execute(requestParams),
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
          resource="customer"
          onFilter={handleFilter}
          components={components}
          fieldSchema={fieldSchema}
        />
      </Box>
      <Paper elevation={1}>
        {customers.error && <div>Error: {customers.error.message}</div>}
        <Toolbar className={classes.toolbar}>
          <Typography className={classes.title} variant="h6">
            Customers
          </Typography>
          <IconButton color="primary" onClick={openCreateModal}>
            <AddCircleIcon />
          </IconButton>
          <CreateCustomerModal open={createModalOpen} handleClose={closeCreateModal} onComplete={handleCreated} />
          <UpdateCustomerModal
            customer={updateEntity}
            handleClose={handleUpdateModalClose}
            onComplete={handleUpdated}
          />
          <DeleteCustomerDialog
            customer={deleteEntity}
            handleClose={handleDeleteDialogClose}
            onDeleted={handleDeleted}
          />
        </Toolbar>
        <TableWithLoaderWrapper loading={!!customers.result && customers.loading}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ width: '15%' }}>Reference</TableCell>
                <TableCell style={{ width: `calc(40% - ${actionWidth})` }}>Name</TableCell>
                <TableCell style={{ width: '30%' }}>Email</TableCell>
                <TableCell style={{ width: '15%' }}>Phone</TableCell>
                <TableCell size="small" align="right" className={classes.actionCell} />
              </TableRow>
            </TableHead>
            <TableBody>
              {(customers.result &&
                customers.result.data.data
                  .map((customer) => customerTransformer(customer))
                  .map((customer) => (
                    <CustomerListRow
                      key={customer.id}
                      customer={customer}
                      onUpdate={handleUpdate}
                      onDelete={handleDelete}
                      updating={!!(updateEntity && updateEntity.id === customer.id)}
                      deleting={!!(deleteEntity && deleteEntity.id === customer.id)}
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
            count={customers.result?.data.meta.last_page || 1}
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

interface CustomerListRowProps {
  customer: Customer;
  onUpdate: (customer: Customer) => void;
  onDelete: (customer: Customer) => void;
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

const CustomerListRow: React.SFC<CustomerListRowProps> = ({ customer, onUpdate, onDelete, updating, deleting }) => {
  const classes = useRowStyles();

  const handleCustomerUpdate = () => {
    onUpdate(customer);
  };

  const handleCustomerDelete = () => {
    onDelete(customer);
  };

  return (
    <TableRow
      key={customer.id}
      hover
      className={classNames(classes.row, updating && classes.rowUpdating, deleting && classes.rowDeleting)}
    >
      <TableCell>
        <Box fontFamily="Monospace" fontSize={14}>
          {customer.reference}
        </Box>
      </TableCell>
      <TableCell>{customer.full_name}</TableCell>
      <TableCell>{customer.email}</TableCell>
      <TableCell>{customer.phone}</TableCell>
      <TableCell size="small" align="right">
        <IconButton color="inherit" component={RouterLink} to={`/customers/${customer.id}`}>
          <VisibilityIcon />
        </IconButton>
        <IconButton color="inherit" onClick={handleCustomerUpdate}>
          <EditIcon />
        </IconButton>
        <IconButton color="inherit" onClick={handleCustomerDelete}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};
