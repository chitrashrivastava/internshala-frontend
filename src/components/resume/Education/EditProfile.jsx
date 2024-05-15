// EditProfile.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncUpdateStudent, asynccurrentUserStudent } from '../../../store/Actions/userAction';
import { toast } from 'react-toastify';
const EditProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    firstname: user?.firstname,
    lastname: user?.lastname,
    email: user?.email,
    contact: user?.contact,
    city: user?.city,
    gender: user?.gender,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdateClick = async () => {
    try {
      const updatedData = await dispatch(asyncUpdateStudent(formData, user._id));
      console.log('Updated Student Data:', updatedData);
      
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800">Edit Profile</h1>

        <div className="grid grid-cols-1 gap-4">
          <InputField
            label="First Name"
            name="firstname"
            value={formData?.firstname}
            onChange={handleInputChange}
          />
          <InputField
            label="Last Name"
            name="lastname"
            value={formData?.lastname}
            onChange={handleInputChange}
          />
          <InputField label="Email" name="email" value={formData.email} onChange={handleInputChange} />
          <InputField
            label="Contact"
            name="contact"
            value={formData?.contact}
            onChange={handleInputChange}
          />
          <InputField label="City" name="city" value={formData.city} onChange={handleInputChange} />
          <InputField
            label="Gender"
            name="gender"
            value={formData?.gender}
            onChange={handleInputChange}
          />
        </div>

        <button
          onClick={handleUpdateClick}
          className="bg-blue-500 text-white py-2 px-4 rounded mt-6 hover:bg-blue-700 transition duration-300"
        >
          Update
        </button>
      </div>
    </div>
  );
};

const InputField = ({ label, name, value, onChange }) => (
  <div>
    <label className="text-gray-600 mb-1 block">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={`Enter your ${label.toLowerCase()}`}
      className="input-field"
    />
  </div>
);

export default EditProfile;
