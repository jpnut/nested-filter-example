import * as React from 'react';
import { Formik, Form, Field, FieldProps } from 'formik';
import {
  makeStyles,
  createStyles,
  Theme,
  Box,
  TextField,
  ButtonGroup,
  Checkbox,
  FormControlLabel,
  FormControl,
  FormHelperText,
  InputAdornment,
} from '@material-ui/core';
import { productsStoreRequest, AppDataTransferObjectsProductProductData } from '@api/schema';
import isNil from 'lodash/isNil';
import * as Yup from 'yup';
import { Button } from '@components/button/Button';
import { getErrorsFromResponseData, hasError, errorText } from '@support/validation';
import { createProductTransformer } from './transformers';
import { CreateModal } from '@components/create/Create';

export interface CreateProductValues {
  name: string;
  description?: string;
  amount: string;
  published_at?: string;
  archived_at?: string;
  available: boolean;
}

interface CreateProductProps {
  onComplete: (product: AppDataTransferObjectsProductProductData) => void;
  onCancel: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    field: {
      marginBottom: theme.spacing(2),
    },
  }),
);

const CreateProductSchema = Yup.object().shape({
  name: Yup.string().max(512, 'Too Long!').required('Required'),
  description: Yup.string().max(10000, 'Too Long!').notRequired(),
  amount: Yup.number().min(0, 'Must be at least 0').max(999999999999, 'Cannot exceed 9999999999').required('Required'),
  published_at: Yup.date().notRequired(),
  archived_at: Yup.date().notRequired(),
  available: Yup.bool().required('Required'),
});

const CreateProduct: React.SFC<CreateProductProps> = ({ onCancel, onComplete }) => {
  const classes = useStyles();

  return (
    <Formik<CreateProductValues>
      initialValues={{
        name: '',
        amount: '',
        available: false,
      }}
      validationSchema={CreateProductSchema}
      onSubmit={(values, { setSubmitting, resetForm, setErrors }) => {
        setSubmitting(true);

        productsStoreRequest({ body: createProductTransformer(values) })
          .then(({ data, response }) => {
            setSubmitting(false);

            if (!response.ok) {
              setErrors(getErrorsFromResponseData(data));

              return;
            }

            resetForm();
            onComplete(data);
          })
          .catch(() => {
            setSubmitting(false);
          });
      }}
    >
      {({ submitForm, isSubmitting }) => (
        <Form>
          <Field name="name">
            {({ field, meta }: FieldProps<CreateProductValues['name']>) => (
              <TextField
                {...field}
                value={isNil(field.value) ? '' : field.value}
                error={hasError(meta)}
                helperText={errorText(meta)}
                label="Name"
                className={classes.field}
                fullWidth
              />
            )}
          </Field>
          <Field name="description">
            {({ field, meta }: FieldProps<CreateProductValues['description']>) => (
              <TextField
                {...field}
                value={isNil(field.value) ? '' : field.value}
                error={hasError(meta)}
                helperText={errorText(meta)}
                label="Description"
                className={classes.field}
                fullWidth
                multiline
                rows={5}
                rowsMax={10}
              />
            )}
          </Field>
          <Field name="amount">
            {({ field, meta }: FieldProps<CreateProductValues['amount']>) => (
              <TextField
                {...field}
                value={isNil(field.value) ? '' : field.value}
                error={hasError(meta)}
                helperText={errorText(meta)}
                type="number"
                label="Amount"
                className={classes.field}
                fullWidth
                InputProps={{
                  startAdornment: <InputAdornment position="start">£</InputAdornment>,
                }}
              />
            )}
          </Field>
          <Field name="published_at">
            {({ field, meta }: FieldProps<CreateProductValues['published_at']>) => (
              <TextField
                {...field}
                value={isNil(field.value) ? '' : field.value}
                error={hasError(meta)}
                helperText={errorText(meta)}
                type="datetime-local"
                label="Published"
                InputLabelProps={{ shrink: true }}
                className={classes.field}
                fullWidth
              />
            )}
          </Field>
          <Field name="archived_at">
            {({ field, meta }: FieldProps<CreateProductValues['archived_at']>) => (
              <TextField
                {...field}
                value={isNil(field.value) ? '' : field.value}
                error={hasError(meta)}
                helperText={errorText(meta)}
                type="datetime-local"
                label="Archived"
                InputLabelProps={{ shrink: true }}
                className={classes.field}
                fullWidth
              />
            )}
          </Field>
          <Field name="available">
            {({ field, meta }: FieldProps<CreateProductValues['available']>) => (
              <FormControl error={hasError(meta)} className={classes.field}>
                <FormControlLabel
                  control={<Checkbox {...field} checked={field.value} name="available" />}
                  label="Available"
                />
                {!isNil(errorText(meta)) && <FormHelperText>{errorText(meta)}</FormHelperText>}
              </FormControl>
            )}
          </Field>
          <Box display="flex" justifyContent="flex-end" marginTop="1rem">
            <ButtonGroup aria-label="primary button group">
              <Button color="default" disabled={isSubmitting} onClick={onCancel}>
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                onClick={submitForm}
                loading={isSubmitting}
              >
                Submit
              </Button>
            </ButtonGroup>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

interface CreateProductModal {
  open: boolean;
  handleClose: () => void;
  onComplete: (product: AppDataTransferObjectsProductProductData) => void;
}

export const CreateProductModal: React.SFC<CreateProductModal> = ({ open, handleClose, onComplete }) => {
  return (
    <CreateModal open={open} handleClose={handleClose}>
      <CreateProduct onComplete={onComplete} onCancel={handleClose} />
    </CreateModal>
  );
};
