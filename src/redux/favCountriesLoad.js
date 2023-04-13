import { updateFavData } from './favCountriesSlice';

export function favCountriesLoad(dispatch) {
  let storageLocalString = window.localStorage.getItem('favCountries');
  let data = (storageLocalString) ? storageLocalString : [];
  dispatch(updateFavData(data));
}