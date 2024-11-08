import { updateFavData } from './favCountriesSlice';
import { getDatabase, ref, child, get } from "firebase/database";
import { initializeApp } from "firebase/app";


export function favCountriesLoad(dispatch) {
  const firebaseConfig = {
    databaseURL: "https://country-guide-lite-default-rtdb.firebaseio.com/",
  };
  const app = initializeApp(firebaseConfig);

  let storageLocalString = window.localStorage.getItem('favCountries');
  let data = (storageLocalString === null) ? [] : JSON.parse(storageLocalString);
  dispatch(updateFavData(data));
}
