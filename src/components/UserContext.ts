import { createContext } from 'react';
import { User } from './User';

export const UserContext = createContext(
  new User({
    isAuth: false,
    setIsAuth: function returnFalse() {
      return false;
    },
    username: 'Unknown',
    setUsername: function returnFalse() {
      return false;
    },
    avatarColor: '#808080',
    setAvatarColor: function returnString() {
      return '';
    },
    chats: [],
    setChats: function returnArray(arr) {
      return arr;
    },
  })
);
