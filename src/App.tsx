import { Routes, Route } from 'react-router-dom';
import React, {
  useState,
  createContext,
} from 'react';
import Main from './components/Main';
import Chat from './pages/Chat';
import Layout from './pages/Layout';
import Login from './pages/Login';
import { User } from './components/User';

export const Context = createContext(
  new User({
    isAuth: false,
    setIsAuth: function returnFalse() {
      return false;
    },
    username: 'Unknown',
    setUsername: function returnFalse() {
      return false;
    },
  })
);

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [username, setUsername] = useState('Unknown');

  return (
    <Context.Provider
      value={new User({ isAuth, setIsAuth, username, setUsername })}
    >
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/chat/:id" element={<Chat />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </div>
    </Context.Provider>
  );
}

export default App;
