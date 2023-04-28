import React, { useEffect } from 'react';
import { NavLink, Outlet, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import './Countries.css';
import { updateData } from "../redux/countriesSlice";
import { sortingCountries } from "./sortingCountries";

export const Countries = ({countries, page}) => {
  const params = useParams();
  const dispatch = useDispatch();
  const part = params.part;
  let countPages = useSelector(state => state.countries.countPages);
  let dataCountries = useSelector(state => state.countries.data);
  let navigate = useNavigate();

  // const [sortBy, changeSortBy] = useState('name');

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

  function sortCountries(e) {
    let newData = sortingCountries(e.target.value, dataCountries);
    dispatch(updateData(newData));
  }

  function getLinkClass(obj) {
    let className = "navPages-links";
    if (obj.isActive)
      className += " active";
    return className;
  }

  return (
    <>
      <div className='typeSorting'>
        <span className='typeSorting-name'>Sort by:</span>
        <select onChange={sortCountries}>
          <option value="name">country name (default)</option>
          <option value="population">population (ascending)</option>
          <option value="population-des">population (descending)</option>
          <option value="area">total area (ascending)</option>
          <option value="area-des">total area (descending)</option>
        </select>
      </div>
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