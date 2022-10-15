import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { nanoid } from "nanoid";
import { useAuth } from "./useAuth";
import { useParams } from "react-router-dom";
import commentService from "../services/comment.service";
import { toast } from "react-toastify";

const CommentsContext = React.createContext();

export const useComments = () => {
    return useContext(CommentsContext);
};

const CommentsProvider = ({ children }) => {
    const [comments, setComments] = useState([]);
    const { currentUser } = useAuth();
    const { userId } = useParams();
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const errorCatcher = (error) => {
        const { message } = error.response.data;
        setError(message);
    };
    const createComment = async (data) => {
        const comment = {
            ...data,
            created_at: Date.now(),
            userId: currentUser._id,
            pageId: userId,
            _id: nanoid()
        }
        try {
            const { content } = await commentService.createComment(comment)
            setComments((prevState) => [...prevState, content]) 
        } catch (error) {
            errorCatcher(error);
        }
        
    };
    const getComments = async () => {
        try {
            const { content } = await commentService.getComments(userId)
            setComments(content);
        } catch (error) {
            errorCatcher(error);
        } finally {
            setLoading(false)
        }
    }
    const removeComment = async (commentId) => {
        try {
            const { content } = await commentService.removeComment(commentId);
            console.log(content)
            if (content === null) {
                setComments((prevState)=>prevState.filter((c)=>c._id !== commentId))
            }
        } catch (error) {
            errorCatcher(error);
        }
    }
    useEffect(() => {
        getComments()
    }, [userId])
    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);
    return (
        <CommentsContext.Provider value={{ comments, createComment, isLoading, getComments, removeComment }}>
            {children}
        </CommentsContext.Provider>
    );
};

CommentsProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
export default CommentsProvider;
