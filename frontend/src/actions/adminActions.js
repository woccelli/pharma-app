import axios from "axios";

import {
    SET_USERS,
    GET_ERRORS,
    SET_ADDED_USER
} from "./types";

export const setUsers = data => {
    return {
        type: SET_USERS,
        payload: data
    };
};

// Get DB users
export const getUsers = () => dispatch => {
    axios
        .get("/api/users/all")
        .then(res => {
            // Dispatch returned users in store
            dispatch(setUsers(res.data))
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
        .then(res => history.push('/admin/dashboard'))
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
            dispatch({
                type: GET_ERRORS,
                payload: {}
            })
            dispatch({
                type: SET_ADDED_USER,
                payload: true
            })
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}

export const clearAddedUser = () => dispatch => {
    dispatch({
        type: SET_ADDED_USER,
        payload: false
    })
}