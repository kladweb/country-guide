import { useState } from "react";
import './userPage.css';
import { ModalLogout } from "../ModalLogout/ModalLogout";
import { useDatabase } from "../../hooks/database";
import { useDispatch, useSelector } from "react-redux";
import { setAllowShowVisited } from "../../redux/loginUsersSlice";

export const UserPage = ({logoutGoogle, currUser}) => {
  const {readAllUsers} = useDatabase();
  const dispatch = useDispatch();
  const {writeUserPermissionVisited, writeUserCountries} = useDatabase();
  const isAllowed = useSelector(state => state.currUser.isAllowShowVisited);

  const [showMod, setShowMod] = useState(false);
  const [clearData, setClearData] = useState(false);

  const openModal = (e) => {
    if (e.target.name === 'clear') {
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
        (showMod) &&
        <ModalLogout
          setShowMod={setShowMod}
          logoutGoogle={logoutGoogle}
          clearData={clearData}
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
