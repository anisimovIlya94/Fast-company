import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";

const TableHeader = ({ onSort, selectedSort, columns }) => {
	const [stateIcon,setStateIcon] = useState()
    const handleSort = (item) => {
        if (selectedSort.iter === item) {
				const order = selectedSort.order === "asc" ? "desc" : "asc";
            onSort({ ...selectedSort, order: order  });
        } else {
            onSort({ iter: item, order: "asc" });
        }
    };
    return (
        <thead>
            <tr>
                {Object.keys(columns).map((column) => (
                    <th onClick={columns[column].path ? () => { handleSort(columns[column].path); } : undefined}
                        scope="name"
                        key={column}
                        {...{ role: columns[column].path && "button" }}>
								{columns[column].name}
                    </th>
                ))}
            </tr>
        </thead>
    );
};
TableHeader.propTypes = {
    onSort: PropTypes.func,
    selectedSort: PropTypes.object,
    columns: PropTypes.object
};
export default TableHeader;
