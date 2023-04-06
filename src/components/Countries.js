import React from 'react';
import { Outlet } from 'react-router-dom';

import { Country } from './Country';

import './Countries.css';

export const Countries = ({name, countries}) => {

  const countriesCode = countries.map(client =>
    <Country key={client.id} id={client.id} fio={client.fio}/>
  );

  return (
    <>
      <div className='CountryList'>
        {/*<div className='CountryListName'>Компания &laquo;{name}&raquo;</div>*/}
        <div className='CountriesGroup'>
          {countriesCode}
        </div>
      </div>
      <Outlet/>
    </>
  );
}
