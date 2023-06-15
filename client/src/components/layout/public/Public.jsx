import React from 'react'
import { Header } from './Header'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'

export const Public = () => {

  const { auth } = useAuth();

  return (
    <>
      <Header />

      <main>
        {
          !auth._id ? <Outlet /> : <Navigate to="/" />
        }
      </main>
    </>
  )
}
