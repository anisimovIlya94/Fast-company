import axios from "axios";
import { toast } from "react-toastify";
import configFile from "../config.json";

const http = axios.create({
    baseURL: configFile.endPoint
});

// axios.defaults.baseURL = configFile.endPoint;

http.interceptors.request.use(
    function (config) {
        if (configFile.isFireBase) {
            const containSlash = /\/$/gi.test(config.url);
            config.url = (containSlash ? config.url.slice(0, -1) : config.url) + ".json";
            return config;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

const transformer = (data) => {
    if (data) {
        return Object.keys(data).map((key) => {
            return { ...data[key] };
        });
    } else {
        return [];
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
    delete: http.delete
};

export default httpServices;
