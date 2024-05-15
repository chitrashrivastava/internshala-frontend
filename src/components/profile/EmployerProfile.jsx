import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncUpdateEmployee,
  asyncOrganisationLogo,
  asynccurrentUserEmployee,
} from "../../store/Actions/userAction";
import OrganisationLogo from "./Avatar";

const EmployerProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [profileData, setProfileData] = useState({
    firstname: user.firstname || "",
    lastname: user.lastname || "",
    contact: user.contact || "",
    email: user.email || "",
    organisationName: user.organisationName || "",
    organisationLogo: user.organisationLogo || "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(asyncUpdateEmployee(profileData, user._id));
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const submitLogo = async (formData) => {
    try {
      await dispatch(asyncOrganisationLogo(user._id, formData));
      dispatch(asynccurrentUserEmployee());
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating logo:", error);
    }
  };

  const handleSave = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Employer Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="firstname" className="block text-sm font-medium text-gray-600">
              First Name:
            </label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={profileData.firstname}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="lastname" className="block text-sm font-medium text-gray-600">
              Last Name:
            </label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={profileData.lastname}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="contact" className="block text-sm font-medium text-gray-600">
              Contact:
            </label>
            <input
              type="text"
              id="contact"
              name="contact"
              value={profileData.contact}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={profileData.email}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="organisationName" className="block text-sm font-medium text-gray-600">
              Organisation Name:
            </label>
            <input
              type="text"
              id="organisationName"
              name="organisationName"
              value={profileData.organisationName}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

        
<div className="mb-4">
  <label htmlFor="organisationLogo" className="block text-sm font-medium text-gray-600">
    Organisation Logo (URL):
  </label>

  <div className="mt-1 relative rounded-md shadow-sm">
    <input
      type="text"
      id="organisationLogo"
      name="organisationLogo"
      value={profileData.organisationLogo.url}
      readOnly
      className="focus:ring-blue-500 focus:border-blue-500 block w-full p-2 pr-10 sm:text-sm border-gray-300 rounded-md"
    />
    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
      <img
        src={profileData.organisationLogo.url}
        alt="Organisation Logo"
        className="w-10 h-10 object-cover rounded-full"
      />
    </div>
  </div>

  <div className="mt-4">
    <button
      onClick={() => setIsModalOpen(true)}
      className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
    >
      Change Logo
    </button>
  </div>
</div>

<div className="mb-4">
  <button
    type="submit"
    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
  >
    Update Profile
  </button>
</div>
</form>

{/* Modal */}
{isModalOpen && (
  <div className="fixed z-10 inset-0 overflow-y-auto">
    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div className="fixed inset-0 transition-opacity" aria-hidden="true">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
        &#8203;
      </span>

      <div
        className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-full sm:max-w-lg"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="mt-3 text-center sm:mt-0 sm:text-left">
            <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
              Change Logo
            </h3>
            <div className="mt-2">
              <OrganisationLogo onSubmit={submitLogo} onCancel={handleSave} />
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            onClick={handleSave}
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
)}
</div>
</div>
);
};

export default EmployerProfile;

