import WeatherCard from "../WeatherCard/WeatherCard.jsx";
import ItemCard from "../ItemCard/ItemCard.jsx";
import { defaultClothingItems } from "../../utils/constants";
import "./Main.css";
import { addNewItem } from "../../utils/Api.js";
import ClothesSection from "../ClothesSection/ClothesSection.jsx";
import { CurrentTemperatureUnitContext } from "../../utils/contexts/CurrentTemperatureUnitContext";
import { useContext } from "react";

function Main({
  weatherData,
  handleCardClick,
  handleAddClick,
  defaultClothingItems,
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
        <ClothesSection
          handleCardClick={handleCardClick}
          defaultClothingItems={defaultClothingItems}
          handleAddClick={handleAddClick}
        />
      </section>
    </main>
  );
}

export default Main;
