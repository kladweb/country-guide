import React, { useEffect } from 'react';

import { Countries } from '../components/Countries';

import { useDispatch, useSelector } from "react-redux";
import { countriesLoad } from "../redux/countriesLoad";
import { LoadingStatus } from "./LoadingStatus";
import { Outlet } from "react-router-dom";

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
    <div className='CountryList'>
      <div className='content'>
        {(country.dataLoadState === 0) &&
          <LoadingStatus loadStatus='no data'/>
        }
        {(country.dataLoadState === 1) &&
          <LoadingStatus loadStatus='loading...'/>
        }
        {(country.dataLoadState === 2) &&
          <Countries countries={country.data}/>
        }
        {(country.dataLoadState === 3) &&
          <LoadingStatus loadStatus={'error ' + country.dataLoadError}/>
        }
      </div>
    </div>

    // <>
    //   <div className='CountryList'>
    //     <div className='content'>
    //       {(country.dataLoadState === 0) && 'no data'}
    //       {(country.dataLoadState === 1) &&
    //         <div className='loading'>
    //           <span className='loading-stastus'>loading...</span>
    //         </div>
    //       }
    //       {(country.dataLoadState === 2) &&
    //         <Countries countries={country.data}/>
    //       }
    //       {(country.dataLoadState === 3) && 'error ' + country.dataLoadError}
    //     </div>
    //   </div>
    // </>
  );

}