import React from "react";
import RenderUserImage from "./renderUserImage";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "../../store/users";

const UserCard = ({ user }) => {
    const currentUserId = useSelector(getCurrentUserId())
    const history = useHistory();
    const handleEdit = () => {
        history.push(`/users/${user._id}/edit`);
    };
    return (
        <div className="card mb-3">
            <div className="card-body">
                {user._id === currentUserId && (
                    <button
                        className="position-absolute top-0 end-0 btn btn-light btn-sm"
                        onClick={handleEdit}
                    >
                        <i className="bi bi-gear"></i>
                    </button>
                )}
                <div className="d-flex flex-column align-items-center text-center position-relative">
                    <RenderUserImage
                        image={user.image}
                        width="165px"
                        height="155px"
                    />
                    <div className="mt-3">
                        <h4>{user.name}</h4>
                        <p className="text-secondary mb-1">
                            {user.profession.name}
                        </p>
                        <div className="text-muted">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-caret-down-fill text-primary"
                                viewBox="0 0 16 16"
                            >
                                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                            </svg>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-caret-up text-secondary"
                                viewBox="0 0 16 16"
                            >
                                <path d="M3.204 11h9.592L8 5.519 3.204 11zm-.753-.659 4.796-5.48a1 1 0 0 1 1.506 0l4.796 5.48c.566.647.106 1.659-.753 1.659H3.204a1 1 0 0 1-.753-1.659z" />
                            </svg>
                            <span className="ms-2">{user.rate}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
UserCard.propTypes = {
    user: PropTypes.object
};
export default UserCard;
