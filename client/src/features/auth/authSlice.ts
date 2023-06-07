import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

export interface User {
    fist_name: string;
    last_name: string;
}

export interface UserResponse {
    user: User;
    token: string;
}

export interface LoginCredentials {
    username: string;
    password: string;
}

interface AuthState {
    user: User | null;
    accessToken: string | null;
}

const authSlice = createSlice({
    name: "auth",
    initialState: { user: null, accessToken: null } as AuthState,
    reducers: {
        setCredentials: (state, action) => {
            const { user, accessToken } = action.payload;

            state.user = user;
            state.accessToken = accessToken;
        },
        logOut: (state: AuthState) => {
            state.user = null;
            state.accessToken = null;
        },
    },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;

export const selectUser = (state: RootState) => state.auth.user;
export const selectAccessToken = (state: RootState) => state.auth.accessToken;
