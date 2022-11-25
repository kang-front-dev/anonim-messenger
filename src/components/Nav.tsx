import React, { useContext } from 'react';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import {Context} from '../App'

export default function Nav() {
  const navigate = useNavigate();
  const {isAuth,setIsAuth,username} = useContext(Context)
  return (
    <div className="nav">
      {isAuth ? (
        <Button
          variant="outlined"
          style={{ padding: '4px 20px', marginRight: '10px' }}
          onClick={()=>{
            setIsAuth(false)
          }}
        >
          Logout
        </Button>
      ) : (
        <Button
          variant="contained"
          style={{ padding: '4px 20px', marginRight: '10px' }}
          onClick={() => navigate('/login')}
        >
          Login
        </Button>
      )}
      <Chip
        label={username}
        variant="outlined"
        style={{ borderRadius: '5px', padding: '5px 0px', fontSize: '15px' }}
      />
    </div>
  );
}
