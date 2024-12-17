import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from 'react-router-dom';
import { favCountriesLoad } from "../../redux/favCountriesLoad";
import { LoginMenu } from "../../firebase/LoginMenu";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { setCurrUser } from "../../redux/loginUsersSlice";
import './PagesLinks.css';
// import { useDatabase } from "../../hooks/database";
import { updateFavData } from "../../redux/favCountriesSlice";
import { setActiveCountry } from "../../redux/isOpenInfoBarSlice";

export const PagesLinks = () => {
  // const {readUserData} = useDatabase();
  const dispatch = useDispatch();
  const countries = useSelector(state => state.countries);
  const favCountries = useSelector(state => state.favCountries.data);
  const activeCountry = useSelector(state => state.openInfoBar.activeCountry);
  const params = useParams();

  useEffect(
    () => {
      initUser();
      // dispatch(updateFavData([]));
      if (countries.dataLoadState !== 2) {
        dispatch(favCountriesLoad);
      }
      // if (params.countid) {
      //   dispatch(setActiveCountry(params.countid));
      // }
    }, []);

  // useEffect(
  //   () => {
  //     if (currUser) {
  //       readUserData(dispatch);
  //     }
  //   }, [currUser]);

  function initUser() {
    onAuthStateChanged(auth, (getUser) => {
      if (getUser) {
        const user = {};
        user.email = getUser.email;
        user.displayName = getUser.displayName;
        user.photoURL = getUser.photoURL;
        user.uid = getUser.uid;
        dispatch(setCurrUser({currUser: user}));
      } else {
        dispatch(setCurrUser({currUser: null}));
      }
    });
  }

  function getCountFav() {
    if (favCountries) {
      return favCountries.length
    }
  }

  function getLinkClass(obj) {
    let className = "PageLink";
    if (obj.isActive)
      className += " ActivePageLink";
    return className;
  }

  return (
    <div>
      <NavLink to="/" className={getLinkClass}>Main</NavLink>
      <NavLink to="/countries" className={getLinkClass}>Countries</NavLink>
      <NavLink to="/favorites" className={getLinkClass}>
        Visited
        {(getCountFav() > 0) &&
          <span className='countFav'>{getCountFav()}</span>
        }
      </NavLink>
      <NavLink to="/about" className={getLinkClass}>About us</NavLink>
      <NavLink to="/login" className={getLinkClass}>
        <LoginMenu />
      </NavLink>
    </div>
  );
};
