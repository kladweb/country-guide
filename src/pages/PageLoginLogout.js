import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { setCurrUser } from "../redux/loginUsersSlice";
import { updateFavData } from "../redux/favCountriesSlice";
import { Login } from "../components/Login/Login";
import { UserPage } from "../components/UserPage/UserPage";
import { useDatabase } from "../hooks/database";

export const PageLoginLogout = () => {
  const dispatch = useDispatch();
  const {writeUserCountries} = useDatabase();
  const currUser = useSelector(state => state.currUser.currUser);
  const provider = new GoogleAuthProvider();
  const favCountries = useSelector(state => state.favCountries.data);

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
      if (!favCountries) {
        writeUserCountries(JSON.stringify([]));
      }
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

  return (
    <div className='CountryAbout'>
      <div className='content'>
        {(currUser) ?
          <UserPage
            logoutGoogle={logoutGoogle}
            currUser={currUser}
          />
          :
          <Login loginGoogle={loginGoogle} />
        }
      </div>
    </div>
  );
}
