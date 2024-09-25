import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

const Profile = ({
  name,
  avatar,
  handleCardClick,
  handleAddClick,
  handleEditClick,
  defaultClothingItems,
  handleLogOut,
  setIsLoggedIn,
  isLoggedIn,
  onCardLike,
}) => {
  console.log("Profile Props - Name: ", name);
  console.log("Profile Props - Avatar: ", avatar);
  if (!name || !avatar) {
    console.log("Missing props - Name or Avatar is undefined");
  }

  return (
    <div>
      <h1>Welcome, {name || "User"}</h1>
      {avatar ? (
        <img src={avatar} alt="User Avatar" />
      ) : (
        <div>No Avatar Available</div>
      )}
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
    </div>
  );
};

export default Profile;
