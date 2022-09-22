import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Comment from "../common/comments/comment";
import AddCommentForm from "../common/comments/addCommentForm";
import _ from "lodash";
import api from "../../api";

const Comments = () => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState("");
    const { userId } = useParams();
    useEffect(() => {
        api.comments.fetchCommentsForUser(userId).then((data) => {
            setComments(data);
        });
        setLoading(true);
    }, []);
    const handleDelete = (id) => {
        api.comments.remove(id);
        setComments(comments.filter((comment) => {
            return comment._id !== id;
        }));
    };
    const handleSubmit = (comment) => {
        api.comments.add({ ...comment, pageId: userId }).then((data) => {
            setComments((prevState) => [...prevState, data]);
        });
    };
    const handleLoad = (state) => {
        if (loading) {
            setLoading(state);
        } else {
            return null;
        }
    };
    const sortedCommets = _.orderBy(comments, ["created_at"], ["desc"]);
    return (
        <div className="col-md-8">
            <AddCommentForm onSubmit={handleSubmit}/>
            {comments.length > 0
                ? <div className="card mb-3">
                    <div className="card-body">
                        <h2>Comments</h2>
                        <hr />
                        <div className="card-body mb-3">
                            {(loading) ? <h5>...loading</h5> : null}
                            <div className="row">
                                <div className="col">
                                    {comments.length > 0 && sortedCommets.map((comment) => {
                                        return (<div className="mb-3" key={comment._id}>
                                            <Comment data={comment} onDelete={handleDelete} onLoad={handleLoad}/>
                                        </div>);
                                    })
                                    };
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                : null}
        </div>
    );
};

export default Comments;
