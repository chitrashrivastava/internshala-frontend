import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { asyncsignupStudent } from "../../store/Actions/userAction";
import { useNavigate } from "react-router-dom";
import {  toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const SignupStudent = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        firstname: "",
        lastname: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const signupuser = async () => {
        try {
            if (!formData.email || !formData.password || formData.firstname.length < 4 || formData.lastname.length < 4) {
                throw new Error("All fields are required, and firstname/lastname must be at least 4 characters long");
            }

            await dispatch(asyncsignupStudent(formData));
            navigate('/signin');
        } catch (error) {
            console.error("Signup failed", error);
            toast.error(error.message || "Signup failed. Please try again.", {
                position: "top-center",
            });
        }
    };

  

    return (
        <div className="student-signup flex flex-col justify-center items-center w-full h-screen bg-gray-100">
            <div className="signup-container bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-center mb-4">Sign up and apply for free</h1>
                <p className="text-gray-600 mb-8 text-center">1,50,000+ companies hiring on Internshala</p>


               

                <div className="form">
                    <div className="email mb-4">
                        <p className="text-sm text-gray-600 mb-1">Email</p>
                        <input
                            type="email"
                            name="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={handleChange} 
                            className="p-2 border rounded-md w-full"
                        />
                    </div>
                    <div className="password mb-4">
                        <p className="text-sm text-gray-600 mb-1">Password</p>
                        <input
                            type="password"
                            name="password" required
                            placeholder="Must be at least 6 characters long"
                            value={formData.password}
                            onChange={handleChange}
                            className="p-2 border rounded-md w-full"
                        />
                    </div>
                    <div className="name flex mb-4">
                        <div className="first flex-1 mr-2">
                            <p className="text-sm text-gray-600 mb-1">First Name</p>
                            <input
                                type="text"
                                name="firstname" 
                                placeholder="First Name"
                                value={formData.firstname}
                                onChange={handleChange}
                                className="p-2 border rounded-md w-full"
                            />
                        </div>
                        <div className="last flex-1 ml-2">
                            <p className="text-sm text-gray-600 mb-1">Last Name</p>
                            <input
                                type="text"
                                name="lastname" 
                                placeholder="Last Name"
                                value={formData.lastname}
                                onChange={handleChange}
                                className="p-2 border rounded-md w-full"
                            />
                        </div>
                    </div>
                    <button
            onClick={signupuser}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Sign up
          </button>

                </div>
            </div>
        </div>
    );
};

export default SignupStudent;
