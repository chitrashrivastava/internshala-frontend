import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronLeft, faCircleChevronRight } from '@fortawesome/free-solid-svg-icons';

const LatestInternships = () => {
  const [activeLink, setActiveLink] = useState(null);
  const [latestInternships, setLatestInternships] = useState([]);
  const [filteredInternships, setFilteredInternships] = useState([]);
  const [currentMode, setCurrentMode] = useState(null);

  const containerRef = useRef(null);

  const handleLinkClick = (index, mode, event) => {
    event.preventDefault();
    setActiveLink(index);

    if (currentMode === mode) {
      setCurrentMode(null);
    } else {
      setCurrentMode(mode);
    }
  };

  const handleScroll = (scrollOffset) => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += scrollOffset;
    }
  };

  const handleScrollLeft = () => {
    handleScroll(-400);
  };

  const handleScrollRight = () => {
    handleScroll(400);
  };

  useEffect(() => {
    // Mock data with timestamps (replace with actual data)
    const mockData = [
        { id: 1, company: "ABC Corp", salaryRange: "$1000 - $1500", duration: "3 months", role: "Software Developer", mode: "Work from Home" },
        { id: 2, company: "XYZ Ltd", salaryRange: "$1200 - $1800", duration: "6 months", role: "Marketing Intern", mode: "Work from Home" },
        { id: 3, company: "Tech Innovators", salaryRange: "$1500 - $2000", duration: "4 months", role: "Data Scientist", mode: "Work from Home" },
        { id: 4, company: "Creative Minds Studio", salaryRange: "$800 - $1200", duration: "2 months", role: "Graphic Designer", mode: "Work from Home" },
        { id: 5, company: "Finance Wizards Ltd", salaryRange: "$2000 - $2500", duration: "5 months", role: "Finance Analyst", mode: "Part Time" },
        { id: 6, company: "Health Solutions Inc", salaryRange: "$1200 - $1600", duration: "3 months", role: "Healthcare Intern", mode: "Part Time" },
        { id: 7, company: "EcoTech Innovations", salaryRange: "$1800 - $2200", duration: "6 months", role: "Environmental Scientist", mode: "Part Time" },
        { id: 8, company: "Digital Trends Ltd", salaryRange: "$1600 - $2000", duration: "4 months", role: "Digital Marketing Specialist", mode: "Part Time" },
        { id: 9, company: "Global Innovators", salaryRange: "$1500 - $1800", duration: "3 months", role: "Business Analyst", mode: "Full Time" },
        { id: 10, company: "Education Hub Ltd", salaryRange: "$1000 - $1300", duration: "2 months", role: "Teaching Assistant", mode: "Full Time" },
        { id: 11, company: "Design Masters", salaryRange: "$1300 - $1700", duration: "3 months", role: "UX/UI Designer", mode: "Full Time" },
        { id: 12, company: "Media Productions Inc", salaryRange: "$1400 - $1800", duration: "4 months", role: "Media Intern", mode: "Full Time" },
        { id: 13, company: "HealthTech Solutions", salaryRange: "$2000 - $2500", duration: "6 months", role: "Health IT Specialist", mode: "Full Time" },
        { id: 14, company: "Smart Logistics", salaryRange: "$1800 - $2200", duration: "5 months", role: "Supply Chain Analyst", mode: "Full Time" },
        { id: 15, company: "TechGenius Innovations", salaryRange: "$2500 - $3000", duration: "6 months", role: "IT Project Manager", mode: "Full Time" },
        { id: 16, company: "Innovative Solutions", salaryRange: "$1600 - $2000", duration: "4 months", role: "Software Engineer", mode: "Work from Home" },
        { id: 17, company: "Social Media Experts", salaryRange: "$1200 - $1500", duration: "3 months", role: "Social Media Intern", mode: "Part Time" },
        { id: 18, company: "Finance Gurus", salaryRange: "$1800 - $2200", duration: "5 months", role: "Financial Analyst", mode: "Full Time" },
        { id: 19, company: "Tech Ventures", salaryRange: "$2000 - $2500", duration: "6 months", role: "Tech Support Specialist", mode: "Work from Home" },
        { id: 20, company: "Education Innovations", salaryRange: "$1300 - $1600", duration: "3 months", role: "Education Intern", mode: "Part Time" },
        // ... more jobs
      ];

    setLatestInternships(mockData);
  }, []); // Ensure this runs only once

  useEffect(() => {
    if (currentMode) {
      const filteredData = latestInternships.filter((internship) => internship.mode === currentMode);
      setFilteredInternships(filteredData);
    } else {
      setFilteredInternships(latestInternships);
    }
  }, [latestInternships, currentMode]);

  const links = [
    { text: "Work from Home", index: 0, mode: "Work from Home" },
    { text: "Part Time", index: 1, mode: "Part Time" },
    { text: "Full Time", index: 2, mode: "Full Time" },
    { text: "Data Science", index: 3, mode: "Data Science" },
    // ... more links
  ];

  return (
    <div className="flex justify-evenly items-center flex-col p-10 bg-blue-50">
      <h1 className="text-4xl">Latest internships on Internshala</h1>
      <div className="categories flex justify-evenly gap-[12px]">
        <span className="p-4">Popular Categories: </span>
        <ul className="flex justify-evenly gap-[12px] p-2">
          {links.map((link) => (
            <li
              key={link.index}
              className={`p-2 rounded-[18px] border-[1px] ${
                activeLink === link.index ? "bg-blue-500 text-white" : ""
              }`}
            >
              <NavLink to="#" onClick={(event) => handleLinkClick(link.index, link.mode, event)}>
                {link.text}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="cards latest-internships w-full flex flex-col justify-evenly items-center gap-[10px]"  >
        <h2 className="text-2xl mb-4">Latest Internships</h2>
        <div ref={containerRef} style={{ scrollBehavior: 'smooth' }} className="flex w-full gap-4 overflow-auto whitespace-nowrap">
          {filteredInternships.map((internship) => (
            <div key={internship.id} className="flex flex-col justify-evenly bg-white p-4 rounded-md shadow-md w-full md:w-[400px] h-[250px]">
              <h3 className="text-lg font-semibold">{internship.company}</h3>
              <hr />
              <p>Salary Range: {internship.salaryRange}</p>
              <p>Duration: {internship.duration}</p>
              <p>Role: {internship.role}</p>
              <p>{internship.mode}</p>
              <NavLink to="#" className="text-blue-400">View Details</NavLink>
            </div>
          ))}
        </div>
        <div className="left-right flex gap-[30px] items-center ">
          <FontAwesomeIcon icon={faCircleChevronLeft} className="text-3xl text-blue-300" onClick={handleScrollLeft} />
          <FontAwesomeIcon icon={faCircleChevronRight} className="text-3xl text-blue-300" onClick={handleScrollRight} />
        </div>
      </div>
    </div>
  );
};

export default LatestInternships;
