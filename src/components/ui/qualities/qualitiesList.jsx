import React, { useEffect } from "react";
import Quality from "./quality";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
    getQualitiesByIds,
    getQualitiesStatus,
    loadQualitiesList
} from "../../../store/qualities";

const QualitiesList = ({ qualities }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadQualitiesList());
    }, []);
    const isLoading = useSelector(getQualitiesStatus());
    const qualitiesList = useSelector(getQualitiesByIds(qualities));
    if (isLoading) {
        return "Loading...";
    }
    if (!isLoading) {
        return (
            <>
                {qualitiesList.map((quality) => (
                    <Quality key={quality._id} {...quality} />
                ))}
            </>
        );
    } else {
        return "Loading...";
    }
};
QualitiesList.propTypes = {
    qualities: PropTypes.array.isRequired
};
export default QualitiesList;
