import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { toast } from "react-toastify";
import userService from "../services/user.service";
import { setTokens } from "../services/localStorage.service";

const AuthContext = React.createContext();

const httpAuth = axios.create();

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const [error, setError] = useState(null);
    const [currentUser, setUser] = useState({});
    const signUp = async ({ email, password, ...rest }) => {
        try {
            const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`;
            const { data } = await httpAuth.post(url, { email, password, returnSecureToken: true });
            console.log(data);
            setTokens(data);
            createUser({ id: data.localId, ...rest });
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;
            if (code === 400) {
                if (message === "EMAIL_EXISTS") {
                    const errorObject = { email: "Пользователь с таким Email уже существует" };
                    throw errorObject;
                }
            }
        }
    };
    const signIn = async ({ email, password }) => {
        try {
            const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`;
            const { data } = await httpAuth.post(url, { email, password, returnSecureToken: true });
            console.log(data);
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;
            if (code === 400) {
                if (message === "EMAIL_NOT_FOUND") {
                    const errorObject = { email: "Пользователя с таким Email не существует" };
                    throw errorObject;
                } else if (message === "INVALID_PASSWORD") {
                    const errorObject = { password: "Неверный пароль" };
                    throw errorObject;
                }
            }
        }
    };
    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);
    async function createUser(data) {
        try {
            const { content } = await userService.create(data);
            setUser(content);
        } catch (error) {
            errorCatcher(error);
        }
    }
    const errorCatcher = (error) => {
        const { message } = error.response.data;
        setError(message);
    };
    return (<AuthContext.Provider value={{ signUp, currentUser, signIn }}>
        { children }
    </AuthContext.Provider>
    );
};
AuthProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
export default AuthProvider;
