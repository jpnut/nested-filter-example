import { withStyles, Theme, Paper } from '@material-ui/core';

export const PaperSection = withStyles((theme: Theme) => ({
  root: {
    '&:not(:last-child)': {
      marginBottom: theme.spacing(4),
    },
  },
}))(Paper);
