import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../config/axios';
import { toast } from 'react-toastify';

const ResetPassword = ({ userType }) => {
  const { id } = useParams();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleResetPassword = async () => {
    try {
      const response = await axios.post(`/user/${userType}/forget-link/${id}`, { password });
      setMessage(response.data.message);
      toast.success('Password Reset Successfully', { position: 'bottom-center' });
    } catch (error) {
      setMessage('Error resetting password. Please try again.');
      console.error(error);
      toast.error('Error Resetting the password', { position: 'bottom-center' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-md shadow-md max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4">Reset Password</h2>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            New Password:
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600"
          onClick={handleResetPassword}
        >
          Reset Password
        </button>

        <p className="mt-4 text-red-500 text-sm">{message}</p>
      </div>
    </div>
  );
};

export default ResetPassword;
