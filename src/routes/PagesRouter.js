import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { PageAbout } from '../pages/PageAbout';
import { PageCompany } from '../pages/PageCompany';
import { PageClients } from '../pages/PageClients';
import { PageClient } from '../pages/PageClient';

export const PagesRouter = () => {
          
    return (
      <Routes>
        <Route path="/countries" element={<PageClients/>}>
          <Route path=":clid" element={<PageClient/>}/>
        </Route>
        <Route path="/" element={<PageCompany/>} />
        <Route path="/company" element={<PageAbout/>} />
      </Routes>
    );
    
};
