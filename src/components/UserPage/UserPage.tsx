import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { ModalLogout } from "../ModalLogout/ModalLogout";
import { useDatabase } from "../../hooks/database";
import { setAllowShowVisited } from "../../redux/loginUsersSlice";
import './userPage.css';
import { ICurrUser } from "../../types/globalTypes";

interface IUserPageProps {
  logoutGoogle: () => void;
  currUser: ICurrUser;
}

export const UserPage: React.FC<IUserPageProps> = ({logoutGoogle, currUser}) => {
  const {readAllUsers} = useDatabase();
  const dispatch = useAppDispatch();
  const {writeUserPermissionVisited, writeUserCountries} = useDatabase();
  const isAllowed = useAppSelector(state => state.currUser.isAllowShowVisited);

  const [isShowMod, setShowMod] = useState(false);
  const [isClearData, setClearData] = useState(false);

  const openModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    const userTarget = e.target as HTMLButtonElement;
    if (userTarget.name === 'clear') {
      setClearData(true);
    } else {
      setClearData(false);
    }
    setShowMod(true);
  }

  const setAllowVisited = () => {
    writeUserPermissionVisited(!isAllowed);
    dispatch(setAllowShowVisited(!isAllowed));
    readAllUsers(dispatch);
  }

  const deleteUserData = () => {
    writeUserCountries(null);
    writeUserPermissionVisited(null);
    // deleteUserFromApp(); //TODO add this case in future
  }

  return (
    <div className="userPage">
      {
        (isShowMod) &&
        <ModalLogout
          setShowMod={setShowMod}
          logoutGoogle={logoutGoogle}
          isClearData={isClearData}
          deleteUserData={deleteUserData}
        />
      }
      <h2 className='currentUserName'>{currUser.displayName}</h2>
      <div className="isAllowShowVisited">
        {
          (isAllowed !== null) &&
          <input className='shareInput' type='checkbox' defaultChecked={isAllowed} onChange={setAllowVisited}/>
        }
        <span className='shareDescription'>allow other users to see the countries I have visited (in progress...)</span>
      </div>
      <button className='logoutButton' onClick={openModal}>Logout</button>
      <button className='logoutButton logoutClear' name="clear" onClick={openModal}>Logout and clear data</button>
    </div>
  )
}
