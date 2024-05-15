// AddSkills.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { asyncAddSkills, asyncGetResume } from '../../../store/Actions/resumeAction';
import { useNavigate } from 'react-router-dom';

const AddSkills = ({ onClose }) => {
  const dispatch = useDispatch();
  const [skills, setSkills] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(asyncAddSkills(skills));
      console.log('Skill added successfully');
      await dispatch(asyncGetResume());
      setSkills('');
      onClose(); // Close the modal
    } catch (error) {
      console.error('Error adding skills:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-gray-800 bg-opacity-75 absolute inset-0" onClick={onClose}></div>
      <div className="bg-white p-8 rounded-lg shadow-md z-10 w-96">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800">Add Skill</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="skills" className="text-lg text-gray-800 block mb-2">
              Skill:
            </label>
            <input
              type="text"
              id="skill"
              className="w-full p-3 border rounded focus:outline-none focus:border-blue-500"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white p-3 rounded hover:bg-green-700 transition duration-300 focus:outline-none"
          >
            Add Skill
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSkills;
