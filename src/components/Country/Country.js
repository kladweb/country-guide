import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition } from 'react-transition-group';
import { updateFavData } from "../../redux/favCountriesSlice";
import { useDatabase } from "../../hooks/database";
import './Country.css';

const Country = ({code, name, page, openInfo}) => {
  const {writeUserData} = useDatabase();
  const nodeRef = React.useRef(null);
  const [showCountry, changeShowCountry] = useState(false);
  const dispatch = useDispatch();
  const dataFav = useSelector(state => state.favCountries.data);
  const isFav = dataFav.includes(code);
  const currUser = useSelector(state => state.currUser.currUser);

  const [showStar, changeShowStar] = useState(isFav);

  const deleteFavCountry = function (code) {
    if (page === '/favorites/') {
      changeShowStar(!showStar);
      setTimeout(() => {
        changeShowCountry(true);
      }, 100);
    } else toggleFav(code);
  }
  const toggleFav = function (code) {
    if (currUser) {
      changeShowStar(!showStar);
      let newData = [...dataFav];
      if (newData.includes(code)) {
        newData = dataFav.filter(item => (item !== code));
      } else {
        newData.push(code);
      }
      dispatch(updateFavData(newData));
      writeUserData(JSON.stringify(newData));
    }
  }

  const onOpenInfo = () => {
    openInfo(code);
  }

  // const openInfo = () => {
  //   console.log(params.countid, ' : ', activeCountry);
  //   if (params.countid && params.countid === activeCountry) {
  //     dispatch(setOpenInfoBar('close'));
  //     dispatch(setActiveCountry(null));
  //     console.log('ff1')
  //   } else {
  //     if (params.countid) {
  //       console.log('ff2')
  //     } else {
  //       console.log('ff3')
  //       dispatch(setOpenInfoBar('open'));
  //     }
  //     dispatch(setActiveCountry(code));
  //     navigate(page + code);
  //   }
  // }

  return (
    <CSSTransition
      timeout={700}
      nodeRef={nodeRef}
      classNames='land'
      in={!showCountry}
      onExited={() => toggleFav(code)}>
      <div ref={nodeRef} className='Country'>
        <div className={`flag-frame${isFav && showStar ? ' isFav' : ''}`}>
          <img className='flag-preview' src={`/img/flags/${code}.png`} alt={name} />
          <span className={`country-title ${name.length > 24 ? 'country-title__small' : null}`}>{name}</span>
          <div className='CountryLinks'>
            <a className='CountryInfo' onClick={onOpenInfo}>
              <button className='CountryInfo__title'>Information</button>
            </a>
            <button className='CountryInfo__title' onClick={() => {
              deleteFavCountry(code);
            }}>
              <span>Visited</span>
              <div className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" height="17" width="17">
                  <path
                    d="M14.1891 6.37042L10.2219 5.79385L8.44847 2.19854C8.40003 2.1001 8.32034 2.02042 8.2219
                1.97198C7.97503 1.8501 7.67503 1.95167 7.55159 2.19854L5.77815 5.79385L1.81097 6.37042C1.70159 6.38604
                1.60159 6.4376 1.52503 6.51573C1.43247 6.61086 1.38146 6.73885 1.38322 6.87157C1.38498 7.0043 1.43936
                7.13089 1.5344 7.22354L4.40472 10.022L3.72659 13.9735C3.71069 14.0655 3.72086 14.16 3.75595
                14.2464C3.79105 14.3329 3.84966 14.4077 3.92514 14.4626C4.00062 14.5174 4.08995 14.55 4.183
                14.5566C4.27605 14.5632 4.3691 14.5437 4.45159 14.5001L8.00003 12.6345L11.5485 14.5001C11.6453
                14.5517 11.7578 14.5689 11.8657 14.5501C12.1375 14.5032 12.3203 14.2454 12.2735 13.9735L11.5953
                10.022L14.4657 7.22354C14.5438 7.14698 14.5953 7.04698 14.611 6.9376C14.6532 6.66417 14.4625
                6.41104 14.1891 6.37042Z"
                    fill={isFav && showStar ? 'yellow' : 'none'}
                    stroke={isFav && showStar ? 'yellow' : '#FFF'}
                    className="icon-star-path"></path>
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default React.memo(Country);
