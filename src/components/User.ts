import { ObjectId } from 'mongodb';
import { SetStateAction, Dispatch } from 'react';
import { IChat } from './Chat';

export interface IUserProps {
  isAuth: boolean;
  setIsAuth: Dispatch<SetStateAction<boolean>> | Function;
  username: string;
  setUsername: Dispatch<SetStateAction<string>> | Function;
  avatarColor: string;
  setAvatarColor: Dispatch<SetStateAction<string>> | Function;
  chats: Array<IChat>;
  setChats: Dispatch<SetStateAction<Array<IChat>>> | Function;
}

export interface IUser {
  _id: ObjectId | string;
  name: string;
  avatarColor: string;
  chats?: Array<IChat>
}
export class User implements IUserProps {
  isAuth: boolean;
  setIsAuth: Dispatch<SetStateAction<boolean>> | Function;
  username: string;
  setUsername: Dispatch<SetStateAction<string>> | Function;
  avatarColor: string;
  setAvatarColor: Dispatch<SetStateAction<string>> | Function;
  chats: Array<IChat>;
  setChats: Dispatch<SetStateAction<Array<IChat>>> | Function;
  constructor(options: IUserProps) {
    this.isAuth = options.isAuth;
    this.setIsAuth = options.setIsAuth;
    this.username = options.username;
    this.setUsername = options.setUsername;
    this.avatarColor = options.avatarColor;
    this.setAvatarColor = options.setAvatarColor;
    this.chats = options.chats;
    this.setChats = options.setChats;
  }
}
