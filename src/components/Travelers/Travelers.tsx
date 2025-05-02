import { useEffect } from "react";
import { Traveler } from "./Traveler/Traveler";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import type { IAllUserCountries } from "../../redux/allUsersCountriesSlice";
import type { ICountries } from "../../types/globalTypes";
import { useDatabase } from "../../hooks/database";
import './travelers.scss';

export interface ICountriesCodesNames {
  code: string,
  name: string
}

export const Travelers = () => {
  const dispatch = useAppDispatch();
  const {readAllCountries} = useDatabase();
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
        readAllCountries(dispatch);
        // dispatch(countriesLoad);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
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
