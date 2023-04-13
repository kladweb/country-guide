import React, { useEffect } from 'react';

import { FavCountries } from '../components/FavCountries';

import { useDispatch, useSelector } from "react-redux";
import { countriesLoad } from "../redux/countriesLoad";
import { LoadingStatus } from "./LoadingStatus";
import { favCountriesLoad } from "../redux/favCountriesLoad";
import { Countries } from "../components/Countries";

export const PageFavorites = () => {

  const dispatch = useDispatch();
  const countries = useSelector(state => state.countries)
  const favCountries = useSelector(state => state.favCountries.data);

  useEffect(
    () => {
      if (countries.dataLoadState !== 2) {
        dispatch(countriesLoad);
        dispatch(favCountriesLoad);
      }
    },
    []
  );

  return (
    <div className='CountryList'>
      <div className='content'>
        {(countries.dataLoadState === 2) &&
          <FavCountries countries={countries.data} favCountries={favCountries}/>
        }
      </div>
    </div>
  );
}