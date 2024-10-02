import React, { useContext } from "react";
import { CurrentUserContext } from "../../utils/contexts/CurrentUserContext";
import likeActive from "../../assets/like-active.svg";
import likeInactive from "../../assets/like-inactive.svg";
import "./ItemCard.css";

function ItemCard({ item, onCardLike, onCardClick }) {
  const currentUser = useContext(CurrentUserContext); //wrapping currentUser in {} made the like button disappear?
  /*new
  if (!currentUser) {
    return null;
  } */
  const isLiked = item.likes?.some((id) => id === currentUser?._id);
  //console.log(isLiked);
  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLikeClick = () => {
    console.log("Item ID:", item._id); // Add this line
    console.log("Current User ID:", currentUser?._id); // Add this line
    onCardLike({ _id: item._id, isLiked });
  };

  return (
    <li className="card">
      <div className="card__name-container">
        <h2 className="card__name">{item.name}</h2>
        {currentUser?._id && (
          <img
            src={isLiked ? likeActive : likeInactive}
            alt="card like"
            className="card__like-btn"
            onClick={handleLikeClick}
          />
        )}
      </div>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item?.imageUrl}
        alt={item?.name}
      />
    </li>
  );
}

export default ItemCard;
