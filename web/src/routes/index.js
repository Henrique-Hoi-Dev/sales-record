import React from 'react';
import { Route, Routes } from 'react-router-dom'

import Dashboard from 'pages/Dashboard';
import UserAuth from 'auth/userAuth';
import MainTemplate from 'components/templates/main/main';
import SignUp from 'pages/SignUp';
import SignIn from 'pages/SignIn';

const RouterController = () => {
  const initialPage = () => {
    return <Dashboard />;
  };
  return (
    <Routes >
      <Route path='/login' element={<SignIn />}/>
      <Route path='/register' element={<SignUp />}/>
      <Route element={<UserAuth />}>
        <Route element={<MainTemplate />}>
          <Route path="/" element={initialPage()} />
        </Route>
      </Route>
    </Routes>
  );
}

export default RouterController;