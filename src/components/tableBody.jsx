import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
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
                        if (column !== "name") {
                            return (<td key={column}>{renderComponent(item, column)}</td>);
                        } else {
                            return (<td key={column}>{<Link to={`users/${item._id}`}>{renderComponent(item, column)}</Link>}</td>);
                        }
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
