import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { toast } from "react-toastify";
import userService from "../services/user.service";
import localStorageService, {
    setTokens
} from "../services/localStorage.service";
import { useHistory } from "react-router-dom";

const AuthContext = React.createContext();

export const httpAuth = axios.create({
    baseURL: "https://identitytoolkit.googleapis.com/v1/",
    params: {
        key: process.env.REACT_APP_FIREBASE_KEY
    }
});

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const [error, setError] = useState(null);
    const [currentUser, setUser] = useState();
    const [isLoading, setLoading] = useState(true);
    const history = useHistory();
    const randomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    const signUp = async ({ email, password, ...rest }) => {
        try {
            const { data } = await httpAuth.post(`accounts:signUp`, {
                email,
                password,
                returnSecureToken: true
            });
            console.log(data);
            setTokens(data);
            await createUser({
                _id: data.localId,
                email,
                rate: randomInt(1, 5),
                image: `https://avatars.dicebear.com/api/avataaars/${(
                    Math.random() + 1
                )
                    .toString(36)
                    .substring(7)}.svg`,
                completedMeetings: randomInt(0, 200),
                ...rest
            });
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;
            if (code === 400) {
                if (message === "EMAIL_EXISTS") {
                    const errorObject = {
                        email: "Пользователь с таким Email уже существует"
                    };
                    throw errorObject;
                }
            }
        }
    };
    const signIn = async ({ email, password }) => {
        try {
            const { data } = await httpAuth.post(
                `accounts:signInWithPassword`,
                { email, password, returnSecureToken: true }
            );
            setTokens(data);
            await getUserData();
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;
            if (code === 400) {
                if (
                    message === "INVALID_PASSWORD" ||
                    message === "EMAIL_NOT_FOUND"
                ) {
                    throw new Error("Email или пароль введены некорректно");
                }
                if (message === "TOO_MANY_ATTEMPTS_TRY_LATER") {
                    throw new Error(
                        "Слишком много попыток входа, попробуйте позднее"
                    );
                }
            }
        }
    };
    function logOut() {
        localStorageService.removeAuthData();
        setUser();
        history.push("/");
    };
    const userUpdate = async (data) => {
        try {
            const { content } = await userService.update(data)
            console.log(content)
        } catch (error) {
            errorCatcher(error);
        }
    }
    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);
    useEffect(() => {
        if (localStorageService.getAccessToken()) {
            getUserData();
        } else {
            setLoading(false);
        }
    }, []);
    const getUserData = async () => {
        try {
            const { content } = await userService.getCurrentUser();
            setUser(content);
        } catch (error) {
            errorCatcher(error);
        } finally {
            setLoading(false);
        }
    };
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
    return (
        <AuthContext.Provider value={{ signUp, currentUser, signIn, logOut, userUpdate }}>
            {!isLoading ? children : "Loading..."}
        </AuthContext.Provider>
    );
};
AuthProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
export default AuthProvider;
