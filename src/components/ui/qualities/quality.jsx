import React from "react";
import PropTypes from "prop-types";
import { useQualities } from "../../../hooks/useQualityes";

const Quality = ({ quality }) => {
    const { isLoading, getQuality } = useQualities();
    const qual = getQuality(quality);
    if (!isLoading) {
        return (
            <span className={"badge m-2 bg-" + qual.color}>
                {qual.name}
            </span>
        );
    } else {
        return "Loading...";
    }
};
Quality.propTypes = {
    quality: PropTypes.string
};
export default Quality;
