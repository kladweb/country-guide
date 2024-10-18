import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import { favCountriesLoad } from "../../redux/favCountriesLoad";
import './PagesLinks.css';

export const PagesLinks = () => {
  const dispatch = useDispatch();
  const countries = useSelector(state => state.countries);
  const favCountries = useSelector(state => state.favCountries.data);

  useEffect(
    () => {
      if (countries.dataLoadState !== 2) {
        dispatch(favCountriesLoad);
      }
    },
    []
  );

  function getCountFav() {
    if (favCountries) {
      return favCountries.length
    }
  }

  function getLinkClass(obj) {
    let className = "PageLink";
    if (obj.isActive)
      className += " ActivePageLink";
    return className;
  }

  return (
    <div>
      <NavLink to="/" className={getLinkClass}>Main</NavLink>
      <NavLink to="/countries" className={getLinkClass}>Countries</NavLink>
      <NavLink to="/favorites" className={getLinkClass}>
        Favorites
        {(getCountFav() > 0) &&
          <span className='countFav'>{getCountFav()}</span>
        }
      </NavLink>
      <NavLink to="/about" className={getLinkClass}>About us</NavLink>
    </div>
  );
};