import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { PagesLinks } from './components/PagesLinks';
import { PagesRouter } from './routes/PagesRouter';
import { store } from './redux/store';

import './App.css';

export const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <header className='main-header'>
        <div className='content'>
          <div className='main-header__brand'>
            <img className='main-header__logo' src='/img/shared/logo.png' alt="COUNTRY GUIDE"/>
          </div>
          <span className='main-header__name'>COUNTRY GUIDE</span>
          <nav className='main-nav'>
            <PagesLinks/>
          </nav>
        </div>
      </header>
      <main>
        <PagesRouter/>
      </main>
    </BrowserRouter>
  </Provider>
);