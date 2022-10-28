import { createAction, createSlice } from "@reduxjs/toolkit";
import { authService } from "../services/auth.service";
import localStorageService from "../services/localStorage.service";
import userService from "../services/user.service";
import { generateAuthError } from "../utils/generateAuthError";
import getRandomInt from "../utils/getRandomInt";
import history from "../utils/history";

const initialState = localStorageService.getAccessToken()
    ? {
        entities: null,
        isLoading: true,
        error: null,
        auth: { userId: localStorageService.getUserIdToken() },
        isLoggedIn: true,
        isDataLoaded: false
    }
    : {
        entities: null,
        isLoading: false,
        error: null,
        auth: null,
        isLoggedIn: false,
        isDataLoaded: false
    };

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        usersRequested: (state) => {
            state.isLoading = true;
        },
        usersRecived: (state, action) => {
            state.entities = action.payload;
            state.isDataLoaded = true;
            state.isLoading = false;
        },
        usersRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        authRequestSuccess: (state, action) => {
            state.auth = action.payload;
            state.isLoggedIn = true;
        },
        authRequestFailed: (state, action) => {
            state.error = action.payload;
        },
        userCreated: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            }
            state.entities.push(action.payload);
        },
        userLoggedOut: (state) => {
            state.entities = null;
            state.auth = null;
            state.isLoggedIn = false;
            state.isDataLoaded = false;
        },
        userUpdated: (state, action) => {
            const updatedIndex = state.entities.findIndex(
                (u) => u._id === action.payload._id
            );
            state.entities[updatedIndex] = action.payload;
            state.isLoading = false;
        },
        authRequested: (state) => {
            state.error = null;
        }
    }
});

const userCreateRequested = createAction("users/userCreateRequested");
const userCreateFailed = createAction("users/userCreateFailed");
const userUpdateRequested = createAction("users/userUpdateRequested");
const userUpdateRequestFailed = createAction("users/userUpdateRequestFailed");

const { reducer: usersReducer, actions } = usersSlice;
const {
    usersRequested,
    usersRecived,
    usersRequestFailed,
    authRequestSuccess,
    authRequestFailed,
    userCreated,
    userLoggedOut,
    userUpdated,
    authRequested
} = actions;

export const getUsersList = () => (state) => state.users.entities;

export const updateUser = (data) => async (dispatch) => {
    dispatch(userUpdateRequested());
    try {
        const { content } = await userService.update(data);
        dispatch(userUpdated(content));
        history.push(`/users/${content._id}`);
    } catch (error) {
        dispatch(userUpdateRequestFailed(error.message));
    }
};

export const logOut = () => (dispatch) => {
    localStorageService.removeAuthData();
    dispatch(userLoggedOut());
    history.push("/");
};

export const getUserById = (userId) => (state) => {
    return state.users.entities.find((user) => user._id === userId);
};

export const signUp =
    ({ email, password, ...rest }) =>
        async (dispatch) => {
            dispatch(authRequested());
            try {
                const data = await authService.register({ email, password });
                localStorageService.setTokens(data);
                dispatch(authRequestSuccess({ userId: data.localId }));
                dispatch(
                    createUser({
                        _id: data.localId,
                        email,
                        rate: getRandomInt(1, 5),
                        image: `https://avatars.dicebear.com/api/avataaars/${(
                            Math.random() + 1
                        )
                            .toString(36)
                            .substring(7)}.svg`,
                        completedMeetings: getRandomInt(0, 200),
                        ...rest
                    })
                );
            } catch (error) {
                dispatch(authRequestFailed(error.message));
            }
        };

export const logIn =
    ({ payload, redirect }) =>
        async (dispatch) => {
            const { email, password } = payload;
            dispatch(authRequested());
            try {
                const data = await authService.logIn({ email, password });
                dispatch(authRequestSuccess({ userId: data.localId }));
                localStorageService.setTokens(data);
                history.push(redirect);
            } catch (error) {
                const { message, code } = error.response.data.error;
                if (code === 400) {
                    const errorMessage = generateAuthError(message);
                    console.log(message);
                    console.log(errorMessage);
                    dispatch(authRequestFailed(errorMessage));
                } else {
                    dispatch(authRequestFailed(error.message));
                }
            }
        };

function createUser(data) {
    return async function (dispatch) {
        dispatch(userCreateRequested());
        try {
            const { content } = await userService.create(data);
            dispatch(userCreated(content));
            history.push("/users");
        } catch (error) {
            dispatch(userCreateFailed());
        }
    };
}

export const loadUsersList = () => async (dispatch) => {
    dispatch(usersRequested());
    try {
        const { content } = await userService.get();
        dispatch(usersRecived(content));
    } catch (error) {
        dispatch(usersRequestFailed(error.message));
    }
};

export const getLoggedInStatus = () => (state) => state.users.isLoggedIn;
export const getDataStatus = () => (state) => state.users.isDataLoaded;
export const getCurrentUserId = () => (state) => state.users.auth.userId;
export const getLoadingStatus = () => (state) => state.users.isLoading;
export const getAuthError = () => (state) => state.users.error;

export const getCurrentUserData = () => (state) => {
    if (state.users.entities) {
        return state.users.entities.find(
            (u) => u._id === state.users.auth.userId
        );
    }
};

export default usersReducer;
