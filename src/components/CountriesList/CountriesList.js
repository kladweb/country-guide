import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Country from '../Country/Country';
import { setOpenInfoBar } from "../../redux/isOpenInfoBarSlice";
import { updateFavData } from "../../redux/favCountriesSlice";
import { useDatabase } from "../../hooks/database";

export const CountriesList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const {writeUserCountries} = useDatabase();
  const favCountries = useSelector(state => state.favCountries.data);
  const countriesObj = useSelector(state => state.countries);
  const currUser = useSelector(state => state.currUser.currUser);
  const countriesAll = (countriesObj.data);
  const countries = (countriesObj.currentData) ? countriesObj.currentData : [];
  const page = params.part;
  const favCountriesObj = countriesAll.filter(item => favCountries.includes(item.code));
  const isVisited = page === 'visited';
  const countriesCurrent = isVisited ? favCountriesObj : countries;

  const deleteFavCountry = function (code, showStar, changeShowStar, changeShowCountry) {
    if (page === 'visited') {
      changeShowStar(!showStar);
      setTimeout(() => {
        changeShowCountry(true);
      }, 100);
    } else toggleFav(code, showStar, changeShowStar);
  }
  const toggleFav = function (code, showStar, changeShowStar) {
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

  const openInfo = (code) => {
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
          {(countriesCurrent <= 0) &&
            <p className='navPages'>The list of visited countries is empty...</p>
          }
        </>
      }
      {countriesElements}
      <Outlet/>
    </div>
  )
}
