import React from "react";
import PropTypes from "prop-types";

const TableHeader = ({ onSort, selectedSort, columns, renderColumnIcon }) => {
    const renderIcon = (item) => {
        let order;
        if (selectedSort.iter === item.path) {
            order = selectedSort.order === "asc"
                ? <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
                : <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>;
        } else {
            order = <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>;
        }
        return (
            <>
                <span>{item.name}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-up-fill" viewBox="0 0 16 16">
                    {order}
                </svg>
            </>
        );
    };
    const handleSort = (item, column) => {
        if (selectedSort.iter === item) {
            onSort({ ...selectedSort, order: selectedSort.order === "asc" ? "desc" : "asc" });
        } else {
            onSort({ iter: item, order: "asc" });
        }
        renderColumnIcon(column);
    };
    return (
        <thead>
            <tr>
                {Object.keys(columns).map((column) => {
                    return (
                        <th onClick={columns[column].path ? () => { handleSort(columns[column].path, column); } : undefined}
                            scope="name"
                            key={column}
                            {...{ role: columns[column].path && "button" }}>
                            {columns[column].choised
                                ? renderIcon(columns[column])
                                : columns[column].name}
                        </th>
                    );
                })
                }
            </tr>
        </thead>
    );
};
TableHeader.propTypes = {
    onSort: PropTypes.func,
    selectedSort: PropTypes.object,
    columns: PropTypes.object,
    renderColumnIcon: PropTypes.func
};
export default TableHeader;
