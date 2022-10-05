const TOKEN_KEY = "jwt-token";
const REFRESH_KEY = "jwt-refresh-token";
const EXPIRES_KEY = "jwt-expires";

export const setTokens = ({ idToken, expiresIn = 3600, refreshToken, localId }) => {
    const expiresDate = new Date().getTime() + expiresIn * 1000;
    localStorage.setItem(TOKEN_KEY, idToken);
    localStorage.setItem(REFRESH_KEY, refreshToken);
    localStorage.setItem(EXPIRES_KEY, expiresDate);
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

const localStorageService = {
    setTokens,
    getAccessToken,
    getRefreshToken,
    getExpiresDateToken
};

export default localStorageService;
