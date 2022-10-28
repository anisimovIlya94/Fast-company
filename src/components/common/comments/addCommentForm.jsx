import React, { useState } from "react";
import TextField from "../form/textField";
import { useDispatch } from "react-redux";
import { createComment } from "../../../store/comments";
import { useParams } from "react-router-dom";

const AddCommentForm = () => {
    const [data, setData] = useState({});
    const { userId } = useParams();
    const dispatch = useDispatch();
    const isValid = Boolean(data);
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const handleSubmit = () => {
        dispatch(createComment({ ...data, pageId: userId }));
        setData({});
    };
    return (
        <div className="card mb-2">
            <div className="card-body">
                <div>
                    <h2>New comment</h2>
                    <TextField
                        textarea={true}
                        name="content"
                        label="Сообщение"
                        onChange={handleChange}
                        value={data.content || ""}
                    />
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button
                            onClick={handleSubmit}
                            disabled={!isValid}
                            className="btn btn-primary me-md-2"
                            type="button"
                        >
                            Опубликовать
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AddCommentForm;
