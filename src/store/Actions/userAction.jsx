import { saveStudent, saveEmployee, removeUser, saveOrganisationLogo } from "../Reducers/userSlice";
import axios from "../../config/axios";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export const asynccurrentUserStudent = (token) => async (dispatch, getState) => {
    try {
        const response = await axios.post("/user/student");
    
        if (response && response.data && response.data.student) {
            dispatch(saveStudent(response.data.student));
        } else {
            console.error('Invalid response format from server:', response.data);
        }
    
        return response.data;
    } catch (error) {
        console.error('Error fetching current user data:', error.response?.data || error.message);
        throw error;
    }
};

export const asynccurrentUserEmployee = () => async (dispatch, getState) => {
    try {
      const { data } = await axios.post("/user/employee");
      console.log("Employee Data:", data);
      dispatch(saveEmployee(data.employee));
      return data;
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
};
  
export const asyncsignupStudent = (user) => async (dispatch, getState) => {
    try {
        console.log(user)
        await axios.post("/user/student/signup", user);
        console.log(user)
        dispatch(asynccurrentUserStudent());
        toast.success('Student signup successful!', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
        });
    } catch (error) {
        console.log(error.response.data);
        toast.error('Student signup failed!', {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    }
};

export const asyncSignInWithGoogle = (googleToken) => async (dispatch, getState) => {
    try {
      const response = await axios.post('/user/student/signin/google', { googleToken });
      console.log(response.data);
      console.log(response.data.token)
      dispatch(asynccurrentUserStudent(response.data.token));
      toast.success('Google sign-in successful!', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
      });
    } catch (error) {
      console.error('Google sign-in failed', error.response?.data || error.message);
      toast.error('Google sign-in failed!', {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
      });
    }
};
  
export const asyncsignupEmployer = (user) => (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {
        try {
            await axios.post("/user/employee/signup", user);
            console.log(user);
            resolve(); 
            toast.success('Employer signup successful!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
            });
        } catch (error) {
            console.log(error.response.data);
            reject(error); 
            toast.error('Employer signup failed!', {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    });
};

export const asyncsigninStudent = (user) => async (dispatch, getState) => {
    try {
        const response = await axios.post("/user/student/signin", user);
        
        dispatch(asynccurrentUserStudent());
        toast.success('Student login successful!', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
        });
        return response.data;
    } catch (error) {
        console.log(error.response.data);
        toast.error('Student login failed!', {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
        throw error;
    }
};

export const asyncUpdateStudent = (user, id) => async (dispatch, getState) => {
    try {
        const response = await axios.post(`/user/student/update/${id}`, user);
        dispatch(asynccurrentUserStudent());
        toast.success('Student profile updated successfully!', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
        });
        return response.data;
    } catch (error) {
        console.log(error.response.data);
        toast.error('Error updating student profile!', {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
        throw error;
    }
};

export const asyncsigninEmployer = (user) => async (dispatch, getState) => {
    try {
        const response = await axios.post("/user/employee/signin", user);
        dispatch(asynccurrentUserEmployee());
        toast.success('Employer login successful!', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
        });
        return response.data; 
    } catch (error) {
        console.log(error.response.data);
        toast.error('Employer login failed!', {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
        throw error;
    }
};

export const asyncremoveUserStudent = () => async (dispatch, getState) => {
    try {
        await axios.get("/user/student/signout");
        dispatch(removeUser());
        toast.success('Logout successful!', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
        });
    } catch (error) {
        console.log(error.response.data);
        toast.error('Error during logout!', {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    }
};

export const asyncremoveUserEmployee = () => async (dispatch, getState) => {
    try {
        await axios.get("/user/employee/signout");
        dispatch(removeUser());
        toast.success('Logout successful!', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
        });
    } catch (error) {
        console.log(error.response.data);
        toast.error('Error during logout!', {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    }
};

export const asyncOrganisationLogo = (id, avatar) => async (dispatch) => {
    try {
      const response = await axios.post(`/user/employee/avatar/${id}`, avatar, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response);
      dispatch(asynccurrentUserEmployee());
      toast.success('Organization logo updated successfully!', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
      });
      console.log('Avatar updated successfully:');
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
      toast.error('Error updating organization logo!', {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
      });
    }
};

export const asyncUpdateEmployee = (user, id) => async (dispatch, getState) => {
    try {
        const response = await axios.post(`/user/employee/update/${id}`, user);
        dispatch(asynccurrentUserEmployee());
        toast.success('Employee profile updated successfully!', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
        });
        return response.data;
    } catch (error) {
        console.log(error.response.data);
        toast.error('Error updating employee profile!', {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
        throw error;
    }
};