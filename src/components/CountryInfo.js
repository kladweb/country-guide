import React from 'react';

import './CountryInfo.css';

export const CountryInfo = ({code, name, population, area}) => {
  //делаем отступы между тысячными:
  population = population.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
  area = area.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ');

  return (
    <div className='country-info'>
      <div className='content country-info__content'>
        <h2 className='sectionInfo country-info__name'>&laquo;{name}&raquo;</h2>
        <img className='sectionInfo flag-preview-info' src={`/img/flags/${code}.png`} alt={name}/>
        <div className='sectionInfo country-info__properties'>
          <h3>Population: {population} </h3>
          <h3>Total area: {area} km<sup>2</sup></h3>
        </div>
      </div>
    </div>
  );

};
