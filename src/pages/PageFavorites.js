import React, { useEffect } from 'react';

import { FavCountries } from '../components/FavCountries';

import { useDispatch, useSelector } from "react-redux";
import { countriesLoad } from "../redux/countriesLoad";
import { LoadingStatus } from "./LoadingStatus";
import { favCountriesLoad } from "../redux/favCountriesLoad";

export const PageFavorites = () => {

  const countries = useSelector(state => state.countries)
  const favCountries = useSelector(state => state.favCountries);


  return (
    <div className='CountryList'>
      <div className='content'>
        <FavCountries
          countries={countries.data}
          favCountries={favCountries.data}
        />
      </div>
    </div>
  );

}