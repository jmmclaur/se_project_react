import "./WeatherCard.css";
import clear from "../../assets/day/clear_day.png";
import { weatherOptions, defaultWeatherOptions } from "../../utils/constants";
import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../utils/contexts/CurrentTemperatureUnitContext";

function WeatherCard({ weatherData }) {
  const weatherOption = weatherOptions.find((item) => {
    return (
      item.day === weatherData.isDay && item.condition === weatherData.condition
    );
  });

  const link =
    weatherOption?.url ||
    (weatherData.isDay
      ? defaultWeatherOptions.day.url
      : defaultWeatherOptions.night.url);

  console.log(weatherData.isDay);
  console.log(weatherData.condition);

  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  console.log(currentTemperatureUnit);
  const temp = weatherData?.weather?.temperature[currentTemperatureUnit] || 999;

  return (
    <section className="weather-card">
      <p className="weather-card__temp">{weatherData.temp.F}° F</p>
      <img
        src={link}
        alt={weatherOption?.condition || "default"}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;

//imageUrl to link
