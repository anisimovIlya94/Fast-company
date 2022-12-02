import { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
    getLoadingStatus,
    getLoggedInStatus,
    loadUsersList
} from "../../../store/users";
import { loadQualitiesList } from "../../../store/qualities";
import { loadProfessionsList } from "../../../store/professions";

const AppLoader = ({ children }) => {
    const dispatch = useDispatch();
    const usersLoggedInStatus = useSelector(getLoggedInStatus());
    useEffect(() => {
        dispatch(loadQualitiesList());
        dispatch(loadProfessionsList());
        if (usersLoggedInStatus) {
            dispatch(loadUsersList());
        }
    }, [usersLoggedInStatus]);
    const usersLoadingStatus = useSelector(getLoadingStatus());
    if (usersLoadingStatus) return "Loading...";
    return children;
};
AppLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default AppLoader;
