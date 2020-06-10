import * as React from 'react';

interface Props {
  onDelete: () => void;
}

export const useDelete = <T extends any>({ onDelete }: Props) => {
  const [deleteEntity, setDeleteEntity] = React.useState<T | undefined>(undefined);

  const handleDelete = (entity: T) => {
    setDeleteEntity(entity);
  };

  const handleDeleteDialogClose = () => {
    setDeleteEntity(undefined);
  };

  const handleDeleted = () => {
    handleDeleteDialogClose();
    onDelete();
  };

  return {
    deleteEntity,
    handleDelete,
    handleDeleteDialogClose,
    handleDeleted,
  };
};
