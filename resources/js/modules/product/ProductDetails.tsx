import { PaperSection } from '@components/material/PaperSection';
import { makeStyles, Theme, createStyles, Toolbar, Typography, IconButton, Grid, Divider } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import * as React from 'react';
import { useUpdate } from '@hooks/update';
import { useDelete } from '@hooks/delete';
import { Product } from './transformers';
import { useHistory } from 'react-router-dom';
import { DeleteProductDialog } from './DeleteProduct';
import { UpdateProductModal } from './UpdateProduct';
import { SubBarItem } from '@components/material/SubBarItem';
import { AppDataTransferObjectsProductProductData } from '@api/schema';
import { Money } from '@support/money';
import { DisplayDate } from '@support/date';
import { AvailableToggle } from './AvailableToggle';

interface Props {
  product: Product;
  mergeResult: (product: Partial<AppDataTransferObjectsProductProductData>) => void;
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

export const ProductDetails: React.SFC<Props> = ({ product, mergeResult }) => {
  const classes = useStyles();

  const history = useHistory();

  const { updateEntity, handleUpdate, handleUpdateModalClose, handleUpdated } = useUpdate<
    Product,
    AppDataTransferObjectsProductProductData
  >({
    onUpdate: ({ orders: _orders, ...rest }) => mergeResult(rest),
  });

  const { deleteEntity, handleDelete, handleDeleteDialogClose, handleDeleted } = useDelete<Product>({
    onDelete: () => history.push('/products'),
  });

  const handleProductUpdate = () => {
    handleUpdate(product);
  };

  const handleProductDelete = () => {
    handleDelete(product);
  };

  return (
    <PaperSection elevation={1}>
      <Toolbar className={classes.toolbar}>
        <Typography className={classes.title} variant="h6">
          {product.reference}
        </Typography>
        <IconButton onClick={handleProductUpdate}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={handleProductDelete}>
          <DeleteIcon />
        </IconButton>
        <UpdateProductModal product={updateEntity} handleClose={handleUpdateModalClose} onComplete={handleUpdated} />
        <DeleteProductDialog product={deleteEntity} handleClose={handleDeleteDialogClose} onDeleted={handleDeleted} />
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
              <Typography>{product.name || 'N/A'}</Typography>
            </Grid>
          </SubBarItem>
          <Divider orientation="vertical" flexItem />
          <SubBarItem item>
            <Grid item>
              <Typography color="textSecondary" variant="body2" gutterBottom>
                Amount
              </Typography>
            </Grid>
            <Grid item>
              <Typography>
                <Money>{product.amount}</Money>
              </Typography>
            </Grid>
          </SubBarItem>
          <Divider orientation="vertical" flexItem />
          <SubBarItem item>
            <Grid item>
              <Typography color="textSecondary" variant="body2" gutterBottom>
                Published
              </Typography>
            </Grid>
            <Grid item>
              <Typography>
                <DisplayDate to="dd MMM yyyy, HH:mm">{product.published_at}</DisplayDate>
              </Typography>
            </Grid>
          </SubBarItem>
          <Divider orientation="vertical" flexItem />
          <SubBarItem item>
            <Grid item>
              <Typography color="textSecondary" variant="body2" gutterBottom>
                Archived
              </Typography>
            </Grid>
            <Grid item>
              <Typography>
                <DisplayDate to="dd MMM yyyy, HH:mm">{product.archived_at}</DisplayDate>
              </Typography>
            </Grid>
          </SubBarItem>
          <Divider orientation="vertical" flexItem />
          <SubBarItem item>
            <Grid item>
              <Typography color="textSecondary" variant="body2" gutterBottom>
                Available
              </Typography>
            </Grid>
            <Grid item style={{ maxHeight: 24 }}>
              <AvailableToggle product={product} mergeResult={mergeResult} />
            </Grid>
          </SubBarItem>
        </Grid>
      </div>
    </PaperSection>
  );
};
