import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { countriesLoad } from '../redux/countriesLoad';
import { favCountriesLoad } from '../redux/favCountriesLoad';
import { FavCountries } from '../components/FavCountries/FavCountries';
import { LoadingStatus } from "../components/LoadingStatus/LoadingStatus";
import { updateFavData } from "../redux/favCountriesSlice";

export const PageFavorites = () => {
  const dispatch = useDispatch();
  const countries = useSelector(state => state.countries);
  const currUser = useSelector(state => state.currUser.currUser);
  const favCountries = useSelector(state => state.favCountries.data);
  const favDataLoadState = useSelector(state => state.favCountries.favDataLoadState);

  useEffect(
    () => {
      if (countries.dataLoadState !== 2) {
        dispatch(countriesLoad);
        // dispatch(updateFavData([]));
      }
    },
    []
  );

  useEffect(
    () => {
      if (countries.dataLoadState === 2 && !currUser) {
        dispatch(updateFavData([]));
      }
    },
    [countries, currUser]
  );

  console.log(favDataLoadState);

  return (
    <div className='CountryList'>
      <div className='content'>
        {(favDataLoadState === 0) &&
          <LoadingStatus loadStatus='loading...' />
        }
        {(favDataLoadState === 2 && countries.dataLoadState === 2) &&
          <FavCountries countries={countries.data} favCountries={favCountries} />
        }
      </div>
    </div>
  );
}
