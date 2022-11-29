import { Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import Main from './components/Main';
import Chat from './pages/ChatPage';
import Layout from './pages/Layout';
import Login from './pages/Login';
import { User } from './components/User';

import { UserContext } from './components/UserContext';
import { SnackbarContext } from './components/SnackbarContext';
import { Snackbar } from './components/Snackbar';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [username, setUsername] = useState('Unknown');
  const [chats, setChats] = useState([]);

  const [open, setOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [severity, setSeverity] = useState('success');
  const [avatarColor, setAvatarColor] = useState('#808080');
  return (
    <UserContext.Provider
      value={
        new User({
          isAuth,
          setIsAuth,
          username,
          setUsername,
          avatarColor,
          setAvatarColor,
          chats,
          setChats,
        })
      }
    >
      <SnackbarContext.Provider
        value={
          new Snackbar({
            open,
            setOpen,
            alertMessage,
            setAlertMessage,
            severity,
            setSeverity,
          })
        }
      >
        <div className="App">
          <Routes>
            <Route element={<Layout />}>
              <Route index path="/" element={<Main />} />
              <Route path="/chat/:id/:name" element={<Chat />} />
              <Route path="/login" element={<Login />} />
            </Route>
          </Routes>
        </div>
      </SnackbarContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
