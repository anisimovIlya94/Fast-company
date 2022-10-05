import React from "react";
import Quality from "./quality";
import PropTypes from "prop-types";
import { useQualities } from "../../../hooks/useQualities";

const QualitiesList = ({ qualities }) => {
    const { isLoading } = useQualities();
    if (!isLoading) {
        return (
            <>
                {qualities.map((quality) => (
                    <Quality key={quality} quality={quality} />
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
