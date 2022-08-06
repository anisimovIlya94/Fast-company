import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import Bookmark from "./bookmark";
import QualitiesList from "./qualitiesList";
import Table from "./table";

const UsersTable = ({
    users,
    onSort,
    selectedSort,
    onBookmark,
    onDelete,
    onSortIcon
}) => {
    useEffect(() => {
        handleColumnIcon(selectedSort.iter);
    }, []);
    const columns = {
        name: { path: "name", name: "Имя", choised: false },
        quality: {
            name: "Качества",
            component: (user) => (
                <QualitiesList qualities={user.qualities} />
            )
        },
        profession: { path: "profession.name", name: "Профессия", choised: false },
        completedMeetings: { path: "completedMeetings", name: "Встретился,раз", choised: false },
        rate: { path: "rate", name: "Оценка", choised: false },
        bookmark: {
            path: "bookmark",
            name: "Избранное",
            component: (user) => (
                <Bookmark
                    bookmark={ user.bookmark }
                    onClick={ () => onBookmark(user._id) }
                />
            ),
            choised: false
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
    const [columnWithIcon, setColumnWithIcon] = useState(columns);
    const handleColumnIcon = (item) => {
        const columnsWhithChoisedColumn = { ...columns };
        columnsWhithChoisedColumn[item].choised = true;
        setColumnWithIcon(columnsWhithChoisedColumn);
    };
    return (
        <Table onSort={onSort} selectedSort={selectedSort} columns={columnWithIcon} data={users} renderColumnIcon={handleColumnIcon}>
            <TableHeader {...{ onSort, selectedSort, onSortIcon }} columns={columnWithIcon} renderColumnIcon={handleColumnIcon}/>
            <TableBody {...{ columns, data: users }}/>
        </Table>
    );
};
UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onBookmark: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onSortIcon: PropTypes.func.isRequired
};
export default UsersTable;
