import React from 'react';
import { NavLink } from 'react-router-dom';

import './Country.css';

export const Country = ({code, name, population}) => {
  return (
    <div className='Country'>
      <NavLink to={"/countries/" + code} className="CountryName">
        <div className='flag-frame'>
          <img className='flag-preview' src={`/img/flags/${code}.png`} alt="My Image"/>
        </div>
        {name}
      </NavLink>
      {/*<span className='CountryPopulation'>{population}</span>*/}
    </div>
  );
};