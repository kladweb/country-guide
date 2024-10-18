import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Country from '../components/Country/Country';

export const PageCountriesList = () => {
  const country = useSelector(state => state.countries);
  const countries = country.currentData;
  const params = useParams();
  const page = params.part;

  const countriesCode = countries.map(country =>
    <Country
      key={country.code}
      code={country.code}
      name={country.name}
      page={`/countries/${page}/`}
    />
  );

  return (
    <div className='CountriesGroup'>
      {countriesCode}
      <Outlet/>
    </div>
  )
}