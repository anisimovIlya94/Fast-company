import React, { useEffect, useState } from "react";
import RenderUserImage from "../../ui/renderUserImage";
import commentDate from "../../../utils/date";
import { useUsers } from "../../../hooks/useUsers";
import PropTypes from "prop-types";
import { useAuth } from "../../../hooks/useAuth";

const Comment = ({ data, onDelete }) => {
    // console.log(data)
    const { getUserById } = useUsers();
    const { currentUser } = useAuth();
    const user = getUserById(data.userId)
    return (
   <div className="d-flex flex-start bg-light">
       <RenderUserImage image={user.image}/>
       <div
           className="flex-grow-1 flex-shrink-1">
           <div className="mb-4">
               <div
                   className="d-flex justify-content-between align-items-center">
                   <p className="mb-1">
                       {user.name}
                       <span className="small ms-3" >
                           {commentDate(data.created_at)}
                       </span>
                        </p>
                        {currentUser._id === data.userId && 
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
                    </button>}
                   
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
