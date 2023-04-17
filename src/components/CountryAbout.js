import React from 'react';

import './CountryAbout.css';

export const CountryAbout = () => {

  return (
    <>
      <h1>ABOUT THE PROJECT</h1>
      <p>
        This site was created as the final project of the course "React for web application development" at the
        IT-ACADEMY educational center using functional components. This project was developed by Pavel Kladkevich under
        the guidance of the teacher Alexey Loktev.
      </p>
      <p>
        My project of the previous module "Development of Web Applications in JavaScript" with using canvas
        graphics:
        <span> </span>
        <a className='js-project' href="https://guess-countries.netlify.app/" target="_blank" rel="noreferrer">
          GUESS&nbsp;THE&nbsp;COUNTRY
        </a>
      </p>
    </>
  );
};