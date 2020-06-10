import { PaperSection } from '@components/material/PaperSection';
import { makeStyles, Theme, createStyles, Toolbar, Typography, IconButton, Grid, Divider } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import * as React from 'react';
import { useUpdate } from '@hooks/update';
import { useDelete } from '@hooks/delete';
import { Customer } from './transformers';
import { useHistory } from 'react-router-dom';
import { DeleteCustomerDialog } from './DeleteCustomer';
import { UpdateCustomerModal } from './UpdateCustomer';
import { SubBarItem } from '@components/material/SubBarItem';
import { AppDataTransferObjectsCustomerCustomerData } from '@api/schema';

interface Props {
  customer: Customer;
  mergeResult: (customer: Partial<AppDataTransferObjectsCustomerCustomerData>) => void;
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
    subBar: {
      backgroundColor: theme.palette.grey[50],
      padding: theme.spacing(1, 0),
      borderBottom: `1px solid ${theme.palette.grey[200]}`,
    },
  }),
);

export const CustomerDetails: React.SFC<Props> = ({ customer, mergeResult }) => {
  const classes = useStyles();

  const history = useHistory();

  const { updateEntity, handleUpdate, handleUpdateModalClose, handleUpdated } = useUpdate<
    Customer,
    AppDataTransferObjectsCustomerCustomerData
  >({
    onUpdate: ({ orders: _orders, ...rest }) => mergeResult(rest),
  });

  const { deleteEntity, handleDelete, handleDeleteDialogClose, handleDeleted } = useDelete<Customer>({
    onDelete: () => history.push('/customers'),
  });

  const handleCustomerUpdate = () => {
    handleUpdate(customer);
  };

  const handleCustomerDelete = () => {
    handleDelete(customer);
  };

  return (
    <PaperSection elevation={1}>
      <Toolbar className={classes.toolbar}>
        <Typography className={classes.title} variant="h6">
          {customer.reference}
        </Typography>
        <IconButton onClick={handleCustomerUpdate}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={handleCustomerDelete}>
          <DeleteIcon />
        </IconButton>
        <UpdateCustomerModal customer={updateEntity} handleClose={handleUpdateModalClose} onComplete={handleUpdated} />
        <DeleteCustomerDialog customer={deleteEntity} handleClose={handleDeleteDialogClose} onDeleted={handleDeleted} />
      </Toolbar>
      <div className={classes.subBar}>
        <Grid container alignItems="center">
          <SubBarItem item>
            <Grid item>
              <Typography color="textSecondary" variant="body2" gutterBottom>
                Name
              </Typography>
            </Grid>
            <Grid item>
              <Typography>{customer.full_name || 'N/A'}</Typography>
            </Grid>
          </SubBarItem>
          <Divider orientation="vertical" flexItem />
          <SubBarItem item>
            <Grid item>
              <Typography color="textSecondary" variant="body2" gutterBottom>
                Email
              </Typography>
            </Grid>
            <Grid item>
              <Typography>{customer.email || 'N/A'}</Typography>
            </Grid>
          </SubBarItem>
          <Divider orientation="vertical" flexItem />
          <SubBarItem item>
            <Grid item>
              <Typography color="textSecondary" variant="body2" gutterBottom>
                Phone
              </Typography>
            </Grid>
            <Grid item>
              <Typography>{customer.phone || 'N/A'}</Typography>
            </Grid>
          </SubBarItem>
        </Grid>
      </div>
    </PaperSection>
  );
};
