import { useEffect, useState } from "react";
import weatherService from "../services/weather";

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    weatherService
      .getCityWeather(country.capital)
      .then((weather) => setWeather(weather));
  }, []);

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h3>languages</h3>
      <ul>
        {Object.entries(country.languages).map(([key, value]) => (
          <li key={key}>{value}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={`flag of ${country.name.common}`} />
      {weather && (
        <div>
          <h3>Weather in {country.capital}</h3>
          <p>temperature {weather.main.temp} Celsius</p>
          <img
            src={` http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
            alt={`depicts the current weather condition ${weather.weather[0].description}`}
          />
          <p>wind speed {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default Country;
