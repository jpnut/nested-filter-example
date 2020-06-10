import * as React from 'react';
import { Formik, Form, Field, FieldProps } from 'formik';
import { makeStyles, createStyles, Theme, Box, ButtonGroup } from '@material-ui/core';
import { ordersUpdateRequest, AppDataTransferObjectsOrderOrderData } from '@api/schema';
import * as Yup from 'yup';
import { Button } from '@components/button/Button';
import { getErrorsFromResponseData, hasError, errorText } from '@support/validation';
import { UpdateModal } from '@components/update/Update';
import toString from 'lodash/toString';
import { updateOrderTransformer, Order } from './transformers';
import { DateTimePicker } from '@material-ui/pickers';

export interface UpdateOrderValues {
  placed_at?: Date | null;
  completed_at?: Date | null;
  cancelled_at?: Date | null;
}

interface UpdateOrderProps {
  order?: Order;
  onComplete: (order: Partial<AppDataTransferObjectsOrderOrderData>) => void;
  onCancel: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    field: {
      marginBottom: theme.spacing(2),
    },
  }),
);

const UpdateOrderSchema = Yup.object().shape({
  placed_at: Yup.date().notRequired().nullable(),
  completed_at: Yup.date().notRequired().nullable(),
  cancelled_at: Yup.date().notRequired().nullable(),
});

const UpdateOrder: React.SFC<UpdateOrderProps> = ({ order, onCancel, onComplete }) => {
  const classes = useStyles();

  return (
    <Formik<UpdateOrderValues>
      initialValues={{
        placed_at: order?.placed_at,
        completed_at: order?.completed_at,
        cancelled_at: order?.cancelled_at,
      }}
      validationSchema={UpdateOrderSchema}
      onSubmit={(values, { setSubmitting, resetForm, setErrors }) => {
        if (!order) {
          return;
        }

        setSubmitting(true);

        ordersUpdateRequest({ body: updateOrderTransformer(values) }, toString(order.id))
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
          <Field name="placed_at">
            {({ field, meta, form }: FieldProps<UpdateOrderValues['placed_at']>) => (
              <DateTimePicker
                {...field}
                error={hasError(meta)}
                helperText={errorText(meta)}
                label="Placed"
                className={classes.field}
                fullWidth
                clearable
                onChange={(date) => form.setFieldValue(field.name, date)}
              />
            )}
          </Field>
          <Field name="completed_at">
            {({ field, meta, form }: FieldProps<UpdateOrderValues['completed_at']>) => (
              <DateTimePicker
                {...field}
                error={hasError(meta)}
                helperText={errorText(meta)}
                label="Completed"
                className={classes.field}
                fullWidth
                clearable
                onChange={(date) => form.setFieldValue(field.name, date)}
              />
            )}
          </Field>
          <Field name="cancelled_at">
            {({ field, meta, form }: FieldProps<UpdateOrderValues['cancelled_at']>) => (
              <DateTimePicker
                {...field}
                error={hasError(meta)}
                helperText={errorText(meta)}
                label="Cancelled"
                className={classes.field}
                fullWidth
                clearable
                onChange={(date) => form.setFieldValue(field.name, date)}
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

interface UpdateOrderModal {
  order?: Order;
  handleClose: () => void;
  onComplete: (order: Partial<AppDataTransferObjectsOrderOrderData>) => void;
}

export const UpdateOrderModal: React.SFC<UpdateOrderModal> = ({ order, handleClose, onComplete }) => {
  return (
    <UpdateModal open={!!order} handleClose={handleClose}>
      <UpdateOrder order={order} onComplete={onComplete} onCancel={handleClose} />
    </UpdateModal>
  );
};
