import React, { useEffect, useState } from 'react';
import { useForm } from '../../hooks/useForm';
import { Global } from '../../helpers/Global';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from "react-router-dom";
import { FcGoogle } from 'react-icons/fc';

export const Login = () => {
  const { form, changed } = useForm({});
  const [logged, setLogged] = useState('not_logged');
  const { setAuth, userGoogle, googleSignIn } = useAuth();
  const navigate = useNavigate();

  const loginGoogle = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (userGoogle != null) {
      navigate("/")
    }
  }, [userGoogle])

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const user = form;

      const request = await fetch(Global.url + 'user/login', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await request.json();

      if (data.status === 'success') {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        setLogged('logged');

        setAuth(data.user);

        window.location.reload();
      } else {
        setLogged('error');
      }
    } catch (error) {
      console.log('An error occurred while logging in:', error);
      setLogged('error');
    }
  };

  return (
    <>
      <div className="content__form">
        <form className='config-form' onSubmit={loginUser}>
          <strong className='alert alert-form'>{logged === 'logged' ? 'User successfully logged' : ''}</strong>
          <strong className='alert alert-form'>{logged === 'error' ? 'The user has not logged' : ''}</strong>

          <h3 className='login-register_h3'>Login</h3>

          <div className='form-group'>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" onChange={changed} autoComplete='off' />
          </div>

          <div className='form-group'>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" onChange={changed} />
          </div>

          <input type="submit" value="Login" className='post__button--white' />

          <button className="google-button" onClick={loginGoogle}>
           <FcGoogle />
            Continue with Google
          </button>
        </form>
      </div>
    </>
  );
};
