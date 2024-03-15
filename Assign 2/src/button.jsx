import React, { useState } from 'react';
import './Button.css'; // Assuming you have a corresponding CSS file for styling

const ReusableButton = ({ onClick, label }) => {
  const [isHovered, setHovered] = useState(false);
  const [isClicked, setClicked] = useState(false);

  return (
    <button
      className={`custom-button ${isHovered ? 'hovered' : ''} ${
        isClicked ? 'clicked' : ''
      }`}
      onClick={() => {
        setClicked(true);
        onClick && onClick();
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setClicked(false);
      }}
    >
      {label}
    </button>
  );
};

export default ReusableButton;
