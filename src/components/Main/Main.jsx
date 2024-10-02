import React from "react";
import WeatherCard from "../WeatherCard/WeatherCard.jsx";
import ItemCard from "../ItemCard/ItemCard.jsx";
import "./Main.css";
import { CurrentTemperatureUnitContext } from "../../utils/contexts/CurrentTemperatureUnitContext";
import { useContext } from "react";

function Main({
  weatherData,
  handleCardClick,
  onCardLike,
  updatedDefaultClothingItems,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          {currentTemperatureUnit === "F"
            ? `${weatherData.temp.F}°F You may wish to wear:`
            : `${weatherData.temp.C}°C You may wish to wear:`}
        </p>

        <ul className="cards__list">
          {updatedDefaultClothingItems
            ?.filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id || item.id}
                  item={item}
                  onCardClick={handleCardClick}
                  onCardLike={onCardLike}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

//adding a key above the return made the default clothing items disappear, why though?
export default Main;
