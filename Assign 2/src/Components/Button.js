// Button.js
import React from 'react';

const Button = ({ onClick, label }) => {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '10px 20px',
        color: 'white',
        background:'rgb(231, 2, 36)',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
      }}
    >
    
      {label}
    </button>
  );
};

export default Button;

