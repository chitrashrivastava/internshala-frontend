import React, { useState,useRef } from "react";
import { Link } from "react-router-dom";
import Footer from "../footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { asyncsignupEmployer } from "../../store/Actions/userAction";
import { toast } from 'react-toastify';

const SignUpEmployer = () => {
    const { isAuth } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        contact: "",
    });

    const firstnameRef = useRef();
    const lastnameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const contactRef = useRef();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const resetForm = () => {
        firstnameRef.current.value = "";
        lastnameRef.current.value = "";
        emailRef.current.value = "";
        passwordRef.current.value = "";
        contactRef.current.value = "";
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await dispatch(asyncsignupEmployer(formData));
            resetForm(); 

        } catch (error) {
            console.log(error);
        

        }
    };


    return (
        <>
            <div className="flex p-10 justify-evenly employer-signup bg-[url('/image1.jpg')] bg-center bg-cover bg-no-repeat h-[80vh] w-full">
                <div className="head">
                    <h1 className="text-5xl font-bold">Hire Interns & Freshers <span className="italic font-semibold text-blue-500">faster</span></h1>
                    <h1 className="text-3xl">Post Internship for <span className="font-bold">Free</span> Now</h1>
                </div>
                <div className="form bg-white pt-[30px] pr-[20px] pl-[20px] pb-[30px] rounded-[10px] h-[60vh]">
                    <form className="flex flex-col justify-evenly gap-[20px] h-full" onSubmit={submitHandler}>
                        <div className="email">
                            <h1>Official Email Id</h1>
                            <input ref={emailRef} onChange={handleChange} name="email" type="email" placeholder="name@company.com" className="p-2 border-[1px] w-full" />
                        </div>
                        <div className="password">
                            <h1>Password</h1>
                            <input ref={passwordRef} onChange={handleChange} name="password" type="password" placeholder="Minimum 6 character" className="p-2 border-[1px] w-full" />
                        </div>
                        <div className="name flex gap-[10px]">
                            <div className="first">
                                <h1>First Name</h1>
                                <input ref={firstnameRef} onChange={handleChange} name="firstname" type="text" placeholder="First Name" className="p-2 border-[1px]" />
                            </div>
                            <div className="last">
                                <h1>Last Name</h1>
                                <input ref={lastnameRef} onChange={handleChange} name="lastname" type="text" placeholder="Last Name" className="p-2 border-[1px]" />
                            </div>
                        </div>
                        <div className="mobile">
                            <h1>Mobile Number</h1>
                            <input ref={contactRef} onChange={handleChange} name="contact" type="number" placeholder="Enter Phone number" className="p-2 border-[1px] w-full" />
                        </div>
                        <p className="text-[14px]">By clicking on <span className="font-semibold">post for free,</span>you agree our <span className="text-blue-400">T&C</span></p>
                        <button type="submit" className="bg-blue-600 text-white rounded p-2">Post for free</button>
                        <p className="text-center">
                            Already registered? <Link to='/signin' className="text-blue-500" >Login</Link>

                        </p>
                    </form>
                </div>
            </div>

            <div className="flex flex-col w-[100%] items-center ">
                <div className="w-[70%] flex flex-col p-8 gap-[50px]">

                    <h1 className="text-4xl font-bold">Why hire from Internshala?</h1>
                    <h1 className="text-xl font-semibold">Post your intern requirements and build your dream team with ease.</h1>
                    <div className="cards flex justify-evenly items-center border-[2px] border-grey rounded-[10px] h-[20vh]">
                        <div className="card">
                            <h1 className="text-4xl text-blue-500 font-bold">25 Mn+</h1>
                            <p>Candidates looking for internships</p>
                        </div>
                        <div className="w-[1px] h-[50%] bg-stone-300	"></div>
                        <div className="card">
                            <h1 className="text-4xl text-blue-500 font-bold">1.7 Mn+</h1>
                            <p>Candidates hired PAN India</p>
                        </div>
                        <div className="w-[1px] h-[50%] bg-stone-300	"></div>

                        <div className="card">
                            <h1 className="text-4xl text-blue-500 font-bold">200+</h1>
                            <p>Job Profile</p>
                        </div>
                        <div className="w-[1px] h-[50%] bg-stone-300	"></div>

                        <div className="card">
                            <h1 className="text-4xl text-blue-500 font-bold">250k+</h1>
                            <p>Companies hiring on Internshala</p>
                        </div>
                    </div>
                </div>
                <div className="w-[70%] flex flex-col items-center justify-evenly h-[50vh]">
                    <h1 className="font-bold text-3xl">Trusted by 3 Lakh+ Startups, SMEs, & MNCs</h1>
                    <div className="cards flex justify-between gap-[30px]">
                        <div className="card w-[350px] border rounded-[12px] p-4 flex justify-center  flex-col gap-3">
                            <h1 className="text-xl font-semibold">Hired Across Multiple Profile</h1>
                            <p>
                                Internshala is doing a great job of making life easier for employers. The response that I got from your platform was very impressive. It helped me identify and hire some incredibly talented folks for many profiles.
                            </p>
                            <hr />
                            <p>Manish Nichani</p>
                            <p>AirBnb</p>
                        </div>
                       <div className="card w-[350px] border rounded-[12px] p-4 flex justify-center flex-col gap-3">
                            <h1 className="text-xl font-semibold">Best hiring platform</h1>
                            <p>
                               
                        This is an amazing platform to get a quality pool of candidates in the stipulated timeframe. We have very few digital platforms to source interns round the year, and Internshala is undoubtedly the best amongst all.
                    
                            </p>
                            <hr />
                            <p>Anshul Sood</p>
                            <p>Google</p>
                        </div>
                       <div className="card w-[350px] border rounded-[12px] p-4 flex justify-center flex-col gap-3">
                            <h1 className="text-xl font-semibold">Highly recommended for Startups</h1>
                            <p>
                              
                        Internshala is a great platform to find good quality talent. Applications start coming in within a few hours and we are usually able to find someone in 2-3 days. Highly recommended!
                    
                            </p>
                            <hr />
                            <p>Pranjal Shukla</p>
                            <p>Berozgar</p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer/>
        </>
    );
};

export default SignUpEmployer;
