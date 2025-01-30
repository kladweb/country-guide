import { Travelers } from "../components/Travelers/Travelers";
import { useEffect } from "react";
import { useDatabase } from "../hooks/database";
import { useDispatch, useSelector } from "react-redux";

export const PageTravelers = () => {
  const {readAllUsers} = useDatabase();
  const dispatch = useDispatch();
  const isLoadAllCountries = useSelector(state => state.allUsersCountries.allCountriesLoadState);

  useEffect(() => {
    readAllUsers(dispatch);
  }, []);

  return (
    <div className="CountryAbout">
      <div className="content">
        {
          isLoadAllCountries ?
            <Travelers/>
            :
            null
        }
      </div>
    </div>
  )
}
