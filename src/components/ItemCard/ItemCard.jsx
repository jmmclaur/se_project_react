import React, { useContext } from "react";
import { CurrentUserContext } from "../../utils/contexts/CurrentUserContext";
import likeActive from "../../assets/like-active.svg";
import likeInactive from "../../assets/like-inactive.svg";
import "./ItemCard.css";

function ItemCard({ item, onCardLike, onCardClick }) {
  const currentUser = useContext(CurrentUserContext);
  const card = item;
  const isLiked =
    card.isLiked && item.likes.some((id) => id === currentUser._id);

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLikeClick = () => {
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

//item.link makes the default cards show but nothing in the logged in one
//item.imageUrl breaks the default cards but the user items show
export default ItemCard;
