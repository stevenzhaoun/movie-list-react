import React from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const SnackBar = ({
  message,
  open,
  onClose,
  key = 'snackbar'
}) => {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    onClose();
  }
  return (
    <Snackbar
      style={{ backgroundColor: 'green' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      open={open}
      onClose={handleClose}
      key={key}
    >
      <Alert onClose={handleClose} severity="success">
        {message}
      </Alert>
    </Snackbar>
  )
}

export default SnackBar
