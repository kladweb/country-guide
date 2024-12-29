import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDatabase } from "../hooks/database";
import './loginMenu.css';

export const LoginMenu = () => {
  const dispatch = useDispatch();
  const {readUserCountries, readUserPermissionVisited} = useDatabase();
  const currUser = useSelector(state => state.currUser.currUser);
  const srcAvatar = (currUser) ? currUser.photoURL : null;
  const userName = (currUser) ? currUser.displayName : null;
  const [showMod, setShowMod] = useState(false);

  useEffect(
    () => {
      if (currUser) {
        readUserCountries(dispatch);
        readUserPermissionVisited(dispatch);
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
          />
        </div> :
        <div className='loginMenu'>Login</div>
      }
    </>
  );
}
