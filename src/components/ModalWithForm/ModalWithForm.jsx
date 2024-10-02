import "./ModalWithForm.css";

function ModalWithForm({
  children,
  title,
  buttonText,
  isOpen,
  closeActiveModal,
  onSubmit,
  showLink,
  linkText,
  onLinkClick,
  onClose,
}) {
  return (
    <div className={isOpen ? `modal modal_opened` : `modal_closed`}>
      <div className="modal__container modal__content_type_form">
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} className="modal__closer"></button>
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
          <div className="modal__actions">
            <button type="submit" className="modal__submit">
              {buttonText}
            </button>
            {showLink && (
              <span onClick={onLinkClick} className="modal__link">
                {linkText}
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
//try onClose instead of onClick

//submit should work now, was missing onSubmit before. Let's give it a try
