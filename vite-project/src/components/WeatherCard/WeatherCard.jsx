import "./WeatherCard.css";
import clear from "../../assets/day/clear_day.png";
import { weatherOptions } from "../../utils/constants";
import { defaultWeatherOptions } from "../../utils/constants";

function WeatherCard({ weatherData }) {
  const weatherOption = weatherOptions.find((item) => {
    return (
      item.day === weatherData.isDay && item.condition === weatherData.condition
    );
  });

  console.log(weatherData.isDay);
  console.log(weatherData.condition);

  return (
    <section className="weather-card">
      <p className="weather-card__temp">{weatherData.temp.F}° F</p>
      <img
        src={weatherOption?.url}
        alt={weatherOption?.condition}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
