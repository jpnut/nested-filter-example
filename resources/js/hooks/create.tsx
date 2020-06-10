import * as React from 'react';

interface Props<T> {
  onCreate: (entity: T) => void;
}

export const useCreate = <T extends any, Y extends any = T>({ onCreate }: Props<Y>) => {
  const [createModalOpen, setCreateModalOpen] = React.useState(false);

  const openCreateModal = () => {
    setCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setCreateModalOpen(false);
  };

  const handleCreated = (entity: Y) => {
    closeCreateModal();
    onCreate(entity);
  };

  return {
    createModalOpen,
    openCreateModal,
    closeCreateModal,
    handleCreated,
  };
};
