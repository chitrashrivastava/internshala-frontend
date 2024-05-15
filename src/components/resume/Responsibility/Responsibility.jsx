import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import AddResponsibilityModal from "./AddResponsibilityModal";
import EditResponsibilityModal from "./EditResponsibilityModal";

import { asyncDeleteResponsibility } from "../../../store/Actions/resumeAction";

const Responsibility = () => {
  const navigate = useNavigate();

  const [isAddResponsibilityModalOpen, setAddResponsibilityModalOpen] = useState(false);
  const [isEditResponsibilityModalOpen, setEditResponsibilityModalOpen] = useState(false);
  const [editResponsibilityIndex, setEditResponsibilityIndex] = useState(null);

  const handleCloseAddResponsibilityModal = () => {
    setAddResponsibilityModalOpen(false);
  };

  const handleEditResponsibility = (index) => {
    setEditResponsibilityIndex(index);
    setEditResponsibilityModalOpen(true);
    navigate(`/student/edit-resume/responsibility/edit/${index}`);
  };

  const handleCloseEditResponsibilityModal = () => {
    setEditResponsibilityIndex(null);
    setEditResponsibilityModalOpen(false);
  };

  const { isAuth, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { responsibility } = useSelector((state) => state.user.user.resume);

  const handleDeleteResponsibility = async (index, updatedData) => {
    try {
      await dispatch(asyncDeleteResponsibility(index, updatedData));
      navigate('/student/edit-resume');
    } catch (error) {
      console.error("Error deleting Responsibility:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <motion.div
        className="bg-white p-6 mb-6 flex flex-col justify-between shadow-lg rounded-md overflow-hidden"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
      >
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">Responsibilities</h2>

        <div className="flex flex-col">
          {user.resume.responsibility && user.resume.responsibility.length > 0 ? (
            user.resume.responsibility.map((responsibility, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 mb-6 flex flex-col justify-between shadow-lg rounded-md overflow-hidden"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div>
                  <p className="text-xl font-semibold text-gray-800">{responsibility}</p>
                </div>
                <div className="flex space-x-4 mt-4">
                  <button
                    onClick={() => handleEditResponsibility(index)}
                    className="edit-btn bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
                  >
                    <FontAwesomeIcon icon={faEdit} className="mr-2" /> Edit
                  </button>
                  <button
                    onClick={() =>
                      handleDeleteResponsibility(index, user.resume.responsibility)
                    }
                    className="delete-btn bg-red-500 text-white p-2 rounded hover:bg-red-700"
                  >
                    <FontAwesomeIcon icon={faTrash} className="mr-2" /> Delete
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-500">No responsibility information available.</p>
          )}
        </div>

        <button
          onClick={() => setAddResponsibilityModalOpen(true)}
          className="add-btn bg-green-500 text-white p-3 rounded hover:bg-green-700 transition duration-300 mt-6"
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" /> Add Responsibility
        </button>

        <AnimatePresence>
          {isAddResponsibilityModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 flex items-center justify-center"
            >
              <div
                className="bg-black bg-opacity-50 absolute inset-0"
                onClick={handleCloseAddResponsibilityModal}
              ></div>
              <motion.div
                className="bg-white p-8 rounded-lg shadow-md z-10 w-96"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <AddResponsibilityModal onClose={handleCloseAddResponsibilityModal} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isEditResponsibilityModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 flex items-center justify-center"
            >
              <div
                className="bg-black bg-opacity-50 absolute inset-0"
                onClick={handleCloseEditResponsibilityModal}
              ></div>
              <motion.div
                className="bg-white p-8 rounded-lg shadow-md z-10 w-96"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <EditResponsibilityModal
                  onClose={handleCloseEditResponsibilityModal}
                  index={editResponsibilityIndex}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Responsibility;
