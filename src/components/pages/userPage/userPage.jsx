import React from "react";
import PropTypes from "prop-types";
import EditUserPage from "../editUserPage/editUserPage";
import UserCard from "../../ui/userCard";
import QualitiesCard from "../../ui/qualitiesCard";
import MeetingsCard from "../../ui/meetingsCard";
import Comments from "../../ui/comments";
import { useUsers } from "../../../hooks/useUsers";
import CommentsProvider from "../../../hooks/useComments";

const UserPage = ({ userId }) => {
    const { getUserById } = useUsers();
    const user = getUserById(userId);
    if (user) {
        return (
            <>
                     <div className="container">
                        <div className="row gutters-sm">
                            <div className="col-md-4 mb-3">
                                <UserCard user={user}/>
                                <QualitiesCard qualities={user.qualities} />
                                <MeetingsCard meetings={user.completedMeetings}/>
                            </div>
                            <CommentsProvider>
                                <Comments />
                            </CommentsProvider>
                        </div>
                    </div>
                
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
