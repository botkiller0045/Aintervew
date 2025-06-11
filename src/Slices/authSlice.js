import { createSlice } from "@reduxjs/toolkit";

const initial_state = {
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
    user_details: localStorage.getItem("user_details") ? JSON.parse(localStorage.getItem("user_details")) : null,
};

const auth_slice = createSlice({
    name: "auth",
    initialState: initial_state,
    reducers:{
        set_token(state, value){
            state.token = value.payload;
        },
        set_user_details(state, value){
            state.user_details = value.payload;
        }
    }
});

export const {set_token, set_user_details} = auth_slice.actions;
export default auth_slice.reducer;