import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../pages/userPage";
import UsersListPage from "../pages/usersListPage";
import UserProvider from "../../hooks/useUsers";
import EditUserPage from "../pages/editUserPage/editUserPage";
import { useAuth } from "../../hooks/useAuth";
const Users = () => {
    const params = useParams();
    const { currentUser } = useAuth();
    const { userId, edit } = params;
    return (
        <>
            <UserProvider>
                {userId ? (
                    edit ? (
                        <EditUserPage />
                    ) : (
                        <UserPage userId={userId} />
                    )
                ) : (
                    <UsersListPage />
                )}
            </UserProvider>
        </>
    );
};

export default Users;
