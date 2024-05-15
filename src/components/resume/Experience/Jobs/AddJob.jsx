// AddEducation.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { asyncAddJob, asyncGetResume } from '../../../../store/Actions/resumeAction';
import { useNavigate } from 'react-router-dom';

const AddJob = ({ onClose }) => {
  const dispatch = useDispatch();
  const [company, setCompany] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [position, setPosition] = useState('');
  const [desc, setDesc] = useState('');



  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(asyncAddJob({ Company: company, From: from,To:to,Position:position,Desc:desc }));
      console.log('Job added successfully');
      await dispatch(asyncGetResume());
      setCompany('');
      setFrom('');
      setTo('');
      setPosition('');
      setDesc('');

      onClose();
    } catch (error) {
      console.error('Error adding job:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-gray-800 bg-opacity-75 absolute inset-0" onClick={onClose}></div>
      <div className="bg-white p-8 rounded-lg shadow-md z-10 w-96">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800">Add Job</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="company" className="text-lg text-gray-800 block mb-2">
              Company:
            </label>
            <input
              type="text"
              id="company"
              className="w-full p-3 border rounded focus:outline-none focus:border-blue-500"
              value={company}
              onChange={(e) => setCompany(e.target.value)} required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="from" className="text-lg text-gray-800 block mb-2">
              From:
            </label>
            <input
              type="date"
              id="from"
              className="w-full p-3 border rounded focus:outline-none focus:border-blue-500"
              value={from}
              onChange={(e) => setFrom(e.target.value)} required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="to" className="text-lg text-gray-800 block mb-2">
              To:
            </label>
            <input
              type="date"
              id="to"
              className="w-full p-3 border rounded focus:outline-none focus:border-blue-500"
              value={to}
              onChange={(e) => setTo(e.target.value)} required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="position" className="text-lg text-gray-800 block mb-2">
               Position:
            </label>
            <input
              type="text"
              id="position"
              className="w-full p-3 border rounded focus:outline-none focus:border-blue-500"
              value={position}
              onChange={(e) => setPosition(e.target.value)} required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="desc" className="text-lg text-gray-800 block mb-2">
               Description:
            </label>
            <input
              type="text"
              id="desc"
              className="w-full p-3 border rounded focus:outline-none focus:border-blue-500"
              value={desc}
              onChange={(e) => setDesc(e.target.value)} required
            />
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white p-3 rounded hover:bg-green-700 transition duration-300 focus:outline-none"
          >
            Add Job
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddJob;
