import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import AddEducationModal from "./AddEducationModal";
import EditEducationModal from "./EditEducationModal";
import { asyncDeleteEdu } from "../../../store/Actions/resumeAction";
import AvatarUpload from "./Avatarupload";

const Education = () => {
  const [isAvatarUploadOpen, setAvatarUploadOpen] = useState(false);

  const handleAvatarChange = () => {
    setAvatarUploadOpen(true);
  };
  const [isAddEducationModalOpen, setAddEducationModalOpen] = useState(false);
  const [isEditEducationModalOpen, setEditEducationModalOpen] = useState(false);
  const [editEducationIndex, setEditEducationIndex] = useState(null);

  const handleCloseAddEducationModal = () => {
    setAddEducationModalOpen(false);
  };

  const handleEditEducation = (index) => {
    setEditEducationIndex(index);
    setEditEducationModalOpen(true);
  };

  const handleCloseEditEducationModal = () => {
    setEditEducationIndex(null);
    setEditEducationModalOpen(false);
  };

  const { isAuth, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { education } = useSelector((state) => state.user.user.resume);

  const handleDeleteEducation = async (id, updatedData) => {
    try {
      await dispatch(asyncDeleteEdu(id, updatedData));
    } catch (error) {
      console.error("Error deleting education:", error);
    }
  };

  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
        {isAuth && user && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
              <div className="relative">
        {/* Avatar image */}
        <img
          src={user.avatar.url}
          alt={`${user.firstname}'s avatar`}
          className="w-16 h-16 overflow-hidden rounded-full object-cover cursor-pointer"
          onClick={handleAvatarChange}
        />

        {/* "Change Photo" overlay */}
        {isAvatarUploadOpen && <AvatarUpload onClose={() => setAvatarUploadOpen(false)} />}
      </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">{user.firstname} {user.lastname}</h2>
                  <p className="text-gray-600">{user.email}</p>
                  <p className="text-gray-600">{user.contact}</p>
                  <p className="text-gray-600">{user.city}</p>
                  <p className="text-gray-600">{user.gender}</p>
                </div>
              </div>
              <button
                onClick={() => navigate(`/edit-profile/${user._id}`)}
                className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300"
              >
                Edit Profile
              </button>
            </div>
          </div>
        )}

        <motion.div
          className="bg-white p-6 mb-6 flex flex-col justify-between shadow-lg rounded-md overflow-hidden"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">Education</h2>

          <div className="flex flex-col">
            {user.resume.education && user.resume.education.length > 0 ? (
              user.resume.education.map((edu, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 mb-6 flex flex-col justify-between shadow-lg rounded-md overflow-hidden"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div>
                    <p className="text-xl font-semibold text-gray-800">{edu.College}</p>
                    <p className="text-gray-500">CGPA: {edu.CGPA}</p>
                    <p className="text-gray-500">Course: {edu.Course}</p>
                    <p className="text-gray-500">Year: {edu.Year}</p>
                  </div>
                  <div className="flex space-x-4 mt-4">
                    <button
                      onClick={() => handleEditEducation(index)}
                      className="edit-btn bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
                    >
                      <FontAwesomeIcon icon={faEdit} className="mr-2" /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteEducation(edu.id, user.resume.education)}
                      className="delete-btn bg-red-500 text-white p-2 rounded hover:bg-red-700"
                    >
                      <FontAwesomeIcon icon={faTrash} className="mr-2" /> Delete
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-500">No education information available.</p>
            )}
          </div>

          <button
            onClick={() => setAddEducationModalOpen(true)}
            className="add-btn bg-green-500 text-white p-3 rounded hover:bg-green-700 transition duration-300 mt-6"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" /> Add Education
          </button>

          <AnimatePresence>
            {isAddEducationModalOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 flex items-center justify-center"
              >
                <div
                  className="bg-black bg-opacity-50 absolute inset-0"
                  onClick={handleCloseAddEducationModal}
                ></div>
                <motion.div
                  className="bg-white p-8 rounded-lg shadow-md z-10 w-96"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <AddEducationModal onClose={handleCloseAddEducationModal} />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {isEditEducationModalOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 flex items-center justify-center"
              >
                <div
                  className="bg-black bg-opacity-50 absolute inset-0"
                  onClick={handleCloseEditEducationModal}
                ></div>
                <motion.div
                  className="bg-white p-8 rounded-lg shadow-md z-10 w-96"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <EditEducationModal
                    onClose={handleCloseEditEducationModal}
                    index={editEducationIndex}
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Education;
