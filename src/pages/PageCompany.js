import React from 'react';

import { CountryList } from '../components/CountryList';

import { appData } from '../appData';

export const PageCompany = () => {
          
  return (
    <CountryList countries={appData.countries} />
  );
    
}
