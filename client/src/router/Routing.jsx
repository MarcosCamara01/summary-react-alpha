import React from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import CreateSummary from '../components/summaries/CreateSummary';
import { AuthProvider } from '../context/AuthProvider';
import { Public } from '../components/layout/public/Public';
import { Private } from '../components/layout/private/Private';
import { Login } from '../components/user/Login';
import { Register } from '../components/user/Register';
import { Dashboard } from '../components/summaries/Dashboard';
import { Logout } from '../components/user/Logout';

export const Routing = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/n' element={<Public />}>
            <Route index element={<Login />} />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
          </Route>

          <Route path='/' element={<Private />}>
            <Route index element={<CreateSummary />} />
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='logout' element={<Logout />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};
