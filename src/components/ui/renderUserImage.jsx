import React from "react";
import PropTypes from "prop-types";

const RenderUserImage = ({ image, width, height }) => {
    return (
        <img
            src={image}
            className="rounded-circle shadow-1-strong me-3"
            alt="avatar"
            style={{ width: width, height: height }}
            width="65px"
            height="150px"
        />
    );
};
RenderUserImage.defaultProps = {
    width: "65px",
    height: "65px"
};
RenderUserImage.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string
};
export default RenderUserImage;
