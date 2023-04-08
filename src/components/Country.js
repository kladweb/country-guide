import React from 'react';
import { NavLink } from 'react-router-dom';

import './Country.css';

export const Country = ({code, name, population}) => {
  return (
    <div className='Country'>
      <NavLink to={"/countries/" + code} className="CountryName">
        <div className='flag-frame'>
          <img className='flag-preview' src={`/img/flags/${code}.png`} alt={name}/>
          <span className='country-title'>{name}</span>
        </div>
      </NavLink>
      {/*<span className='CountryPopulation'>{population}</span>*/}
    </div>
  );
};