import React, { useState, useEffect } from "react";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import User from "./user";
import PropTypes from "prop-types";
import GroupList from "./groupList";
import SearchStatus from "./searchStatus";
import api from "../api";

const Users = ({ users, ...rest }) => {
    const pageSize = 2;
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    useEffect(() => {
        api.professions.fetchAll().then((data) => { setProfessions(data); });
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);
    const filteredUsers = selectedProf ? users.filter((user) => user.profession._id === selectedProf._id) : users;
    const count = filteredUsers.length;
    const usersCrop = paginate(filteredUsers, currentPage, pageSize);
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const userOfUsersList = usersCrop.map((user) => {
        return <User key={user._id} {...user} {...rest} />;
    });
    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
    };
    const clearFilter = () => {
        setSelectedProf();
    };
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
            {count > 0 && (
                <div className="d-flex flex-column">
                    <SearchStatus usersQuantity={count} />
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="name">Имя</th>
                                <th scope="quality">Качества</th>
                                <th scope="profession">Профессия</th>
                                <th scope="completedMeetings">Встретился,раз</th>
                                <th scope="rate">Оценка</th>
                                <th scope="rate">Избранное</th>
                                <th scope="button"></th>
                            </tr>
                        </thead>
                        <tbody>{userOfUsersList}</tbody>
                    </table>
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemCount={count}
                            pageSize={pageSize}
                            onPageChange={handlePageChange}
                            currentPage={currentPage} />
                    </div>
                </div>
            )}
        </div>
    );
};
Users.propTypes = {
    users: PropTypes.array.isRequired
};
export default Users;
