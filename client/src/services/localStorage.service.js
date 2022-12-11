const TOKEN_KEY = "jwt-token";
const REFRESH_KEY = "jwt-refresh-token";
const EXPIRES_KEY = "jwt-expires";
const USERID_KEY = "user-id-key";

export const setTokens = ({
    accessToken,
    expiresIn = 3600,
    refreshToken,
    userId
}) => {
    const expiresDate = new Date().getTime() + expiresIn * 1000;
    localStorage.setItem(TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_KEY, refreshToken);
    localStorage.setItem(EXPIRES_KEY, expiresDate);
    localStorage.setItem(USERID_KEY, userId);
};

const getAccessToken = () => {
    return localStorage.getItem(TOKEN_KEY);
};

const getRefreshToken = () => {
    return localStorage.getItem(REFRESH_KEY);
};

const getExpiresDateToken = () => {
    return localStorage.getItem(EXPIRES_KEY);
};
const getUserIdToken = () => {
    return localStorage.getItem(USERID_KEY);
};

const removeAuthData = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(EXPIRES_KEY);
    localStorage.removeItem(USERID_KEY);
};

const localStorageService = {
    setTokens,
    getAccessToken,
    getRefreshToken,
    getExpiresDateToken,
    getUserIdToken,
    removeAuthData
};

export default localStorageService;
