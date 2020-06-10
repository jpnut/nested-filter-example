import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Theme,
  withStyles,
} from '@material-ui/core';
import * as React from 'react';
import { Button } from '@components/button/Button';
import { useAsyncCallback } from 'react-async-hook';
import toString from 'lodash/toString';

interface Descriptions {
  title: React.ReactNode;
  content: React.ReactNode;
  cancel: React.ReactNode;
  delete: React.ReactNode;
}

interface Props<T> {
  entity?: T;
  entityName: string;
  entityDescriptions?: Partial<Descriptions>;
  deleteEntityRequest: (identifier: string) => Promise<any>;
  handleClose: () => void;
  onDeleted: () => void;
}

const defaultDescriptions = (name: string): Descriptions => ({
  title: `Delete this ${name}?`,
  content: `Are you sure you want to delete this ${name}?`,
  cancel: `Cancel`,
  delete: `Delete`,
});

export const DeleteButton = withStyles((theme: Theme) => ({
  root: {
    color: theme.palette.error.main,
    border: `1px solid ${theme.palette.error.light}`,
    '&:hover': {
      borderColor: theme.palette.error.main,
    },
  },
}))(Button);

export const DeleteDialog = <T extends { id: any }>({
  entity,
  entityName,
  entityDescriptions,
  deleteEntityRequest,
  handleClose,
  onDeleted,
}: Props<T>) => {
  const deleteEntity = useAsyncCallback(deleteEntityRequest);

  const handleEntityDelete = () => {
    if (!entity) {
      return;
    }

    deleteEntity.execute(toString(entity.id)).then(() => {
      handleClose();
      onDeleted();
    });
  };

  const descriptions = {
    ...defaultDescriptions(entityName),
    ...entityDescriptions,
  };

  return (
    <Dialog
      open={!!entity}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{descriptions.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{descriptions.content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{descriptions.cancel}</Button>
        <DeleteButton onClick={handleEntityDelete} autoFocus loading={deleteEntity.loading}>
          {descriptions.delete}
        </DeleteButton>
      </DialogActions>
    </Dialog>
  );
};
