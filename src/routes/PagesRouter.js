import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { PageAbout } from '../pages/PageAbout';
import { PageMain } from '../pages/PageMain';
import { PageCountries } from '../pages/PageCountries';
import { PageClient } from '../pages/PageClient';

export const PagesRouter = () => {
          
    return (
      <Routes>
        <Route path="/" element={<PageMain/>}/>
        <Route path="/countries" element={<PageCountries/>}>
          <Route path=":clid" element={<PageClient/>}/>
        </Route>
        <Route path="/company" element={<PageAbout/>} />
      </Routes>
    );
    
};
