import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { auth, database } from "./firebase";
import { setCurrUser } from "../redux/loginUsersSlice";
import { useEffect, useState } from "react";
import './login.css';
import { ModalLogout } from "../components/ModalLogout/ModalLogout";
import { updateFavData } from "../redux/favCountriesSlice";
import { useDatabase } from "../hooks/database";

export const Login = () => {
  const dispatch = useDispatch();
  const provider = new GoogleAuthProvider();
  const currUser = useSelector(state => state.currUser.currUser);
  const {readUserData} = useDatabase();
  const srcAvatar = (currUser) ? currUser.photoURL : null;
  const userName = (currUser) ? currUser.displayName : null;
  const [showMod, setShowMod] = useState(false);

  useEffect(
    () => {
      if (currUser) {
        readUserData(dispatch);
      }
    }, [currUser]);

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
      dispatch(updateFavData([]));

    });
  }

  const logoutGoogle = function () {
    signOut(auth).then(() => {
      console.log('Sign-out successful', auth.currentUser);
      dispatch(setCurrUser({currUser: auth.currentUser}));
      dispatch(updateFavData([]));
    }).catch((error) => {
      console.log('Sign-out error', error);
    });
  }

  const changeLogoutOpen = () => {
    setShowMod(true);
  }

  return (
    <>
      {(currUser) ?
        <div className='menuAvatar'>
          <img
            className='imageAvatar'
            src={currUser.photoURL}
            alt={userName}
            onClick={changeLogoutOpen}
          />
          {
            (showMod) &&
            <ModalLogout
              setShowMod={setShowMod}
              logoutGoogle={logoutGoogle}
            />
          }
        </div> :
        <a className='loginMenu' onClick={loginGoogle}>
          Login
        </a>
      }
    </>
  );
}
