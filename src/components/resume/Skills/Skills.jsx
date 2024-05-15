import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddSkillModal from "./AddSkillModal";
import { asyncDeleteSkill } from "../../../store/Actions/resumeAction";
import { motion, AnimatePresence } from "framer-motion";

const Skill = () => {
  const navigate = useNavigate();

  const [isAddSkillModalOpen, setAddSkillModalOpen] = useState(false);

  const handleCloseAddSkillModal = () => {
    setAddSkillModalOpen(false);
  };

  const { isAuth, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { skills } = useSelector((state) => state.user.user.resume);

  const handleDeleteSkill = async (index, updatedData) => {
    try {
      await dispatch(asyncDeleteSkill(index, updatedData));
      navigate('/student/edit-resume')
    } catch (error) {
      console.error("Error deleting Skill:", error);
    }
  };

  return (
    <motion.div
      className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Skills</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {user.resume.skills && user.resume.skills.length > 0 ? (
          user.resume.skills.map((skill, index) => (
            <motion.div
              key={index}
              className="bg-blue-500 text-white p-4 rounded-lg flex items-between justify-between"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <span>{skill}</span>
              <button
                onClick={() => handleDeleteSkill(index, user.resume.skills)}
                className="text-white focus:outline-none"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </motion.div>
          ))
        ) : (
          <p className="text-gray-500">No Skills information available.</p>
        )}
      </div>

      <button
        onClick={() => setAddSkillModalOpen(true)}
        className="mt-6 bg-green-500 text-white p-3 rounded hover:bg-green-700 transition duration-300"
      >
        <FontAwesomeIcon icon={faPlus} className="mr-2" /> Add Skills
      </button>

      <AnimatePresence>
        {isAddSkillModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center"
          >
            <div
              className="bg-black bg-opacity-50 absolute inset-0"
              onClick={handleCloseAddSkillModal}
            ></div>
            <motion.div
              className="bg-white p-8 rounded-lg shadow-md z-10 w-96"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <AddSkillModal onClose={handleCloseAddSkillModal} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Skill;
