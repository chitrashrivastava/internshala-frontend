// internshipActions.js
import axios from '../../config/axios';
import { savePostInternship, savePostJob } from '../Reducers/userSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const asyncCreateInternships = (internshipData) => async (dispatch, getState) => {
    try {
        const { data } = await axios.post("/user/employee/internship/create", internshipData);
        console.log(data);
        dispatch(savePostInternship(data.internship));
        toast.success('Internship created successfully!', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
        });
    } catch (error) {
        console.log(error.response.data);
        toast.error('Error creating internship!', {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    }
};

export const asyncCreateJob = (jobData) => async (dispatch, getState) => {
    try {
        const { data } = await axios.post("/user/employee/job/create", jobData);
        console.log(data);
        dispatch(savePostJob(data.job));
        toast.success('Job created successfully!', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
        });
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
            console.log(error.response.data.message);
            toast.error(`Error creating job: ${error.response.data.message}`, {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        } else {
            console.log(error.message);
            toast.error('Error creating job!', {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    }
};
