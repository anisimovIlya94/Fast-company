import React, { useEffect } from "react";
import Comment from "../common/comments/comment";
import AddCommentForm from "../common/comments/addCommentForm";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import {
    getComments,
    getCommentsStatus,
    loadCommentsList,
    removeComment
} from "../../store/comments";
import { useParams } from "react-router-dom";

const Comments = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadCommentsList(userId));
    }, [userId]);
    const comments = useSelector(getComments());
    const isLoading = useSelector(getCommentsStatus());
    const handleDelete = (id) => {
        dispatch(removeComment(id));
    };
    const sortedCommets = _.orderBy(comments, ["created_at"], ["desc"]);
    return (
        <div className="col-md-8">
            <AddCommentForm />
            {!isLoading ? (
                <div className="card mb-3">
                    <div className="card-body">
                        <h2>Comments</h2>
                        <hr />
                        <div className="card-body mb-3">
                            <div className="row">
                                <div className="col">
                                    {comments.length > 0 &&
                                        sortedCommets.map((comment) => {
                                            return (
                                                <div
                                                    className="mb-3"
                                                    key={comment._id}
                                                >
                                                    <Comment
                                                        data={comment}
                                                        onDelete={handleDelete}
                                                    />
                                                </div>
                                            );
                                        })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                "Loading..."
            )}
        </div>
    );
};

export default Comments;
