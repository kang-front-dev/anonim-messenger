import React, { useState, useContext } from 'react';
import { connection } from '../connection';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps, AlertColor } from '@mui/material/Alert';

import { Context } from '../App';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Login() {
  const navigate = useNavigate();
  const { setIsAuth } = useContext(Context);

  const [name, setName] = useState('');

  const [open, setOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [severity, setSeverity] = useState('success');

  const handleClick = (message: string) => {
    setAlertMessage(message);
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  function login(username: string) {
    return fetch(`${connection}/login`, {
      headers: {
        'Content-type': 'application/json',
      },
      method: 'PATCH',
      body: JSON.stringify({ name: username }),
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .catch((err) => console.log(err));
  }

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '40px 0',
      }}
    >
      <h2 className="page_title">Login</h2>
      <TextField
        id="outlined-error-helper-text"
        label="Your name"
        defaultValue=""
        helperText=""
        onInput={(e) => {
          setName((e.target as HTMLInputElement).value);
        }}
        style={{ marginLeft: '0' }}
      />
      <Button
        variant="contained"
        style={{ padding: '4px 20px', marginRight: '10px', marginTop: '10px' }}
        onClick={async () => {
          const result = await login(name);
          console.log(result, 'login result');

          if (result.success) {
            setIsAuth(true);
            navigate('/');
          } else {
            setSeverity('error');
            handleClick(result.message);
          }
        }}
      >
        Continue
      </Button>
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={severity as AlertColor}
          sx={{ width: '100%' }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
