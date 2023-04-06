import React from 'react';
import { useSelector } from 'react-redux';

import { CountryList } from '../components/CountryList';

export const PageCompany = () => {

  const appData2 = useSelector (state => state.country.data);

  return (
    <CountryList countries={appData2} />
  );

}