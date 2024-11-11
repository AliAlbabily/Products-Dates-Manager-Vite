import React from "react";
import "./Modal.css";

const Modal = ({ setIsOpen }) => {
  return (
    <>
      <div className="darkBG" onClick={() => setIsOpen(false)} />
      <div className="centered">
        <div className="modal">
          <div className="modalHeader">
            <h5 className="heading">Redigera datan</h5>
          </div>
          <button className="closeBtn" onClick={() => setIsOpen(false)}>
            <i className="bx bx-window-close" style={{ fontSize: "30px" }}></i>
          </button>
          <div className="modalContent">
            Är du säker att du vill spara ändringarna?
          </div>
          <div className="modalActions">
            <div className="actionsContainer">
              <button className="saveBtn" onClick={() => setIsOpen(false)}>
                Spara
              </button>
              <button className="cancelBtn" onClick={() => setIsOpen(false)}>
                Avbryt
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
