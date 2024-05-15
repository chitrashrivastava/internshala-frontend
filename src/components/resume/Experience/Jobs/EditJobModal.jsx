// EditJobModal.jsx
import React from 'react';
import EditJob from './EditJob';

const EditJobModal = ({ onClose, index }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-gray-800 bg-opacity-75 absolute inset-0" onClick={onClose}></div>
      <div className="bg-white p-8 rounded-lg shadow-md z-10">
        <EditJob onClose={onClose} index={index} />
      </div>
    </div>
  );
};

export default EditJobModal;
