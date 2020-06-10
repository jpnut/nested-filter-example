import * as React from 'react';
import { TableRow } from '@material-ui/core';

interface Props {
  rows: number;
  children: React.ReactNode[];
}

export const TableSkeleton: React.SFC<Props> = ({ rows, children }) => (
  <>
    {Array(rows)
      .fill(null)
      .map((v, i) => (
        <TableRow key={i}>{children}</TableRow>
      ))}
  </>
);
