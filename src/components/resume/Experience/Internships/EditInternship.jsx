// EditEducation.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { asynccurrentUserStudent } from '../../../../store/Actions/userAction';
import { asyncEditInternship } from '../../../../store/Actions/resumeAction';

const EditInternship = ({ onClose, index }) => {
  const dispatch = useDispatch();
  const userInternship = useSelector((state) => state.user.user.resume.internships);

  const [editedInternship, setEditedInternship] = useState({});
  const selectedInternship = userInternship && userInternship[index];

  useEffect(() => {
    dispatch(asynccurrentUserStudent());
  }, [dispatch]);

  useEffect(() => {
    setEditedInternship((prev) => {
      if (selectedInternship && selectedInternship.id) {
        return { ...selectedInternship };
      }
      console.error('ID is missing in selectedInternship:', selectedInternship);
      return prev;
    });
  }, [selectedInternship]);

  useEffect(() => {
    setEditedInternship(selectedInternship ? { ...selectedInternship, id: selectedInternship.id } : {});
  }, [selectedInternship]);

  const handleSaveInternship = async (event) => {
    event.preventDefault();

    try {
      if (editedInternship.id) {
        await dispatch(asyncEditInternship(editedInternship.id, editedInternship));
        console.log('Internship saved successfully');
        onClose();
      } else {
        console.error('Error editing Internship: ID is missing');
      }
    } catch (error) {
      console.error('Error editing Internship:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedInternship((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-gray-800 bg-opacity-75 absolute inset-0" onClick={onClose}></div>
      <div className="bg-white p-8 rounded-lg shadow-md z-10 w-96">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800">Edit Internship</h1>
        <form onSubmit={handleSaveInternship}>
          <div className="mb-4">
            <label htmlFor="college" className="text-lg text-gray-800">
              Company:
            </label>
            <input
              type="text"
              id="company"
              name="Company"
              className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
              value={editedInternship.Company || ''}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="cgpa" className="text-lg text-gray-800">
              Position:
            </label>
            <input
              type="text"
              id="position"
              name="Position"
              className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
              value={editedInternship.Position || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="from" className="text-lg text-gray-800">
              From:
            </label>
            <input
              type="date"
              id="from"
              name="From"
              className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
              value={editedInternship.From || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="to" className="text-lg text-gray-800">
              To:
            </label>
            <input
              type="date"
              id="to"
              name="To"
              className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
              value={editedInternship.To || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="to" className="text-lg text-gray-800">
              Description:
            </label>
            <input
              type="text"
              id="desc"
              name="Desc"
              className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
              value={editedInternship.Desc || ''}
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

export default EditInternship;
