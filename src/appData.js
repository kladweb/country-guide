export const appData = {
  countries: [
    {id: 101, fio: "John Dow"},
    {id: 105, fio: "Fredrick Fredricksen"},
    {id: 110, fio: "Frank Singerson"}
  ],
};

// export function appData() {
//
//   const [loadedData, loadNewData] = useState(null);
//
//   useEffect(
//     () => {
//       const fetchConfig = {
//         URL: '/json/countries.json',
//         method: 'GET',
//       };
//
//       const fetchError = errorMessage => {
//         console.error(errorMessage);
//       };
//
//       const fetchSuccess = newData => {
//         // let dataReady = true;
//         loadNewData(newData);
//       };
//
//       const loadData = async () => {
//         try {
//           let response = await fetch(fetchConfig.URL, fetchConfig);
//           if (!response.ok) {
//             throw new Error("fetch error " + response.status);
//           }
//           let data = await response.json();
//           fetchSuccess(data);
//         } catch (error) {
//           fetchError(error.message);
//         }
//       };
//
//       loadData();
//
//     },
//     []
//   );
//
//   return (
//     {
//       countries: [
//         {id: 101, fio: "John Dow"},
//         {id: 105, fio: "Fredrick Fredricksen"},
//         {id: 110, fio: "Frank Singerson"}
//       ],
//     }
//   )
// }