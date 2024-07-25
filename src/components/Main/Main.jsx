import WeatherCard from "../WeatherCard/WeatherCard.jsx";
import ItemCard from "../ItemCard/ItemCard.jsx";
import { defaultClothingItems } from "../../utils/constants";
import "./Main.css";
import { addNewItem } from "../../utils/Api.js";

function Main({ weatherData, handleCardClick, clothingArray }) {
  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp.F}° F / You may wish to wear:
        </p>
        <ul className="cards__list">
          {clothingArray
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleCardClick}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

//defaultClothingItems to clothingArray
export default Main;
