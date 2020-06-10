import * as React from 'react';

export interface Props {
  onPageSet: (page: number) => void;
  onPerPageSet: (perPage: number) => void;
}

export function usePagination({ onPageSet, onPerPageSet }: Props) {
  const [page, setPage] = React.useState(1);
  const [perPage, setPerPage] = React.useState(10);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    onPageSet(newPage);
  };

  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage);
    onPerPageSet(newPerPage);
  };

  return {
    page,
    perPage,
    handlePageChange,
    handlePerPageChange,
  };
}
