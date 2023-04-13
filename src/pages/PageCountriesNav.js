import React from 'react';
import { Outlet, useParams } from "react-router-dom";
import { Country } from "../components/Country";
import { useSelector } from "react-redux";

export const PageCountriesNav = () => {
  const country = useSelector(state => state.countries);
  const countries = country.currentData;
  const params = useParams();
  const page = params.part;

  const countriesCode = countries.map(client =>
    <Country
      key={client.code}
      code={client.code}
      name={client.name}
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