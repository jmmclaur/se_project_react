import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const LoginModal = ({
  activeModal,
  handleLogin,
  handleRegisterClick,
  onClose,
}) => {
  //set the email
  const [email, setEmail] = useState("");
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  //set the password
  const [password, setPassword] = useState("");
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(email, password);
  };

  return (
    <ModalWithForm
      title="Log In"
      buttonText="Log In"
      isOpen={activeModal === "log-in"}
      onClose={onClose}
      onSubmit={handleSubmit}
      linkText="or Sign Up"
      onLinkClick={handleRegisterClick}
      showLink={true}
    >
      <label className="modal__label">
        Email*{" "}
        <input
          type="email"
          className="modal__input"
          id="user_email"
          placeholder="Email"
          required
          value={email}
          onChange={handleEmailChange}
        />
      </label>
      <label className="modal__label">
        Password*{" "}
        <input
          type="password"
          className="modal__input"
          id="user_password"
          placeholder="Password"
          minLength="6"
          required
          value={password}
          onChange={handlePasswordChange}
        />
      </label>
    </ModalWithForm>
  );
};

export default LoginModal;
