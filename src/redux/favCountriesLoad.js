import { updateFavData } from './favCountriesSlice';

export function favCountriesLoad(dispatch) {
  let storageLocalString = window.localStorage.getItem('favCountries');
  console.log('ttt', storageLocalString);
  console.log('tttBOL', Boolean(storageLocalString));
  let data = (storageLocalString === null) ? [] : JSON.parse(storageLocalString);
  dispatch(updateFavData(data));
}