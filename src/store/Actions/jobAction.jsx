
import axios from '../../config/axios';
import { savejobs,appliedjobs } from '../Reducers/jobSlice';
export const asyncreadJobs = () => async (dispatch, getState) => {
    try {
        try {
            const { data } = await axios.get("/user/jobs");
            dispatch(savejobs(data.jobs));
            return data
        } catch (error) {
            console.log(error.response.data);
        }
    } catch (error) {
        console.log(error)
    }
};

export const asyncapply = (id) => async (dispatch, getState) => {
    try {
        const { data } = await axios.post(`/user/student/apply/job/${id}`);
        dispatch(appliedjobs(true));
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
            console.log(error.response.data.message);
        } else {
            console.log(error.message);
        }
    }
};