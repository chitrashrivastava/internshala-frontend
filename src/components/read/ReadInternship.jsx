import React, { useEffect, useState } from "react";
import axios from "../../config/axios";

const ReadInternships = () => {
  const [internships, setInternships] = useState(null);
  const [orgImg, setOrgImg] = useState('');  // Change state variable name to setOrgImg

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res = await axios.post("/user/employee/internship/read");
        let orgImgRes = await axios.post('/user/employee');  
        console.log(orgImgRes);
        setInternships(res.data.internships);
        setOrgImg(orgImgRes.data.employee.organisationLogo.url); 
      } catch (error) {
        console.error("Error fetching internships:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-3xl font-bold mb-8 text-center">Posted Internships</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {internships &&
          internships?.map((internship) => (
            <div key={internship._id} className="bg-gray-100 rounded-lg overflow-hidden shadow-md">
              <img
                className="w-full h-40 object-cover object-center"
                src={orgImg}
                alt={internship?.profile}
              />
              <div className="p-6">
                <h5 className="text-xl font-semibold mb-2">{internship?.profile}</h5>
                <p className="text-gray-600 mb-4">Internship Type: {internship?.internshiptype}</p>
                <p className="text-gray-700 mb-2">Skills Required: {internship?.skills}</p>
                <p className="text-gray-700 mb-2">Openings: {internship?.openings}</p>
                <p className="text-gray-700 mb-2">Duration: {internship?.duration}</p>
                <p className="text-gray-700 mb-2">Stipend: {internship.stipend?.amount}</p>
                <p className="text-gray-700 mb-2">Stipend Status: {internship?.stipend?.status}</p>
                <p className="text-gray-700 mb-2">Perks: {internship?.perks}</p>
                <p className="text-gray-700 mb-2">Assessment: {internship?.assessment}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ReadInternships;
