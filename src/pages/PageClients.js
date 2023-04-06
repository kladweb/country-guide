import React from 'react';

import { Countries } from '../components/Countries';

import { appData } from '../appData';

export const PageClients = () => {
          
  return (
    <Countries countries={appData.countries} />
  );
    
};
