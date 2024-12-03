import './login.css';
export const Login = ({loginGoogle}) => {
  return (
    <button className='loginButton' onClick={loginGoogle}>
      Login with Google
    </button>
  )
}