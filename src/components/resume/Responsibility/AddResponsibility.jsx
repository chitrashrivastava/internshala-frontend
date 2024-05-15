import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { asyncAddResponsibility, asyncGetResume } from '../../../store/Actions/resumeAction';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const AddResponsibility = ({ onClose }) => {
  const dispatch = useDispatch();
  const [responsibility, setResponsibility] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(asyncAddResponsibility(responsibility));
      console.log('Responsibility added successfully');
      await dispatch(asyncGetResume());
      setResponsibility('');
      onClose(); // Close the modal
    } catch (error) {
      console.error('Error adding responsibility:', error);
    }
  };

  return (
    <AnimatePresence>
      {onClose && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-gray-800 bg-opacity-75 absolute inset-0"
            onClick={onClose}
          ></motion.div>
          <motion.div
            className="bg-white p-8 rounded-lg shadow-md z-10 w-96"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
          >
            <h1 className="text-3xl font-semibold mb-6 text-gray-800">Add Responsibility</h1>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="responsibility" className="text-lg text-gray-800 block mb-2">
                  Responsibility:
                </label>
                <input
                  type="text"
                  id="responsibility"
                  className="w-full p-3 border rounded focus:outline-none focus:border-blue-500"
                  value={responsibility}
                  onChange={(e) => setResponsibility(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-green-500 text-white p-3 rounded hover:bg-green-700 transition duration-300 focus:outline-none"
              >
                Add Responsibility
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddResponsibility;
