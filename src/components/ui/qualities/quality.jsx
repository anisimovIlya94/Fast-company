import React from "react";
import PropTypes from "prop-types";
import { useQualities } from "../../../hooks/useQualities";

const Quality = ({ quality }) => {
    const { getQuality } = useQualities();
    const qual = getQuality(quality);
    return (
        <span className={"badge m-2 bg-" + qual.color}>
            {qual.name}
        </span>
    );
};
Quality.propTypes = {
    quality: PropTypes.string
};
export default Quality;
