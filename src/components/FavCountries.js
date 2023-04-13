import React from 'react';

import { Country } from './Country';

import './Countries.css';
import { Outlet } from "react-router-dom";

export const FavCountries = ({countries, favCountries}) => {
  
  let favCountriesObj = countries.filter(item => favCountries.includes(item.code));

  const countriesCode = favCountriesObj.map(client =>
    <Country
      key={client.code}
      code={client.code}
      name={client.name}
      page='/favorites/'
    />
  );

  return (
    <div className='CountriesGroup'>
      {countriesCode}
      <Outlet/>
    </div>
  );
}