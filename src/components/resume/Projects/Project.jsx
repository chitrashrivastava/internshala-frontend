import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddProjectModal from "./AddProjectModal";
import EditProjectModal from "./EditProjectModal";
import { asyncDeleteProject } from "../../../store/Actions/resumeAction";
import { motion } from "framer-motion";

const CustomTag = ({ text }) => (
  <div className="inline-flex items-center bg-blue-500 text-white px-2 py-1 rounded-full mr-2 mb-2">
    <span className="mr-1">{text}</span>
  </div>
);

const Project = () => {
  const [isAddProjectModalOpen, setAddProjectModalOpen] = useState(false);
  const [isEditProjectModalOpen, setEditProjectModalOpen] = useState(false);
  const [editProjectIndex, setEditProjectIndex] = useState(null);

  const handleCloseAddProjectModal = () => {
    setAddProjectModalOpen(false);
  };

  const handleEditProject = (index) => {
    setEditProjectIndex(index);
    setEditProjectModalOpen(true);
  };

  const handleCloseEditProjectModal = () => {
    setEditProjectIndex(null);
    setEditProjectModalOpen(false);
  };

  const { isAuth, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { projects } = useSelector((state) => state.user.user.resume);

  const handleDeleteProject = async (id, updatedData) => {
    try {
      await dispatch(asyncDeleteProject(id, updatedData));
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const navigate = useNavigate();

  const projectItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div>
      {isAuth && user && (
        <div>
          <motion.div
            className="bg-white p-8 rounded-lg shadow-md mb-6"
          >
            <h2 className="text-3xl font-semibold mb-6 text-gray-800">
              Projects
            </h2>

            {user.resume.projects ? (
              user.resume.projects.map((project, projectIndex) => (
                <motion.div
                  key={projectIndex}
                  className="project-item bg-gray-200 p-4 mb-4 flex items-center justify-between"
                  variants={projectItemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <div>
                    <p className="text-lg text-gray-700">{project.title}</p>
                    <p className="text-sm text-gray-500 mb-2">
                      Duration: {project.duration}
                    </p>
                    <p className="text-sm text-gray-500 mb-2">
                      Description: {project.description}
                    </p>
                    <p className="text-sm text-gray-500 mb-2">
                      Github Link: {project.githubLink}
                    </p>
                    <p className="text-sm text-gray-500 mb-2">
                      Live Link: {project.liveLink || "N/A"}
                    </p>

                    {project.skills && project.skills.length > 0 && (
                      <div>
                        <p className="text-sm text-gray-500 mb-2">Skills:</p>
                        <div className="flex flex-wrap mt-2">
                          {project.skills.map((skill, skillIndex) => (
                            <CustomTag key={skillIndex} text={skill} />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleEditProject(projectIndex)}
                      className="edit-btn bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition duration-300"
                    >
                      <FontAwesomeIcon icon={faEdit} className="mr-2" /> Edit
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() =>
                        handleDeleteProject(project.id, user.resume.projects)
                      }
                      className="delete-btn bg-red-500 text-white p-2 rounded hover:bg-red-700 transition duration-300"
                    >
                      <FontAwesomeIcon icon={faTrash} className="mr-2" /> Delete
                    </motion.button>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-500">No project information available.</p>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setAddProjectModalOpen(true)}
              className="add-btn bg-green-500 text-white p-3 rounded hover:bg-green-700 transition duration-300"
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" /> Add Project
            </motion.button>
          </motion.div>

          {isAddProjectModalOpen && (
            <AddProjectModal onClose={handleCloseAddProjectModal} />
          )}
          {isEditProjectModalOpen && (
            <EditProjectModal
              onClose={handleCloseEditProjectModal}
              index={editProjectIndex}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Project;
