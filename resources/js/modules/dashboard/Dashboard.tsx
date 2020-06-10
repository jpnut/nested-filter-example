import * as React from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Theme, makeStyles, createStyles, CssBaseline } from '@material-ui/core';
import { Switch, Route } from 'react-router-dom';
import { ProductList } from '@modules/product/ProductList';
import { CustomerList } from '@modules/customer/CustomerList';
import { OrderList } from '@modules/order/OrderList';
import { Order } from '@modules/order/Order';
import { Customer } from '@modules/customer/Customer';
import { Product } from '@modules/product/Product';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
    },
    page: {
      margin: theme.spacing(4, 0),
    },
  }),
);

export const Dashboard = () => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header isOpen={open} openDrawer={handleDrawerOpen} />
      <Sidebar isOpen={open} closeDrawer={handleDrawerClose} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <div className={classes.page}>
          <Switch>
            <Route path="/customers/:id">
              <Customer />
            </Route>
            <Route path="/customers">
              <CustomerList />
            </Route>
            <Route path="/orders/:id">
              <Order />
            </Route>
            <Route path="/orders">
              <OrderList />
            </Route>
            <Route path="/products/:id">
              <Product />
            </Route>
            <Route path="/products">
              <ProductList />
            </Route>
          </Switch>
        </div>
      </main>
    </div>
  );
};
