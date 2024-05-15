// Card.js
import React from 'react';

const Card = ({ title, profile, description, type, openings, duration, stipend, perks }) => {
  return (
    <div className="bg-white shadow-lg rounded-md overflow-hidden">
      <div className="bg-gray-700 text-white p-4">
        <h2 className="text-xl font-semibold mb-2">{title || 'Title not available'}</h2>
        <p className="text-sm">{profile || description || 'Profile/Description not available'}</p>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm text-gray-600">{type || 'Type not available'}</p>
          <p className="text-sm text-gray-600">Openings: {openings || 'N/A'}</p>
        </div>
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm text-gray-600">Duration: {duration || 'N/A'}</p>
          <p className="text-sm text-gray-600">
            Stipend: {stipend ? `${stipend} - ${stipend.amount}` : 'N/A'}
          </p>
        </div>
        <p className="text-sm text-gray-600">Perks: {perks || 'N/A'}</p>
      </div>
    </div>
  );
};

export default Card;
