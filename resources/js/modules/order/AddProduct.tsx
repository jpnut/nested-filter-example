import * as React from 'react';
import { Formik, Form, Field, FieldProps } from 'formik';
import { makeStyles, createStyles, Theme, Box, ButtonGroup, FormControl } from '@material-ui/core';
import { AppDataTransferObjectsProductProductData, AppDataTransferObjectsOrderOrderData } from '@api/schema';
import * as Yup from 'yup';
import { Button } from '@components/button/Button';
import { getErrorsFromResponseData, hasError, errorText } from '@support/validation';
import { CreateModal } from '@components/create/Create';
import { GenericResponse } from '@api/client';
import { ProductSelect } from '@modules/product/ProductSelect';

type Product = AppDataTransferObjectsProductProductData;

export interface AddProductValues {
  product?: Product;
}

interface AddProductProps {
  add: (product: number) => Promise<GenericResponse<AppDataTransferObjectsOrderOrderData>>;
  onComplete: (order: AppDataTransferObjectsOrderOrderData) => void;
  onCancel: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    field: {
      marginBottom: theme.spacing(2),
    },
  }),
);

const AddProductSchema = Yup.object().shape({
  product: Yup.object().required('Required'),
});

const AddProduct: React.SFC<AddProductProps> = ({ add, onCancel, onComplete }) => {
  const classes = useStyles();

  return (
    <Formik<AddProductValues>
      initialValues={{}}
      validationSchema={AddProductSchema}
      onSubmit={(values, { setSubmitting, resetForm, setErrors }) => {
        setSubmitting(true);

        add(values.product?.id as number)
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
          <Field name="product">
            {({ field, meta, form }: FieldProps<AddProductValues['product']>) => (
              <FormControl fullWidth className={classes.field}>
                <ProductSelect
                  value={field.value}
                  setValue={(value?: Product) => form.setFieldValue(field.name, value)}
                  error={hasError(meta)}
                  helperText={errorText(meta)}
                />
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

interface AddProductModal {
  open: boolean;
  add: (product: number) => Promise<GenericResponse<AppDataTransferObjectsOrderOrderData>>;
  handleClose: () => void;
  onComplete: (tag: AppDataTransferObjectsOrderOrderData) => void;
}

export const AddProductModal: React.SFC<AddProductModal> = ({ open, add, handleClose, onComplete }) => {
  return (
    <CreateModal open={open} handleClose={handleClose}>
      <AddProduct add={add} onComplete={onComplete} onCancel={handleClose} />
    </CreateModal>
  );
};
