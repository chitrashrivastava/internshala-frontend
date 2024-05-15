import React, { useEffect, useState } from "react";
import axios from "../../config/axios";

const ReadJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [orgImg, setOrgImg] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jobsResponse = await axios.post("/user/employee/job/read");
        const orgImgResponse = await axios.post('/user/employee');
        setJobs(jobsResponse.data.jobs);
        setOrgImg(orgImgResponse.data.employee.organisationLogo.url);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-3xl font-bold mb-8 text-center">Posted Jobs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {jobs.map((job) => (
          <JobCard key={job._id} job={job} orgImg={orgImg} />
        ))}
      </div>
    </div>
  );
};

const JobCard = ({ job, orgImg }) => (
  <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md">
    <img
      className="w-full h-40 object-cover object-center"
      src={orgImg}
      alt={job.title}
    />
    <div className="p-6">
      <h5 className="text-xl font-semibold mb-2">{job.title}</h5>
      <p className="text-gray-600 mb-4">Job Type: {job.jobtype}</p>
      <p className="text-gray-700 mb-2">Skills Required: {job.skill}</p>
      <p className="text-gray-700 mb-2">Openings: {job.openings}</p>
      <p className="text-gray-700 mb-2">Duration: {job.duration}</p>
      <p className="text-gray-700 mb-2">Salary: {job.salary}</p>
      <p className="text-gray-700 mb-2">Perks: {job.perks}</p>
      <p className="text-gray-700 mb-2">Assessment: {job.assessment}</p>
    </div>
  </div>
);

export default ReadJobs;
