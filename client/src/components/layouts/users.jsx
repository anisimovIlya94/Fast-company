import React from "react";
import { useParams, Redirect } from "react-router-dom";
import UserPage from "../pages/userPage";
import UsersListPage from "../pages/usersListPage";
import EditUserPage from "../pages/editUserPage";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "../../store/users";
import UsersLoader from "../ui/hoc/usersLoader";
const Users = () => {
    const params = useParams();
    const { userId, edit } = params;
    const currentUserId = useSelector(getCurrentUserId());
    return (
        <>
            <UsersLoader>
                {userId ? (
                    edit ? (
                        userId === currentUserId ? (
                            <EditUserPage />
                        ) : (
                            <Redirect to={`/users/${currentUserId}/edit`} />
                        )
                    ) : (
                        <UserPage userId={userId} />
                    )
                ) : (
                    <UsersListPage />
                )}
            </UsersLoader>
        </>
    );
};

export default Users;
