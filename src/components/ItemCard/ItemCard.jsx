import "./ItemCard.css";

function ItemCard({ item, onClick }) {
  console.log(item);

  return (
    <li className="card">
      <div className="card__name-container">
        <h2 className="card__name">{item.name}</h2>
      </div>
      <img
        onClick={onClick}
        className="card__image"
        src={item.link}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;

//link pulls up the actual default image, but if I switch to imageUrl the picture is broken.
//Why?
