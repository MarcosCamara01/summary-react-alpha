import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Loader } from '../../helpers/Loader';

export const Logout = () => {

  const { setAuth } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();

    setAuth({});

    navigate("/");
  });

  return (
    <Loader />
  )
}
