import * as React from 'react';

interface Props<T> {
  onUpdate: (entity: Partial<T>) => void;
}

export const useUpdate = <T extends any, Y extends any = T>({ onUpdate }: Props<Y>) => {
  const [updateEntity, setUpdateEntity] = React.useState<T | undefined>(undefined);

  const handleUpdate = (entity: T) => {
    setUpdateEntity(entity);
  };

  const handleUpdateModalClose = () => {
    setUpdateEntity(undefined);
  };

  const handleUpdated = (entity: Partial<Y>) => {
    handleUpdateModalClose();
    onUpdate(entity);
  };

  return {
    updateEntity,
    handleUpdate,
    handleUpdateModalClose,
    handleUpdated,
  };
};
