// internshipSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  internships: null,
  appliedInternships: [], // New state property to store applied internships
};

export const internshipSlice = createSlice({
  name: "internship",
  initialState,
  reducers: {
    saveInternships: (state, action) => {
      state.internships = action.payload;
    },
    removeInternships: (state, action) => {
      state.internships = null;
    },
    appliedInternships: (state, action) => {
      state.appliedInternships = action.payload;
    },
   
  },
});

export const { saveInternships, removeInternships, appliedInternships } = internshipSlice.actions;

export default internshipSlice.reducer;
