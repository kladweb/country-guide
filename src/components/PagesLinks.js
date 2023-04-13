import React from 'react';
import { NavLink, useParams } from 'react-router-dom';

import './PagesLinks.css';

export const PagesLinks = () => {
  const params = useParams();

  function getLinkClass(obj) {
    const page = params.part;
    console.log('page', page);
    let className = "PageLink";
    // console.log('page', page);
    if (obj.isActive)
      className += " ActivePageLink";
    return className;
  }

  return (
    <div>
      <NavLink to="/" className={getLinkClass}>Main</NavLink>
      <NavLink to="/countries/all" className={getLinkClass}>Countries</NavLink>
      <NavLink to="/favorites" className={getLinkClass}>Favorites</NavLink>
      <NavLink to="/about" className={getLinkClass}>About us</NavLink>
    </div>
  );

};
