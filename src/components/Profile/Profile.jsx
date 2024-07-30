import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

function Profile({ handleCardClick, defaultClothingItems, handleAddClick }) {
  console.log("-----profile------");
  console.log(defaultClothingItems);
  console.log("-----profile------");
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
      </section>
      <section className="profile__clothing-item">
        <ClothesSection
          handleCardClick={handleCardClick}
          defaultClothingItems={defaultClothingItems} //this now matches app
          handleAddClick={handleAddClick}
        />
      </section>
    </div>
  );
}

export default Profile;
