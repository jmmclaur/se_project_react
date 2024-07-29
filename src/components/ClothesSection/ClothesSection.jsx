//import Sidebar from "../SideBar/SideBar";
import { defaultClothingItems } from "../../utils/constants";
import React from "react";
import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

function ClothesSection({ handleCardClick, defaultClothingItems }) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__buttons">
        <p>Your Items</p>
        <button
          onClick={handleCardClick}
          type="button"
          className="clothes-section__add-item-btn"
        >
          + Add New
        </button>
      </div>
      <ul className="clothes-section__items">
        {defaultClothingItems?.map((item) => {
          return (
            <ItemCard key={item._id} item={item} onClick={handleCardClick} />
          );
        })}
      </ul>
    </div>
  );
}
export default ClothesSection;
