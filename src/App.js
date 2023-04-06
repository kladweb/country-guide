import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { PagesLinks } from './components/PagesLinks';
import { PagesRouter } from './routes/PagesRouter';

import './App.css';

export const App = () => (
  <BrowserRouter>
    <header className='main-header'>
      <div className='content'>
        <a className='main-header__brand'>
          <img className='main-header__logo' src='/img/shared/logo.png' alt="COUNTRY GUIDE"/>
        </a>
        <span className='main-header__name'>COUNTRY GUIDE</span>
        <nav className='main-nav'>
          <PagesLinks/>
        </nav>
      </div>
    </header>
    <main>
      <div className='content'>
        <PagesRouter/>
      </div>
    </main>
  </BrowserRouter>
);
