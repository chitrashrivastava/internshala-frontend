
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { asynccurrentUserEmployee, asynccurrentUserStudent, asyncremoveUserEmployee, asyncremoveUserStudent, asyncsigninEmployer, asyncsigninStudent } from "../../store/Actions/userAction";


const Navigation = () => {
    const { isAuth, user } = useSelector((state) => state.user);
    console.log(user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            if (user?.role === "student") {
                await dispatch(asynccurrentUserStudent());
            } else if(user?.role==="employee"){
                await dispatch(asynccurrentUserEmployee());
            }
        };
    
        fetchData();
    }, [dispatch]); // Include user.role as a dependency if it's used inside the effect
    
    
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false); // State to manage dropdown visibility
    const openProfileDropdown = () => {
        setProfileDropdownOpen(true);
    };

    const closeProfileDropdown = () => {
        setProfileDropdownOpen(false);
    };

    const toggleProfileDropdown = () => {
        setProfileDropdownOpen(!profileDropdownOpen);
    };

    const LogoutHandler = (role) => {
        console.log(`${role} Logout clicked`);
        if (role === "student") {
            dispatch(asyncremoveUserStudent()); // Logout for student
        } else if(role==="employee"){
            dispatch(asyncremoveUserEmployee()); // Logout for employer
        }
        navigate('/');
        closeProfileDropdown(); // Close the dropdown after logout
    };

    return (
        <>
            <div className="nav flex items-center w-full justify-evenly shadow-md h-[10vh] sticky top-[0%] z-[100] bg-white">
                <nav className="p-5 flex items-center justify-evenly w-full">
                    <Link to='/'>
                        <span className="text-blue-400">INTERN</span><span>SHALA</span>
                    </Link>
                    {!user && (
    <>
        <Link to='/internships'>Internships</Link>
        <Link to='/jobs'>Jobs</Link>
    </>
)}

{user?.role === "student" && (
    <>
        <Link to='/internships'>Internships</Link>
        <Link to='/jobs'>Jobs</Link>
    </>
)}

{user?.role === "employee" && (
    <>
        <Link to='/post-internship'>Post Internship</Link>
        <Link to='/post-job'>Post Job</Link>
    </>
)}

                           
                    <div className="btn flex justify-evenly gap-[15px]">
                        {!isAuth && (
                            <>
                                <button className="p-1 border-blue-500 rounded border-[1px] text-blue-500 pr-3 pl-3" onClick={() => navigate('/signin')}>Login</button>
                                <button className="bg-blue-500 p-1 text-white rounded pr-2 pl-2" onClick={() => navigate('/registration/student')}>Candidate Sign-up</button>
                                <button className="bg-blue-500 p-1 text-white rounded pr-2 pl-2" onClick={() => navigate('/registration/employer')}>Employer Sign-up</button>
                            </>
                        )}

                        {isAuth && (
                            <div className="relative inline-">
                                <button onClick={toggleProfileDropdown} className="bg-blue-500 p-1 text-white rounded pr-2 pl-2 focus:outline-none">
                                    <i className="fas fa-user"></i> 
                                </button>
                                {profileDropdownOpen && (
                                    <div className="flex flex-col justify-center items-center gap-[10px] p-2 absolute right-[1%] mt-[25px] bg-white border shadow-lg w-[200px]">
                                        <button onClick={() => LogoutHandler(user?.role)} className="px-4 py-2 text-gray-800 hover:bg-gray-200 w-full">Logout</button>
                                        <Link to='/' className="px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-center">Home</Link>
                                        {user?.role === "student" ? (
                                            <>
                                             <Link to='/student/edit-resume' className="px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-center">Edit Resume</Link>
                                            <Link to='/myapplication' className="px-4 py-2 text-gray-800 hover:bg-gray-200 text-center w-full">My Applications</Link>

                                            </>
                                           
                                        ) : (
                                            <>
                                                <Link to='/employer/edit-profile' className="px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-center">Edit Profile</Link>
                                                <Link to='/read-internship' className="px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-center">Read Internship</Link>
                                                <Link to='/read-job' className="px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-center">Read Job</Link>


                                            </>
                                        
                                        )}
                                        <Link to='/safetytips' className="px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-center">Safety Tips</Link>
                                       
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </nav>
            </div>
        </>
    );
};
export default Navigation;