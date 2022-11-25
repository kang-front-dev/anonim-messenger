import React, {useContext} from 'react';
import Nav from '../components/Nav';
import { Outlet } from 'react-router-dom';
import { Context } from '../App';
import Main from '../components/Main';

export default function Layout() {
  const {isAuth} = useContext(Context)
  return (
    <div>
      <Nav></Nav>
      {isAuth ? <Main></Main> : ''}
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
}
