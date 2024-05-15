import React from 'react';

const HelpCenterContent = () => {
  return (
    <div className="container mx-auto my-8">
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Help Center</h1>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Frequently Asked Questions</h2>
          {/* Add your FAQ content here */}
          <div className="mb-4">
            <h3 className="text-xl font-medium mb-2 text-gray-800">How do I create an account?</h3>
            <p className="text-gray-600">To create an account, click on the "Sign Up" button and fill in the required information.</p>
          </div>
          <div>
            <h3 className="text-xl font-medium mb-2 text-gray-800">How do I apply for internships?</h3>
            <p className="text-gray-600">You can apply for internships by navigating to the "Internships" section and selecting the ones you are interested in. Click on the "Apply Now" button to submit your application.</p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Contact Us</h2>
          <p className="text-gray-600">If you have any further questions or need assistance, feel free to contact our support team at <a href="mailto:support@example.com" className="text-blue-500">support@example.com</a>.</p>
        </div>
      </div>
    </div>
  );
};

export default HelpCenterContent;
