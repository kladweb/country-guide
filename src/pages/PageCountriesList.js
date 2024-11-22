import React from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Country from '../components/Country/Country';
import { setOpenInfoBar } from "../redux/isOpenInfoBarSlice";

export const PageCountriesList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const country = useSelector(state => state.countries);
  const countries = country.currentData;
  const page = params.part;

  const openInfo = (code) => {
    if (params.countid && params.countid === code) {
      dispatch(setOpenInfoBar('close'));
    } else {
      if (params.countid) {
      } else {
        dispatch(setOpenInfoBar('open'));
      }
      navigate(`/countries/${page}/` + code);
    }
  }

  const countriesCode = countries.map(country =>
    <Country
      key={country.code}
      code={country.code}
      name={country.name}
      page={`/countries/${page}/`}
      openInfo={openInfo}
    />
  );

  return (
    <div className='CountriesGroup'>
      {countriesCode}
      <Outlet/>
    </div>
  )
}