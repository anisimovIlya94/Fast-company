import React, { useState, useEffect } from "react";
import api from "../../../api";
import SelectField from "../form/selectField";
import TextField from "../form/textField";
import PropTypes from "prop-types";

const initialData = {
    name: "",
    message: ""
};

const AddCommentForm = ({ onSubmit }) => {
    const [data, setData] = useState(initialData);
    const [names, setNames] = useState([]);
    useEffect(() => {
        api.users.fetchAll().then((data) => {
            setNames(data.map((user) => ({ label: user.name, value: user._id })));
        });
    }, []);
    const isValid = Boolean(data.name) && Boolean(data.message);
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const handleSubmit = () => {
        onSubmit({
            userId: data.name,
            content: data.message
        });
        setData(initialData);
    };
    return (
        <div className="card mb-2">
            <div className="card-body">
                <div>
                    <h2>New comment</h2>
                    <div className="mb-4">
                        <SelectField value={data.name} defaultOption="Выберите пользователя" name="name" options={names} onChange={handleChange}/>
                    </div>
                    <TextField textarea={true} name="message" label="Сообщение" onChange={handleChange} value={data.message} />
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button onClick={handleSubmit} disabled={!isValid} className="btn btn-primary me-md-2" type="button">Опубликовать</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
AddCommentForm.propTypes = {
    onSubmit: PropTypes.func
};
export default AddCommentForm;
