import React, { useState } from "react";
import "./Modal.css";

const Modal = ({ setIsOpen, rowData, onSave }) => {
  const [place, setPlace] = useState(rowData[0]);
  const [vnr, setVnr] = useState(rowData[1]);
  const [currentDate, setCurrentDate] = useState(rowData[2]);
  const [buffer, setBuffer] = useState(rowData[3]);

  const handleSave = () => {
    const updatedRow = [place, vnr, currentDate, buffer];
    onSave(updatedRow);
    setIsOpen(false);
  };

  return (
    <>
      <div className="darkBG" onClick={() => setIsOpen(false)} />
      <div className="centered">
        <div className="modal">
          <button className="closeBtn" onClick={() => setIsOpen(false)}>
            <i className="bx bx-window-close" style={{ fontSize: "30px" }}></i>
          </button>
          <div className="modalContent">
            <div className="inputContainer">
              <label className="inputLabel">Plats</label>
              <input
                type="text"
                className="textInput"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
              />
            </div>
            <div className="inputContainer">
              <label className="inputLabel">Varunummer (VNR)</label>
              <input
                type="text"
                className="textInput"
                value={vnr}
                onChange={(e) => setVnr(e.target.value)}
              />
            </div>
            <div className="inputContainer">
              <label className="inputLabel">Nuvarande Datum</label>
              <input
                type="text"
                className="textInput"
                value={currentDate}
                onChange={(e) => setCurrentDate(e.target.value)}
              />
            </div>
            <div className="inputContainer">
              <label className="inputLabel">Buffert</label>
              <input
                type="text"
                className="textInput"
                value={buffer}
                onChange={(e) => setBuffer(e.target.value)}
              />
            </div>
          </div>
          <div className="modalActions">
            <div className="actionsContainer">
              <button className="saveBtn" onClick={handleSave}>
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