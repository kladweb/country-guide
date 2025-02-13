import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useDatabase } from "../../hooks/database";
import { Avatar } from "../Avatar/Avatar";
import './loginMenu.css';
import { ICurrUser } from "../../types/globalTypes";

export const LoginMenu = () => {
  const dispatch = useAppDispatch();
  const {readUserCountries, readUserPermissionVisited, readUserName, readUserPhoto} = useDatabase();
  const currUser: ICurrUser | null = useAppSelector(state => state.currUser.currUser);
  const userName = useAppSelector(state => state.currUser.userName);
  const currUserName = (currUser) ? (userName ? userName : currUser.displayName) : '';

  useEffect(
    () => {
      if (currUser) {
        readUserCountries(dispatch);
        readUserPermissionVisited(dispatch);
        readUserName(dispatch);
        readUserPhoto(dispatch);
      }
    }, [currUser]);

  return (
    <>
      {(currUser) ?
        <Avatar
          userUrl={currUser.photoURL}
          userName={currUserName}
          size={1}
        /> :
        <div className='loginMenu'>Login</div>
      }
    </>
  );
}
