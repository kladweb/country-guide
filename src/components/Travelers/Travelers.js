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
  console.log(countriesObj.data);

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
