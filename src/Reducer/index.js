import { combineReducers } from "@reduxjs/toolkit";
import auth_reducer from "../Slices/authSlice";

const root_reducer = combineReducers({
    auth: auth_reducer,
})

export default root_reducer;