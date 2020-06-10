import * as React from 'react';
import { Autocomplete } from '@material-ui/lab';
import { productsIndexRequest, AppDataTransferObjectsProductProductData } from '@api/schema';
import { useAsyncAbortable } from 'react-async-hook';
import { TextField } from '@material-ui/core';
import { undefinedToNull } from '@support/null-undefined';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import useConstant from 'use-constant';

type Product = AppDataTransferObjectsProductProductData;

interface Props {
  value?: Product;
  setValue: (value?: Product) => void;
  error: boolean;
  helperText?: string;
}

export const ProductSelect = ({ value, setValue, error, helperText }: Props) => {
  const [inputValue, setInputValue] = React.useState('');

  const request = useConstant(() => AwesomeDebouncePromise(productsIndexRequest, 400));

  const { result, loading } = useAsyncAbortable(
    async (abortSignal, text) => {
      return request(
        {
          queryParams: {
            search: text,
          },
        },
        { signal: abortSignal },
      );
    },
    [inputValue],
  );

  const optionLabel = (product: Product) => product.name;

  const handleChange = (event: any, newValue: Product | null) => setValue(newValue || undefined);

  const handleInputChange = (event: any, newInputValue: string) => setInputValue(newInputValue);

  const currentValue = undefinedToNull(value);

  const optionSelected = (option: Product, selected: Product) => option.id === selected.id;

  const filterOptions = (options: Product[]) => options;

  return (
    <Autocomplete
      options={result?.data.data || []}
      getOptionSelected={optionSelected}
      getOptionLabel={optionLabel}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      renderInput={(params) => <TextField {...params} label="Product" error={error} helperText={helperText} />}
      value={currentValue}
      multiple={false}
      onChange={handleChange}
      loading={loading}
      filterOptions={filterOptions}
    />
  );
};
