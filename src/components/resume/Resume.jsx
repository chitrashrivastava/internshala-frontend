import React from "react";
import Education from "./Education/Education";
import { Outlet } from "react-router-dom";
import Jobs from "./Experience/Jobs/Jobs";
import Internships from "./Experience/Internships/Internship";
import Responsibility from "./Responsibility/Responsibility";
import Skill from "./Skills/Skills";
import Project from "./Projects/Project";
import Achievement from "./Achievements/Achievement";

const Resume = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800 text-center">Resume</h1>

        <div className="mb-8">
          <Education />
        </div>

        <div className="mb-8">
          <div>
            <Jobs />
          </div>
          <div>
            <Internships />
          </div>
        </div>

        <div className="mb-8">
          <Responsibility />
        </div>

        <div className="mb-8">
          <Skill />
        </div>

        <div className="mb-8">
          <Project />
        </div>

        <div className="mb-8">
          <Achievement />
        </div>
      </div>
    </div>
  );
};

export default Resume;
