import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncreadJobs, asyncapply } from '../../store/Actions/jobAction';
import { useParams } from 'react-router-dom';

const Jobs = () => {
  const dispatch = useDispatch();
  const { user, isAuth } = useSelector((state) => state.user);
  const { jobs, loading } = useSelector((state) => state.jobs);

  const alljobs = jobs || [];  // Ensure alljobs is an array, even if jobs is null

  const [filters, setFilters] = useState({
    profile: '',
    salary: '',
  });

  useEffect(() => {
    dispatch(asyncreadJobs());
  }, [dispatch]);

  const applynow = (id) => {
    if (isAuth && user.role === 'student') {
      dispatch(asyncapply(id));
    }
  };

  return (
    <div className="container mx-auto p-4 flex flex-col md:flex-row items-center justify-center w-full gap-4">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="container mx-auto p-4 flex flex-col md:flex-row items-center justify-center w-full gap-4">
          {alljobs.length === 0 ? (
            <p>No jobs present at the moment.</p>
          ) : (
            alljobs.map((job) => (
              <div key={job._id} className="bg-white p-4 rounded-md shadow-md mb-4">
                <img src={job.employee.organisationLogo.url} alt={job.title} className="w-full h-40 object-cover rounded-md" />
                <p>Organisation Name: {job.employee.organisationName}</p>
                <p>Profile: {job.title}</p>
                <p>Skills Required: {job.skill}</p>
                <p>Stipend: {job.salary}</p>
                <p>Duration: {job.duration}</p>
                <p>Job Type: {job.jobtype}</p>
                <p>Perks: {job.perks}</p>
                <p>From: {job.from}</p>
                <p>To: {job.to}</p>
                <p>Assessment: {job.assessment}</p>
                {isAuth && user.role === 'student' && (
                  <>
                    {job.applied ? (
                      <button className="bg-green-500 text-white p-2 rounded-md mt-2">Applied</button>
                    ) : (
                      <button onClick={() => applynow(job._id)} className="bg-blue-500 text-white p-2 rounded-md mt-2">
                        Apply Now
                      </button>
                    )}
                  </>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Jobs;