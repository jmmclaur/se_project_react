import { CurrentUserContext } from "../../utils/contexts/CurrentUserContext";
import "./ItemModal.css";
import { useContext } from "react";

function ItemModal({ activeModal, card, closeActiveModal, handleDeleteItem }) {
  const handleDeleteClick = () => {
    handleDeleteItem(card._id);
  };
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;

  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button onClick={closeActiveModal} className="modal__close"></button>
        <img
          src={String(card?.imageUrl)}
          alt={card.name}
          className="modal__image"
        />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
          {isOwn && (
            <button
              type="button"
              className="modal__delete-btn"
              onClick={handleDeleteClick}
            >
              Delete Item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
