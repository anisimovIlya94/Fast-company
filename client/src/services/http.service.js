import axios from "axios";
import { toast } from "react-toastify";
import configFile from "../config.json";
import { authService } from "./auth.service";
import localStorageService, { setTokens } from "./localStorage.service";

const http = axios.create({
    baseURL: configFile.endPoint
});

http.interceptors.request.use(
    async function (config) {
        if (configFile.isFireBase) {
            const containSlash = /\/$/gi.test(config.url);
            config.url =
                (containSlash ? config.url.slice(0, -1) : config.url) + ".json";
            const refreshToken = localStorageService.getRefreshToken();
            const expiresDate = localStorageService.getExpiresDateToken();
            if (refreshToken && expiresDate < Date.now()) {
                const data = await authService.refresh();
                setTokens({
                    idToken: data.id_token,
                    expiresIn: data.expires_in,
                    refreshToken: data.refresh_token,
                    localId: data.user_id
                });
            }
            const accessToken = localStorageService.getAccessToken();
            if (accessToken) {
                config.params = { ...config.params, auth: accessToken };
            }
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

const transformer = (data) => {
    if (data && !data._id) {
        return Object.keys(data).map((key) => {
            return { ...data[key] };
        });
    } else {
        return data;
    }
};

http.interceptors.response.use(
    (res) => {
        if (configFile.isFireBase) {
            res.data = { content: transformer(res.data) };
        }
        return res;
    },
    function (error) {
        const expectedErrors =
            error.response &&
            error.response.status >= 400 &&
            error.response.status < 500;
        if (!expectedErrors) {
            toast.error("Something was wrong. Try it later");
        }
        return Promise.reject(error);
    }
);

const httpServices = {
    get: http.get,
    put: http.put,
    post: http.post,
    delete: http.delete,
    patch: http.patch
};

export default httpServices;
