import { useSelector } from 'react-redux';
import { child, get, ref, set } from "firebase/database";
import { database } from "../firebase/firebase";
import { updateFavData } from "../redux/favCountriesSlice";
import { setAllowShowVisited, setUserName, setUserPhoto } from "../redux/loginUsersSlice";
import { updateAllUsersCountries } from "../redux/allUsersCountriesSlice";

export const useDatabase = () => {
  const currUser = useSelector(state => state.currUser.currUser);
  const userId = currUser ? currUser.uid : null;

  function writeUserCountries(countries) {
    if (userId) {
      set(ref(database, `users/${userId}/countries`), countries);
    } else {
      console.log('No auth !');
    }
  }

  function readUserCountries(dispatch) {
    if (userId) {
      const dbRef = ref(database);
      get(child(dbRef, `users/${userId}/countries`)).then((snapshot) => {
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
      set(ref(database, `users/${userId}/allowShowVisited/`), isAllow);
    } else {
      console.log('No auth !');
    }
  }

  function readUserPermissionVisited(dispatch) {
    if (userId) {
      const dbRef = ref(database);
      get(child(dbRef, `users/${userId}/allowShowVisited/`)).then((snapshot) => {
        if (snapshot.exists()) {
          const dataString = snapshot.val();
          const isAllow = JSON.parse(dataString);
          dispatch(setAllowShowVisited(isAllow));
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    }
  }

  function writeUserName(userName) {
    if (userId) {
      set(ref(database, `users/${userId}/userName/`), userName);
    } else {
      console.log('No auth !');
    }
  }

  function readUserName(dispatch) {
    if (userId) {
      const dbRef = ref(database);
      get(child(dbRef, `users/${userId}/userName`)).then((snapshot) => {
        if (snapshot.exists()) {
          const userName = snapshot.val();
          dispatch(setUserName(userName));
        } else {
          dispatch(setUserName(''));
        }
      });
    }
  }

  function writeUserPhoto(userPhoto) {
    if (userId) {
      set(ref(database, `users/${userId}/userPhoto/`), userPhoto);
    } else {
      console.log('No auth !');
    }
  }

  function readUserPhoto(dispatch) {
    if (userId) {
      const dbRef = ref(database);
      get(child(dbRef, `users/${userId}/userPhoto`)).then((snapshot) => {
        if (snapshot.exists()) {
          const userPhoto = snapshot.val();
          dispatch(setUserPhoto(userPhoto));
          // dispatch(setUserName(userName));
        }
      });
    }
  }

  function readAllUsers(dispatch) {
    const dbRef = ref(database);
    get(child(dbRef, `users`)).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        // const data = (dataString === null) ? [] : JSON.stringify(dataString);
        // console.log(data);
        const usersCountries = [];
        for (let key in data) {
          const countries = (data[key]["countries"]) ?
            JSON.parse(data[key]["countries"]) : [];
          if (data[key]["allowShowVisited"] && countries.length > 0) {
            usersCountries.push(
              {
                userName: data[key]["userName"],
                countries: countries,
                userPhoto: data[key]["userPhoto"],
                userId: key,
              }
            );
          }
        }
        dispatch(updateAllUsersCountries(usersCountries));
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  return {
    writeUserCountries,
    readUserCountries,
    writeUserPermissionVisited,
    readUserPermissionVisited,
    writeUserName,
    readUserName,
    writeUserPhoto,
    readUserPhoto,
    readAllUsers
  };
}
