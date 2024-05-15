import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import AddJobModal from "./AddJobModal";
import EditJobModal from "./EditJobModal";
import { asyncDeleteJob } from "../../../../store/Actions/resumeAction";

const Jobs = () => {
  const [isAddJobModalOpen, setAddJobModalOpen] = useState(false);
  const [isEditJobModalOpen, setEditJobModalOpen] = useState(false);
  const [editJobIndex, setEditJobIndex] = useState(null);

  const handleCloseAddJobModal = () => {
    setAddJobModalOpen(false);
  };

  const handleEditJob = (index) => {
    setEditJobIndex(index);
    setEditJobModalOpen(true);
  };

  const handleCloseEditJobModal = () => {
    setEditJobIndex(null);
    setEditJobModalOpen(false);
  };

  const { isAuth, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { jobs } = useSelector((state) => state.user.user.resume);

  const handleDeleteJob = async (id, updatedData) => {
    try {
      dispatch(asyncDeleteJob(id, updatedData));
    } catch (error) {
      console.error("Error deleting job:", error);
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
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">Jobs</h2>

          <div className="flex flex-col">
            {user.resume.jobs && user.resume.jobs.length > 0 ? (
              user.resume.jobs.map((job, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 mb-6 flex flex-col justify-between shadow-lg rounded-md overflow-hidden"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div>
                    <p className="text-xl font-semibold text-gray-800">{job.Company}</p>
                    <p className="text-gray-500">Position: {job.Position}</p>
                    <p className="text-gray-500">Description: {job.Desc}</p>
                    <p className="text-gray-500">From: {job.From}</p>
                    <p className="text-gray-500">To: {job.To}</p>
                  </div>
                  <div className="flex space-x-4 mt-4">
                    <button
                      onClick={() => handleEditJob(index)}
                      className="edit-btn bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
                    >
                      <FontAwesomeIcon icon={faEdit} className="mr-2" /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteJob(job.id, user.resume.jobs)}
                      className="delete-btn bg-red-500 text-white p-2 rounded hover:bg-red-700"
                    >
                      <FontAwesomeIcon icon={faTrash} className="mr-2" /> Delete
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-500">No job information available.</p>
            )}
          </div>

          <button
            onClick={() => setAddJobModalOpen(true)}
            className="add-btn bg-green-500 text-white p-3 rounded hover:bg-green-700 transition duration-300 mt-6"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" /> Add Job
          </button>

          <AnimatePresence>
            {isAddJobModalOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 flex items-center justify-center"
              >
                <div
                  className="bg-black bg-opacity-50 absolute inset-0"
                  onClick={handleCloseAddJobModal}
                ></div>
                <motion.div
                  className="bg-white p-8 rounded-lg shadow-md z-10 w-96"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <AddJobModal onClose={handleCloseAddJobModal} />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {isEditJobModalOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 flex items-center justify-center"
              >
                <div
                  className="bg-black bg-opacity-50 absolute inset-0"
                  onClick={handleCloseEditJobModal}
                ></div>
                <motion.div
                  className="bg-white p-8 rounded-lg shadow-md z-10 w-96"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <EditJobModal onClose={handleCloseEditJobModal} index={editJobIndex} />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Jobs;
