import { makeStyles, Theme, createStyles, fade, useTheme, CircularProgress } from '@material-ui/core';
import * as React from 'react';
import classNames from 'classnames';
import { Transition } from 'react-transition-group';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      position: 'relative',
    },
    loader: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: fade(theme.palette.common.black, 0.1),
      opacity: 0,
      transition: theme.transitions.create(['opacity'], {
        duration: theme.transitions.duration.short,
      }),
    },
  }),
);

const loaderStates = {
  unmounted: {},
  entering: {},
  entered: { opacity: 1 },
  exiting: {},
  exited: {},
};

export const TableLoader: React.SFC<{ in: boolean }> = ({ in: inProp }) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Transition in={inProp} timeout={{ appear: 0, exit: theme.transitions.duration.short }} appear unmountOnExit>
      {(state) => (
        <div className={classNames(classes.loader)} style={{ ...loaderStates[state] }}>
          <CircularProgress />
        </div>
      )}
    </Transition>
  );
};

export const TableWithLoaderWrapper: React.SFC<{ loading: boolean }> = ({ loading, children }) => {
  const classes = useStyles();

  return (
    <div className={classNames(classes.container)}>
      <TableLoader in={loading} />
      {children}
    </div>
  );
};
