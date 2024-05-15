import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncreadInternships, asyncapply } from '../../store/Actions/internshipAction';
import { motion, AnimatePresence } from 'framer-motion';

const Internships = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [appliedInternships, setAppliedInternships] = useState([]);
  const [filters, setFilters] = useState({
    profile: '',
    amount: '',
    internshiptype: '',
  });

  const { user, isAuth } = useSelector((state) => state.user);
  const { internships: allInternships } = useSelector((state) => state.internship);
  const [internships, setInternships] = useState([]);
  const [selectedInternship, setSelectedInternship] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(asyncreadInternships());
      setLoading(false);
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    setInternships(allInternships || []);
    applyFilters();
  }, [allInternships, filters, appliedInternships]);

  const applyFilters = () => {
    let filteredInternships = allInternships || [];

    if (filters.profile) {
      filteredInternships = filteredInternships.filter((internship) => {
        return (
          internship.profile &&
          internship.profile.toLowerCase().includes(filters.profile.toLowerCase())
        );
      });
    }

    if (filters.amount) {
      filteredInternships = filteredInternships.filter((internship) => {
        if (
          internship.stipend &&
          internship.stipend.amount !== undefined &&
          internship.stipend.amount
            .toString()
            .toLowerCase()
            .includes(filters.amount.toLowerCase())
        ) {
          return true;
        }
        return false;
      });
    }
    if (filters.internshiptype) {
      filteredInternships = filteredInternships.filter(
        (internship) =>
          internship.internshiptype &&
          internship.internshiptype.toLowerCase() === filters.internshiptype.toLowerCase()
      );
    }

    setInternships(filteredInternships);
  };

  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [filterName]: value }));
  };

  const applyNow = async (id) => {
    if (isAuth && user.role === 'student') {
      await dispatch(asyncapply(id));
      setAppliedInternships((prevAppliedInternships) => [...prevAppliedInternships, id]);
      dispatch(asyncreadInternships());
    }
  };

  const handleViewDetails = (internship) => {
    setSelectedInternship(internship);
  };

  const handleCloseModal = () => {
    setSelectedInternship(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4 flex flex-col md:flex-row items-center justify-center w-full gap-4"
    >
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-4 md:mb-0"
      >
        {/* Filter Section */}
        <label htmlFor="internshipTypeFilter" className="block text-sm font-medium text-gray-700 mb-1">
          Internship Type:
        </label>
        <select
          id="internshipTypeFilter"
          value={filters.internshiptype}
          onChange={(e) => handleFilterChange('internshiptype', e.target.value)}
          className="p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">Any</option>
          <option value="In office">In office</option>
          <option value="Remote">Remote</option>
        </select>
        <label htmlFor="profileFilter" className="block text-sm font-medium text-gray-700 mb-1">
          Profile:
        </label>
        <input
          type="text"
          id="profileFilter"
          value={filters?.profile}
          onChange={(e) => handleFilterChange('profile', e.target.value)}
          className="p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="e.g., Software Developer"
        />

        <label htmlFor="amountFilter" className="block text-sm font-medium text-gray-700 mb-1">
          Amount:
        </label>
        <div className="relative rounded-md shadow-sm">
          <input
            type="text"
            id="amountFilter"
            value={filters.amount}
            onChange={(e) => handleFilterChange('amount', e.target.value)}
            className="p-2 pr-8 w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="e.g., 5000"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">USD</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-col w-full"
      >
        {/* Internship List Section */}
        <h2 className="text-3xl font-bold my-4">
          {internships && internships.length} Internships available
        </h2>
        <AnimatePresence>
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            <AnimatePresence>
              {Array.isArray(internships) &&
                internships.map((internship) => (
                  <motion.li
                    key={internship._id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.5 }}
                    className="relative bg-white p-4 rounded-md shadow-md mb-4"
                  >
                    {/* Internship Card */}
                    <motion.img
                      key={internship._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      src={internship.employee?.organisationLogo?.url}
                      alt={internship.title}
                      className="w-full h-40 object-cover rounded-md mb-2"
                    />
                    <h3 className="text-xl font-semibold">{internship.title}</h3>
                    <div className="flex flex-wrap items-center mb-2">
                      <span className="text-sm text-gray-500 mr-2">Profile:</span>
                      <span className="text-sm font-semibold">{internship.profile}</span>
                    </div>
                    <div className="flex flex-wrap items-center mb-2">
                      <span className="text-sm text-gray-500 mr-2">Skills:</span>
                      <span className="text-sm font-semibold">{internship.skills}</span>
                    </div>
                    <div className="flex flex-wrap items-center mb-2">
                      <span className="text-sm text-gray-500 mr-2">Openings:</span>
                      <span className="text-sm font-semibold">{internship.openings}</span>
                    </div>
                    <div className="flex flex-wrap items-center mb-2">
                      <span className="text-sm text-gray-500 mr-2">From:</span>
                      <span className="text-sm font-semibold">{internship.from}</span>
                    </div>
                    <div className="flex flex-wrap items-center mb-2">
                      <span className="text-sm text-gray-500 mr-2">To:</span>
                      <span className="text-sm font-semibold">{internship.to}</span>
                    </div>
                    <div className="flex flex-wrap items-center mb-2">
                      <span className="text-sm text-gray-500 mr-2">Perks:</span>
                      <span className="text-sm font-semibold">{internship.perks}</span>
                    </div>
                    <div className="flex flex-wrap items-center mb-2">
                      <span className="text-sm text-gray-500 mr-2">Assessment:</span>
                      <span className="text-sm font-semibold">{internship.assessment}</span>
                    </div>

                    {internship.stipend && (
                      <div className="flex flex-wrap items-center mb-2">
                        <span className="text-sm text-gray-500 mr-2">Stipend Status:</span>
                        <span className="text-sm font-semibold">{internship.stipend.status}</span>
                      </div>
                    )}

                    {internship.stipend?.status !== 'Unpaid' && internship.stipend?.amount !== undefined && (
                      <div className="flex flex-wrap items-center mb-2">
                        <span className="text-sm text-gray-500 mr-2">Stipend Amount:</span>
                        <span className="text-sm font-semibold">{internship.stipend.amount}</span>
                      </div>
                    )}

                    {(!internship.stipend || internship.stipend.status === 'Unpaid') && (
                      <div className="flex flex-wrap items-center mb-2">
                        <span className="text-sm text-gray-500 mr-2">Stipend:</span>
                        <span className="text-sm font-semibold">Unpaid</span>
                      </div>
                    )}

                    {/* Apply Button */}
                    <motion.button
                      key={`apply-${internship._id}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      onClick={() => applyNow(internship._id)}
                      className={`applybtn bg-blue-500 text-white p-2 rounded-md mt-2 ${
                        internship.students.includes(user._id) ? 'applied' : ''
                      }`}
                      disabled={internship.students.includes(user._id)}
                    >
                      {internship.students.includes(user._id) ? 'Applied' : 'Apply Now'}
                    </motion.button>

                    {/* View Details Button */}
                    <motion.button
                      key={`view-details-${internship._id}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      onClick={() => handleViewDetails(internship)}
                      className="ml-4 applybtn bg-green-500 text-white p-2 rounded-md mt-2"
                    >
                      View Details
                    </motion.button>
                  </motion.li>
                ))}
            </AnimatePresence>
          </motion.ul>
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {selectedInternship && (
       <motion.div
       initial={{ opacity: 0, scale: 0.8 }}
       animate={{ opacity: 1, scale: 1 }}
       exit={{ opacity: 0, scale: 0.8 }}
       className="fixed inset-0 flex items-center justify-center"
     >
       <motion.div
         initial={{ opacity: 0, y: -50 }}
         animate={{ opacity: 1, y: 0 }}
         exit={{ opacity: 0, y: -50 }}
         className="bg-white p-8 rounded-md w-96 shadow-md"
       >
         <h3 className="text-2xl font-semibold mb-4">{selectedInternship?.title} Details</h3>
         <div className="mb-4">
           <p className="text-lg font-semibold mb-1">
             Employee: {selectedInternship?.employee?.firstname} {selectedInternship?.employee?.lastname}
           </p>
           <p>Organization: {selectedInternship?.employee?.organisationName}</p>
         </div>
         <div className="mb-4">
           <p className="text-lg font-semibold mb-1">Contact Information:</p>
           <p>{selectedInternship?.employee?.contact}</p>
           <p>{selectedInternship?.employee?.email}</p>
         </div>
         <button
           onClick={handleCloseModal}
           className="bg-blue-500 text-white p-2 rounded-md  mt-4"
         >
           Close
         </button>
       </motion.div>
     </motion.div>
     
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Internships;
