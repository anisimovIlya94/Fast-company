import React, { useState, useEffect } from "react";
import { paginate } from "../../utils/paginate";
import Pagination from "../pagination";
import PropTypes from "prop-types";
import GroupList from "../groupList";
import SearchStatus from "../searchStatus";
import UsersTable from "../usersTable";
import _ from "lodash";
import api from "../../api";
import { useParams } from "react-router-dom";
import User from "../user";

const Users = () => {
    const [routingUser, setRoutingUser] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
    const [users, setUsers] = useState();
    const pageSize = 6;
    const { userId } = useParams();
    const handleGetUserById = (id) => {
        api.users.getById(id).then((data) => {
            setRoutingUser(data);
        });
    };
    useEffect(() => {
        api.users.fetchAll().then((data) => { setUsers(data); });
    }, []);
    const handleDelete = (id) => {
        setUsers(
            users.filter((user) => {
                return user._id !== id;
            })
        );
    };
    const handleToggleBookmark = (id) => {
        setUsers(
            users.map((user) => {
                if (user._id === id) {
                    return { ...user, bookmark: !user.bookmark };
                }
                return user;
            })
        );
    };
    useEffect(() => {
        api.professions.fetchAll().then((data) => { setProfessions(data); });
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
    };
    const handleSort = (item) => {
        setSortBy(item);
    };
    if (users) {
        const filteredUsers = selectedProf ? users.filter((user) => user.profession._id === selectedProf._id) : users;
        const sortedUsers = _.orderBy(filteredUsers, [sortBy.iter], [sortBy.order]);
        const count = filteredUsers.length;
        const usersCrop = paginate(sortedUsers, currentPage, pageSize);
        const clearFilter = () => {
            setSelectedProf();
        };
        if (userId) {
            handleGetUserById(userId);
            if (routingUser) {
                if (userId === routingUser._id) {
                    return <User userInfo={routingUser} />;
                }
                return <h3>loading...</h3>;
            }
            return <h3>loading...</h3>;
        }
        return (
            <div className="d-flex flex-row">
                {professions &&
                    <div className="d-flex flex-column flex-shrink-0 m-3">
                        <GroupList
                            items={professions}
                            selectedItem = {selectedProf}
                            onItemSelect={handleProfessionSelect} />
                        <button className="btn btn-secondary mt-2" onClick={clearFilter}> Очистить </button>
                    </div>
                }
                <div className="d-flex flex-column">
                    <SearchStatus usersQuantity={count} />
                    {count > 0 && (
                        <UsersTable users={usersCrop} onSort={handleSort} selectedSort={sortBy} onDelete={handleDelete} onBookmark={handleToggleBookmark}/>
                    )}
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemCount={count}
                            pageSize={pageSize}
                            onPageChange={handlePageChange}
                            currentPage={currentPage} />
                    </div>
                </div>
            </div>
        );
    }
    return <h3>loading...</h3>;
};
Users.propTypes = {
    users: PropTypes.array
};
export default Users;
