import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { asyncsigninStudent, asyncsigninEmployer, asyncSignInWithGoogle } from "../../store/Actions/userAction";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("student");
  const [formError, setFormError] = useState(null);

  const switchTab = (tab) => {
    setActiveTab(tab);
  };

  const LoginHandler = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setFormError("Please fill in all required fields.");
      return;
    }

    // Clear previous form error
    setFormError(null);

    if (activeTab === "student") {
      dispatch(asyncsigninStudent({ email, password }));
      navigate('/');
    } else {
      dispatch(asyncsigninEmployer({ email, password }));
      navigate('/');
    }
  };

  const handleForgotPassword = () => {
    navigate('/forgetpassword')
  };



  const handleGoogleAuthError = () => {
    console.log("Google authentication failed");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-md shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-6 text-center">Sign In</h2>

        <div className="flex mb-4">
          <button
            className={`flex-1 py-2 px-4 rounded-tl-md rounded-bl-md ${
              activeTab === "student" ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"
            }`}
            onClick={() => switchTab("student")}
          >
            Student
          </button>
          <button
            className={`flex-1 py-2 px-4 rounded-tr-md rounded-br-md ${
              activeTab === "employer" ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"
            }`}
            onClick={() => switchTab("employer")}
          >
            Employer
          </button>
        </div>

        <form>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email:</label>
            <input
              type="text"
              className={`w-full p-3 border rounded-md ${formError && !email ? "border-red-500" : ""}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password:</label>
            <input
              type="password"
              className={`w-full p-3 border rounded-md ${formError && !password ? "border-red-500" : ""}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="text-right mt-2">
              <button
                className="text-blue-500 hover:underline"
                onClick={handleForgotPassword}
              >
                Forgot Password?
              </button>
            </div>
          </div>

          {formError && (
            <div className="text-red-500 mb-4 text-center">{formError}</div>
          )}

          <button
            type="submit"
            className="bg-blue-500 text-white py-3 px-6 rounded-md w-full"
            onClick={LoginHandler}
          >
            Sign In
          </button>

          
        </form>
      </div>
    </div>
  );
};

export default Signin;
