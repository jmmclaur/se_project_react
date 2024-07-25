import Sidebar from "../SideBar/SideBar";
import { defaultClothingItems } from "../../utils/constants";
import React from "react";
import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

const ClothesSection = ({ handleCardClick, defaultClothingItems }) => {
  return (
    <div className="clothes-section">
      <div className="clothes-section__buttons">
        <p>Your Items</p>
        <button className="clothes-section__add-item-btn">+ Add New</button>
      </div>
      <ul className="clothes-section__items">
        {defaultClothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
            />
          );
        })}
      </ul>
    </div>
  );
};
export default ClothesSection;

/* new attempt, no
import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection() {
  return (
    <div className="clothes-section">
      <div className="clothes-section-items">
        <p>Your Items</p>
        <button> Add New</button>
      </div>
      <ul className="clothes-section_item">
        {defaultClothingItems.map((item) => {
          return <ItemCard key={item._id} item={item} />;
        })}
      </ul>
    </div>
  );
}

export default ClothesSection; */