import React, { useState, useEffect } from "react";
import Users from "./components/users";
import api from "./api";
import "bootstrap/dist/css/bootstrap.css";

function App() {
    const [users, setUsers] = useState([]);
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
    return (
        <>
            <Users
                users={users}
                onDelete={handleDelete}
                onBookmark={handleToggleBookmark}
            />
        </>
    );
}

export default App;
