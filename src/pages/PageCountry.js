import React from 'react';
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';

import { CountryInfo } from '../components/CountryInfo';

// import { appData } from '../appData';

export const PageCountry = () => {

  const appData = useSelector(state => state.country.data);

  const params = useParams();
  // console.log(params);
  // since the route looks like that: <Route path="/client/:clid" element={<Page_Client/>} />
  // it means useParams hook returns what's in the URI after "/client/" as "clid" property (it's string)

  const countryId = params.clid;
  // const countryId = parseInt(params.clid);

  const countryData = appData.find(c => c.code === countryId);

  return (
    <CountryInfo
      code={countryData.code}
      name={countryData.name}
      population={countryData.population}
      area={countryData.area}
    />
  );

}
