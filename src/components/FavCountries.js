import React from 'react';
import { Outlet } from "react-router-dom";

import Country from './Country';

import './Countries.css';

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
      {(favCountries.length === 0) &&
        <p className='navPages'>The list of favorite countries is empty...</p>}
      {countriesCode}
      <Outlet/>
    </div>
  );
}