import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import './CountryInfo.scss';
import { ICountries } from "../../types/globalTypes";
import { useAppSelector } from "../../redux/store";

export const CountryInfo: React.FC<ICountries> = ({code, name, population, area}) => {
  const params = useParams();
  const page = params.part;
  const navigate = useNavigate();
  const isOpenInfoBar = useAppSelector(state => state.openInfoBar.isOpenInfoBar);
  //make indents between thousandths:
  const people = population.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
  const square = area.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ');

  const [classInfo, changeClassInfo] = useState('country-info show');

  const closeInfo = () => {
    changeClassInfo('country-info hide');
    setTimeout(() => {
      navigate(`/countries/${page}`);
    }, 450);
  }

  useEffect(() => {
    if (isOpenInfoBar === 'close') {
      closeInfo();
    }
  }, [isOpenInfoBar]);

  return (
    <div className={classInfo}>
      <div className='content country-info__content'>
        <h2 className='sectionInfo country-info__name'>&laquo;{name}&raquo;</h2>
        <img className='sectionInfo flag-preview-info' src={`/img/flags/${code}.png`} alt={name}/>
        <div className='sectionInfo country-info__properties'>
          <h3>Population: <span className='country-info__value'>{people}</span></h3>
          <h3>Total area: <span className='country-info__value'>{square}</span> km<sup>2</sup></h3>
        </div>
      </div>
      <div className='material-icons button-close' onClick={closeInfo}>close</div>
    </div>
  );
};
