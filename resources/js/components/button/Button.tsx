import * as React from 'react';
import {
  Button as BaseButton,
  ButtonProps as BaseButtonProps,
  CircularProgress,
  makeStyles,
  createStyles,
} from '@material-ui/core';

export interface ButtonProps extends BaseButtonProps {
  loading?: boolean;
}

const useStyles = makeStyles(() =>
  createStyles({
    buttonProgress: {
      color: 'inherit',
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    },
  }),
);

export const Button: React.SFC<ButtonProps> = ({ children, loading = false, ...rest }) => {
  const classes = useStyles();

  return (
    <BaseButton {...rest}>
      {children}
      {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
    </BaseButton>
  );
};
