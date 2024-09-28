import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ handleCloseModal, onAddNewItem, activeModal }) => {
  const [name, setName] = useState("");
  const [imageUrl, setUrl] = useState("");
  const [weather, setWeather] = useState("");
  const handleNameChange = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
  };

  const handleUrlChange = (e) => {
    console.log(e.target.value);
    setUrl(e.target.value);
  };

  const handleWeatherChange = (e) => {
    console.log(e.target.value);
    setWeather(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onAddNewItem({ name, imageUrl, weather });
  };

  const resetCurrentForm = () => {
    resetForm({ name: "", imageUrl: "", weather: "" });
  };

  return (
    <ModalWithForm
      title="New Garment"
      buttonText="Add Garment"
      isOpen={activeModal === "add-garment"}
      closeActiveModal={handleCloseModal}
      onSubmit={onSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          minLength="1"
          maxLength="30"
          value={name}
          onChange={handleNameChange}
        />
      </label>
      <label htmlFor="link" className="modal__label">
        Image{" "}
        <input
          type="text"
          className="modal__input"
          id="link"
          placeholder="Image URL"
          value={imageUrl}
          onChange={handleUrlChange}
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          {" "}
          <input
            id="hot"
            type="radio"
            value="hot"
            className="modal__radio-input"
            onChange={handleWeatherChange}
            name="weather_item"
          />
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            id="warm"
            type="radio"
            value="warm"
            className="modal__radio-input"
            onChange={handleWeatherChange}
            name="weather_item"
          />
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            id="cold"
            type="radio"
            value="cold"
            className="modal__radio-input"
            onChange={handleWeatherChange}
            name="weather_item"
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
