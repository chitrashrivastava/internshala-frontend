// EditEducation.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { asyncEditEdu } from '../../../store/Actions/resumeAction';
import { asynccurrentUserStudent } from '../../../store/Actions/userAction';

const EditEducation = ({ onClose, index }) => {
  const dispatch = useDispatch();
  const userEducation = useSelector((state) => state.user.user.resume.education);

  const [editedEducation, setEditedEducation] = useState({});
  const selectedEducation = userEducation && userEducation[index];

  useEffect(() => {
    dispatch(asynccurrentUserStudent());
  }, [dispatch]);

  useEffect(() => {
    setEditedEducation((prev) => {
      if (selectedEducation && selectedEducation.id) {
        return { ...selectedEducation };
      }
      console.error('ID is missing in selectedEducation:', selectedEducation);
      return prev;
    });
  }, [selectedEducation]);

  useEffect(() => {
    setEditedEducation(selectedEducation ? { ...selectedEducation, id: selectedEducation.id } : {});
  }, [selectedEducation]);

  const handleSaveEducation = async (event) => {
    event.preventDefault();

    try {
      if (editedEducation.id) {
        await dispatch(asyncEditEdu(editedEducation.id, editedEducation));
        console.log('Education saved successfully');
        onClose();
      } else {
        console.error('Error editing education: ID is missing');
      }
    } catch (error) {
      console.error('Error editing education:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEducation((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-gray-800 bg-opacity-75 absolute inset-0" onClick={onClose}></div>
      <div className="bg-white p-8 rounded-lg shadow-md z-10 w-96">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800">Edit Education</h1>
        <form onSubmit={handleSaveEducation}>
          <div className="mb-4">
            <label htmlFor="college" className="text-lg text-gray-800">
              College:
            </label>
            <input
              type="text"
              id="college"
              name="College"
              className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
              value={editedEducation.College || ''}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="cgpa" className="text-lg text-gray-800">
              CGPA:
            </label>
            <input
              type="text"
              id="cgpa"
              name="CGPA"
              className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
              value={editedEducation.CGPA || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="course" className="text-lg text-gray-800">
              Course:
            </label>
            <input
              type="text"
              id="course"
              name="Course"
              className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
              value={editedEducation.Course || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="cgpa" className="text-lg text-gray-800">
              Year:
            </label>
            <input
              type="number"
              id="year"
              name="Year"
              className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
              value={editedEducation.Year || ''}
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
      </div>
    </div>
  );
};

export default EditEducation;
