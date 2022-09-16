import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import EditUserPage from "../editUserPage/editUserPage";
import UserCard from "../../ui/userCard";
import QualitiesCard from "../../ui/qualitiesCard";
import MeetingsCard from "../../ui/meetingsCard";
import Comments from "../../ui/comments";
import { useHistory, useParams } from "react-router-dom";
import BackHistory from "../../common/table/backHistory";

const UserPage = ({ userId }) => {
    const params = useParams();
    const isEdit = params.edit;
    const history = useHistory();
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);
    const handleClick = useCallback(() => {
        history.push(`/users/${userId}/edit`);
    }, [history, userId]);
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
                        <BackHistory/>
                        <div className="row">
                            <div className="col-md-6 offset-md-3 shadow p-4">
                                <EditUserPage user={user} onReturn={handleReturn}/>
                            </div>
                        </div>
                    </div>
                    : <div className="container">
                        <div className="row gutters-sm">
                            <div className="col-md-4 mb-3">
                                <UserCard user={user} onChange={handleClick}/>
                                <QualitiesCard qualities={user.qualities} />
                                <MeetingsCard meetings={user.completedMeetings}/>
                            </div>
                            <Comments />
                        </div>
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
