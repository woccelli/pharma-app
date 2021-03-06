import axios from "axios";
import { clearErrors } from "./utilActions"
import { getSheets } from "./sheetsActions"
import {
    GET_USERS,
    GET_ERRORS,
    GET_SUCCESS,
    GET_USER_LOGS,
    CLEAR_USER_LOGS,
    GET_SHEET_LOGS,
    CLEAR_SHEET_LOGS
} from "./types";


// Get DB users
export const getUsers = () => dispatch => {
    axios
        .get("/api/users/all")
        .then(res => {
            // Dispatch returned users in store
            dispatch({
                type: GET_USERS,
                payload: res.data
            })
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Add a new sheet to the sheets DB
export const addSheet = (sheetData, history) => dispatch => {
    axios
        .post("/api/sheets/add", sheetData)
        .then(res => {
            history.push('/admin/sheets')
            dispatch(clearErrors())
            dispatch({
                type: GET_SUCCESS,
                payload: { addedSheet: true }
            })
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

export const addUser = (userData, history) => dispatch => {
    axios
        .post("/api/users/add", userData)
        .then(res => {
            dispatch(clearErrors())
            dispatch({
                type: GET_SUCCESS,
                payload: { addedUser: true }
            })
            history.push("/admin/users")
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}


export const getUserLogs = user => dispatch => {
    axios
        .get('/api/users/logs', { params: { userId: user._id } })
        .then(res => {
            const data = { userId: user._id, userlogs: res.data }
            dispatch({
                type: GET_USER_LOGS,
                payload: data
            })
        })
        .catch(err =>
            console.log(err)
        );
}

export const clearUserLogs = () => {
    return {
        type: CLEAR_USER_LOGS,
        payload: {}
    };
};


export const getSheetLogs = sheet => dispatch => {
    axios
        .get('/api/sheets/logs', { params: { sheetId: sheet._id } })
        .then(res => {
            const data = { sheetId: sheet._id, sheetlogs: res.data }
            dispatch({
                type: GET_SHEET_LOGS,
                payload: data
            })
        })
        .catch(err =>
            console.log(err)
        );
}

export const clearSheetLogs = () => {
    return {
        type: CLEAR_SHEET_LOGS,
        payload: {}
    };
};

export const editUserSubscription = (data, history) => dispatch => {
    axios
        .post("/api/users/user-subscription", data)
        .then(res => {
            dispatch(clearErrors())
            dispatch({
                type: GET_SUCCESS,
                payload: { addedSubscription: true }
            })
            history.push("/admin/users")
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}

export const updateSheet = (data, history) => dispatch => {
    axios.post("/api/sheets/update", data)
        .then(res => {
            dispatch(clearErrors())
            dispatch({
                type: GET_SUCCESS,
                payload: { updatedSheet: true }
            })
            history.push("/admin/sheets")
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}

export const deleteSheet = sheet => dispatch => {
    axios.post("/api/sheets/delete", { _id: sheet._id })
        .then(res => {
            dispatch(clearErrors())
            dispatch({
                type: GET_SUCCESS,
                payload: { deletedSheet: true }
            })
            dispatch(getSheets())
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}