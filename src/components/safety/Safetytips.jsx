import React from 'react';

const SafetyTipsContent = () => {
  return (
    <div className="container mx-auto my-8">
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Safety Tips</h1>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Online Safety</h2>
          <div className="mb-4">
            <h3 className="text-xl font-medium mb-2 text-gray-800">1. Use Strong Passwords</h3>
            <p className="text-gray-600">Ensure your passwords are strong and unique for each online account. Use a combination of letters, numbers, and symbols.</p>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-medium mb-2 text-gray-800">2. Be Cautious with Personal Information</h3>
            <p className="text-gray-600">Avoid sharing sensitive personal information online. Be cautious about the information you provide on social media and other platforms.</p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Offline Safety</h2>
          <div className="mb-4">
            <h3 className="text-xl font-medium mb-2 text-gray-800">1. Be Aware of Your Surroundings</h3>
            <p className="text-gray-600">Stay vigilant and aware of your surroundings, especially when in unfamiliar places. Trust your instincts and prioritize your safety.</p>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-medium mb-2 text-gray-800">2. Emergency Contacts</h3>
            <p className="text-gray-600">Keep a list of emergency contacts, and make sure someone knows your whereabouts. In case of an emergency, share your location with a trusted friend or family member.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyTipsContent;
