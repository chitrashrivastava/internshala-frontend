import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import AddInternshipModal from "./AddInternshipModal";
import EditInternshipModal from "./EditInternshipModal";
import { asyncDeleteInternship } from "../../../../store/Actions/resumeAction";

const Internships = () => {
  const [isAddInternshipModalOpen, setAddInternshipModalOpen] = useState(false);
  const [isEditInternshipModalOpen, setEditInternshipModalOpen] = useState(false);
  const [editInternshipIndex, setEditInternshipIndex] = useState(null);

  const handleCloseAddInternshipModal = () => {
    setAddInternshipModalOpen(false);
  };

  const handleEditInternship = (index) => {
    setEditInternshipIndex(index);
    setEditInternshipModalOpen(true);
  };

  const handleCloseEditInternshipModal = () => {
    setEditInternshipIndex(null);
    setEditInternshipModalOpen(false);
  };

  const { isAuth, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { internships } = useSelector((state) => state.user.user.resume);

  const handleDeleteInternship = async (id, updatedData) => {
    try {
      dispatch(asyncDeleteInternship(id, updatedData));
    } catch (error) {
      console.error("Error deleting internship:", error);
    }
  };

  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <motion.div
          className="bg-white p-6 mb-6 flex flex-col justify-between shadow-lg rounded-md overflow-hidden"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">Internships</h2>

          <div className="flex flex-col">
            {user.resume.internships && user.resume.internships.length > 0 ? (
              user.resume.internships.map((internship, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 mb-6 flex flex-col justify-between shadow-lg rounded-md overflow-hidden"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div>
                    <p className="text-xl font-semibold text-gray-800">{internship.Company}</p>
                    <p className="text-gray-500">Position: {internship.Position}</p>
                    <p className="text-gray-500">Description: {internship.Desc}</p>
                    <p className="text-gray-500">From: {internship.From}</p>
                    <p className="text-gray-500">To: {internship.To}</p>
                  </div>
                  <div className="flex space-x-4 mt-4">
                    <button
                      onClick={() => handleEditInternship(index)}
                      className="edit-btn bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
                    >
                      <FontAwesomeIcon icon={faEdit} className="mr-2" /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteInternship(internship.id, user.resume.internships)}
                      className="delete-btn bg-red-500 text-white p-2 rounded hover:bg-red-700"
                    >
                      <FontAwesomeIcon icon={faTrash} className="mr-2" /> Delete
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-500">No internship information available.</p>
            )}
          </div>

          <button
            onClick={() => setAddInternshipModalOpen(true)}
            className="add-btn bg-green-500 text-white p-3 rounded hover:bg-green-700 transition duration-300 mt-6"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" /> Add Internship
          </button>

          <AnimatePresence>
            {isAddInternshipModalOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 flex items-center justify-center"
              >
                <div
                  className="bg-black bg-opacity-50 absolute inset-0"
                  onClick={handleCloseAddInternshipModal}
                ></div>
                <motion.div
                  className="bg-white p-8 rounded-lg shadow-md z-10 w-96"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <AddInternshipModal onClose={handleCloseAddInternshipModal} />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {isEditInternshipModalOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 flex items-center justify-center"
              >
                <div
                  className="bg-black bg-opacity-50 absolute inset-0"
                  onClick={handleCloseEditInternshipModal}
                ></div>
                <motion.div
                  className="bg-white p-8 rounded-lg shadow-md z-10 w-96"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <EditInternshipModal
                    onClose={handleCloseEditInternshipModal}
                    index={editInternshipIndex}
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

export default Internships;
