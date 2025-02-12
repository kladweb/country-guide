import { useEffect } from "react";
import { Traveler } from "./Traveler/Traveler";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { countriesLoad } from "../../redux/countriesLoad";
import type { IAllUserCountries } from "../../redux/allUsersCountriesSlice";
import type { ICountries } from "../../types/globalTypes";
import './travelers.css';

export interface ICountriesCodesNames {
  code: string,
  name: string
}

export const Travelers = () => {
  const dispatch = useAppDispatch();
  const countries = useAppSelector(state => state.countries);
  const allUsersCountries = useAppSelector(state => state.allUsersCountries.allCountries);

  const getCountriesCodesNames = (countriesCodes: string[]) => {
    const countriesCodesNames: ICountriesCodesNames[] = [];
    if (countries.data) {
      countries.data.forEach((country: ICountries) => {
        countriesCodes.forEach((countryCode: string) => {
          if (country.code === countryCode) {
            countriesCodesNames.push({code: country.code, name: country.name});
          }
        })
      });
    }
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
              allUsersCountries.map((traveler: IAllUserCountries) => (
                <Traveler
                  key={traveler.userId}
                  userName={traveler.userName}
                  userUrl={traveler.userPhoto}
                  countries={getCountriesCodesNames(traveler.countries)}
                />))
            }
          </>
        }
      </div>
    </>
  );
};
