import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {
  const handleCardClick = () => {
    onCardClick(item);
  };
  return (
    <li className="card">
      <div className="card__name-container">
        <h2 className="card__name">{item.name}</h2>
      </div>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.link} //item.link to item.imageUrl
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;

//link pulls up the actual default image, but if I switch to imageUrl the picture is broken.
//Why?
