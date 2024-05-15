import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncreadInternships, asyncapply } from '../../store/Actions/internshipAction';
import { useParams } from 'react-router-dom'
import Card from './Card';
import { asyncreadJobs } from '../../store/Actions/jobAction';
const Myapplication = () => {
  const dispatch = useDispatch();
  const { user, isAuth } = useSelector((state) => state.user);
  const { internships: allInternships } = useSelector((state) => state.internship);
  const { jobs: allJobs } = useSelector((state) => state.jobs);
  const [jobs,setJobs]=useState(allJobs)
  const [internships, setInternships] = useState(allInternships);
  const [userInternships, setUserInternships] = useState([]);
  const [userJobs, setUserJobs] = useState([]);

  useEffect(() => {
    dispatch(asyncreadInternships());
  }, [dispatch]);
  useEffect(() => {
    dispatch(asyncreadJobs());
  }, [dispatch]);

useEffect(() => {
    if (allInternships) {
      const filteredInternships = allInternships.filter(internship =>
        internship.students.includes(user?._id)
      );
      setUserInternships(filteredInternships);
    }

    if (allJobs) {
      const filteredJobs = allJobs.filter(job =>
        job.students.includes(user?._id)
      );
      setUserJobs(filteredJobs);
    }
  }, [user, allInternships, allJobs]);
return(
<div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">My Applications</h1>

      <h2 className="text-2xl font-bold mb-2">Internships</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {userInternships.map(internship => (
          <Card
            key={internship._id}
            title={internship.profile}
            description={internship.skills}
            type={internship.internshiptype}
            openings={internship.openings}
            duration={internship.duration}
            stipend={internship.stipend}
            perks={internship.perks}
          />
        ))}
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-2">Jobs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {userJobs.map(job => (
          <Card
            key={job._id}
            title={job.title}
            description={job.description}
            type={job.jobtype}
            openings={job.openings}
            duration={job.preferences}
            stipend={{ status: 'N/A', amount: job.salary }}
            perks={job.perks}
          />
        ))}
      </div>
    </div>
  );
};

export default Myapplication;