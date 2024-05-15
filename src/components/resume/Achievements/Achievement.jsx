import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddAchievementModal from "./AddAchievementModal";
import { motion } from "framer-motion";
import { asyncDeleteAchievement } from "../../../store/Actions/resumeAction";

const AchievementCard = ({ text, onDelete }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    transition={{ duration: 0.3 }}
    className="bg-blue-200 shadow-md rounded p-4 mb-4 flex items-start justify-between"
  >
    <div className="w-3/4">
      <p className="text-lg text-gray-800">{text}</p>
    </div>
    <div className="w-1/4 text-right">
      <button
        onClick={onDelete}
        className="delete-btn text-red-500 hover:text-red-700"
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  </motion.div>
);

const Achievement = () => {
  const navigate = useNavigate();

  const [isAddAchievementModalOpen, setAddAchievementModalOpen] = useState(false);

  const handleCloseAddAchievementModal = () => {
    setAddAchievementModalOpen(false);
  };

  const { isAuth, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleDeleteAchievement = async (index, updatedData) => {
    try {
      await dispatch(asyncDeleteAchievement(index, updatedData));
    } catch (error) {
      console.error("Error deleting Achievement:", error);
    }
  };

  return (
    <div className="max-w-screen-md mx-auto p-4">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Achievements</h2>

      {user.resume.achievements ? (
        user.resume.achievements.map((achievement, index) => (
          <AchievementCard
            key={index}
            text={achievement}
            onDelete={() => handleDeleteAchievement(index, user.resume.achievements)}
          />
        ))
      ) : (
        <p className="text-gray-700">No achievement information available.</p>
      )}

      <motion.button
        onClick={() => setAddAchievementModalOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="add-btn bg-green-500 text-white p-3 rounded hover:bg-green-700 transition duration-300"
      >
        <FontAwesomeIcon icon={faPlus} className="mr-2" /> Add Achievement
      </motion.button>

      {isAddAchievementModalOpen && (
        <AddAchievementModal onClose={handleCloseAddAchievementModal} />
      )}
    </div>
  );
};

export default Achievement;
