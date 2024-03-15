// Card.js
import React, { useState } from 'react';
import Button from './Button';

const Card = ({ title, description, imageUrl, buttonText, onButtonClick }) => {
  const [showMore, setShowMore] = useState(false);


  const handleButtonClick = () => {
    setShowMore(!showMore);
    if (onButtonClick) {
      onButtonClick();
    }
  };

  return (
    
    <div
      className="card"
      style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        width: '300px',
        margin: '20px',
      }}
    >
      <img
        src={imageUrl}
        alt={title}
        style={{
          width: '100%',
          height: '200px',
          objectFit: 'cover',
          borderRadius: '8px 8px 0 0',
        }}
      />
        
      <div style={{ padding: '16px' }}>
        <h2 style={{ marginBottom: '8px', fontSize: '25px' }}>{title}</h2>
        <p style={{ marginBottom: '16px' }}>{description}</p>
        {showMore && (
          <div style={{ marginBottom: '16px' }}>
            <p>These birds can reach a high heights and they are unique, making them some of the larger members of their family..</p>
          </div>
        )}
        <Button onClick={handleButtonClick} label={showMore ? 'Show Less' : 'Show More'} />
      </div>
   </div>
 
  );
};

export default Card;



