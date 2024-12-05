import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { auth, database } from "./firebase";
import { setCurrUser } from "../redux/loginUsersSlice";
import { useEffect, useState } from "react";
import './loginMenu.css';
import { ModalLogout } from "../components/ModalLogout/ModalLogout";
import { updateFavData } from "../redux/favCountriesSlice";
import { useDatabase } from "../hooks/database";

export const LoginMenu = () => {
  const dispatch = useDispatch();
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
            // onClick={changeLogoutOpen}
          />
          {
            (showMod) &&
            <ModalLogout
              setShowMod={setShowMod}
              // logoutGoogle={logoutGoogle}
            />
          }
        </div> :
        <a className='loginMenu'
           // onClick={loginGoogle}
        >
          Login
        </a>
      }
    </>
  );
}
