import { updateLoadState, updateData, updateCurrentData } from './countriesSlice.js';

export async function countriesLoad(dispatch) {

  try {
    dispatch(updateLoadState({state: 1, error: null}));
    //так как mockapi позволяет хранить в одном каталоге массив максимальной длины 100, а стран в проекте больше,
    // чем 100, поэтому массив разбит на два, а затем соединяем все в один.
    const response = await fetch('https://642dd59966a20ec9cea70c6c.mockapi.io/countries');
    const response2 = await fetch('https://642dd59966a20ec9cea70c6c.mockapi.io/countries2');
    if (response.ok && response2.ok) {
      const data1 = await response.json();
      const data2 = await response2.json();
      const data = [...data1, ...data2];
      dispatch(updateLoadState({state: 2, error: null}));
      dispatch(updateData(data));
      dispatch(updateCurrentData({page: 'all', data: data}));
    } else {
      dispatch(updateLoadState({state: 3, error: 'HTTP error ' + response.status}));
      dispatch(updateLoadState({state: 3, error: 'HTTP error ' + response2.status}));
    }

  } catch (err) {
    dispatch(updateLoadState({state: 3, error: err.message}));
  }

}