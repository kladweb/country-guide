import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GoogleAuthProvider, signInWithPopup, signOut, deleteUser } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { setCurrUser, setUserName, setUserPhoto } from "../redux/loginUsersSlice";
import { updateFavData } from "../redux/favCountriesSlice";
import { Login } from "../components/Login/Login";
import { UserPage } from "../components/UserPage/UserPage";
import { useDatabase } from "../hooks/database";

export const PageLoginLogout = () => {
  const dispatch = useDispatch();
  const {writeUserName, writeUserPhoto} = useDatabase();
  const currUser = useSelector(state => state.currUser.currUser);
  const userName = useSelector(state => state.currUser.userName);
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    if (currUser && userName === '') {
      writeUserName(currUser.displayName);
      dispatch(setUserName(currUser.displayName));
    }
    if (currUser) {
      writeUserPhoto(currUser.photoURL);
      dispatch(setUserPhoto(currUser.photoURL));
    }
  }, [userName]);

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
      return user.uid;
    })
    .catch((error) => {
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

  const deleteUserFromApp = function () {
    const user = auth.currentUser;
    deleteUser(user).then(() => {
      dispatch(setCurrUser({currUser: auth.currentUser}));
      dispatch(updateFavData([]));
      // User deleted.
    }).catch((error) => {
      // An error ocurred
      // ...
    });
  }

  return (
    <div className='CountryAbout'>
      <div className='content'>
        {(currUser) ?
          <UserPage
            logoutGoogle={logoutGoogle}
            currUser={currUser}
            deleteUserFromApp={deleteUserFromApp}
          />
          :
          <Login loginGoogle={loginGoogle}/>
        }
      </div>
    </div>
  );
}
