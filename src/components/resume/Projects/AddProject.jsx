import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { asyncAddProject, asyncGetResume } from '../../../store/Actions/resumeAction';
import { useNavigate } from 'react-router-dom';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';
import { motion } from 'framer-motion';

const AddProject = ({ onClose }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState([]);
  const [githubLink, setGithubLink] = useState('');
  const [liveLink, setLiveLink] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(asyncAddProject({ title, duration, description, skills, githubLink, liveLink }));
      console.log('Project added successfully');
      await dispatch(asyncGetResume());
      clearForm();
      onClose();
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  const clearForm = () => {
    setTitle('');
    setDuration('');
    setDescription('');
    setSkills([]);
    setGithubLink('');
    setLiveLink('');
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
    <motion.div
      variants={fadeInVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
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
        <h1 className="text-3xl font-semibold mb-6 text-gray-800">Add Project</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label htmlFor="title" className="text-lg text-gray-800 block mb-2">
              Title:
            </label>
            <input
              type="text"
              id="title"
              className="w-full p-3 border rounded-md focus:outline-none focus:border-blue-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="duration" className="text-lg text-gray-800 block mb-2">
              Duration:
            </label>
            <input
              type="text"
              id="duration"
              className="w-full p-3 border rounded-md focus:outline-none focus:border-blue-500"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="text-lg text-gray-800 block mb-2">
              Description:
            </label>
            <textarea
              id="description"
              className="w-full p-3 border rounded-md focus:outline-none focus:border-blue-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="skills" className="text-lg text-gray-800 block mb-2">
              Skills:
            </label>
            <TagsInput
              value={skills}
              onChange={(tags) => setSkills(tags)}
              className="w-full p-3 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="githubLink" className="text-lg text-gray-800 block mb-2">
              GitHub Link:
            </label>
            <input
              type="url"
              id="githubLink"
              className="w-full p-3 border rounded-md focus:outline-none focus:border-blue-500"
              value={githubLink}
              onChange={(e) => setGithubLink(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="liveLink" className="text-lg text-gray-800 block mb-2">
              Live Link:
            </label>
            <input
              type="url"
              id="liveLink"
              className="w-full p-3 border rounded-md focus:outline-none focus:border-blue-500"
              value={liveLink}
              onChange={(e) => setLiveLink(e.target.value)}
            />
          </div>

          <div className="flex justify-end">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-green-500 text-white p-3 rounded-md hover:bg-green-700 transition duration-300 focus:outline-none"
            >
              Add Project
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AddProject;
