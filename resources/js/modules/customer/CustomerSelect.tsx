import * as React from 'react';
import { Autocomplete } from '@material-ui/lab';
import { customersIndexRequest, AppDataTransferObjectsCustomerCustomerData } from '@api/schema';
import { useAsyncAbortable } from 'react-async-hook';
import { TextField } from '@material-ui/core';
import { undefinedToNull } from '@support/null-undefined';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import useConstant from 'use-constant';

type Customer = AppDataTransferObjectsCustomerCustomerData;

interface Props {
  value?: Customer;
  setValue: (value?: Customer) => void;
  error: boolean;
  helperText?: string;
}

export const CustomerSelect = ({ value, setValue, error, helperText }: Props) => {
  const [inputValue, setInputValue] = React.useState('');

  const request = useConstant(() => AwesomeDebouncePromise(customersIndexRequest, 400));

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

  const optionLabel = (customer: Customer) => customer.full_name;

  const handleChange = (event: any, newValue: Customer | null) => setValue(newValue || undefined);

  const handleInputChange = (event: any, newInputValue: string) => setInputValue(newInputValue);

  const currentValue = undefinedToNull(value);

  const optionSelected = (option: Customer, selected: Customer) => option.id === selected.id;

  const filterOptions = (options: Customer[]) => options;

  return (
    <Autocomplete
      options={result?.data.data || []}
      getOptionSelected={optionSelected}
      getOptionLabel={optionLabel}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      renderInput={(params) => <TextField {...params} label="Customer" error={error} helperText={helperText} />}
      value={currentValue}
      multiple={false}
      onChange={handleChange}
      loading={loading}
      filterOptions={filterOptions}
    />
  );
};
