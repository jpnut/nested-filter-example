import * as React from 'react';
import { Modal, ModalProps, Fade, Backdrop, useTheme } from '@material-ui/core';

type Props = ModalProps;

export const TransitionModal: React.SFC<Props> = ({ children, ...rest }) => {
  const theme = useTheme();

  return (
    <Modal
      {...rest}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: theme.transitions.duration.short }}
    >
      <Fade in={rest.open} timeout={theme.transitions.duration.short}>
        {children}
      </Fade>
    </Modal>
  );
};
