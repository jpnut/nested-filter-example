import * as React from 'react';
import { Product } from './transformers';
import { AppDataTransferObjectsProductProductData, productsUpdateRequest } from '@api/schema';
import useConstant from 'use-constant';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import { useAsyncCallback } from 'react-async-hook';
import { Switch } from '@material-ui/core';
import toString from 'lodash/toString';

interface AvailableProps {
  product: Product;
  mergeResult: (product: Partial<AppDataTransferObjectsProductProductData>) => void;
}

export const AvailableToggle: React.SFC<AvailableProps> = ({ product, mergeResult }) => {
  const [checked, setChecked] = React.useState(product.available);

  React.useEffect(() => {
    setChecked(product.available);
  }, [product.available]);

  const request = useConstant(() => AwesomeDebouncePromise(productsUpdateRequest, 1000));

  const update = useAsyncCallback(request, {
    onSuccess: ({ data: { available } }) => mergeResult({ available }),
  });

  const handleChange = () => {
    update.execute({ body: { available: !checked } }, toString(product.id));
    setChecked(!checked);
  };

  return <Switch size="small" checked={checked} onChange={handleChange} />;
};
