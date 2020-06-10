import * as React from 'react';
import { customersShowRequest, AppDataTransferObjectsCustomerCustomerData } from '@api/schema';
import { useParams } from 'react-router-dom';
import { useAsync } from 'react-async-hook';
import { Container, Toolbar, makeStyles, createStyles, Theme } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { customerTransformer } from './transformers';
import { PaperSection } from '@components/material/PaperSection';
import { CustomerDetails } from './CustomerDetails';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      flexGrow: 1,
    },
    toolbar: {
      borderbottom: `1px solid ${theme.palette.grey[200]}`,
      paddingRight: theme.spacing(1),
    },
    subBar: {
      backgroundColor: theme.palette.grey[50],
      padding: theme.spacing(1, 0),
      borderbottom: `1px solid ${theme.palette.grey[200]}`,
    },
    chips: {
      backgroundColor: theme.palette.grey[50],
      padding: theme.spacing(2, 3),
    },
    skeletonTitle: {
      marginRight: 'auto',
    },
    skeletonAction: {
      display: 'inline-block',
      margin: theme.spacing(1.125, 1.5),
    },
    skeletonDatum: {
      display: 'inline-block',
      margin: theme.spacing(1, 3),
    },
    skeletonChip: {
      display: 'inline-block',
      marginRight: theme.spacing(1),
    },
  }),
);

interface Params {
  id: string;
}

export const Customer = () => {
  const classes = useStyles();

  const { id } = useParams<Params>();

  const { result, error, merge } = useAsync(
    () => customersShowRequest({ queryParams: { include: ['orders'] } }, id),
    [id],
    {
      setLoading: (state) => ({ ...state, loading: true }),
    },
  );

  const mergeResult = (customer: Partial<AppDataTransferObjectsCustomerCustomerData>) => {
    if (!result) {
      return;
    }

    merge({
      result: {
        ...result,
        data: {
          ...result.data,
          ...customer,
        },
      },
    });
  };

  const customer = result && customerTransformer(result.data);

  return (
    <Container>
      {error && <div>Error: {error.message}</div>}

      {(customer && (
        <>
          <CustomerDetails customer={customer} mergeResult={mergeResult} />
        </>
      )) || (
        <>
          <PaperSection elevation={1}>
            <Toolbar className={classes.toolbar}>
              <Skeleton variant="rect" height={32} width={250} className={classes.skeletonTitle} />
              <Skeleton variant="circle" height={24} width={24} className={classes.skeletonAction} />
              <Skeleton variant="circle" height={24} width={24} className={classes.skeletonAction} />
            </Toolbar>
            <div className={classes.subBar}>
              <Skeleton variant="rect" height={42} width={80} className={classes.skeletonDatum} />
              <Skeleton variant="rect" height={42} width={80} className={classes.skeletonDatum} />
              <Skeleton variant="rect" height={42} width={80} className={classes.skeletonDatum} />
            </div>
          </PaperSection>
        </>
      )}
    </Container>
  );
};
