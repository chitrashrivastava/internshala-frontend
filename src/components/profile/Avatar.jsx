import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncOrganisationLogo, asynccurrentUserEmployee } from "../../store/Actions/userAction";

const OrganisationLogo = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useSelector((state) => state.user);

  const submitLogo = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('organisationLogo', e.target.elements.organisationLogo.files[0]);

    dispatch(asyncOrganisationLogo(user._id, formData));
    dispatch(asynccurrentUserEmployee());
    setIsModalOpen(false);
  };

 

  return (
    <div className="mb-4">
      <label htmlFor="organisationLogo" className="block text-sm font-medium text-gray-600">
        Organisation Logo (URL):
      </label>

      <div className="mt-1 relative rounded-md shadow-sm">
        <form onSubmit={submitLogo}>
          <input
            type="file"
            id="organisationLogo"
            name="organisationLogo"
            
            className="focus:ring-blue-500 focus:border-blue-500 block w-full p-2 pr-10 sm:text-sm border-gray-300 rounded-md"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <img
              src={user.organisationLogo.url}
              alt="Organisation Logo"
              className="w-10 h-10 object-cover rounded-full"
            />
          </div>
          <div className="mt-4">
        <button
         type="submit" onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Update Logo
        </button>
      </div>
        </form>
      </div>

     
    </div>
  );
};

export default OrganisationLogo;
