import React from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import CreateSummary from '../components/CreateSummary';
import { AuthProvider } from '../context/AuthProvider';
import { Public } from '../components/layout/public/Public';
import { Private } from '../components/layout/private/Private';
import { Login } from '../components/user/Login';
import { Register } from '../components/user/Register';

export const Routing = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Public />}>
            <Route index element={<Login />} />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
          </Route>

          <Route path='/content' element={<Private />}>
            <Route index element={<CreateSummary />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};
