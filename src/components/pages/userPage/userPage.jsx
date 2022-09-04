import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import Qualities from "../../ui/qualities";
import EditUserPage from "../editUserPage/editUserPage";
import { useHistory, useParams } from "react-router-dom";

const UserPage = ({ userId }) => {
    const params = useParams();
    const isEdit = params.edit;
    const history = useHistory();
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);
    const handleClick = () => {
        history.push(`/users/${userId}/edit`);
    };
    const handleReturn = () => {
        setUser();
        api.users.getById(userId).then((data) => setUser(data));
        history.replace(`/users/${userId}`);
    };
    if (user) {
        return (
            <>
                {isEdit
                    ? <div className="container mt-5">
                        <div className="row">
                            <div className="col-md-6 offset-md-3 shadow p-4">
                                <EditUserPage user={user} onReturn={handleReturn}/>
                            </div>
                        </div>
                    </div>
                    : <div>
                        <h1> {user.name}</h1>
                        <h2>Профессия: {user.profession.name}</h2>
                        <Qualities qualities={user.qualities} />
                        <p>completedMeetings: {user.completedMeetings}</p>
                        <h2>Rate: {user.rate}</h2>
                        <button onClick={handleClick}> Изменить</button>
                    </div>
                }
            </>
        );
    } else {
        return <h3>loading...</h3>;
    }
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
