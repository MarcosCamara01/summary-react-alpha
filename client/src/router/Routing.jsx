import React from 'react';
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import CreateSummary from '../components/CreateSummary';

export const Routing = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<CreateSummary />} />
          <Route path='*' element={<h1>Error 404</h1>} />
        </Routes>
    </BrowserRouter>
  )
}
