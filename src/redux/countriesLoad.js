import { updateLoadState, updateData, updateCurrentData } from './countriesSlice.js';

export async function countriesLoad(dispatch) {

  try {
    dispatch(updateLoadState({state: 1, error: null}));
    const response = await fetch('https://642dd59966a20ec9cea70c6c.mockapi.io/countries');
    // const response = await fetch('/json/package.json');
    if (response.ok) {
      const data = await response.json();
      dispatch(updateLoadState({state: 2, error: null}));
      dispatch(updateData(data));
      dispatch(updateCurrentData({page: 'all', data: data}));
    } else {
      dispatch(updateLoadState({state: 3, error: 'HTTP error ' + response.status}));
    }

  } catch (err) {
    dispatch(updateLoadState({state: 3, error: err.message}));
  }

}
