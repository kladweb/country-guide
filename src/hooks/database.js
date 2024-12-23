
import { useSelector } from 'react-redux';
import { child, get, ref, set } from "firebase/database";
import { database } from "../firebase/firebase";
import { updateFavData } from "../redux/favCountriesSlice";
import { setAllowShowVisited } from "../redux/loginUsersSlice";

export const useDatabase = () => {
  const currUser = useSelector(state => state.currUser.currUser);
  const userId = currUser ? currUser.uid : null;

  function writeUserCountries(countries) {
    if (userId) {
      set(ref(database, 'users/' + userId), countries);
    } else {
      console.log('No auth !');
    }
  }

  function readUserCountries(dispatch) {
    if (userId) {
      const dbRef = ref(database);
      get(child(dbRef, `users/${userId}`)).then((snapshot) => {
        if (snapshot.exists()) {
          const dataString = snapshot.val();
          let data = (dataString === null) ? [] : JSON.parse(dataString);
          dispatch(updateFavData(data));
        } else {
          console.log("No data available");
          dispatch(updateFavData([]));
        }
      }).catch((error) => {
        // console.error(error);
      });
    } else {
      console.log('No auth !');
    }
  }

  function writeUserPermissionVisited(isAllow) {
    if (userId) {
      set(ref(database, `settings/${userId}/allowShowVisited/`), isAllow);
    } else {
      console.log('No auth !');
    }
  }

  function readUserPermissionVisited(dispatch) {
    if (userId) {
      const dbRef = ref(database);
      get(child(dbRef, `settings/${userId}/allowShowVisited`)).then((snapshot) => {
        if (snapshot.exists()) {
          const dataString = snapshot.val();
          let isAllow = JSON.parse(dataString);
          dispatch(setAllowShowVisited(isAllow))
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    }
  }

  return {writeUserCountries, readUserCountries, writeUserPermissionVisited, readUserPermissionVisited};
  // return {writeUserData: writeUserCountries, readUserData: readUserCountries};
}
