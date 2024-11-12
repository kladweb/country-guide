import React from 'react';
import { PagesLinks } from "../PagesLinks/PagesLinks";

export const Header = () => (
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
);