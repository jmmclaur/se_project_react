import { useEffect, useState } from "react";

import "./App.css";
import AddItemModal from "../AddItemModal/AddItemModal";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import Profile from "../Profile/Profile";
//import ClothesSection from "../ClothesSection/ClothesSection";
//import ConfirmationModal from "../ConfirmationModal/ConfirmationModal.jsx";
import { Routes, Route } from "react-router-dom";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, apiKey } from "../../utils/constants";
import { getItems, addNewItem } from "../../utils/Api";
import { CurrentTemperatureUnitContext } from "../../utils/contexts/CurrentTemperatureUnitContext";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "cold",
    temp: { F: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState("");
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [defaultClothingItems, setClothingItems] = useState([
    {
      _id: 0,
      name: "Hat",
    },
  ]);

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const onAddNewItem = (values) => {
    console.log(values);
    addNewItem(values);
  };

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
        console.log(filteredData);
      })
      .catch(console.error);
  }, []);

  //something is wrong for the section 80-86, why?
  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  function handleDeleteCard(evt) {
    api
      .deleteCard(currentItem._id)
      .then(() => {
        setClothing(
          clothing.filter((element) => {
            return currentItem._id != element._id;
          })
        );
        closeModal();
      })
      .catch((err) => {
        console.error(err);
      });
    evt.preventDefault();
  } //new delete

  <ModalWithForm
    title="New garment"
    buttonText="Add garment"
    isOpen={activeModal === "add-garment"}
    closeActiveModal={closeActiveModal}
  >
    <label htmlFor="name" className="modal__label" label="name">
      Name{" "}
    </label>
    <input type="text" className="modal__input" id="name" placeholder="Name" />
    <label htmlFor="link" className="modal__label" label="imageURL">
      Image{" "}
    </label>
    <input
      type="text"
      className="modal__input"
      id="link"
      placeholder="Image URL"
    />
    <fieldset className="modal__radio-buttons">
      <legend className="modal__legend">Select the weather type:</legend>
      <label htmlFor="hot" className="modal__label modal__label_type_radio">
        <input
          id="hot"
          type="radio"
          className="modal__radio-input"
          name="weather_item"
        />
        Hot
      </label>
      <label htmlFor="warm" className="modal__label modal__label_type_radio">
        <input
          id="warm"
          type="radio"
          className="modal__radio-input"
          name="weather_item"
        />
        Warm
      </label>
      <label htmlFor="cold" className="modal__label modal__label_type_radio">
        <input
          id="cold"
          type="radio"
          className="modal__radio-input"
          name="weather_item"
        />
        Cold
      </label>
    </fieldset>
  </ModalWithForm>;

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
                  clothingArray={defaultClothingItems} //setClothingItems
                />
              }
            />
            <Route
              path="/Profile"
              element={
                <Profile
                  handleCardClick={handleCardClick}
                  clothingArray={defaultClothingItems} //this is set correctly now
                />
              }
            />
          </Routes>
          <Footer />
        </div>

        <AddItemModal
          handleCloseModal={closeActiveModal}
          onAddNewItem={onAddNewItem}
          isOpen={activeModal === "add-garment"}
        />
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          closeActiveModal={closeActiveModal}
        />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
