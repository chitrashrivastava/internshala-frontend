// ForgotPassword.js

import React, { useState } from 'react';
import axios from '../../config/axios';
import {toast} from 'react-toastify'
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState('student'); // Default user type is student

  const sendStudentResetLink = async() => {
    console.log(`Reset link sent to ${email} for Student/TNP Head`);
    try {
    const response = await axios.post('/user/student/send-mail',  {email} );
        console.log(response)
        toast.success(
            "Reset link sent to your email. Please check your email.",{ position: 'top-center' }
        )
    } catch (error) {
        console.log(error)
        toast.error('Email not found!', { position: 'top-center' });
    }
  };

  const sendEmployerResetLink = async() => {
  try {
    console.log(`Reset link sent to ${email} for Employer`);
    const response = await axios.post('/user/employee/send-mail', {email} );
    console.log(response);
  } catch (error) {
    console.log(error)
    toast.error('Email not found', { position: 'top-center' });
    
  }
  };

  const handleReset = () => {
    
    if (userType === 'student') {
      sendStudentResetLink();
    } else if (userType === 'employer') {
      sendEmployerResetLink();
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md w-full bg-white p-8 shadow-md rounded-md">
        <h2 className="text-2xl font-semibold mb-4">Forgot Password</h2>
        <p className="text-gray-600 mb-6">
          Please select your user type and enter your email address. You will receive an email with a link to reset your password.
        </p>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">You are</label>
          <div>
            <label className="mr-4">
              <input
                type="radio"
                value="student"
                checked={userType === 'student'}
                onChange={() => setUserType('student')}
              />
              Student/TNP Head
            </label>
            <label>
              <input
                type="radio"
                value="employer"
                checked={userType === 'employer'}
                onChange={() => setUserType('employer')}
              />
              Employer
            </label>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {email === '' && <p className="text-red-500 text-xs mt-1">This field is required</p>}
        </div>

        <button
          className="w-full mt-6 bg-green-500 text-white p-3 rounded-md hover:bg-green-600"
          onClick={handleReset}
        >
          Submit
        </button>

        <p className="text-sm mt-4 text-gray-600">
          I am not receiving the password reset email. Need help?
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
