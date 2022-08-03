import React from "react";
import PropTypes from "prop-types";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import Bookmark from "./bookmark";
import QualitiesList from "./qualitiesList";

const UsersTable = ({
    users,
    onSort,
    selectedSort,
    onBookmark,
    onDelete,
    ...rest }) => {
    const columns = {
        name: { path: "name", name: "Имя" },
        quality: {
            name: "Качества",
            component: (user) => (
                <QualitiesList qualities={user.qualities} />
            )
        },
        profession: { path: "profession.name", name: "Профессия" },
        completedMeetings: { path: "completedMeetings", name: "Встретился,раз" },
        rate: { path: "rate", name: "Оценка" },
        bookmark: {
            path: "bookmark",
            name: "Избранное",
            component: (user) => (
                <Bookmark
                    bookmark={ user.bookmark }
                    onClick={ () => onBookmark(user._id) }
                />
            )
        },
        delete: {
            component: (user) =>
                (
                    <button
                    className="btn btn-danger"
                    onClick={() => onDelete(user._id)}
                >
                    delete
                </button>
            )
        }
    };
    return (
        <table className="table">
            <TableHeader {...{ onSort, selectedSort }} columns={columns}/>
            <TableBody {...{columns,data:users}}/>
        </table>
    );
};
UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired
};
export default UsersTable;
