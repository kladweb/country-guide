import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import { LoginMenu } from "../LoginMenu/LoginMenu";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { setCurrUser } from "../../redux/loginUsersSlice";
import './PagesLinks.css';

export const PagesLinks = () => {
  const dispatch = useDispatch();
  const favCountries = useSelector(state => state.favCountries.data);
  const countFav = (favCountries) ? favCountries.length : null;

  useEffect(
    () => {
      initUser();
    }, []);

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

  function getLinkClass(obj, countries = '') {
    const pathname = window.location.pathname;
    let className = "PageLink";
    if (obj.isActive) {
      if (countries === 'all' && pathname.includes('visited')) {
        return className;
      }
      className += " ActivePageLink";
    }
    return className;
  }

  return (
    <div>
      <NavLink to="/" className={getLinkClass}>Main</NavLink>
      <NavLink to="/countries" className={(obj) => getLinkClass(obj, 'all')}>Countries</NavLink>
      <NavLink to="/countries/visited" className={getLinkClass}>
        Visited
        {(countFav > 0) &&
          <span className='countFav'>{countFav}</span>
        }
      </NavLink>
      <NavLink to="/travelers" className={getLinkClass}>Travelers</NavLink>
      <NavLink to="/login" className={getLinkClass}>
        <LoginMenu/>
      </NavLink>
    </div>
  );
};
