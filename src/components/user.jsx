import React from "react";
import QualitiesList from "./qualitiesList";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

const User = ({ userInfo }) => {
    const history = useHistory();
    const handleSave = () => {
        history.replace("/users");
    };
    return (
        userInfo &&
     <>
         <h1>{userInfo.name}</h1>
         <h2>{`Профессия:` + " " + userInfo.profession.name}</h2>
         <QualitiesList qualities={userInfo.qualities} />
         <h5>{`completedMeetings:` + " " + userInfo.completedMeetings}</h5>
         <h2>{`Rate:` + " " + userInfo.rate}</h2>
         <button onClick={() => handleSave()}>Все пользователи</button>
     </>
    );
};
User.propTypes = {
    userInfo: PropTypes.object.isRequired
};
export default User;
