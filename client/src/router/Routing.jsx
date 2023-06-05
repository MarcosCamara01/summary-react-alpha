import React from 'react';
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import CreateSummary from '../components/CreateSummary';

export const Routing = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>

            <main className='main'>
                <CreateSummary />
            </main>
          <Route path='*' element={
            <h1>Error 404</h1>
          } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
