import { Avatar } from "../../Avatar/Avatar";

export const Traveler = ({userName, userUrl, countries}) => {
  const countriesList = countries.map((country, index) => (
    <div key={country.code} className="traveler-country">
      <img
        className="traveler-country-img"
        src={`/img/flags/${country.code}.png`}
        alt={country.name}
      />
      <div className="traveler-country-name">
        <span className={`${country.name.length > 18 ? 'country-name__S' : ''}`}>{country.name}</span>
      </div>
    </div>
  ));

  return (
    <div className="traveler">
      <div className="traveler-head">
        <Avatar
          userName={userName}
          userUrl={userUrl}
          size={0.8}
        />
        <h3 className="traveler-name">
          {userName}
        </h3>
      </div>
      <div className="traveler-list">
        {countriesList}
      </div>
      <div className="traveler-footer">
        <p className="traveler-info">Visited countries: <span>{countriesList.length}</span></p>
      </div>
    </div>
  )
}
