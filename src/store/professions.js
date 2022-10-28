import { createSlice } from "@reduxjs/toolkit";
import { isOutdated } from "../utils/outDated";
import professionService from "../services/profession.service";

const professionsSlice = createSlice({
    name: "professions",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        professionsRequested: (state) => {
            state.isLoading = true;
        },
        professionsRecived: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now()
            state.isLoading = false;
        },
        professionsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
})

const { reducer: professionsReducer, actions } = professionsSlice;
const { professionsRequested, professionsRecived, professionsRequestFailed } = actions;

export const loadProfessionsList = () => async (dispatch,getState) => {
    const { lastFetch } = getState().qualityes
    if (isOutdated(lastFetch)) {
        dispatch(professionsRequested())
        try {
            const { content } = await professionService.get()
            dispatch(professionsRecived(content))
        } catch (error) {
            dispatch(professionsRequestFailed(error.message))
        }
    }
}

export const getProfessions = () => (state) => {
    return state.professions.entities
}

export const getProfessionsStatus = () => (state) => {
    return state.professions.isLoading
}

export const getProfessionById = (profId) => (state) => {
    if (state.professions.entities) {
        return state.professions.entities.find((prof)=>prof._id === profId)
    }
    return {}
}

export default professionsReducer