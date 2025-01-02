import React, { useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import Country from '../Country/Country';
import { sortingCountries } from "../../utilities/sortingCountries";
import { ScrollUp } from "../ScrollUp/ScrollUp";
import '../Countries/Countries.css';
import { setOpenInfoBar } from "../../redux/isOpenInfoBarSlice";
import { useDispatch } from "react-redux";

export const FavCountries = ({countries, favCountries}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  let favCountriesObj = countries.filter(item => favCountries.includes(item.code));
  const [typeSort, changeTypeSort] = useState('name');
  let newFavObj = sortingCountries(typeSort, favCountriesObj);
  const page = params.part;

  const openInfo = (code) => {
    if (params.countid && params.countid === code) {
      dispatch(setOpenInfoBar('close'));
    } else {
      if (!params.countid) {
        dispatch(setOpenInfoBar('open'));
      }
      navigate(`/favorites/` + code);
    }
  }

  const countriesCode = newFavObj.map(client =>
    <Country
      key={client.code}
      code={client.code}
      name={client.name}
      page='/favorites/'
      openInfo={openInfo}
    />
  );

  function sortFavCountries(e) {
    changeTypeSort(e.target.value);
  }

  return (
    <>
      <ScrollUp/>
      <div className='typeSorting'>
        <span className='typeSorting-name'>Sort by:</span>
        <select onChange={sortFavCountries}>
          <option value="name">country name (default)</option>
          <option value="population">population (ascending)</option>
          <option value="population-des">population (descending)</option>
          <option value="area">total area (ascending)</option>
          <option value="area-des">total area (descending)</option>
        </select>
      </div>
      <div className='CountriesGroup'>
        {(favCountries.length === 0) && <p className='navPages'>The list of favorite countries is empty...</p>}
        {countriesCode}
        <Outlet/>
      </div>
    </>
  );

}
