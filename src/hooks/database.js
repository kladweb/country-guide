import { useSelector } from 'react-redux';
import { child, get, ref, set } from "firebase/database";
import { database } from "../firebase/firebase";
import { updateFavData } from "../redux/favCountriesSlice";

export const useDatabase = () => {
  const currUser = useSelector(state => state.currUser.currUser);
  const userId = currUser ? currUser.uid : null;

  function writeUserData(countries) {
    if (userId) {
      set(ref(database, 'users/' + userId), countries);
    } else {
      console.log('No auth !');
    }
  }

  function readUserData(dispatch) {
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

  return {writeUserData, readUserData};
}
