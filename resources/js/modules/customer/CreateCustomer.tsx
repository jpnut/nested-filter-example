import * as React from 'react';
import { Formik, Form, Field, FieldProps } from 'formik';
import { makeStyles, createStyles, Theme, Box, TextField, ButtonGroup } from '@material-ui/core';
import { customersStoreRequest, AppDataTransferObjectsCustomerCustomerData } from '@api/schema';
import * as Yup from 'yup';
import { Button } from '@components/button/Button';
import { getErrorsFromResponseData, hasError, errorText } from '@support/validation';
import { CreateModal } from '@components/create/Create';
import isNil from 'lodash/isNil';

export interface CreateCustomerValues {
  full_name: string;
  email?: string;
  phone?: string;
}

interface CreateCustomerProps {
  onComplete: (customer: AppDataTransferObjectsCustomerCustomerData) => void;
  onCancel: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    field: {
      marginBottom: theme.spacing(2),
    },
  }),
);

const CreateCustomerSchema = Yup.object().shape({
  full_name: Yup.string().max(512, 'Too Long!').required('Required'),
  email: Yup.string().max(512, 'Too Long!').email().notRequired(),
  phone: Yup.string().max(64, 'Too Long!').notRequired(),
});

const CreateCustomer: React.SFC<CreateCustomerProps> = ({ onCancel, onComplete }) => {
  const classes = useStyles();

  return (
    <Formik<CreateCustomerValues>
      initialValues={{
        full_name: '',
      }}
      validationSchema={CreateCustomerSchema}
      onSubmit={(values, { setSubmitting, resetForm, setErrors }) => {
        setSubmitting(true);

        customersStoreRequest({ body: values })
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
            {({ field, meta }: FieldProps<CreateCustomerValues['full_name']>) => (
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
            {({ field, meta }: FieldProps<CreateCustomerValues['email']>) => (
              <TextField
                {...field}
                value={isNil(field.value) ? '' : field.value}
                error={hasError(meta)}
                helperText={errorText(meta)}
                label="Email"
                className={classes.field}
                fullWidth
              />
            )}
          </Field>
          <Field name="phone">
            {({ field, meta }: FieldProps<CreateCustomerValues['phone']>) => (
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

interface CreateCustomerModal {
  open: boolean;
  handleClose: () => void;
  onComplete: (customer: AppDataTransferObjectsCustomerCustomerData) => void;
}

export const CreateCustomerModal: React.SFC<CreateCustomerModal> = ({ open, handleClose, onComplete }) => {
  return (
    <CreateModal open={open} handleClose={handleClose}>
      <CreateCustomer onComplete={onComplete} onCancel={handleClose} />
    </CreateModal>
  );
};
