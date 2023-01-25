import { useEffect, useState } from "react";

import Countries from "./components/Countries";
import Filter from "./components/Filter";
import countryService from "./services/countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filterQuery, setFilterQuery] = useState("");

  useEffect(() => {
    countryService
      .getAll()
      .then((fetchedCountries) => setCountries(fetchedCountries));
  }, []);

  const handleFilter = (event) => {
    setFilterQuery(event.target.value);
  };

  return (
    <div>
      <Filter value={filterQuery} handleUpdate={handleFilter} />
      <Countries
        countries={
          filterQuery
            ? countries.filter((country) =>
                country.name.common
                  .toUpperCase()
                  .includes(filterQuery.toUpperCase())
              )
            : countries
        }
      />
    </div>
  );
};

export default App;
