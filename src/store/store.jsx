import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Reducers/userSlice";
import internshipReducer from "./Reducers/internshipSlice"
import jobReducer from './Reducers/jobSlice' 
export const store = configureStore({
    reducer: {
        user: userReducer,
        internship: internshipReducer, 
        jobs:jobReducer,
    },
});