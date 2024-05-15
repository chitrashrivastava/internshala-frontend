import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncCreateJob } from "../../store/Actions/postAction";

const PostJob = () => {
  const [jobData, setJobData] = useState({
    title: "",
    skill: "",
    jobtype: "",
    openings: 0,
    description: "",
    preferences: "",
    salary: 0,
    perks: "",
    assessment: "",
  });

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  console.log(user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(asyncCreateJob(jobData));
      setJobData({
        title: "",
        skill: "",
        jobtype: "",
        openings: 0,
        description: "",
        preferences: "",
        salary: 0,
        perks: "",
        assessment: "",
      });
    } catch (error) {
      console.error("Error posting job:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Post Job</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-600">
              Job Title:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={jobData.title}
              onChange={handleChange} required
              className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="skill" className="block text-sm font-medium text-gray-600">
              Required Skills:
            </label>
            <input
              type="text"
              id="skill"
              name="skill"
              value={jobData.skill}
              onChange={handleChange} required
              className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="jobtype" className="block text-sm font-medium text-gray-600">
              Job Type:
            </label>
            <select
              id="jobtype"
              name="jobtype"
              value={jobData.jobtype}
              onChange={handleChange} required
              className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring focus:border-blue-300"
            >
              <option value="">Select Type</option>
              <option value="In office">In Office</option>
              <option value="Remote">Remote</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="openings" className="block text-sm font-medium text-gray-600">
              Openings:
            </label>
            <input
              type="number"
              id="openings"
              name="openings"
              value={jobData.openings}
              onChange={handleChange} required
              className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-600">
              Job Description:
            </label>
            <textarea
              id="description"
              name="description"
              value={jobData.description}
              onChange={handleChange} required
              rows="4"
              className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="preferences" className="block text-sm font-medium text-gray-600">
              Preferences:
            </label>
            <textarea
              id="preferences"
              name="preferences"
              value={jobData.preferences}
              onChange={handleChange} required
              rows="4"
              className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="salary" className="block text-sm font-medium text-gray-600">
              Salary:
            </label>
            <input
              type="number"
              id="salary"
              name="salary"
              value={jobData.salary}
              onChange={handleChange} required
              className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="perks" className="block text-sm font-medium text-gray-600">
              Perks:
            </label>
            <input
              type="text"
              id="perks"
              name="perks"
              value={jobData.perks}
              onChange={handleChange} required
              className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="assessment" className="block text-sm font-medium text-gray-600">
              Assessment:
            </label>
            <textarea
              id="assessment"
              name="assessment"
              value={jobData.assessment}
              onChange={handleChange} required
              rows="4"
              className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div className="mb-4">
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
