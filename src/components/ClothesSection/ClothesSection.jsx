//import { defaultClothingItems } from "../../utils/constants";
import React from "react";
import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

function ClothesSection({
  handleCardClick,
  handleAddClick,
  defaultClothingItems,
}) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__buttons">
        <p>Your Items</p>
        <button
          onClick={handleAddClick}
          type="button"
          className="clothes-section__add-item-btn"
        >
          + Add New
        </button>
      </div>
      <ul className="clothes-section__items">
        {defaultClothingItems?.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onClick={() => handleCardClick(item)}
            />
          );
        })}
      </ul>
    </div>
  );
}
export default ClothesSection;

//changed item._id to item.id for new stuff 7/30
//also updated from onClick={handleCardClick} to the new above 7/30
//the button for this isn't working yet
//get a form to pull up for the +Add New button
