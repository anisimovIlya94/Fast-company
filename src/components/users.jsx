import React, { useState } from "react";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import User from "./user";
import PropTypes from "prop-types";

const Users = ({ users, ...rest }) => {
    const count = users.length;
    const pageSize = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const usersCrop = paginate(users, currentPage, pageSize);
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const userOfUsersList = usersCrop.map((user) => {
        return <User key={user._id} {...user} {...rest} />;
    });

    return (
        <>
            {count > 0 && (
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
            )}
            <Pagination
                itemCount={count}
                pageSize={pageSize}
                onPageChange={handlePageChange}
                currentPage={currentPage}
            />
        </>
    );
};
Users.propTypes = {
    users: PropTypes.array.isRequired
};
export default Users;
