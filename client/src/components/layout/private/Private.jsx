import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import { Loader } from '../../../helpers/Loader'
import { Sidebar } from './Sidebar'

export const Private = () => {

  const { auth, loading } = useAuth();

  if (loading) {
    return <div className='loader__bx loader__bx--center'><Loader /></div>
  } else {
    return (
      <>
        <Sidebar />

        <section className='layout__content'>
          {
            auth._id ? <Outlet /> : <Navigate to="/login" />
          }
        </section>
      </>
    )
  }
}
