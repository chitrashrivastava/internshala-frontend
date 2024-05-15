import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncCreateInternships } from "../../store/Actions/postAction";

const PostInternship = () => {
  const [internshipData, setInternshipData] = useState({
    profile: "",
    internshiptype: "",
    skills: "",
    openings: 0,
    from: "",
    to: "",
    duration: "",
    stipendStatus: "",
    stipendAmount: 0,
    perks: "",
    assessment: "",
  });
  const dispatch=useDispatch()
  const {user}=useSelector((state)=>state.user)
  console.log(user)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInternshipData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await dispatch(asyncCreateInternships(internshipData));
        setInternshipData({
            profile: "",
            internshiptype: "",
            skills: "",
            openings: 0,
            from: "",
            to: "",
            duration: "",
            stipendStatus: "",
            stipendAmount: 0,
            perks: "",
            assessment: "",
          });
    } catch (error) {
      console.error("Error posting internship:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Post Internship</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="profile" className="block text-sm font-medium text-gray-600">
              Profile:
            </label>
            <input
              type="text"
              id="profile"
              name="profile"
              value={internshipData.profile}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="internshiptype" className="block text-sm font-medium text-gray-600">
              Internship Type:
            </label>
            <select
              id="internshiptype"
              name="internshiptype"
              value={internshipData.internshiptype}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring focus:border-blue-300"
            >
              <option value="">Select Type</option>
              <option value="In office">In Office</option>
              <option value="Remote">Remote</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="skills" className="block text-sm font-medium text-gray-600">
              Skills:
            </label>
            <input
              type="text"
              id="skills"
              name="skills"
              value={internshipData.skills}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="openings" className="block text-sm font-medium text-gray-600">
              Openings:
            </label>
            <input
              type="number"
              id="openings"
              name="openings"
              value={internshipData.openings}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="from" className="block text-sm font-medium text-gray-600">
              From:
            </label>
            <input
              type="date"
              id="from"
              name="from"
              value={internshipData.from}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="to" className="block text-sm font-medium text-gray-600">
              To:
            </label>
            <input
              type="date"
              id="to"
              name="to"
              value={internshipData.to}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="duration" className="block text-sm font-medium text-gray-600">
              Duration:
            </label>
            <input
              type="text"
              id="duration"
              name="duration"
              value={internshipData.duration}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="stipendStatus" className="block text-sm font-medium text-gray-600">
              Stipend Status:
            </label>
            <select
              id="stipendStatus"
              name="stipendStatus"
              value={internshipData.stipendStatus}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring focus:border-blue-300"
            >
              <option value="">Select Status</option>
              <option value="Fixed">Fixed</option>
              <option value="Performance Based">Performance Based</option>
              <option value="Negotiable">Negotiable</option>
              <option value="Unpaid">Unpaid</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="stipendAmount" className="block text-sm font-medium text-gray-600">
              Stipend Amount:
            </label>
            <input
              type="number"
              id="stipendAmount"
              name="stipendAmount"
              value={internshipData.stipendAmount}
              onChange={handleChange}
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
              value={internshipData.perks}
              onChange={handleChange}
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
              value={internshipData.assessment}
              onChange={handleChange}
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

export default PostInternship;
