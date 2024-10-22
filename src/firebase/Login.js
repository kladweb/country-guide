import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "./firebase";
import { setCurrUser } from "../redux/loginUsersSlice";
import { useEffect, useState } from "react";
import './login.css';

export const Login = () => {
  const dispatch = useDispatch();
  const provider = new GoogleAuthProvider();
  const currUser = useSelector(state => state.currUser.currUser);
  const srcAvatar = (currUser) ? currUser.photoURL : null;
  const userName = (currUser) ? currUser.displayName : null;
  const [isLogoutOpen, setLogoutOpen] = useState(false);

  const loginGoogle = function () {
    signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const getUser = auth.currentUser;
      const user = {};
      user.email = getUser.email;
      user.displayName = getUser.displayName;
      user.photoURL = getUser.photoURL;
      user.uid = getUser.uid;
      dispatch(setCurrUser({currUser: user}));

    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(error);
    });
  }

  const logoutGoogle = function () {
    signOut(auth).then(() => {
      console.log('Sign-out successful', auth.currentUser);
      dispatch(setCurrUser({currUser: auth.currentUser}));
    }).catch((error) => {
      console.log('Sign-out error', error);
    });
  }

  const changeLogoutOpen = () => {
    setLogoutOpen(prevState => !prevState);
  }

  const openModalLogout = () => {
    console.log('logout');
  }

  return (
    <>
      {(currUser) ?
        <div className='menuAvatar'>
          <img
            className='imageAvatar'
            src={'/img/avatar.jpg'}
            alt={userName}
            onClick={changeLogoutOpen}
          />
          {
            (isLogoutOpen) &&
            <a className='loginMenu logoutMenu' onClick={openModalLogout}>
              Logout
            </a>
          }
        </div> :
        <a className='loginMenu' onClick={loginGoogle}>
          Login
        </a>
      }
    </>
  )
    ;
}
