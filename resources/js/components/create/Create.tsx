import * as React from 'react';
import { makeStyles, Theme, createStyles, Container } from '@material-ui/core';
import { TransitionModal } from '@components/modal/TransitionModal';

interface CreateModal {
  open: boolean;
  handleClose: () => void;
}

const useModalStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      outline: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    root: {
      backgroundColor: theme.palette.background.default,
      boxShadow: theme.shadows[10],
      padding: theme.spacing(3),
    },
  }),
);

export const CreateModal: React.SFC<CreateModal> = ({ open, handleClose, children }) => {
  const classes = useModalStyles();

  return (
    <TransitionModal
      open={open}
      onClose={handleClose}
      className={classes.modal}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Container maxWidth="sm" className={classes.root}>
        {children}
      </Container>
    </TransitionModal>
  );
};
