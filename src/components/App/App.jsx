import { useEffect, useState } from "react";

import "./App.css";
import AddItemModal from "../AddItemModal/AddItemModal";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import Profile from "../Profile/Profile";
import { Routes, Route } from "react-router-dom";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, apiKey } from "../../utils/constants";
import { getItems, addNewItem, deleteItemById } from "../../utils/Api";
import { CurrentTemperatureUnitContext } from "../../utils/contexts/CurrentTemperatureUnitContext";
import React from "react";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "cold",
    temp: { F: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [defaultClothingItems, setClothingItems] = useState([]);

  console.log(defaultClothingItems);
  const handleCardClick = (card) => {
    console.log("Card clicked:", card);
    setSelectedCard(card);
    setActiveModal("preview");
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const onAddNewItem = async (values) => {
    console.log(values);
    addNewItem(values.name, values.link, values.weather).then((data) => {
      setClothingItems((prevItems) => [...prevItems, data]);
      closeActiveModal();
    });
  };

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        console.log("weather");
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
        console.log(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        console.log("getitems");
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteItemById(id);
      const updatedDefaultClothingItems = defaultClothingItems.filter(
        (item) => item._id !== id
      );
      setClothingItems(updatedDefaultClothingItems);
      closeActiveModal();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  defaultClothingItems={defaultClothingItems}
                  handleAddClick={handleAddClick}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  handleCardClick={handleCardClick}
                  defaultClothingItems={defaultClothingItems}
                  handleAddClick={handleAddClick}
                />
              }
            />
          </Routes>

          <Footer />
        </div>
        {activeModal === "add-garment" && (
          <AddItemModal
            handleCloseModal={closeActiveModal}
            onAddNewItem={onAddNewItem}
            isOpen={activeModal === "add-garment"}
          />
        )}
        {activeModal === "preview" && (
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            closeActiveModal={closeActiveModal}
            handleDelete={handleDelete}
          />
        )}
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
