import * as React from 'react';
import { Box, Slider, TextField } from '@material-ui/core';
import { FieldProps, nullOperator, NumberFieldProps, isNil } from 'react-nested-filter';
import { OperatorSelect } from './OperatorSelect';

const toNumber = (value: any) => (typeof value === 'number' ? value : Number(value));

export const RangeField: React.SFC<FieldProps & NumberFieldProps> = ({
  value,
  setValue,
  operator,
  setOperator,
  operators,
  step,
  min,
  max,
}) => {
  const [state, setState] = React.useState(value);

  const handleValueChange = (newValue?: number | number[]) => {
    if (isNil(newValue)) {
      return setValue(undefined);
    }

    setValue(toNumber(newValue));
  };

  const handleChange = (newValue?: number | number[]) => {
    setState(newValue);

    handleValueChange(newValue);
  };

  const handleInputChange = ({ target: { value: newValue } }: React.ChangeEvent<HTMLInputElement>) => {
    if (newValue === '') {
      return handleChange();
    }

    handleChange(toNumber(newValue));
  };

  const handleSliderChange = (_event: React.ChangeEvent<{}>, newValue: number | number[]) => {
    handleChange(newValue);
  };

  const styles: React.CSSProperties = nullOperator(operator) ? { display: 'none' } : {};

  return (
    <>
      <OperatorSelect operator={operator} setOperator={setOperator} operators={operators} />
      <Box display="flex" flex={1} style={styles}>
        <TextField
          type="number"
          value={isNil(state) ? 0 : state}
          onChange={handleInputChange}
          inputProps={{
            step,
            min,
            max,
          }}
        />
        <Slider value={isNil(state) ? 0 : state} onChange={handleSliderChange} step={step} min={min} max={max} />
      </Box>
    </>
  );
};
