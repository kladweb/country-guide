import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { PageAbout } from '../pages/PageAbout';
import { PageMain } from '../pages/PageMain';
import { PageCountries } from '../pages/PageCountries';
import { PageCountriesList } from '../pages/PageCountriesList';
import { CountryInfoBar } from '../pages/CountryInfoBar';
import { PageFavorites } from '../pages/PageFavorites';
import { PageLoginLogout } from "../pages/PageLoginLogout";

export const PagesRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<PageMain/>}/>
      <Route path="/countries" element={<PageCountries/>}>
        <Route path=":part" element={<PageCountriesList/>}>
          <Route path=":countid" element={<CountryInfoBar pageCount={'countries'}/>}/>
        </Route>
      </Route>
      <Route path="/favorites" element={<PageFavorites/>}>
        <Route path=":countid" element={<CountryInfoBar pageCount={'favorites'}/>}/>
      </Route>
      <Route path="/about" element={<PageAbout/>}/>
      <Route path="/login" element={<PageLoginLogout/>}/>
    </Routes>
  );
};
