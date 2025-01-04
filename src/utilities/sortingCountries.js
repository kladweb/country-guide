export function sortingCountries(e, dataListCountries) {
  let newData = [...dataListCountries];
  switch (e) {
    case 'name':
      newData.sort((a, b) => {
        if (a.code > b.code) {
          return 1;
        }
        if (a.code < b.code) {
          return -1;
        }
        return 0;
      });
      break;
    case 'population':
      newData.sort((a, b) => a.population - b.population);
      break;
    case 'population-des':
      newData.sort((a, b) => b.population - a.population);
      break;
    case 'area':
      newData.sort((a, b) => a.area - b.area);
      break;
    case 'area-des':
      newData.sort((a, b) => b.area - a.area);
      break;
  }
  return newData;
}