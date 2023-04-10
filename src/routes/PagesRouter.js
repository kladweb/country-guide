import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { PageAbout } from '../pages/PageAbout';
import { PageMain } from '../pages/PageMain';
import { PageCountries } from '../pages/PageCountries';
import { PageCountry } from '../pages/PageCountry';
import { PageFavorites } from '../pages/PageFavorites';

export const PagesRouter = () => {
          
    return (
      <Routes>
        <Route path="/" element={<PageMain/>}/>
        <Route path="/countries" element={<PageCountries/>}>
          <Route path=":clid" element={<PageCountry/>}/>
        </Route>
        <Route path="/favorites" element={<PageFavorites/>} />
        <Route path="/about" element={<PageAbout/>} />
      </Routes>
    );
    
};
