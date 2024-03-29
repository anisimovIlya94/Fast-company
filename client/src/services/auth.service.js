import axios from "axios";
import localStorageService from "./localStorage.service";
import config from "../config.json";

const httpAuth = axios.create({
    baseURL: config.endPoint + "/auth/",
    params: {
        key: process.env.REACT_APP_FIREBASE_KEY
    }
});

export const authService = {
    register: async (payload) => {
        const { data } = await httpAuth.post(`signUp`, payload);
        return data;
    },
    logIn: async ({ email, password }) => {
        const { data } = await httpAuth.post(`signInWithPassword`, {
            email,
            password
            // returnSecureToken: true
        });
        return data;
    },
    refresh: async () => {
        const { data } = await httpAuth.post("token", {
            grant_type: "refresh_token",
            refresh_token: localStorageService.getRefreshToken()
        });
        return data;
    }
};
