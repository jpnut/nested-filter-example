import * as React from 'react';
import { Formik, Form, Field, FieldProps } from 'formik';
import { makeStyles, createStyles, Theme, Box, TextField, ButtonGroup } from '@material-ui/core';
import { customersUpdateRequest, AppDataTransferObjectsCustomerCustomerData } from '@api/schema';
import isNil from 'lodash/isNil';
import * as Yup from 'yup';
import { Button } from '@components/button/Button';
import { getErrorsFromResponseData, hasError, errorText } from '@support/validation';
import { UpdateModal } from '@components/update/Update';
import toString from 'lodash/toString';
import { nullToUndefined } from '@support/null-undefined';
import { Customer } from './transformers';

export interface UpdateCustomerValues {
  full_name: string;
  email?: string;
  phone?: string;
}

interface UpdateCustomerProps {
  customer?: Customer;
  onComplete: (customer: Partial<AppDataTransferObjectsCustomerCustomerData>) => void;
  onCancel: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    field: {
      marginBottom: theme.spacing(2),
    },
  }),
);

const UpdateCustomerSchema = Yup.object().shape({
  full_name: Yup.string().max(512, 'Too Long!').required('Required'),
  email: Yup.string().max(512, 'Too Long!').email().notRequired(),
  phone: Yup.string().max(64, 'Too Long!').notRequired(),
});

const UpdateCustomer: React.SFC<UpdateCustomerProps> = ({ customer, onCancel, onComplete }) => {
  const classes = useStyles();

  return (
    <Formik<UpdateCustomerValues>
      initialValues={{
        full_name: !isNil(customer) ? customer.full_name : '',
        email: nullToUndefined(customer?.email),
        phone: nullToUndefined(customer?.phone),
      }}
      validationSchema={UpdateCustomerSchema}
      onSubmit={(values, { setSubmitting, resetForm, setErrors }) => {
        if (!customer) {
          return;
        }

        setSubmitting(true);

        customersUpdateRequest({ body: values }, toString(customer.id))
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
          <Field name="full_name">
            {({ field, meta }: FieldProps<UpdateCustomerValues['full_name']>) => (
              <TextField
                {...field}
                value={isNil(field.value) ? '' : field.value}
                error={hasError(meta)}
                helperText={errorText(meta)}
                label="Full Name"
                className={classes.field}
                fullWidth
              />
            )}
          </Field>
          <Field name="email">
            {({ field, meta }: FieldProps<UpdateCustomerValues['email']>) => (
              <TextField
                {...field}
                value={isNil(field.value) ? '' : field.value}
                error={hasError(meta)}
                helperText={errorText(meta)}
                label="Email"
                className={classes.field}
                fullWidth
                type="email"
              />
            )}
          </Field>
          <Field name="phone">
            {({ field, meta }: FieldProps<UpdateCustomerValues['phone']>) => (
              <TextField
                {...field}
                value={isNil(field.value) ? '' : field.value}
                error={hasError(meta)}
                helperText={errorText(meta)}
                label="Phone"
                className={classes.field}
                fullWidth
                type="tel"
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

interface UpdateCustomerModal {
  customer?: Customer;
  handleClose: () => void;
  onComplete: (customer: Partial<AppDataTransferObjectsCustomerCustomerData>) => void;
}

export const UpdateCustomerModal: React.SFC<UpdateCustomerModal> = ({ customer, handleClose, onComplete }) => {
  return (
    <UpdateModal open={!!customer} handleClose={handleClose}>
      <UpdateCustomer customer={customer} onComplete={onComplete} onCancel={handleClose} />
    </UpdateModal>
  );
};
