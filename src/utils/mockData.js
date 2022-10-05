import { useState, useEffect } from "react";
import professions from "../mockData/professions.json";
import qualities from "../mockData/qualities.json";
import users from "../mockData/users.json";
import httpServices from "../services/http.service";

const useMockData = () => {
    const statusConsts = {
        idle: "Not started",
        pending: "In process",
        successed: "Ready",
        error: "Error occured"
    };
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(statusConsts.idle);
    const [count, setCount] = useState(0);
    const [progress, setProgress] = useState(0);
    const summaryProgress = professions.length + qualities.length + users.length;
    const updateProgress = () => {
        if (count !== 0 && status === statusConsts.idle) {
            setStatus(statusConsts.pending);
        }
        const newProgress = Math.floor((count / summaryProgress) * 100);
        if (progress < newProgress) {
            setProgress(() => newProgress);
        }
        if (newProgress === 100) {
            setStatus(statusConsts.successed);
        }
    };
    useEffect(() => {
        updateProgress();
    }, [count]);
    const initialize = async () => {
        try {
            for (const prof of professions) {
                await httpServices.put("profession/" + prof._id, prof);
                setCount((prevState) => prevState + 1);
            }
            for (const user of users) {
                await httpServices.put("user/" + user._id, user);
                setCount((prevState) => prevState + 1);
            }
            for (const qual of qualities) {
                await httpServices.put("quality/" + qual._id, qual);
                setCount((prevState) => prevState + 1);
            }
        } catch (error) {
            setError(error);
            setStatus(statusConsts.error);
        }
    };
    return { error, initialize, progress, status };
};
export default useMockData;
