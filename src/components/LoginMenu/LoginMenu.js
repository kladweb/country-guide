import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDatabase } from "../../hooks/database";
import './loginMenu.css';
import { Avatar } from "../Avatar/Avatar";

export const LoginMenu = () => {
  const dispatch = useDispatch();
  const {readUserCountries, readUserPermissionVisited, readUserName, readUserPhoto} = useDatabase();
  const currUser = useSelector(state => state.currUser.currUser);
  const userName = useSelector(state => state.userName);
  const srcAvatar = (currUser) ? currUser.photoURL : null;
  // const currUserName = (currUser) ? currUser.displayName : null;
  const currUserName = (currUser) ? (userName ? userName : currUser.displayName) : null;
  const [showMod, setShowMod] = useState(false);

  useEffect(
    () => {
      if (currUser) {
        readUserCountries(dispatch);
        readUserPermissionVisited(dispatch);
        readUserName(dispatch);
        readUserPhoto(dispatch);
      }
    }, [currUser]);

  const changeLogoutOpen = () => {
    setShowMod(true);
  }

  return (
    <>
      {(currUser) ?
        <Avatar
          userUrl={currUser.photoURL}
          userName={currUserName}
          size={1}
        />
        :
        <div className='loginMenu'>Login</div>
      }
    </>
  );
}
