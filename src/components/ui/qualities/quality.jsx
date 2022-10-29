import React from "react";
import PropTypes from "prop-types";

const Quality = (quality) => {
    return (
        <span className={"badge m-2 bg-" + quality.color}>{quality.name}</span>
    );
};
Quality.propTypes = {
    quality: PropTypes.object
};
export default Quality;
