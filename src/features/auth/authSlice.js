import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null,
    profile:null},
    reducers: {
        setCredentials: (state, action) => {
            // console.log(action.payload);
            const { accessToken, profile } = action.payload;
            // console.log(accessToken);
            state.token = accessToken;
            state.profile = profile;
            
        },

        logout: (state, action) => {
            state.token = null
        state.profile = null;
        }
    }
})

export default authSlice.reducer;
export const { setCredentials, logout,  } = authSlice.actions
export const currentToken = (state) => state?.auth?.token;
export const profilePicture = (state) => state?.auth?.profile;
// export const currentUser = (state) => state?.auth?.user;
// export const currentStatus = (state) => state?.auth?.status;