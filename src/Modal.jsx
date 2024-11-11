import React from "react";
import "./Modal.css";

const Modal = ({ setIsOpen }) => {
  return (
    <>
      <div className="darkBG" onClick={() => setIsOpen(false)} />
      <div className="centered">
        <div className="modal">
          <button className="closeBtn" onClick={() => setIsOpen(false)}>
            <i className="bx bx-window-close" style={{ fontSize: "30px" }}></i>
          </button>
          <div className="modalContent">
            {/* Input fields */}
            <div className="inputContainer">
              <label className="inputLabel">Plats</label>
              <input type="text" className="textInput" />
            </div>
            <div className="inputContainer">
              <label className="inputLabel">Varunummer (VNR)</label>
              <input type="text" className="textInput" />
            </div>
            <div className="inputContainer">
              <label className="inputLabel">Nuvarande Datum</label>
              <input type="text" className="textInput" />
            </div>
            <div className="inputContainer">
              <label className="inputLabel">Buffert</label>
              <input type="text" className="textInput" />
            </div>
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
