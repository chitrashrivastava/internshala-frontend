import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { asyncEditResponsibility } from '../../../store/Actions/resumeAction';

const EditResponsibility = ({ onClose }) => {
  const { index } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userResponsibility = useSelector((state) => state.user.user.resume.responsibility);

  const [editedResponsibility, setEditedResponsibility] = useState('');
  const selectedResponsibility = userResponsibility && userResponsibility[index];

  useEffect(() => {
    setEditedResponsibility(selectedResponsibility || '');
  }, [selectedResponsibility]);

  const handleSaveResponsibility = async (event) => {
    event.preventDefault();

    try {
      if (editedResponsibility !== null && editedResponsibility !== undefined) {
        await dispatch(asyncEditResponsibility(editedResponsibility, index));
        console.log('Responsibility saved successfully');
        navigate('/student/edit-resume');
        onClose();
      } else {
        console.error('Error editing Responsibility:');
      }
    } catch (error) {
      console.error('Error editing Responsibility:', error);
    }
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setEditedResponsibility(value);
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
            <h1 className="text-3xl font-semibold mb-6 text-gray-800">Edit Responsibility</h1>
            <form onSubmit={handleSaveResponsibility}>
              <div className="mb-4">
                <label htmlFor="responsibility" className="text-lg text-gray-800">
                  Responsibility:
                </label>
                <input
                  type="text"
                  id="responsibility"
                  name="responsibility"
                  className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                  value={editedResponsibility || ''}
                  onChange={handleInputChange}
                />
              </div>

              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 focus:outline-none"
              >
                Save Changes
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EditResponsibility;
