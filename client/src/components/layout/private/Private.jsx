import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import { Loader } from '../../../helpers/Loader'
import { Header } from './Header'

export const Private = () => {

  const { auth, loading } = useAuth();

  if (loading) {
    return <div className='loader__bx loader__bx--center'><Loader /></div>
  } else {
    return (
      <>
        <Header />

        <main>
          {
            auth._id ? <Outlet /> : <Navigate to="/n/login" />
          }
        </main>
      </>
    )
  }
}
