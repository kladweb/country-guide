import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { FavCountries } from '../components/FavCountries';
import { countriesLoad } from "../redux/countriesLoad";
import { favCountriesLoad } from "../redux/favCountriesLoad";

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