import React from "react";
import { useHistory } from "react-router-dom";

const BackHistory = () => {
    const history = useHistory();
    return (
        <div className="d-grid gap-2 d-md-flex justify-content-md-start">
            <button className="btn btn-primary ms-2" type="button" onClick={() => { history.goBack(); }}>
                <i className="bi bi-caret-left"></i>
                Назад
            </button>
        </div>
    );
};

export default BackHistory;
