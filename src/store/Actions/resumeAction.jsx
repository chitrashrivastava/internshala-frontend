import axios from '../../config/axios';
import { saveEducation, saveJob,saveInternship,saveAvatar,saveResponsibility,saveSkill, saveProject, saveAchievement } from '../Reducers/userSlice';
import { asynccurrentUserStudent } from './userAction';

export const asyncGetResume = () => async (dispatch) => {
  try {
    console.log('Fetching education data...');
    const response = await axios.get('/resume');
    const education = response.data?.resume?.education || [];
    const job = response.data?.resume?.jobs || [];
    const internship = response.data?.resume?.internships || [];
    const responsibility = response.data?.resume?.responsibility || [];
    const skill = response.data?.resume?.skills || [];
    const project = response.data?.resume?.projects || [];
    const achievement = response.data?.resume?.achievements || [];
    const avatar=response.data?.avatar||""
    dispatch(saveEducation(education));
    dispatch(saveJob(job))
    dispatch(saveInternship(internship))
    dispatch(saveResponsibility(responsibility))
    dispatch(saveSkill(skill))
    dispatch(saveProject(project))
    dispatch(saveAchievement(achievement))
    dispatch(saveAvatar(avatar))

  } catch (error) {
    console.error(error.response?.data?.message || error.message);
  }
};
export const asyncUploadAvatar = (id, avatar) => async (dispatch) => {
  try {
    const response = await axios.post(`/user/student/avatar/${id}`, avatar, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(response);
    
    dispatch(asynccurrentUserStudent());
    console.log('Avatar updated successfully:');
  } catch (error) {
    console.error(error.response?.data?.message || error.message);
  }
};
export const asyncAddEdu = (educationData) => async (dispatch) => {
  try {
    const response = await axios.post('/resume/add-education', educationData);
    console.log(response)
    console.log('Job added successfully:');

  } catch (error) {
    console.error(error.response?.data?.message || error.message);
  }
};
export const asyncAddProject = (projectData) => async (dispatch) => {
  try {
    const response = await axios.post('/resume/add-projects', projectData);
    console.log(response)
    console.log('Project added successfully:');

  } catch (error) {
    console.error(error.response?.data?.message || error.message);
  }
};

export const asyncEditjob = (id,updatedData) => async (dispatch) => {
  try {
    const response = await axios.post(`/resume/edit-job/${id}`, updatedData);
    console.log(response)
    dispatch(saveJob())
    dispatch(asyncGetResume())
    console.log('Job updated successfully:');

  } catch (error) {
    console.error(error.response?.data?.message || error.message);
  }
};

export const asyncEditEdu = (id, updatedData) => async (dispatch) => {
  try {
    const response = await axios.post(`/resume/edit-education/${id}`, updatedData);
    console.log('Education edited successfully:', response);
      dispatch(saveEducation());
      dispatch(asyncGetResume())

  } catch (error) {
    console.error('Error editing education:', error.response?.data?.message || error.message);
  }
};
export const asyncEditProject = (id, updatedData) => async (dispatch) => {
  try {
    const response = await axios.post(`/resume/edit-project/${id}`, updatedData);
    console.log('Project edited successfully:', response);
      dispatch(saveProject());
      dispatch(asyncGetResume())

  } catch (error) {
    console.error('Error editing project:', error.response?.data?.message || error.message);
  }
};

export const asyncDeleteEdu = (id, updatedData) => async (dispatch) => {
    try {
      const { data } = await axios.post(`/resume/delete-education/${id}`, updatedData);
      dispatch(saveEducation(data.education));
      dispatch(asyncGetResume());

    } catch (error) {
      console.error(error.response.data.message || error.message);
    }
  };
  
  export const asyncDeleteProject = (id, updatedData) => async (dispatch) => {
    try {
      const { data } = await axios.post(`/resume/delete-project/${id}`, updatedData);
      dispatch(saveProject(data.projects));
      dispatch(asyncGetResume());

    } catch (error) {
      console.error(error.response.data.message || error.message);
    }
  };
  

export const asyncDeleteJob = (id, updatedData) => async (dispatch) => {
  try {
    const { data } = await axios.post(`/resume/delete-job/${id}`, updatedData);
    dispatch(saveJob(data.jobs));
    dispatch(asyncGetResume());

  } catch (error) {
    console.error(error.response.data.message || error.message);
  }
};

  export const asyncAddJob=(jobData)=>async(dispatch)=>{
    try {
      const response = await axios.post('/resume/add-jobs',jobData);
      console.log('Job added successfully:', response);

      dispatch(saveJob());
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  }

  export const asyncAddInternship=(internshipData)=>async(dispatch)=>{
    try {
      const response = await axios.post('/resume/add-internships',internshipData);
      console.log('Internship added successfully:', response);

      dispatch(saveInternship());
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  }
export const asyncAddResponsibility = (responsibilityData) => async (dispatch) => {
  try {
    const response = await axios.post('/resume/add-responsibility', { responsibility: responsibilityData });
    console.log('Responsibility added successfully:', response);
    dispatch(saveResponsibility());
  } catch (error) {
    console.error(error.response?.data?.message || error.message);
  }
};

export const asyncAddAchievement = (achievementData) => async (dispatch) => {
  try {
    const response = await axios.post('/resume/add-achievement', { achievements: achievementData });
    console.log('Achievement added successfully:', response);
    dispatch(saveAchievement());
  } catch (error) {
    console.error(error.response?.data?.message || error.message);
  }
};
export const asyncAddSkills = (skillData) => async (dispatch) => {
  try {
    const response = await axios.post('/resume/add-skills', { skill: skillData });
    console.log('Skill added successfully:', response);
    dispatch(saveSkill());
  } catch (error) {
    console.error(error.response?.data?.message || error.message);
  }
};

export const asyncEditResponsibility = (responsibilityData, index) => async (dispatch) => {
  try {
      const response = await axios.post(`/resume/edit-responsibility/${index}`, { responsibility: responsibilityData });
      console.log('Responsibility updated successfully:', response);
      dispatch(saveResponsibility());
      dispatch(asyncGetResume())

  } catch (error) {
      console.error(error.response?.data?.message || error.message);
  }
};

  export const asyncEditInternship = (id, updatedData) => async (dispatch) => {
    try {
      const response = await axios.post(`/resume/edit-internship/${id}`, updatedData);
      console.log('Internship edited successfully:', response);
        dispatch(saveInternship());
        dispatch(asyncGetResume())
  
    } catch (error) {
      console.error('Error editing internship:', error.response?.data?.message || error.message);
    }
  };
  export const asyncDeleteInternship = (id, updatedData) => async (dispatch) => {
    try {
      const { data } = await axios.post(`/resume/delete-internship/${id}`, updatedData);
      dispatch(saveInternship(data.internships));
      dispatch(asyncGetResume());
  
    } catch (error) {
      console.error(error.response.data.message || error.message);
    }
  };

export const asyncDeleteResponsibility = (index, updatedData) => async (dispatch) => {
  try {
    const { data } = await axios.post(`/resume/delete-responsibility/${index}`, { updatedData });
    console.log(data);
    dispatch(saveResponsibility(data.responsibility));
    dispatch(asyncGetResume());
  } catch (error) {
    console.error(error.response?.data?.message || error.message);
  }
};
export const asyncDeleteAchievement = (index, updatedData) => async (dispatch) => {
  try {
    const { data } = await axios.post(`/resume/delete-achievement/${index}`, { updatedData });
    console.log(data);
    dispatch(saveResponsibility(data.achievements));
    dispatch(asyncGetResume());
  } catch (error) {
    console.error(error.response?.data?.message || error.message);
  }
};

export const asyncDeleteSkill = (index, updatedData) => async (dispatch) => {
  try {
    const { data } = await axios.post(`/resume/delete-skill/${index}`, { updatedData });
    console.log(data);
    dispatch(saveSkill(data.skills));
    dispatch(asyncGetResume());
  } catch (error) {
    console.error(error.response?.data?.message || error.message);
  }
};
