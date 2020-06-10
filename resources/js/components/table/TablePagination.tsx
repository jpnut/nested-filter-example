import * as React from 'react';
import { Pagination } from '@material-ui/lab';
import { FormControl, InputLabel, Select, SelectProps, makeStyles, Theme, createStyles } from '@material-ui/core';
import toNumber from 'lodash/toNumber';
import classNames from 'classnames';

interface Props {
  count: number;
  page: number;
  perPage: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
  className?: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      padding: theme.spacing(2, 0),
    },
    select: {
      minWidth: 120,
    },
  }),
);

export const TablePagination: React.SFC<Props> = ({
  count,
  page,
  perPage,
  onPageChange,
  onPerPageChange,
  className,
}) => {
  const classes = useStyles();

  const handlePaginationChange = (event: any, newPage: number) => onPageChange(newPage);

  const handlePerPageChange: SelectProps['onChange'] = ({ target: { value } }) => onPerPageChange(toNumber(value));

  return (
    <div className={classNames(classes.root, className)}>
      <FormControl className={classes.select}>
        <InputLabel htmlFor="per-page-selector">Per Page</InputLabel>
        <Select
          native
          value={perPage}
          onChange={handlePerPageChange}
          inputProps={{
            name: 'per-page',
            id: 'per-page-selector',
          }}
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </Select>
      </FormControl>
      <Pagination count={count} page={page} onChange={handlePaginationChange} />
    </div>
  );
};
