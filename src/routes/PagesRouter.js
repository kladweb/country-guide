import { Route, Routes } from 'react-router-dom';
import { PageAbout } from '../pages/PageAbout';
import { PageMain } from '../pages/PageMain';
import { PageCountries } from '../pages/PageCountries';
import { CountriesList } from '../components/CountriesList/CountriesList';
import { CountryInfoBar } from '../pages/CountryInfoBar';
import { PageLoginLogout } from "../pages/PageLoginLogout";

export const PagesRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<PageMain />} />
      <Route path="/countries" element={<PageCountries />}>
        <Route path=":part" element={<CountriesList />}>
          <Route path=":countid" element={<CountryInfoBar />} />
        </Route>
      </Route>
      <Route path="/about" element={<PageAbout />} />
      <Route path="/login" element={<PageLoginLogout />} />
    </Routes>
  );
};
