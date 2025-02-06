import { Travelers } from "../components/Travelers/Travelers";
import { useEffect } from "react";
import { useDatabase } from "../hooks/database";
import { useAppDispatch, useAppSelector } from "../redux/store";

export const PageTravelers = () => {
  const {readAllUsers} = useDatabase();
  const dispatch = useAppDispatch();
  const isLoadAllCountries = useAppSelector(state => state.allUsersCountries.allCountriesLoadState);

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
