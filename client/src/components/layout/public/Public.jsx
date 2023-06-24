import React from 'react'
import { Header } from './Header'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'

export const Public = () => {

  const { auth, user } = useAuth();

  return (
    <>
      <Header />

      <main>
        {
          !auth._id || user === null ? <Outlet /> : <Navigate to="/" />
        }
      </main>
    </>
  )
}
