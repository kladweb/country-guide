import React from 'react';

export const CountryInfo = ({name, population}) => {
  //делаем отступы между тысячными:
  population = population.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ');

  return (
    <h1>
      Страна &laquo;{name}&raquo;, Население {population}
    </h1>
  );

};
