import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { asyncAddEdu, asyncGetResume } from '../../../store/Actions/resumeAction';
import { useNavigate } from 'react-router-dom';

const AddEducation = ({ onClose }) => {
  const dispatch = useDispatch();
  const [college, setCollege] = useState('');
  const [cgpa, setCGPA] = useState('');
  const [course, setCourse] = useState('');
  const [year, setYear] = useState('');


  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(asyncAddEdu({ College: college, CGPA: cgpa,Course:course,Year:year }));
      console.log('Education added successfully');
      await dispatch(asyncGetResume());
      setCollege('');
      setCGPA('');
      onClose();
    } catch (error) {
      console.error('Error adding education:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-gray-800 bg-opacity-75 absolute inset-0" onClick={onClose}></div>
      <div className="bg-white p-8 rounded-lg shadow-md z-10 w-96">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800">Add Education</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="college" className="text-lg text-gray-800 block mb-2">
              College:
            </label>
            <input
              type="text"
              id="college"
              className="w-full p-3 border rounded focus:outline-none focus:border-blue-500"
              value={college}
              onChange={(e) => setCollege(e.target.value)} required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="cgpa" className="text-lg text-gray-800 block mb-2">
              CGPA:
            </label>
            <input
              type="number"
              id="cgpa"
              className="w-full p-3 border rounded focus:outline-none focus:border-blue-500"
              value={cgpa}
              onChange={(e) => setCGPA(e.target.value)} required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="course" className="text-lg text-gray-800 block mb-2">
              Course:
            </label>
            <input
              type="text"
              id="course"
              className="w-full p-3 border rounded focus:outline-none focus:border-blue-500"
              value={course}
              onChange={(e) => setCourse(e.target.value)} required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="year" className="text-lg text-gray-800 block mb-2">
              Passout Year:
            </label>
            <input
              type="number"
              id="year"
              className="w-full p-3 border rounded focus:outline-none focus:border-blue-500"
              value={year}
              onChange={(e) => setYear(e.target.value)} required
            />
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white p-3 rounded hover:bg-green-700 transition duration-300 focus:outline-none"
          >
            Add Education
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEducation;
