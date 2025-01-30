import './travelers.css';
import { Traveler } from "./Traveler/Traveler";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { countriesLoad } from "../../redux/countriesLoad";

export const Travelers = () => {
  const dispatch = useDispatch();
  const countries = useSelector(state => state.countries);
  const allUsersCountries = useSelector(state => state.allUsersCountries.allCountries);
  const countriesObj = useSelector(state => state.countries);

  const getCountriesCodesNames = (countriesCodes) => {
    const countriesCodesNames = [];
    countriesObj.data.forEach((country) => {
      countriesCodes.forEach((countryCode) => {
        if (country.code === countryCode) {
          countriesCodesNames.push({code: countryCode, name: country.name});
        }
      })
    });
    return countriesCodesNames;
  }

  useEffect(
    () => {
      if (countries.dataLoadState !== 2) {
        dispatch(countriesLoad);
      }
    }, []);

  // useEffect(
  //   () => {
  //     allUsersCountries.sort((a, b) => {
  //       console.log(a);
  //       if (a.countries.length < b.countries.length) {
  //         return -1;
  //       } else if (a.countries.length > b.countries.length) {
  //         return 1;
  //       }
  //       return 0;
  //     })
  //   }, [allUsersCountries]);

  return (
    <>
      <h2 className='travellers-title'>TRAVELERS</h2>
      <div className='travellers-content'>
        {
          (countries.dataLoadState === 2) &&
          <>
            {
              allUsersCountries.map((traveler, index) => (
                <Traveler
                  key={traveler.userId}
                  userName={traveler.userName}
                  userUrl={traveler.userPhoto}
                  countries={getCountriesCodesNames(traveler.countries)}
                />)
              )
            }
          </>
        }
      </div>
    </>
  );
};
