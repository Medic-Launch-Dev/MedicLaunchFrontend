import { Close } from '@mui/icons-material';
import { IconButton, SnackbarProps } from '@mui/material';
import React, { useState } from 'react';

type Severity = 'info' | 'error' | 'success';

export function useSnackbar(): {
  showSnackbar: (message: string, severity?: Severity) => void;
  snackbarProps: SnackbarProps;
} {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<Severity>('success');

  const handleClose = () => {
    setOpen(false);
  };

  const showSnackbar = (newMessage: string, newSeverity: Severity = 'success') => {
    setMessage(newMessage);
    setSeverity(newSeverity);
    setOpen(true);
  };

  const bgcolor = {
    'info': undefined,
    'success': '#3E9B4F',
    'error': '#D13415',
  }

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <Close fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const snackbarProps: SnackbarProps = {
    open,
    onClose: handleClose,
    autoHideDuration: 4000,
    action,
    message,
    anchorOrigin: { horizontal: 'center', vertical: 'bottom' },
    ContentProps: {
      sx: { bgcolor: bgcolor[severity] }
    }
  };

  return { showSnackbar, snackbarProps };
}