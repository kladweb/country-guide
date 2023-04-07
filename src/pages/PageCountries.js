import React, { useEffect } from 'react';

import { Countries } from '../components/Countries';

import { useDispatch, useSelector } from "react-redux";
import { countriesLoad } from "../redux/countriesLoad";

export const PageCountries = () => {

  const dispatch = useDispatch();
  const country = useSelector(state => state.country);

  useEffect(
    () => {
      load()
    },
    []
  );

  function load() {
    dispatch(countriesLoad);
  }

  // console.log('IH DATA', appData.countries);
  console.log('MY DATA', country.data);
  return (
    <>
      {(country.dataLoadState === 0) && 'no data'}
      {(country.dataLoadState === 1) && 'loading...'}
      {(country.dataLoadState === 3) && 'error ' + country.dataLoadError}
      {(country.dataLoadState === 2) &&
        <Countries countries={country.data}/>
      }
    </>
  );

};