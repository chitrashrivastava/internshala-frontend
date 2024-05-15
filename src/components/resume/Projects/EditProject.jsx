// EditProject.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncEditProject } from '../../../store/Actions/resumeAction';
import { asynccurrentUserStudent } from '../../../store/Actions/userAction';
import { motion, AnimatePresence } from 'framer-motion';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';

const EditProject = ({ onClose, index }) => {
  const dispatch = useDispatch();
  const userProjects = useSelector((state) => state.user.user.resume.projects);

  const [editedProject, setEditedProject] = useState({});
  const [skills, setSkills] = useState([]);
  const selectedProject = userProjects && userProjects[index];

  useEffect(() => {
    dispatch(asynccurrentUserStudent());
  }, [dispatch]);

  useEffect(() => {
    setEditedProject((prev) => {
      if (selectedProject && selectedProject.id) {
        return { ...selectedProject };
      }
      console.error('ID is missing in selectedProject:', selectedProject);
      return prev;
    });
    setSkills(selectedProject && selectedProject.skills ? selectedProject.skills : []);
  }, [selectedProject]);

  const handleSaveProject = async (event) => {
    event.preventDefault();

    try {
      if (editedProject.id) {
        await dispatch(asyncEditProject(editedProject.id, editedProject));
        console.log('Project saved successfully');
        onClose();
      } else {
        console.error('Error editing project: ID is missing');
      }
    } catch (error) {
      console.error('Error editing project:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillsChange = (newSkills) => {
    setSkills(newSkills);
    setEditedProject((prev) => ({ ...prev, skills: newSkills }));
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { scale: 0 },
    visible: { scale: 1 },
  };

  return (
    <AnimatePresence exit>
      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        variants={fadeInVariants}
        className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 w-full"
        onClick={() => onClose()}
      >
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="bg-white p-8 rounded-lg shadow-md w-[50%] h-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <h1 className="text-3xl font-semibold mb-6 text-gray-800">Edit Project</h1>
          <form onSubmit={handleSaveProject}>
            <div className="mb-4">
              <label htmlFor="title" className="text-lg text-gray-800">
                Title:
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="w-full p-3 border rounded-md focus:outline-none focus:border-blue-500"
                value={editedProject.title || ''}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="duration" className="text-lg text-gray-800">
                Duration:
              </label>
              <input
                type="text"
                id="duration"
                name="duration"
                className="w-full p-3 border rounded-md focus:outline-none focus:border-blue-500"
                value={editedProject.duration || ''}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="text-lg text-gray-800">
                Description:
              </label>
              <textarea
                id="description"
                name="description"
                className="w-full p-3 border rounded-md focus:outline-none focus:border-blue-500"
                value={editedProject.description || ''}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="skills" className="text-lg text-gray-800">
                Skills:
              </label>
              <TagsInput
                value={skills}
                onChange={handleSkillsChange}
                suggestions={[]} // You can add suggestions if needed
                className="w-full p-3 border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="githubLink" className="text-lg text-gray-800">
                GitHub Link:
              </label>
              <input
                type="url"
                id="githubLink"
                name="githubLink"
                className="w-full p-3 border rounded-md focus:outline-none focus:border-blue-500"
                value={editedProject.githubLink || ''}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="liveLink" className="text-lg text-gray-800">
                Live Link:
              </label>
              <input
                type="url"
                id="liveLink"
                name="liveLink"
                className="w-full p-3 border rounded-md focus:outline-none focus:border-blue-500"
                value={editedProject.liveLink || ''}
                onChange={handleInputChange}
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none"
            >
              Save Changes
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EditProject;
