import React, { useState } from "react";
import Users from "./components/users";
import SearchStatus from "./components/searchStatus";
import api from "./api";
import "bootstrap/dist/css/bootstrap.css";

function App() {
    const [users, setUsers] = useState(api.users.fetchAll());
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
            <SearchStatus usersQuantity={users.length} />
            <Users
                users={users}
                onDelete={handleDelete}
                onBookmark={handleToggleBookmark}
            />
        </>
    );
}

export default App;
