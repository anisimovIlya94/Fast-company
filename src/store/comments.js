import { createAction, createSlice } from "@reduxjs/toolkit";
import commentService from "../services/comment.service";
import { nanoid } from "nanoid";
import localStorageService from "../services/localStorage.service";

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true;
        },
        commentsRecived: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        commentsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        commentCreated: (state, action) => {
            state.entities.push(action.payload);
        },
        commentRemoved: (state, action) => {
            state.entities = state.entities.filter(
                (com) => com._id !== action.payload
            );
        }
    }
});

const { reducer: commentsReducer, actions } = commentsSlice;
const {
    commentsRequested,
    commentsRecived,
    commentsRequestFailed,
    commentCreated,
    commentRemoved
} = actions;

const createCommentRequested = createAction("comments/createCommentRequested");
const createCommentRequestFailed = createAction(
    "comments/createCommentRequestFailed"
);
const removeCommentRequested = createAction("comments/removeCommentRequested");
const removeCommentRequestFailed = createAction(
    "comments/removeCommentRequestFailed"
);

export const createComment = (payload) => async (dispatch) => {
    dispatch(createCommentRequested());
    const comment = {
        ...payload,
        created_at: Date.now(),
        userId: localStorageService.getUserIdToken(),
        _id: nanoid()
    };
    try {
        const { content } = await commentService.createComment(comment);
        dispatch(commentCreated(content));
    } catch (error) {
        dispatch(createCommentRequestFailed(error.message));
    }
};

export const removeComment = (commentId) => async (dispatch) => {
    dispatch(removeCommentRequested);
    try {
        const { content } = await commentService.removeComment(commentId);
        if (content === null) {
            dispatch(commentRemoved(commentId));
        }
    } catch (error) {
        dispatch(removeCommentRequestFailed());
    }
};

export const loadCommentsList = (userId) => async (dispatch) => {
    dispatch(commentsRequested());
    try {
        const { content } = await commentService.getComments(userId);
        dispatch(commentsRecived(content));
    } catch (error) {
        dispatch(commentsRequestFailed(error.message));
    }
};

export const getComments = () => (state) => state.comments.entities;

export const getCommentsStatus = () => (state) => {
    return state.comments.isLoading;
};

export default commentsReducer;
