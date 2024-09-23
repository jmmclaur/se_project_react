import React, { useState, useEffect, useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { CurrentUserContext } from "../../utils/contexts/CurrentUserContext";

const EditPofileModal = ({
  closeActiveModal,
  activeModal,
  handleEditProfile,
}) => {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState(currentUser?.name || "");
  const handleNameChange = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
  };

  const [avatar, setAvatar] = useState(currentUser?.avatar || "");
  const handleAvatarChange = (e) => {
    console.log(e.target.value);
    setAvatar(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEditProfile(name, avatar);
    console.log("Changes saved.");
  };

  useEffect(() => {
    if (activeModal === "edit-profile" && currentUser) {
      setName(currentUser.name || "");
      setAvatar(currentUser.avatar || "");
    }
  }, [activeModal, currentUser]);

  return (
    <ModalWithForm
      title="Change profile data"
      buttonText="Save changes"
      isOpen={activeModal === "edit-profile"}
      onClose={closeActiveModal}
      onSubmit={handleSubmit}
    >
      <label htmlFor="editName" className="modal__label">
        Name*{" "}
        <input
          type="text"
          className="modal__input"
          id="editName"
          placeholder="Name"
          minLength="2"
          maxLength="30"
          required
          value={name}
          onChange={handleNameChange}
        />
      </label>
      <label htmlFor="editAvatar" className="modal__label">
        Avatar*{" "}
        <input
          type="url"
          className="modal__input"
          id="editAvatar"
          placeholder="Avatar URL"
          required
          value={avatar}
          onChange={handleAvatarChange}
        />
      </label>
    </ModalWithForm>
  );
};

export default EditPofileModal;
