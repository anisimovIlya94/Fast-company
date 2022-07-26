import React from "react";
import PropTypes from "prop-types";

const GroupList = ({ items, valueProperty, contentProperty, onItemSelect, selectedItem }) => {
    const itemsIsArray = Array.isArray(items);
    const arrayOfItems = itemsIsArray ? items : Object.keys(items);
    return (
        <ul className="list-group">
            {
                arrayOfItems.map((item) => {
                    const resultItem = itemsIsArray ? item : items[item];
                    return (<li key={resultItem[valueProperty]}
                        role={"button"}
                        onClick={() => { onItemSelect(resultItem); }}
                        className={"list-group-item" + (resultItem === selectedItem ? " active" : "")}>
                        {resultItem[contentProperty]}
                    </li>);
                })
            }
        </ul>
    );
};
GroupList.defaultProps = {
    valueProperty: "_id",
    contentProperty: "name"
};
GroupList.propTypes = {
    items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    valueProperty: PropTypes.string.isRequired,
    contentProperty: PropTypes.string.isRequired,
    onItemSelect: PropTypes.func,
    selectedItem: PropTypes.object
};
export default GroupList;
