import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    jobs: null,
    appliedjobs:[]
    
};

export const jobSlice = createSlice({
    name: "job",
    initialState,
    reducers: {
        savejobs: (state, action) => {
            state.jobs = action.payload;
        },
        removejobs: (state, action) => {
            state.jobs = null;
        },
        appliedjobs: (state, action) => { // Corrected the action name
            state.appliedjobs = action.payload; // Updated the state property
        }
    },
});


export const { savejobs, removejobs,appliedjobs } = jobSlice.actions;

export default jobSlice.reducer;