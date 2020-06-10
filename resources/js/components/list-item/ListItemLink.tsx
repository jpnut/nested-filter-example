import * as React from 'react';
import ListItem from '@material-ui/core/ListItem';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import { Omit } from '@material-ui/types';

interface ListItemLinkProps {
  to: string;
  children: React.ReactNode;
}

export function ListItemLink(props: ListItemLinkProps) {
  const { to, children } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef<any, Omit<RouterLinkProps, 'to'>>((itemProps, ref) => (
        <RouterLink to={to} ref={ref} {...itemProps} />
      )),
    [to],
  );

  return (
    <li>
      <ListItem button component={renderLink}>
        {children}
      </ListItem>
    </li>
  );
}
