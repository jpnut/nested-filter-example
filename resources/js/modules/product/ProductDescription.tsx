import * as React from 'react';
import { Product } from './transformers';
import { PaperSection } from '@components/material/PaperSection';
import { Toolbar, makeStyles, Theme, createStyles, Typography, IconButton, TextField } from '@material-ui/core';
import { AppDataTransferObjectsProductProductData, productsUpdateRequest } from '@api/schema';
import { useAsyncCallback } from 'react-async-hook';
import toString from 'lodash/toString';
import useConstant from 'use-constant';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import SaveIcon from '@material-ui/icons/Save';

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
    description: {
      '& textarea': {
        padding: theme.spacing(2, 3),
      },
    },
  }),
);

export const ProductDescription: React.SFC<Props> = ({ product, mergeResult }) => {
  const classes = useStyles();

  const [value, setValue] = React.useState(product.description || '');

  const request = useConstant(() => AwesomeDebouncePromise(productsUpdateRequest, 1000));

  const update = useAsyncCallback(request, {
    onSuccess: ({ data: { description } }) => {
      mergeResult({ description });
    },
  });

  const handleSave = () => {
    update.execute({ body: { description: value } }, toString(product.id));
  };

  const handleChange = ({ target: { value: newValue } }: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(newValue);
  };

  return (
    <PaperSection elevation={1}>
      <Toolbar className={classes.toolbar}>
        <Typography className={classes.title} variant="h6">
          Description
        </Typography>
        <IconButton onClick={handleSave}>
          <SaveIcon />
        </IconButton>
      </Toolbar>
      <TextField className={classes.description} multiline rows={5} fullWidth value={value} onChange={handleChange} />
    </PaperSection>
  );
};
