import React from 'react';

export const CountryInfo = ({ fio, balance } ) => {

  return (
    <h1>
      клиент &laquo;{fio}&raquo;, баланс {balance}
    </h1>
  );

};
