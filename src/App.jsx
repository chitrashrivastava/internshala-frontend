import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Navigate, useParams } from "react-router-dom";
import Home from "./components/home/Home";
import SignupStudent from "./components/signup/SignupStudent";
import SignUpEmployer from "./components/signup/SignupEmployer";
import Signin from "./components/signin/Signin";

import { useDispatch, useSelector, useStore } from "react-redux";
import {
  asynccurrentUserStudent,
  asyncremoveUserStudent,
  asynccurrentUserEmployee,
} from "./store/Actions/userAction";
import Navigation from "./components/navigation/Nav";
import Notfound from "./components/notFound/Notfound";
import Unauthorized from "./components/notFound/Unauthorized";
import Internships from "./components/internships/Internships";
import Jobs from "./components/jobs/Jobs";
import Myapplication from "./components/myapplication/Myapplication";
import ForgetPassword from "./components/password/Forget";
import ResetPassword from "./components/password/Reset";
import Resume from "./components/resume/Resume";
import HelpCenterContent from "./components/help/Helpcenter";
import SafetyTipsContent from "./components/safety/Safetytips";
import EditResponsibilityModal from "./components/resume/Responsibility/EditResponsibilityModal";
import PostInternship from "./components/Post/PostInternship";
import PostJob from "./components/Post/PostJob";
import EmployerProfile from "./components/profile/EmployerProfile";
import EditProfile from "./components/resume/Education/EditProfile";
import ReadInternships from "./components/read/ReadInternship";
import ReadJobs from "./components/read/ReadJobs";

const App = () => {
  const store = useStore();
  const { user, isAuth } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
const [studentDataFetched, setStudentDataFetched] = useState(false);
const [employeeDataFetched, setEmployeeDataFetched] = useState(false);
useEffect(() => {
  const fetchData = async () => {
    if (isAuth) {
      if (!user) {
        await dispatch(asynccurrentUserEmployee());
        return;
      }

      if (user.role === "student" && !studentDataFetched) {
        await dispatch(asynccurrentUserStudent());
        setStudentDataFetched(true);
      } else if (user.role === "employee" && !employeeDataFetched) {
        await dispatch(asynccurrentUserEmployee());
        setEmployeeDataFetched(true);
      }
    }
  };

  fetchData();
}, [isAuth, user, dispatch, navigate, studentDataFetched, employeeDataFetched]);


  const LogoutHandler = () => {
    console.log("click");
    dispatch(asyncremoveUserStudent());
    
  };

  return (
    <div className="h-screen w-full">
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration/employer" element={<SignUpEmployer />} />
        <Route path="/registration/student" element={<SignupStudent />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/internships" element={isAuth &&user&&user.role==="student"?<Internships/>:<Unauthorized/>}/>
        <Route path="/jobs" element={isAuth &&user&&user.role==="student"?<Jobs/>:<Unauthorized/>}/>
        <Route path="/helpcenter" element={<HelpCenterContent/>}/>
        <Route path="/myapplication" element={isAuth ?<Myapplication/>:<Unauthorized/>}/>
        <Route path="/forgetpassword" element={<ForgetPassword/>}/>
        <Route path="/user/student/forget-link/:id" element={<ResetPassword userType="student" />} />
        <Route path="/user/employee/forget-link/:id" element={<ResetPassword userType="employee" />
} />

        <Route path="/post-internship" element={isAuth &&user &&user.role==='employee'?<PostInternship/>:<Unauthorized/>}/>
        <Route path="/post-job" element={isAuth &&user &&user.role==='employee'?<PostJob/>:<Unauthorized/>}/>
        <Route path="/safetytips" element={<SafetyTipsContent/>}/>
      <Route path="/edit-profile/:id" element={isAuth && user &&user.role=="student"?<EditProfile/>:<Unauthorized/>}/>
      <Route path="/read-internship" element={isAuth &&user &&user.role==='employee'?<ReadInternships/>:<Unauthorized/>}/>
      <Route path="/read-job" element={isAuth &&user &&user.role==='employee'?<ReadJobs/>:<Unauthorized/>}/>

          <Route
          path="/employer/edit-profile"
          element={isAuth && user && user.role === "employee" ? <EmployerProfile /> : <Unauthorized />}
        />
        <Route path="/student/edit-resume" element={isAuth &&user &&user.role==='student'?<Resume/>:<Unauthorized/>}>
        <Route path="responsibility/edit/:index" element={<EditResponsibilityModal />} />


        </Route>
        <Route path="*" element={<Notfound />} />
      </Routes>
    </div>
  );
};

export default App;