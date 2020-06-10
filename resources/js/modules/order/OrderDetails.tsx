import { PaperSection } from '@components/material/PaperSection';
import {
  makeStyles,
  Theme,
  createStyles,
  Toolbar,
  Typography,
  IconButton,
  Grid,
  Divider,
  Link,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import * as React from 'react';
import { useUpdate } from '@hooks/update';
import { useDelete } from '@hooks/delete';
import { Order } from './transformers';
import { useHistory } from 'react-router-dom';
import { DeleteOrderDialog } from './DeleteOrder';
import { UpdateOrderModal } from './UpdateOrder';
import { SubBarItem } from '@components/material/SubBarItem';
import { Money } from '@support/money';
import { DisplayDate } from '@support/date';
import { AppDataTransferObjectsOrderOrderData } from '@api/schema';
import { Link as RouterLink } from 'react-router-dom';

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
    subBar: {
      backgroundColor: theme.palette.grey[50],
      padding: theme.spacing(1, 0),
      borderBottom: `1px solid ${theme.palette.grey[200]}`,
    },
  }),
);

export const OrderDetails: React.SFC<Props> = ({ order, mergeResult }) => {
  const classes = useStyles();

  const history = useHistory();

  const { updateEntity, handleUpdate, handleUpdateModalClose, handleUpdated } = useUpdate<
    Order,
    AppDataTransferObjectsOrderOrderData
  >({
    onUpdate: ({ customer: _customer, products: _products, ...rest }) => mergeResult(rest),
  });

  const { deleteEntity, handleDelete, handleDeleteDialogClose, handleDeleted } = useDelete<Order>({
    onDelete: () => history.push('/orders'),
  });

  const handleOrderUpdate = () => {
    handleUpdate(order);
  };

  const handleOrderDelete = () => {
    handleDelete(order);
  };

  return (
    <PaperSection elevation={1}>
      <Toolbar className={classes.toolbar}>
        <Typography className={classes.title} variant="h6">
          {order.reference}
        </Typography>
        <IconButton onClick={handleOrderUpdate}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={handleOrderDelete}>
          <DeleteIcon />
        </IconButton>
        <UpdateOrderModal order={updateEntity} handleClose={handleUpdateModalClose} onComplete={handleUpdated} />
        <DeleteOrderDialog order={deleteEntity} handleClose={handleDeleteDialogClose} onDeleted={handleDeleted} />
      </Toolbar>
      <div className={classes.subBar}>
        <Grid container alignItems="center">
          <SubBarItem item>
            <Grid item>
              <Typography color="textSecondary" variant="body2" gutterBottom>
                Customer
              </Typography>
            </Grid>
            <Grid item>
              {order.customer && (
                <Link component={RouterLink} to={`/customers/${order.customer.id}`}>
                  <Typography>{order.customer.full_name || 'N/A'}</Typography>
                </Link>
              )}
            </Grid>
          </SubBarItem>
          <Divider orientation="vertical" flexItem />
          <SubBarItem item>
            <Grid item>
              <Typography color="textSecondary" variant="body2" gutterBottom>
                Total
              </Typography>
            </Grid>
            <Grid item>
              <Typography>
                <Money>{order.total}</Money>
              </Typography>
            </Grid>
          </SubBarItem>
          <Divider orientation="vertical" flexItem />
          <SubBarItem item>
            <Grid item>
              <Typography color="textSecondary" variant="body2" gutterBottom>
                Placed
              </Typography>
            </Grid>
            <Grid item>
              <Typography>
                <DisplayDate to="dd MMM yyyy, HH:mm">{order.placed_at}</DisplayDate>
              </Typography>
            </Grid>
          </SubBarItem>
          <Divider orientation="vertical" flexItem />
          <SubBarItem item>
            <Grid item>
              <Typography color="textSecondary" variant="body2" gutterBottom>
                Completed
              </Typography>
            </Grid>
            <Grid item>
              <Typography>
                <DisplayDate to="dd MMM yyyy, HH:mm">{order.completed_at}</DisplayDate>
              </Typography>
            </Grid>
          </SubBarItem>
          <Divider orientation="vertical" flexItem />
          <SubBarItem item>
            <Grid item>
              <Typography color="textSecondary" variant="body2" gutterBottom>
                Cancelled
              </Typography>
            </Grid>
            <Grid item>
              <Typography>
                <DisplayDate to="dd MMM yyyy, HH:mm">{order.cancelled_at}</DisplayDate>
              </Typography>
            </Grid>
          </SubBarItem>
        </Grid>
      </div>
    </PaperSection>
  );
};
