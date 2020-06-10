import { withStyles, Theme, Grid } from '@material-ui/core';

export const SubBarItem = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(1, 3),
    flexDirection: 'column',
  },
}))(Grid);
