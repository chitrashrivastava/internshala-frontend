import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronLeft, faCircleChevronRight } from '@fortawesome/free-solid-svg-icons';
import LatestInternships from "./LatestInternship/LatestInternship";
import LatestJobs from "./LatestJobs/LatestJobs";
import Company from "./Companies/Company";
import Footer from "../footer/Footer";


const Home = () => {
  
    const containerRef = useRef(null);
  
    const handleScroll = (scrollOffset) => {
      if (containerRef.current) {
        containerRef.current.scrollLeft += scrollOffset;
      }
    };
  
    const handleScrollLeft = () => {
      handleScroll(-400); // Adjust the scroll distance based on your design
    };
  
    const handleScrollRight = () => {
      handleScroll(400); // Adjust the scroll distance based on your design
    };
  
    return (
        <>
        <div className="home flex flex-col  justify-evenly items-center w-full h-full">
            <div className="first flex flex-col  h-full w-full justify-evenly items-center">
            <h1 className="text-6xl">Make your dream career a reality</h1>
        <h1 className="text-4xl">Trending on Internshala 🔥</h1>
        <div className="cards w-full h-[40%] pr-[10%] pl-[10%] flex flex-col items-center">
      <div
        ref={containerRef}
        className="card w-full h-[100%] flex gap-[100px] overflow-auto"
        style={{ scrollBehavior: 'smooth' }}
      >
        <img src="https://internshala.com/static/images/pgc_course_specific_banners/pgc_homepage_banner_new.png" className="w-[400px] h-[250px]" alt="" />
        <img src="https://internshala-uploads.internshala.com/banner-images/home_new/study_abroad_is-student.png.webp" className="w-[400px] h-[250px]" alt="" />
        <img src="https://internshala-uploads.internshala.com/banner-images/home_new/aditya_birla_capital-student.png.webp" className="w-[400px] h-[250px]" alt="" />
        <img src="https://internshala-uploads.internshala.com/banner-images/home_new/career_starter_internships_final-student.png.webp" className="w-[400px] h-[250px]" alt="" />
        <img src="https://internshala-uploads.internshala.com/banner-images/home_new/int_opps-student.png.webp" className="w-[400px] h-[250px]" alt="" />
      </div>
      <div className="left-right flex gap-[30px] items-center relative">
      <FontAwesomeIcon icon={faCircleChevronLeft} className="text-3xl text-blue-300" onClick={handleScrollLeft}/>
      <FontAwesomeIcon icon={faCircleChevronRight} className="text-3xl text-blue-300" onClick={handleScrollRight} />
    </div>
    </div>

            </div>
           
            </div>
         
            <LatestInternships/>
            <LatestJobs/>
            <Company/>
            <Footer/>
        </>
    )
};

export default Home;
