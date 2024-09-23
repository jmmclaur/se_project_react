import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

function Profile({
  handleCardClick,
  handleAddClick,
  handleEditClick,
  defaultClothingItems,
  handleLogOut,
  setIsLoggedIn,
  isLoggedIn,
  onCardLike,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar
          handleEditClick={handleEditClick}
          setIsLoggedIn={setIsLoggedIn}
          handleLogOut={handleLogOut}
        />
      </section>
      <section className="profile__clothing-item">
        <ClothesSection
          handleCardClick={handleCardClick}
          handleAddClick={handleAddClick}
          defaultClothingItems={defaultClothingItems}
          isLoggedIn={isLoggedIn}
          onCardLike={onCardLike}
        />
      </section>
    </div>
  );
}

export default Profile;
