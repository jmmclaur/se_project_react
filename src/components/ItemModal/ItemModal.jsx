import "./ItemModal.css";

function ItemModal({ activeModal, card, closeActiveModal, handleDelete }) {
  console.log("item modal");
  console.log(card);
  const handleDeleteCard = () => {
    handleDelete(card._id);
  };
  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button onClick={closeActiveModal} className="modal__close"></button>
        <img
          src={String(card?.link)}
          alt={card.name}
          className="modal__image"
        />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
          <button
            type="button"
            className="modal__delete-btn"
            onClick={() => handleDelete(card?._id)}
          >
            Delete Item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
//try onClose instead of onClick, nope onclick actually closes it

//modal__close is still showing gray instead of white, is visibility hidden?

//change link to imageUrl?
