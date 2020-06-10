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
import { productsUpdateRequest, AppDataTransferObjectsProductProductData } from '@api/schema';
import isNil from 'lodash/isNil';
import * as Yup from 'yup';
import { Button } from '@components/button/Button';
import { getErrorsFromResponseData, hasError, errorText } from '@support/validation';
import { UpdateModal } from '@components/update/Update';
import toString from 'lodash/toString';
import { nullToUndefined } from '@support/null-undefined';
import { updateProductTransformer, Product } from './transformers';
import { formatDateForForm } from '@support/date';

export interface UpdateProductValues {
  name: string;
  description?: string;
  amount: string;
  published_at?: string;
  archived_at?: string;
  available: boolean;
}

interface UpdateProductProps {
  product?: Product;
  onComplete: (product: Partial<AppDataTransferObjectsProductProductData>) => void;
  onCancel: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    field: {
      marginBottom: theme.spacing(2),
    },
  }),
);

const UpdateProductSchema = Yup.object().shape({
  name: Yup.string().max(512, 'Too Long!').required('Required'),
  description: Yup.string().max(10000, 'Too Long!').notRequired(),
  amount: Yup.number().min(0, 'Must be at least 0').max(999999999999, 'Cannot exceed 9999999999').required('Required'),
  published_at: Yup.date().notRequired(),
  archived_at: Yup.date().notRequired(),
  available: Yup.bool().required('Required'),
});

const UpdateProduct: React.SFC<UpdateProductProps> = ({ product, onCancel, onComplete }) => {
  const classes = useStyles();

  return (
    <Formik<UpdateProductValues>
      initialValues={{
        name: !isNil(product) ? product.name : '',
        description: nullToUndefined(product?.description),
        amount: !isNil(product) ? toString(product.amount) : '',
        published_at: nullToUndefined(formatDateForForm(product?.published_at)),
        archived_at: nullToUndefined(formatDateForForm(product?.archived_at)),
        available: !isNil(product) ? product.available : false,
      }}
      validationSchema={UpdateProductSchema}
      onSubmit={(values, { setSubmitting, resetForm, setErrors }) => {
        if (!product) {
          return;
        }

        setSubmitting(true);

        productsUpdateRequest({ body: updateProductTransformer(values) }, toString(product.id))
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
            {({ field, meta }: FieldProps<UpdateProductValues['name']>) => (
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
            {({ field, meta }: FieldProps<UpdateProductValues['description']>) => (
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
            {({ field, meta }: FieldProps<UpdateProductValues['amount']>) => (
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
            {({ field, meta }: FieldProps<UpdateProductValues['published_at']>) => (
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
            {({ field, meta }: FieldProps<UpdateProductValues['archived_at']>) => (
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
            {({ field, meta }: FieldProps<UpdateProductValues['available']>) => (
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

interface UpdateProductModal {
  product?: Product;
  handleClose: () => void;
  onComplete: (product: Partial<AppDataTransferObjectsProductProductData>) => void;
}

export const UpdateProductModal: React.SFC<UpdateProductModal> = ({ product, handleClose, onComplete }) => {
  return (
    <UpdateModal open={!!product} handleClose={handleClose}>
      <UpdateProduct product={product} onComplete={onComplete} onCancel={handleClose} />
    </UpdateModal>
  );
};
