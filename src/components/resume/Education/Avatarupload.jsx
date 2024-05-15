// AvatarUpload.jsx
import React, { useState } from "react";
import { asyncUploadAvatar } from "../../../store/Actions/resumeAction";
import { useDispatch, useSelector } from "react-redux";

const AvatarUpload = ({ onClose }) => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const  {_id}  = useSelector((state) => state.user.user);
  console.log(_id)
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    console.log( e.target.elements.avatar.files[0])
    formData.append('avatar',e.target.elements.avatar.files[0]);

    dispatch(asyncUploadAvatar(_id, formData));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
        {/* Avatar upload form */}
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Change Photo</h2>
          <label htmlFor="avatar" className="block mb-2">
            Choose a new avatar:
          </label>
          <input type="file" id="avatar" name="avatar" accept=".jpg,.jpeg,.png" className="mb-4" />
          <button
            type="submit"
            className="bg-green-500 text-white p-2 rounded hover:bg-green-700 transition duration-300"
          >
            Upload New Avatar
          </button>
        </form>

        {/* Close button */}
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white p-2 rounded hover:bg-red-700 transition duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AvatarUpload;
