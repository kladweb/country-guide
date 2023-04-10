import React from 'react';
import { useSelector } from 'react-redux';

import { CountryMain } from '../components/CountryMain';

export const PageMain = () => {

  // const appData = useSelector(state => state.country.data);
  return (
    <div className='CountryMain'>
      <div className='content'>
        <CountryMain/>
      </div>
    </div>
  );
}