// internshipActions.js
import axios from '../../config/axios';
import { saveInternships,appliedInternships } from '../Reducers/internshipSlice';
export const asyncreadInternships = () => async (dispatch, getState) => {
    try {
      const { data } = await axios.get("/user/student/internships");
      dispatch(saveInternships(data.internships));
        const appliedInternshipsData = await axios.get("/user/student/myapplication");
        console.log(appliedInternshipsData)
    } catch (error) {
      console.log(error.response.data);
    }
  };
export const asyncapply = (id) => async (dispatch, getState) => {
    try {
        const { data } = await axios.post(`/user/student/apply/internship/${id}`);
        console.log(data)
       
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
            console.log(error.response.data.message);
        } else {
            console.log(error.message);
        }
    }
};

export const asyncreadEmployeeInternship=()=>{
  try {
    const {data}=axios.post('/user/employee/read/internship')
    dispatch(saveSeeInternships(data.internships))
    console.log(data)
  } catch (error) {
    
  }
}