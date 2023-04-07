import React, { useEffect } from 'react';

import { Countries } from '../components/Countries';

import { useDispatch, useSelector } from "react-redux";
import { countriesLoad } from "../redux/countriesLoad";

export const PageCountries = () => {

  const dispatch = useDispatch();
  const country = useSelector(state => state.country);

  useEffect(
    () => {
      if (country.dataLoadState !== 2) {
        dispatch(countriesLoad);
      }
    },
    []
  );

  return (
    <>
      {(country.dataLoadState === 0) && 'no data'}
      {(country.dataLoadState === 1) && 'loading...'}
      {(country.dataLoadState === 2) &&
        <Countries countries={country.data}/>
      }
      {(country.dataLoadState === 3) && 'error ' + country.dataLoadError}
    </>
  );

};