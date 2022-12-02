import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../components/UserContext';
import { Avatar } from '@mui/material';

export default function Nav() {
  const navigate = useNavigate();
  const { isAuth, setIsAuth, username, setUsername, avatarColor } =
    useContext(UserContext);
  return (
    <div className="nav">
      <div className="nav_about">
        <Avatar
          style={{ backgroundColor: avatarColor }}
          children={username[0].toUpperCase()}
          sx={{
            width: 35,
            height: 35,
          }}
        />
        <h4 className="nav_name">{username}</h4>
      </div>
      {isAuth ? (
        <Button
          variant="contained"
          style={{
            padding: '4px 20px',
            background: '#e0e0e0',
            boxShadow: '2px 2px 4px #bebebe,-2px -2px 4px #ffffff',
            color: '#808080',
          }}
          onClick={() => {
            setIsAuth(false);
            setUsername('Unknown');
          }}
        >
          Logout
        </Button>
      ) : (
        <Button
          variant="contained"
          style={{
            padding: '4px 20px',
            background: '#e0e0e0',
            boxShadow: '2px 2px 4px #bebebe,-2px -2px 4px #ffffff',
            color: '#808080',
          }}
          onClick={() => navigate('/login')}
        >
          Login
        </Button>
      )}
    </div>
  );
}
