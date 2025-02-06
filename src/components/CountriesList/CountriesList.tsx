import { Outlet, useNavigate, useParams } from 'react-router-dom';
import Country from '../Country/Country';
import { setOpenInfoBar } from "../../redux/isOpenInfoBarSlice";
import { updateFavData } from "../../redux/favCountriesSlice";
import { useDatabase } from "../../hooks/database";
import { RootState, useAppDispatch, useAppSelector } from "../../redux/store";
import type { ICountries } from "../../types/globalTypes";
import React from "react";

export const CountriesList = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const params = useParams();
  const {writeUserCountries} = useDatabase();
  const favCountries: string[] = useAppSelector((state: RootState) => state.favCountries.data);
  const countriesObj = useAppSelector((state: RootState) => state.countries);
  const currUser = useAppSelector((state: RootState) => state.currUser.currUser);
  const countriesAll = countriesObj.data;
  const countries: ICountries[] = (countriesObj.currentData) ? countriesObj.currentData : [];
  const favCountriesObj: ICountries[] = (countriesAll) ?
    countriesAll.filter((item: ICountries) => favCountries.includes(item.code)) : [];
  const page = params.part;
  const isVisited = page === 'visited';
  const countriesCurrent: ICountries[] = isVisited ? favCountriesObj : countries;

  const deleteFavCountry = function (code: string,
                                     showStar: boolean,
                                     changeShowStar: React.Dispatch<React.SetStateAction<boolean>>,
                                     changeShowCountry: React.Dispatch<React.SetStateAction<boolean>>,
  ) {
    if (page === 'visited') {
      changeShowStar(!showStar);
      setTimeout(() => {
        changeShowCountry(true);
      }, 100);
    } else toggleFav(code, showStar, changeShowStar);
  }
  const toggleFav = function (
    code: string,
    showStar: boolean,
    changeShowStar: React.Dispatch<React.SetStateAction<boolean>>
  ) {
    if (currUser) {
      changeShowStar(!showStar);
      let newData = [...favCountries];
      if (newData.includes(code)) {
        newData = favCountries.filter(item => (item !== code));
      } else {
        newData.push(code);
      }
      dispatch(updateFavData(newData));
      writeUserCountries(JSON.stringify(newData));
    } else {
      navigate('/login');
    }
  }

  const openInfo = (code: string) => {
    if (params.countid && params.countid === code) {
      dispatch(setOpenInfoBar('close'));
    } else {
      if (!params.countid) {
        dispatch(setOpenInfoBar('open'));
      }
      navigate(`/countries/${page}/` + code);
    }
  }

  const countriesElements = countriesCurrent.map(country =>
    <Country
      key={country.code}
      code={country.code}
      name={country.name}
      isFav={favCountries.includes(country.code)}
      deleteFavCountry={deleteFavCountry}
      toggleFav={toggleFav}
      openInfo={openInfo}
    />
  );

  return (
    <div className='CountriesGroup'>
      {isVisited &&
        <>
          {(countriesCurrent.length <= 0) &&
            <p className='navPages'>The list of visited countries is empty...</p>
          }
        </>
      }
      {countriesElements}
      <Outlet/>
    </div>
  )
}
