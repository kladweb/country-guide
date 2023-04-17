import React, { useEffect } from 'react';
import { NavLink, Outlet, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from "react-redux";

import './Countries.css';

export const Countries = ({countries, page}) => {
  const params = useParams();
  const part = params.part;
  let countPages = useSelector(state => state.countries.countPages);
  let navigate = useNavigate();

  //в данном проекте страницы /countries/ не существует, поэтому сразу переходим на страницу /countries/all. Можно
  // было бы вместо /countries/all сделать просто /countries/, но в этом случае кнопка меню 'Countries' перестает
  // быть активной при переходе внутри этой страницы на любую другую под-страницу.
  useEffect(
    () => {
      if (!part) {
        navigate('/countries/all');
      }
    },
    [part, navigate]
  );

  const navPagesCode = () => {
    let navPages = [];
    for (let i = 1; i <= countPages; i++) {
      navPages.push(
        <NavLink to={`/countries/${i}`} className='navPages-links' key={i}>
          <span className='navPages-items'>{i}</span>
        </NavLink>
      );
    }
    return navPages;
  }

  function getLinkClass(obj) {
    let className = "navPages-links";
    if (obj.isActive)
      className += " active";
    return className;
  }

  return (
    <>
      <div className='navPages'>
        <span className='navPages-items navPages-name'>PAGES: </span>
        <NavLink to={`/countries/all`} className={getLinkClass} key={countPages + 1}>
          <span className='navPages-items'>ALL</span>
        </NavLink>
        {navPagesCode()}
      </div>
      <Outlet/>
    </>
  );
}