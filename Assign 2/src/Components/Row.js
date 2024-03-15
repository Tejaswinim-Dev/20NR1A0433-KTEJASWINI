// Row.js

import React from 'react';
import Card from './Components/Card';

const Row = ({ cards }) => {
  return (
    <div className="row">
      {cards.map((card, index) => (
        <Card key={index} title={card.title} content={card.content} />
      ))}
    </div>
  );
};

export default Row;
