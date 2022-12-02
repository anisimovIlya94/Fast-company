import { createSlice } from "@reduxjs/toolkit";
import qualityService from "../services/quality.service";
import { isOutdated } from "../utils/outDated";

const qualitiesSlice = createSlice({
    name: "qualities",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        qualitiesRequested: (state) => {
            state.isLoading = true;
        },
        qualitiesRecived: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        qualitiesRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: qualitiesReducer, actions } = qualitiesSlice;
const { qualitiesRequested, qualitiesRecived, qualitiesRequestFailed } =
    actions;

export const loadQualitiesList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().qualityes;
    if (isOutdated(lastFetch)) {
        dispatch(qualitiesRequested());
        try {
            const { content } = await qualityService.get();
            dispatch(qualitiesRecived(content));
        } catch (error) {
            dispatch(qualitiesRequestFailed(error.message));
        }
    }
};

export const getQualities = () => (state) => {
    return state.qualityes.entities;
};

export const getQualitiesStatus = () => (state) => {
    return state.qualityes.isLoading;
};

export const getQualitiesByIds = (qualitiesId) => (state) => {
    if (state.qualityes.entities) {
        const qualitiesArray = [];
        for (const qualityById of qualitiesId) {
            for (const quality of state.qualityes.entities) {
                if (quality._id === qualityById) {
                    qualitiesArray.push(quality);
                }
            }
        }
        return qualitiesArray;
    }
    return [];
};

export default qualitiesReducer;
