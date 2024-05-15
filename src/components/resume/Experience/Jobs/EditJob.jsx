// EditEducation.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { asynccurrentUserStudent } from '../../../../store/Actions/userAction';
import { asyncEditjob } from '../../../../store/Actions/resumeAction';

const EditJob = ({ onClose, index }) => {
  const dispatch = useDispatch();
  const userJob = useSelector((state) => state.user.user.resume.jobs);

  const [editedJob, setEditedJob] = useState({});
  const selectedJob = userJob && userJob[index];

  useEffect(() => {
    dispatch(asynccurrentUserStudent());
  }, [dispatch]);

  useEffect(() => {
    setEditedJob((prev) => {
      if (selectedJob && selectedJob.id) {
        return { ...selectedJob };
      }
      console.error('ID is missing in selectedJob:', selectedJob);
      return prev;
    });
  }, [selectedJob]);

  useEffect(() => {
    setEditedJob(selectedJob ? { ...selectedJob, id: selectedJob.id } : {});
  }, [selectedJob]);

  const handleSaveJob = async (event) => {
    event.preventDefault();

    try {
      if (editedJob.id) {
        await dispatch(asyncEditjob(editedJob.id, editedJob));
        console.log('Job saved successfully');
        onClose();
      } else {
        console.error('Error editing job: ID is missing');
      }
    } catch (error) {
      console.error('Error editing job:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedJob((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-gray-800 bg-opacity-75 absolute inset-0" onClick={onClose}></div>
      <div className="bg-white p-8 rounded-lg shadow-md z-10 w-96">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800">Edit Job</h1>
        <form onSubmit={handleSaveJob}>
          <div className="mb-4">
            <label htmlFor="college" className="text-lg text-gray-800">
              Company:
            </label>
            <input
              type="text"
              id="company"
              name="Company"
              className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
              value={editedJob.Company || ''}
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
              value={editedJob.Position || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="from" className="text-lg text-gray-800">
              From:
            </label>
            <input
              type="number"
              id="from"
              name="From"
              className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
              value={editedJob.From || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="to" className="text-lg text-gray-800">
              To:
            </label>
            <input
              type="number"
              id="to"
              name="To"
              className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
              value={editedJob.To || ''}
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
              value={editedJob.Desc || ''}
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

export default EditJob;
