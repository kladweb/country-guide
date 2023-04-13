import React, { useState, useEffect } from 'react';

import { Countries } from '../components/Countries';

import { useDispatch, useSelector } from "react-redux";
import { countriesLoad } from "../redux/countriesLoad";
import { LoadingStatus } from "./LoadingStatus";
import { Outlet, useParams } from "react-router-dom";
import { favCountriesLoad } from "../redux/favCountriesLoad";
import { updateCurrentData } from "../redux/countriesSlice";

export const PageCountries = () => {

  const params = useParams();
  const page = params.part;
  const dispatch = useDispatch();
  const countries = useSelector(state => state.countries);
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

  useEffect(() => {
      if (countries.dataLoadState === 2) {
        dispatch(updateCurrentData({page: page, data: countries.data}));
      }
    },
    [page]
  );

  return (
    <div className='CountryList'>
      <div className='content'>
        {(countries.dataLoadState === 0) &&
          <LoadingStatus loadStatus='no data'/>
        }
        {(countries.dataLoadState === 1) &&
          <LoadingStatus loadStatus='loading...'/>
        }
        {(countries.dataLoadState === 2) &&
          <Countries countries={countries.currentData} page={page}/>
        }
        {(countries.dataLoadState === 3) &&
          <LoadingStatus loadStatus={'error ' + countries.dataLoadError}/>
        }
      </div>
    </div>
  );
}