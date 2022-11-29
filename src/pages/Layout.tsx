import React, { useContext } from 'react';
import Nav from '../components/Nav';
import { Outlet } from 'react-router-dom';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps, AlertColor } from '@mui/material/Alert';

import { SnackbarContext } from '../components/SnackbarContext';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Layout() {
  const { open, setOpen, alertMessage, severity } = useContext(SnackbarContext);
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    setOpen(false);
  };
  return (
    <div>
      <Nav></Nav>

      <div className="container">
        <Outlet />
      </div>

      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        style={{
          position: 'absolute',
          padding: '0px',
          top: '0px',
          left: '0px',
          right: '0px',
          bottom: 'auto',
        }}
      >
        <Alert
          severity={severity as AlertColor}
          
          sx={{
            width: '100%',
            height: '76px',
            display: 'flex',
            fontSize: '18px',
            alignItems: 'center',
          }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
