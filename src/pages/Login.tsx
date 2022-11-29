import React, { useState, useContext } from 'react';
import { connection } from '../connection';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { UserContext } from '../components/UserContext';
import { SnackbarContext } from '../components/SnackbarContext';

import { stringToColor } from '../components/materialFunc';
import { Grid } from '@mui/material';

export default function Login() {
  const navigate = useNavigate();
  const { setIsAuth, setUsername, setAvatarColor } = useContext(UserContext);
  const {
    setOpen,
    setAlertMessage,
    setSeverity,
  } = useContext(SnackbarContext);
  const [name, setName] = useState('');

  const handleClick = (message: string) => {
    setAlertMessage(message);
    setOpen(true);
  };

  function login(username: string) {
    return fetch(`${connection}/login`, {
      headers: {
        'Content-type': 'application/json',
      },
      method: 'PATCH',
      body: JSON.stringify({
        name: username,
        avatarColor: stringToColor(username),
      }),
    })
      .then((res) => {
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
        width: '225px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '40px 0',
        margin: '0 auto',
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
      />
      <Grid container columns={10} columnSpacing={1} style={{ width: '100%' }}>
        <Grid item xs={4}>
          <Button
            variant="contained"
            style={{
              width: '100%',
              padding: '4px 0px',
              marginTop: '10px',
              backgroundColor: '#676767',
            }}
            onClick={async () => {
              navigate('/');
            }}
          >
            Back
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="contained"
            style={{
              width: '100%',
              padding: '4px 0px',
              display: 'inline-block',
              marginTop: '10px',
            }}
            onClick={async () => {
              if (name) {
                if (name !== 'Unknown') {
                  const result = await login(name);
                  console.log(result, 'login result');

                  if (result.success) {
                    setIsAuth(true);
                    handleClick(result.message);
                    setAvatarColor(result.avatarColor);
                    setSeverity('success');
                    setUsername(name);
                    navigate('/');
                  } else {
                    setSeverity('error');
                    handleClick(result.message);
                  }
                }else{
                  setSeverity('error');
                  handleClick('This username is reserved for default.');
                }
              }
            }}
          >
            Continue
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
