import React from 'react';
import './login.css';

export const Login = ({loginGoogle}) => {
  return (
    <button className='loginButton' onClick={loginGoogle}>
      <img src="/img/shared/google_icon.png" alt="google icon" />
      <span>Login with Google</span>
    </button>
  )
}
