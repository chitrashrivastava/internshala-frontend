import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { asyncAddAchievement, asyncGetResume } from '../../../store/Actions/resumeAction';
import { useNavigate } from 'react-router-dom';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';
import { motion } from 'framer-motion';

const AddAchievement = ({ onClose }) => {
  const dispatch = useDispatch();
  const [achievement, setAchievement] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(asyncAddAchievement( achievement ));
      console.log('Project added successfully');
      await dispatch(asyncGetResume());
      clearForm();
      onClose();
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  const clearForm = () => {
    setAchievement('');
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { scale: 0 },
    visible: { scale: 1 },
  };

  return (
    <motion.div
      variants={fadeInVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 w-full"
      onClick={() => onClose()}
    >
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="bg-white p-8 rounded-lg shadow-md w-[50%] h-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-3xl font-semibold mb-6 text-gray-800">Add Achievement</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label htmlFor="achievement" className="text-lg text-gray-800 block mb-2">
              Achievement:
            </label>
            <input
              type="text"
              id="achievement"
              className="w-full p-3 border rounded-md focus:outline-none focus:border-blue-500"
              value={achievement}
              onChange={(e) => setAchievement(e.target.value)}
              required
            />
          </div>


          <div className="flex justify-end">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-green-500 text-white p-3 rounded-md hover:bg-green-700 transition duration-300 focus:outline-none"
            >
              Add Achievement
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AddAchievement;
