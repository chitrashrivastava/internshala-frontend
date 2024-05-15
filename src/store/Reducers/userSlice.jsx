import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAuth: false,

};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        saveStudent: (state, action) => {
            console.log(action.payload)
            state.user = action.payload;
            state.isAuth = true;
        },
        saveEmployee:(state,action)=>{
            console.log(action.payload)
            state.user = action.payload;
            state.isAuth = true;
        },
        saveAvatar:(state,action)=>{
            state.user.avatar=action.payload
        },
        saveOrganisationLogo:(state,action)=>{
            state.user.organisationLogo=action.payload
        },
        removeUser: (state, action) => {
            state.user = null;
            state.isAuth = false;
        },
        saveEducation: (state, action) => {
            state.user.resume.education=action.payload
          },
        removeEducation: (state) => {
            state.education = [];
          },
        saveJob:(state,action)=>{
            state.user.resume.jobs=action.payload
        },
        saveInternship:(state,action)=>{
            state.user.resume.internships=action.payload
        },
        saveResponsibility:(state,action)=>{
            state.user.resume.responsibility=action.payload
        },
        saveSkill:(state,action)=>{
            state.user.resume.skills=action.payload
        },
        saveProject:(state,action)=>{
            state.user.resume.projects=action.payload
        },
        saveAchievement:(state,action)=>{
            state.user.resume.achievements=action.payload
        },
        savePostInternship:(state,action)=>{
            state.user.internships=action.payload
        },
        savePostJob:(state,action)=>{
            state.user.job=action.payload
        }

    },
});

export const { saveStudent,saveEmployee, removeUser,saveEducation, removeEducation,saveJob,saveInternship,saveResponsibility,saveSkill,saveProject,saveAchievement,saveAvatar,savePostInternship,savePostJob,saveOrganisationLogo } = userSlice.actions;

export default userSlice.reducer;