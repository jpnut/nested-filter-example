import * as React from 'react';
import { Formik, Form, Field, FieldProps } from 'formik';
import { makeStyles, createStyles, Theme, Box, TextField, ButtonGroup, FormControl } from '@material-ui/core';
import {
  ordersStoreRequest,
  AppDataTransferObjectsOrderOrderData,
  AppDataTransferObjectsCustomerCustomerData,
  AppDataTransferObjectsOrderCreateOrderData,
} from '@api/schema';
import * as Yup from 'yup';
import { Button } from '@components/button/Button';
import { getErrorsFromResponseData, hasError, errorText } from '@support/validation';
import { CreateModal } from '@components/create/Create';
import isNil from 'lodash/isNil';
import { createOrderTransformer } from './transformers';
import { CustomerSelect } from '@modules/customer/CustomerSelect';

type Customer = AppDataTransferObjectsCustomerCustomerData;

export interface CreateOrderValues {
  customer?: Customer;
  placed_at?: string;
  completed_at?: string;
  cancelled_at?: string;
}

interface CreateOrderProps {
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

const CreateOrderSchema = Yup.object().shape({
  placed_at: Yup.date().notRequired(),
  completed_at: Yup.date().notRequired(),
  cancelled_at: Yup.date().notRequired(),
});

const CreateOrder: React.SFC<CreateOrderProps> = ({ onCancel, onComplete }) => {
  const classes = useStyles();

  return (
    <Formik<CreateOrderValues>
      initialValues={{}}
      validationSchema={CreateOrderSchema}
      onSubmit={(values, { setSubmitting, resetForm, setErrors }) => {
        setSubmitting(true);

        ordersStoreRequest({ body: createOrderTransformer(values) as AppDataTransferObjectsOrderCreateOrderData })
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
          <Field name="customer">
            {({ field, meta, form }: FieldProps<CreateOrderValues['customer']>) => (
              <FormControl fullWidth className={classes.field}>
                <CustomerSelect
                  value={field.value}
                  setValue={(value?: Customer) => form.setFieldValue(field.name, value)}
                  error={hasError(meta)}
                  helperText={errorText(meta)}
                />
              </FormControl>
            )}
          </Field>
          <Field name="placed_at">
            {({ field, meta }: FieldProps<CreateOrderValues['placed_at']>) => (
              <TextField
                {...field}
                value={isNil(field.value) ? '' : field.value}
                error={hasError(meta)}
                helperText={errorText(meta)}
                type="datetime-local"
                label="Placed"
                InputLabelProps={{ shrink: true }}
                className={classes.field}
                fullWidth
              />
            )}
          </Field>
          <Field name="completed_at">
            {({ field, meta }: FieldProps<CreateOrderValues['completed_at']>) => (
              <TextField
                {...field}
                value={isNil(field.value) ? '' : field.value}
                error={hasError(meta)}
                helperText={errorText(meta)}
                type="datetime-local"
                label="Completed"
                InputLabelProps={{ shrink: true }}
                className={classes.field}
                fullWidth
              />
            )}
          </Field>
          <Field name="cancelled_at">
            {({ field, meta }: FieldProps<CreateOrderValues['cancelled_at']>) => (
              <TextField
                {...field}
                value={isNil(field.value) ? '' : field.value}
                error={hasError(meta)}
                helperText={errorText(meta)}
                type="datetime-local"
                label="Cancelled"
                InputLabelProps={{ shrink: true }}
                className={classes.field}
                fullWidth
              />
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

interface CreateOrderModal {
  open: boolean;
  handleClose: () => void;
  onComplete: (order: AppDataTransferObjectsOrderOrderData) => void;
}

export const CreateOrderModal: React.SFC<CreateOrderModal> = ({ open, handleClose, onComplete }) => {
  return (
    <CreateModal open={open} handleClose={handleClose}>
      <CreateOrder onComplete={onComplete} onCancel={handleClose} />
    </CreateModal>
  );
};
