import { useEffect } from "react";
import { Travelers } from "../components/Travelers/Travelers";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { useDatabase } from "../hooks/database";

export const PageTravelers = () => {
  const {readAllUsers} = useDatabase();
  const dispatch = useAppDispatch();

  useEffect(() => {
    readAllUsers(dispatch);
  }, []);

  return (
    <div className="CountryAbout">
      <div className="CountryAbout-bg"></div>
      <div className="content">
        <Travelers/>
      </div>
    </div>
  )
}
