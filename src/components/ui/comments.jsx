import React from "react";
import Comment from "../common/comments/comment";
import AddCommentForm from "../common/comments/addCommentForm";
import _ from "lodash";
import { useComments } from "../../hooks/useComments";

const Comments = () => {
    const { comments, removeComment } = useComments();
    const handleDelete = (id) => {
        removeComment(id)
        // api.comments.remove(id);
        // setComments(comments.filter((comment) => {
        //     return comment._id !== id;
        // }));
    };
    const sortedCommets = _.orderBy(comments, ["created_at"], ["desc"]);
    return (
        <div className="col-md-8">
            <AddCommentForm />
            {comments.length > 0
                ? <div className="card mb-3">
                    <div className="card-body">
                        <h2>Comments</h2>
                        <hr />
                        <div className="card-body mb-3">
                            <div className="row">
                                <div className="col">
                                    {comments.length > 0 && sortedCommets.map((comment) => {
                                        return (<div className="mb-3" key={comment._id}>
                                            <Comment data={comment} onDelete={handleDelete}/>
                                        </div>);
                                    })
                                    }
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
