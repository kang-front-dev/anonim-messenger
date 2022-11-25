import {SetStateAction,Dispatch} from 'react'

export interface IUser {
  isAuth: boolean;
  setIsAuth: Dispatch<SetStateAction<boolean>> | Function;
  username: string;
  setUsername: Dispatch<SetStateAction<string>> | Function;
}
export class User implements IUser {
  isAuth: boolean;
  setIsAuth: Dispatch<SetStateAction<boolean>> | Function;
  username: string;
  setUsername: Dispatch<SetStateAction<string>> | Function;
  constructor(options: IUser) {
    this.isAuth = options.isAuth;
    this.setIsAuth = options.setIsAuth;
    this.username = options.username;
    this.setUsername = options.setUsername;
  }
}