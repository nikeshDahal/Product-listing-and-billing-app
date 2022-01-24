import React from "react";
import "./App.css";
const Particular = ({ title, price, serialNumber, onRemove, onEdit, id }) => {
  return (
    <div className="record">
      <div className="serial-number">
        <span>[{serialNumber}]</span>
      </div>

      <div className="record-name">
        <span>{title}</span>
      </div>

      <div className="record-price">
        <span>{price}</span>
      </div>

      <button
        className="edit-button"
        //  onClick={() => addNewRecord()}
        onClick={(e) => {
          console.log("clicked");
          onEdit(e, title, price, id);
        }}
      >
        <span>Edit</span>
      </button>
      <button className="delete-button" onClick={(e) => onRemove(e, title)}>
        <span>Delete</span>
      </button>
    </div>
  );
};
export default Particular;
