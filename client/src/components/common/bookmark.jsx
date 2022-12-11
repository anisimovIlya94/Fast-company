import React from "react";
import PropTypes from "prop-types";

const Bookmark = ({ bookmark, ...rest }) => {
    const bool = Boolean(bookmark);
    const buttonStyle = {
        margin: "0px 0px 0px 25px"
    };
    return (
        <button style={buttonStyle} {...rest}>
            {!bool
                ? (
                    <i className="bi bi-heart"></i>
                )
                : (
                    <i className="bi bi-heart-fill"></i>
                )}
        </button>
    );
};
Bookmark.propTypes = {
    bookmark: PropTypes.bool
};
export default Bookmark;
