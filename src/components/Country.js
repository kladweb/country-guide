import React from 'react';
import { NavLink } from 'react-router-dom';

import './Country.css';

export const Country = ({ id, fio, balance } ) => {

  return (
    <div className='Country'>
      <span className='MobileClientBalance'>{balance}</span>
      <NavLink to={"/countries/"+id} className="MobileClientFIO">{fio}</NavLink>
    </div>
  );
};