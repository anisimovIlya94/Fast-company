import React, { useEffect, useState } from "react";
import RenderUserImage from "../../ui/renderUserImage";
import commentDate from "../../../utils/date";
import api from "../../../api";
import PropTypes from "prop-types";

const Comment = ({ data, onDelete, onLoad }) => {
    const [commenter, setCommenter] = useState("");
    useEffect(() => {
        api.users.getById(data.userId).then((user) => {
            setCommenter(user.name);
        });
    }, []);
    useEffect(() => {
        if (commenter) {
            onLoad(false);
        }
    }, [commenter]);
    return (
        commenter &&
   <div className="d-flex flex-start bg-light">
       <RenderUserImage />
       <div
           className="flex-grow-1 flex-shrink-1">
           <div className="mb-4">
               <div
                   className="d-flex justify-content-between align-items-center">
                   <p className="mb-1">
                       {commenter}
                       <span className="small ms-3" >
                           {commentDate(data.created_at)}
                       </span>
                   </p>
                   <button
                       className="
                       btn btn-sm
                       text-primary
                       d-flex
                       align-items-center
                   "
                       onClick={() => onDelete(data._id)}>
                       <i
                           className="
                           bi bi-x-lg
                       "
                       ></i>
                   </button>
               </div>
               <p className="small mb-0">
                   {data.content}
               </p>
           </div>
       </div>
   </div>
    );
};
Comment.propTypes = {
    data: PropTypes.object,
    onDelete: PropTypes.func,
    onLoad: PropTypes.func
};

export default Comment;
