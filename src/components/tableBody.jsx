import React from "react";
import PropTypes from "prop-types";
// import { Link } from "react-router-dom";
import _ from "lodash";

const TableBody = ({ columns, data }) => {
    const renderComponent = (item, column) => {
        if (columns[column].component) {
            const component = columns[column].component;
            if (typeof component === "function") {
                return component(item);
            }
            return component;
        }
        return _.get(item, columns[column].path);
    };
    return (
        <tbody>
            {data.map((item) => (
                <tr key={item._id}>
                    {Object.keys(columns).map((column) => {
                        return (<td key={column}>{renderComponent(item, column)}</td>);
                    })
                    }
                </tr>
            ))}
        </tbody>
    );
};
TableBody.propTypes = {
    columns: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired
};
export default TableBody;
