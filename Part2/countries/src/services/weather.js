import axios from "axios";
const baseUrl = `https://api.openweathermap.org/data/2.5/weather`;

const getCityWeather = (cityName) => {
  const request = axios.get(
    `${baseUrl}?q=${cityName}&appid=${process.env.REACT_APP_WEATHER}&units=metric`
  );
  return request.then((response) => response.data);
};

const weatherService = { getCityWeather };
export default weatherService;
