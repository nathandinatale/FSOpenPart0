import { useState } from "react";

import Country from "./Country";

const Countries = ({ countries }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  if (countries.length > 10)
    return <p>Too many matches, specify another filter</p>;

  // This could be pushed up to the App level
  if (countries.length === 1) {
    const country = countries[0];
    return <Country country={country} />;
  }

  // This would be handled better by react router with seperate pages for each country
  return (
    <div>
      {selectedCountry ? (
        <>
          <Country country={selectedCountry} />
          <button onClick={() => setSelectedCountry(false)}>Back</button>
        </>
      ) : (
        countries.map((country) => (
          <p key={country.name.common}>
            {country.name.common}{" "}
            <button onClick={() => setSelectedCountry(country)} value={country}>
              show
            </button>
          </p>
        ))
      )}
    </div>
  );
};

export default Countries;
